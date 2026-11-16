"use strict";

/* ================================
   بات تعیین سطح — کلاینت چت
================================ */

const chatScroll = document.getElementById("chat-scroll");
const chatProgress = document.getElementById("chat-progress");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("quiz-progress-fill");
const tierTag = document.getElementById("tier-tag");
const resultPanel = document.getElementById("result-panel");
const resultBadge = document.getElementById("result-badge");
const resultLevel = document.getElementById("result-level");
const resultScore = document.getElementById("result-score");
const resultMsg = document.getElementById("result-msg");
const resultRecommend = document.getElementById("result-recommend");
const retryBtn = document.getElementById("retry-btn");
const historyList = document.getElementById("history-list");
const serverBanner = document.getElementById("server-banner");

const LANGS = [
    { id: "python", label: "🐍 Python" },
    { id: "javascript", label: "🟨 JavaScript" },
    { id: "cpp", label: "⚙️ C++" },
    { id: "java", label: "☕ Java" }
];

const TASK_NAMES = [
    "سلام دنیا", "جمع دو عدد", "زوج یا فرد",
    "حلقه", "تابع"
];

let quizId = null;
let busy = false;

/* ─── ابزارهای چت ─── */

function scrollBottom() {
    chatScroll.scrollTop = chatScroll.scrollHeight;
}

function addBotMsg(build) {
    const wrap = document.createElement("div");
    wrap.className = "chat-msg bot";

    const avatar = document.createElement("span");
    avatar.className = "chat-avatar";
    avatar.textContent = "🤖";

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";

    build(bubble);

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    chatScroll.appendChild(wrap);
    scrollBottom();

    return bubble;
}

function addUserMsg(text) {
    const wrap = document.createElement("div");
    wrap.className = "chat-msg user";

    const avatar = document.createElement("span");
    avatar.className = "chat-avatar";
    avatar.textContent = "🙋";

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = text;

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    chatScroll.appendChild(wrap);
    scrollBottom();
}

/* ─── درخواست‌ها ─── */

async function api(path, body) {
    let response;

    try {
        response = await fetch(path, {
            method: body ? "POST" : "GET",
            headers: body ? { "Content-Type": "application/json" } : undefined,
            body: body ? JSON.stringify(body) : undefined
        });
    } catch (error) {
        serverBanner.hidden = false;
        throw new Error("server-down");
    }

    const data = await response.json().catch(function() {
        return { error: "پاسخ سرور نامعتبر بود" };
    });

    if (!response.ok) {
        throw new Error(data.error || "خطای سرور");
    }

    return data;
}

/* ─── شروع ─── */

function askLanguage() {
    addBotMsg(function(bubble) {
        bubble.appendChild(document.createTextNode("اول بگو با کدوم زبان می‌خواهی سنجیده شوی؟"));

        const box = document.createElement("div");
        box.className = "lang-options";

        for (const lang of LANGS) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "quiz-option";
            button.textContent = lang.label;

            button.addEventListener("click", function() {
                if (busy) {
                    return;
                }
                startQuiz(lang.id, lang.label);
            });

            box.appendChild(button);
        }

        bubble.appendChild(box);
    });
}

async function startQuiz(langId, langLabel) {
    if (busy) {
        return;
    }
    busy = true;

    addUserMsg(langLabel + " رو انتخاب می‌کنم!");
    resultPanel.hidden = true;

    try {
        const data = await api("/api/quiz/start", { lang: langId });

        quizId = data.quiz_id;

        addBotMsg(function(bubble) {
            bubble.textContent =
                "عالیه! آزمون " + data.lang_name + " شروع می‌شود — " +
                "۸ سؤال. بریم! 🚀";
        });

        chatProgress.hidden = false;
        updateProgress({ answered: 0, total: data.total, tier_fa: "آسان" });

        setTimeout(function() {
            busy = false;
            showQuestion(data.question);
        }, 500);

    } catch (error) {
        busy = false;
        if (error.message !== "server-down") {
            addBotMsg(function(bubble) {
                bubble.textContent = "⚠️ مشکلی پیش آمد: " + error.message;
            });
        }
    }
}

/* ─── نمایش سؤال ─── */

function showQuestion(q) {
    updateTier(q.tier_fa);

    addBotMsg(function(bubble) {
        const text = document.createElement("div");
        text.textContent = q.text + " (سطح: " + q.tier_fa + ")";
        bubble.appendChild(text);

        if (q.code) {
            const code = document.createElement("pre");
            code.textContent = q.code;
            bubble.appendChild(code);
        }

        const box = document.createElement("div");
        box.className = "quiz-options";

        q.options.forEach(function(option, index) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "quiz-option";

            const num = document.createElement("span");
            num.className = "opt-num";
            num.textContent = fa(index + 1) + ")";

            const text = document.createElement("span");
            text.className = "opt-text";
            text.textContent = option;

            button.appendChild(num);
            button.appendChild(text);

            button.addEventListener("click", function() {
                answerQuestion(q, index, button, box);
            });

            box.appendChild(button);
        });

        bubble.appendChild(box);
    });
}

