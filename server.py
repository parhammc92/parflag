"""
پرچم — بک‌اند سایت.

    • سرو کردن سایت استاتیک (index.html و quiz.html)
    • API آزمون تعیین سطح: سؤالات تطبیقی، تصحیح سمت سرور،
      ذخیره‌ی نتیجه در SQLite

اجرای سرور:  python server.py    →  http://localhost:5001
"""

import os
import secrets

from flask import Flask, jsonify, request, send_from_directory

import questions
import quizdb

ROOT = os.path.dirname(os.path.abspath(__file__))

MAX_JSON_BYTES = 4096
QUIZ_LENGTH = 8          # تعداد سؤال هر آزمون
TIER_ORDER = ("easy", "medium", "hard")
TIER_FA = {"easy": "آسان", "medium": "متوسط", "hard": "سخت"}

LEVEL_FA = {
    "beginner": "مبتدی",
    "intermediate": "متوسط",
    "advanced": "پیشرفته"
}

LEVEL_BADGE = {
    "beginner": "🥉",
    "intermediate": "🥈",
    "advanced": "🥇"
}

LEVEL_MESSAGE = {
    "beginner": "شروع خوبیه! تمرین‌های ۱ و ۲ هر زبان را بزن و دوباره آزمون بده.",
    "intermediate": "خوب پیشرفتی! تمرین‌های ۳ و ۴ را حل کن تا به سطح پیشرفته برسی.",
    "advanced": "فوق‌العاده! سراغ تمرین ۵ (تابع‌نویسی) برو و زبان جدید را هم امتحان کن."
}

LEVEL_RECOMMEND = {
    "beginner": [1, 2],
    "intermediate": [3, 4],
    "advanced": [5]
}

app = Flask(__name__, static_folder=None)

# آزمون‌های فعال (در حافظه) — کلید: quiz_id
active_quizzes = {}


# ──────────────────────────── ابزارها ────────────────────────────

def json_body():
    """بدنه‌ی JSON امن؛ در غیر این صورت None."""
    if not request.is_json:
        return None

    if (request.content_length or 0) > MAX_JSON_BYTES:
        return None

    data = request.get_json(silent=True)

    return data if isinstance(data, dict) else None


def question_for_client(q):
    """سؤال بدون جواب برای کلاینت."""
    return {
        "id": q["id"],
        "text": q["text"],
        "code": q.get("code"),
        "options": q["options"],
        "tier": q.get("tier", "easy"),
        "tier_fa": TIER_FA[q.get("tier", "easy")]
    }


def pick_question(state):
    """سؤال بعدی از سطح فعلی؛ اگر تمام شد از سطوح مجاور."""
    lang_bank = questions.BANK[state["lang"]]

    for tier in (state["tier"],) + tuple(
        t for t in TIER_ORDER if t != state["tier"]
    ):
        pool = [
            q for q in lang_bank[tier]
            if q["id"] not in state["used"]
        ]

        if pool:
            state["tier"] = tier
            q = dict(secrets.choice(pool))
            q["tier"] = tier
            state["used"].add(q["id"])
            state["current"] = q
            return q

    return None


def advance_tier(state, correct):
    """منطق تطبیقی: دو درست پشت‌سرهم → بالاتر، دو غلط → پایین‌تر."""
    if correct:
        state["good"] += 1
        state["bad"] = 0
    else:
        state["bad"] += 1
        state["good"] = 0

    idx = TIER_ORDER.index(state["tier"])

    if state["good"] >= 2 and idx < len(TIER_ORDER) - 1:
        state["tier"] = TIER_ORDER[idx + 1]
        state["good"] = 0
        state["bad"] = 0

    elif state["bad"] >= 2 and idx > 0:
        state["tier"] = TIER_ORDER[idx - 1]
        state["good"] = 0
        state["bad"] = 0

    if TIER_ORDER.index(state["tier"]) > TIER_ORDER.index(state["max_tier"]):
        state["max_tier"] = state["tier"]


def compute_level(state):
    accuracy = state["score"] / state["count"] if state["count"] else 0

    reached_hard = state["max_tier"] == "hard"
    reached_medium = TIER_ORDER.index(state["max_tier"]) >= 1

    if reached_hard and accuracy >= 0.75:
        return "advanced"
    elif reached_medium and accuracy >= 0.5:
        return "intermediate"
    return "beginner"


# ──────────────────────────── سرو فایل ────────────────────────────

@app.route("/")
def home():
    return send_from_directory(ROOT, "index.html")


@app.route("/quiz")
def quiz_page():
    return send_from_directory(ROOT, "quiz.html")


@app.route("/<path:path>")
def static_files(path):
    # فایل‌های بک‌اند مخفی بمانند
    if path.endswith(".py") or path.endswith(".db"):
        return jsonify({"error": "not found"}), 404

    full = os.path.normpath(os.path.join(ROOT, path))

    if not full.startswith(ROOT):
        return jsonify({"error": "not found"}), 404

    return send_from_directory(ROOT, path)


