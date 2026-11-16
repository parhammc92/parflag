"""لایه‌ی دیتابیس آزمون — SQLite استاندارد پایتون، بدون وابستگی اضافه."""

import os
import sqlite3

DB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "instance")
DB_PATH = os.path.join(DB_DIR, "quiz.db")


def get_db():
    """یک اتصال تازه per-request — ساده و thread-safe."""
    os.makedirs(DB_DIR, exist_ok=True)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS quiz_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lang TEXT NOT NULL,
                level TEXT NOT NULL,
                score INTEGER NOT NULL,
                total INTEGER NOT NULL,
                max_tier TEXT NOT NULL,
                created_at TEXT DEFAULT (
                    datetime('now', 'localtime')
                )
            )
            """
        )


def save_result(lang, level, score, total, max_tier):
    with get_db() as conn:
        conn.execute(
            """
            INSERT INTO quiz_results (lang, level, score, total, max_tier)
            VALUES (?, ?, ?, ?, ?)
            """,
            (lang, level, score, total, max_tier)
        )


def recent_results(limit=10):
    with get_db() as conn:
        rows = conn.execute(
            """
            SELECT id, lang, level, score, total, max_tier, created_at
            FROM quiz_results
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,)
        ).fetchall()

    return [dict(row) for row in rows]