function updateTier(tierFa) {
    tierTag.textContent = "سطح: " + tierFa;
}

function updateProgress(progress) {
    progressText.textContent =
        "سؤال " + fa(progress.answered + 1) + " از " + fa(progress.total);
    progressFill.style.width =
        (progress.answered / progress.total * 100) + "%";
}

function fa(number) {
    const digits = "۰۱۲۳۴۵۶۷۸۹";
    return String(number).replace(/[0-9]/g, function(d) {
        return digits[d];
    });
}

/* ─── جواب دادن ─── */

async function answerQuestion(q, choice, chosenBtn, optionsBox) {
    if (busy) {
        return;
    }
    busy = true;

    // قفل کردن گزینه‌ها
    optionsBox.querySelectorAll(".quiz-option").forEach(function(btn) {
        btn.disabled = true;
    });
    chosenBtn.classList.add("chosen");

    addUserMsg("گزینه‌ی " + fa(choice + 1));

    try {
        const data = await api("/api/quiz/answer", {
            quiz_id: quizId,
            question_id: q.id,
            choice: choice
        });

        // نمایش جواب درست
        optionsBox.querySelectorAll(".quiz-option")
            [data.correct_index].classList.add("correct-reveal");

        if (data.correct) {
            addBotMsg(function(bubble) {
                bubble.textContent = pick([
                    "آفرین! درست بود ✅",
                    "عالی! دقیقاً درست ✅",
                    "باریکلا! جواب درست ✅"
                ]);
            });
        } else {
            addBotMsg(function(bubble) {
                bubble.textContent =
                    "اشتباه بود ❌ جواب درست: «" +
                    data.correct_answer + "»";
            });
        }

        updateProgress(data.progress);

        if (data.finished && data.result) {
            setTimeout(function() {
                showResult(data.result);
                busy = false;
            }, 700);
        } else if (data.next) {
            setTimeout(function() {
                busy = false;
                showQuestion(data.next);
            }, 700);
        }

    } catch (error) {
        busy = false;
        addBotMsg(function(bubble) {
            bubble.textContent =
                "⚠️ مشکلی پیش آمد: " + error.message +
                " — یک آزمون تازه شروع کنیم.";
        });
        setTimeout(askLanguage, 1200);
    }
}

function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/* ─── نتیجه ─── */

function showResult(result) {
    chatProgress.hidden = true;

    const recommendText = result.recommend
        .map(function(n) {
            return "تمرین " + fa(n) + " (" + (TASK_NAMES[n - 1] || "") + ")";
        })
        .join(" و ");

    addBotMsg(function(bubble) {
        bubble.textContent =
            "آزمون تمام شد! 🎉 سطح تو: " + result.badge + " «" +
            result.level_fa + "» — " + fa(result.score) + " از " +
            fa(result.total) + " درست (سختی رسیده: " +
            result.max_tier_fa + ")";
    });

    resultBadge.textContent = result.badge;
    resultLevel.textContent = result.level_fa;
    resultScore.textContent =
        fa(result.score) + " از " + fa(result.total) + " پاسخ درست";
    resultMsg.textContent = result.message;
    resultRecommend.textContent = "پیشنهاد من: " + recommendText + " 💪";
    resultPanel.hidden = false;

    loadHistory();
}

/* ─── سابقه ─── */

async function loadHistory() {
    try {
        const data = await api("/api/quiz/history");

        if (data.results.length === 0) {
            historyList.textContent = "هنوز آزمونی نداری.";
            return;
        }

        historyList.innerHTML = "";

        for (const item of data.results) {
            const row = document.createElement("div");
            row.className = "history-item";

            const right = document.createElement("span");
            right.textContent = item.lang + " · " + item.created_at;

            const level = document.createElement("span");
            level.className = "hist-level hist-" + item.level;
            level.textContent = item.badge || "";

            const levelFa = {
                beginner: "مبتدی",
                intermediate: "متوسط",
                advanced: "پیشرفته"
            }[item.level] || item.level;

            level.textContent += " " + levelFa;

            row.appendChild(right);
            row.appendChild(level);
            historyList.appendChild(row);
        }

    } catch (error) {
        /* بی‌خیال — سابقه حیاتی نیست */
    }
}

/* ─── رویدادها ─── */

retryBtn.addEventListener("click", function() {
    resultPanel.hidden = true;
    quizId = null;
    askLanguage();
});

/* ─── شروع صفحه ─── */

askLanguage();
loadHistory();