# ──────────────────────────── API آزمون ────────────────────────────

@app.route("/api/health")
def health():
    return jsonify({"ok": True, "questions": sum(
        len(t) for lang in questions.BANK.values() for t in lang.values()
    )})


@app.route("/api/quiz/start", methods=["POST"])
def quiz_start():
    data = json_body()

    if not data:
        return jsonify({"error": "بدنه‌ی JSON لازم است"}), 400

    lang = data.get("lang", "")

    if lang not in questions.BANK:
        return jsonify({"error": "زبان نامعتبر"}), 400

    quiz_id = secrets.token_hex(12)

    state = {
        "lang": lang,
        "tier": "easy",
        "max_tier": "easy",
        "good": 0,
        "bad": 0,
        "score": 0,
        "count": 0,
        "used": set(),
        "current": None
    }

    active_quizzes[quiz_id] = state

    q = pick_question(state)

    if q is None:
        return jsonify({"error": "بانک سؤال خالی است"}), 500

    return jsonify({
        "quiz_id": quiz_id,
        "lang": lang,
        "lang_name": questions.LANG_NAMES[lang],
        "total": QUIZ_LENGTH,
        "question": question_for_client(q)
    })


@app.route("/api/quiz/answer", methods=["POST"])
def quiz_answer():
    data = json_body()

    if not data:
        return jsonify({"error": "بدنه‌ی JSON لازم است"}), 400

    state = active_quizzes.get(data.get("quiz_id", ""))

    if state is None:
        return jsonify({"error": "آزمون یافت نشد — از نو شروع کن"}), 404

    q = state["current"]

    if q is None or data.get("question_id") != q["id"]:
        return jsonify({"error": "سؤال نامعتبر"}), 400

    try:
        choice = int(data.get("choice"))
    except (TypeError, ValueError):
        return jsonify({"error": "گزینه نامعتبر"}), 400

    if not 0 <= choice < len(q["options"]):
        return jsonify({"error": "گزینه نامعتبر"}), 400

    correct = choice == q["answer"]

    if correct:
        state["score"] += 1

    state["count"] += 1
    advance_tier(state, correct)

    # سؤال بعدی یا پایان
    nxt = pick_question(state) if state["count"] < QUIZ_LENGTH else None

    if nxt is None:
        finished = True
        level = compute_level(state)

        quizdb.save_result(
            state["lang"], level, state["score"],
            state["count"], state["max_tier"]
        )

        result = {
            "level": level,
            "level_fa": LEVEL_FA[level],
            "badge": LEVEL_BADGE[level],
            "message": LEVEL_MESSAGE[level],
            "score": state["score"],
            "total": state["count"],
            "max_tier_fa": TIER_FA[state["max_tier"]],
            "recommend": LEVEL_RECOMMEND[level]
        }

        active_quizzes.pop(data["quiz_id"], None)
    else:
        finished = False
        result = None

    return jsonify({
        "correct": correct,
        "correct_index": q["answer"],
        "correct_answer": q["options"][q["answer"]],
        "finished": finished,
        "result": result,
        "next": question_for_client(nxt) if nxt else None,
        "progress": {
            "answered": state["count"] - (0 if nxt is None else 1),
            "total": QUIZ_LENGTH,
            "tier_fa": TIER_FA[state["tier"]]
        }
    })


@app.route("/api/quiz/finish", methods=["POST"])
def quiz_finish():
    """پایان دادن دستی (رها کردن آزمون) — نتیجه ذخیره نمی‌شود."""
    data = json_body()

    if not data:
        return jsonify({"error": "بدنه‌ی JSON لازم است"}), 400

    active_quizzes.pop(data.get("quiz_id", ""), None)

    return jsonify({"ok": True})


@app.route("/api/quiz/history")
def quiz_history():
    return jsonify({"results": quizdb.recent_results(10)})


# ──────────────────────────── پایداری ────────────────────────────

@app.errorhandler(404)
def not_found(_error):
    if request.path.startswith("/api/"):
        return jsonify({"error": "not found"}), 404

    return jsonify({"error": "not found"}), 404


@app.errorhandler(500)
def server_error(_error):
    return jsonify({"error": "server error"}), 500


@app.errorhandler(405)
def bad_method(_error):
    return jsonify({"error": "method not allowed"}), 405


if __name__ == "__main__":
    quizdb.init_db()

    total = sum(
        len(t) for lang in questions.BANK.values() for t in lang.values()
    )

    print("=" * 50)
    print("  پرچم — سرور آماده است")
    print(f"  بانک سؤالات: {total} سؤال (۴ زبان × ۳ سطح)")
    print("  تمرین‌ها:      http://localhost:5001/")
    print("  آزمون تعیین سطح: http://localhost:5001/quiz")
    print("=" * 50)

    app.run(host="127.0.0.1", port=5001, debug=False)
