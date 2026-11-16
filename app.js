"use strict";

/* ================================
   پرچم — منطق سایت
================================ */

/* ─── داده‌ی تمرین‌ها ─── */

const TASKS = {
    python: [
        {
            title: "سلام دنیا!",
            desc: "اولین برنامه‌ی هر برنامه‌نویس! با تابع <code>print()</code> جمله‌ی <b>سلام دنیا</b> را چاپ کن.",
            starter: "# جمله‌ی معروف را چاپ کن\n",
            expected: "سلام دنیا",
            hint: "از print(\"سلام دنیا\") استفاده کن.",
            solution: 'print("سلام دنیا")'
        },
        {
            title: "جمع دو عدد",
            desc: "دو متغیر <code>a</code> و <code>b</code> با مقادیر ۳ و ۵ بساز و جمعشان را چاپ کن. خروجی باید <b>8</b> باشد.",
            starter: "a = 3\nb = 5\n# جمع را چاپ کن\n",
            expected: "8",
            hint: "با print(a + b) جمع را چاپ کن.",
            solution: "a = 3\nb = 5\nprint(a + b)"
        },
        {
            title: "زوج یا فرد؟",
            desc: "عدد ۷ را در متغیر <code>n</code> بگذار و بگو زوج است یا فرد. با <code>%</code> (باقیمانده) کار کن.",
            starter: "n = 7\n\nif n % 2 == 0:\n    print(\"زوج\")\nelse:\n    # شرط فرد را کامل کن\n",
            expected: "فرد",
            hint: "اگر باقیمانده‌ی تقسیم بر ۲ صفر باشد زوج است؛ در شاخه‌ی else بنویس print(\"فرد\").",
            solution: "n = 7\n\nif n % 2 == 0:\n    print(\"زوج\")\nelse:\n    print(\"فرد\")"
        },
        {
            title: "حلقه و جدول ضرب",
            desc: "با یک حلقه‌ی <code>for</code> اعداد ۱ تا ۵ را چاپ کن — هر عدد در یک خط.",
            starter: "# با for و range اعداد ۱ تا ۵ را چاپ کن\n",
            expected: "1\n2\n3\n4\n5",
            hint: "range(1, 6) اعداد ۱ تا ۵ می‌دهد. داخل حلقه print(i) کن.",
            solution: "for i in range(1, 6):\n    print(i)"
        },
        {
            title: "تابع شخصی",
            desc: "تابعی به نام <code>ghad</code> بنویس که قد (سانتی‌متر) بگیرد و قد به متر را برگرداند. آن را با ۱۷۰ صدا بزن و چاپ کن. خروجی: <b>1.7</b>",
            starter: "def ghad(cm):\n    # سانتی‌متر را به متر تبدیل کن و برگردان\n    pass\n\nprint(ghad(170))\n",
            expected: "1.7",
            hint: "متر = سانتی‌متر تقسیم بر ۱۰۰. با return جواب را برگردان.",
            solution: "def ghad(cm):\n    return cm / 100\n\nprint(ghad(170))"
        }
    ],

    javascript: [
        {
            title: "سلام دنیا!",
            desc: "با <code>console.log</code> جمله‌ی <b>سلام دنیا</b> را چاپ کن.",
            starter: "// جمله‌ی معروف را چاپ کن\n",
            expected: "سلام دنیا",
            hint: "از console.log(\"سلام دنیا\") استفاده کن.",
            solution: 'console.log("سلام دنیا");'
        },
        {
            title: "جمع دو عدد",
            desc: "دو متغیر با <code>let</code> بساز و جمعشان را چاپ کن. خروجی باید <b>8</b> باشد.",
            starter: "let a = 3;\nlet b = 5;\n// جمع را چاپ کن\n",
            expected: "8",
            hint: "console.log(a + b)",
            solution: "let a = 3;\nlet b = 5;\nconsole.log(a + b);"
        },
        {
            title: "زوج یا فرد؟",
            desc: "با <code>if / else</code> بگو عدد ۷ زوج است یا فرد.",
            starter: "let n = 7;\n\nif (n % 2 === 0) {\n    console.log(\"زوج\");\n} else {\n    // شرط فرد را کامل کن\n}\n",
            expected: "فرد",
            hint: "در شاخه‌ی else بنویس console.log(\"فرد\");",
            solution: "let n = 7;\n\nif (n % 2 === 0) {\n    console.log(\"زوج\");\n} else {\n    console.log(\"فرد\");\n}"
        },
        {
            title: "حلقه و جدول ضرب",
            desc: "با حلقه‌ی <code>for</code> اعداد ۱ تا ۵ را چاپ کن — هر عدد در یک خط.",
            starter: "// با for اعداد ۱ تا ۵ را چاپ کن\n",
            expected: "1\n2\n3\n4\n5",
            hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
            solution: "for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}"
        },
        {
            title: "تابع شخصی",
            desc: "تابعی به نام <code>ghad</code> بنویس که قد (سانتی‌متر) بگیرد و قد به متر را برگرداند. خروجی با ۱۷۰: <b>1.7</b>",
            starter: "function ghad(cm) {\n    // سانتی‌متر را به متر تبدیل کن و برگردان\n}\n\nconsole.log(ghad(170));\n",
            expected: "1.7",
            hint: "داخل تابع: return cm / 100;",
            solution: "function ghad(cm) {\n    return cm / 100;\n}\n\nconsole.log(ghad(170));"
        }
    ],

    cpp: [
        {
            title: "سلام دنیا!",
            desc: "کلاسیک‌ترین برنامه‌ی C++. با <code>std::cout</code> جمله‌ی <b>Salam donya</b> را چاپ کن.",
            starter: "#include <iostream>\n\nint main() {\n    // جمله را چاپ کن\n    return 0;\n}\n",
            expected: "Salam donya",
            hint: "std::cout << \"Salam donya\" << std::endl;",
            solution: '#include <iostream>\n\nint main() {\n    std::cout << "Salam donya" << std::endl;\n    return 0;\n}'
        },
        {
            title: "جمع دو عدد",
            desc: "دو متغیر <code>int</code> بساز و جمعشان را با cout چاپ کن.",
            starter: "#include <iostream>\n\nint main() {\n    int a = 3;\n    int b = 5;\n    // جمع را چاپ کن\n    return 0;\n}\n",
            expected: "8",
            hint: "std::cout << a + b << std::endl;",
            solution: "#include <iostream>\n\nint main() {\n    int a = 3;\n    int b = 5;\n    std::cout << a + b << std::endl;\n    return 0;\n}"
        },
        {
            title: "زوج یا فرد؟",
            desc: "با <code>if / else</code> و باقیمانده (<code>%</code>) بگو ۷ زوج است یا فرد.",
            starter: "#include <iostream>\n\nint main() {\n    int n = 7;\n    // شرط را بنویس\n    return 0;\n}\n",
            expected: "fard",
            hint: "if (n % 2 == 0) cout << \"zoj\"; else cout << \"fard\";",
            solution: '#include <iostream>\n\nint main() {\n    int n = 7;\n    if (n % 2 == 0) {\n        std::cout << "zoj" << std::endl;\n    } else {\n        std::cout << "fard" << std::endl;\n    }\n    return 0;\n}'
        },
        {
            title: "حلقه‌ی for",
            desc: "با حلقه‌ی <code>for</code> اعداد ۱ تا ۵ را چاپ کن.",
            starter: "#include <iostream>\n\nint main() {\n    // حلقه را بنویس\n    return 0;\n}\n",
            expected: "1\n2\n3\n4\n5",
            hint: "for (int i = 1; i <= 5; i++) { std::cout << i << std::endl; }",
            solution: "#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        std::cout << i << std::endl;\n    }\n    return 0;\n}"
        },
        {
            title: "تابع",
            desc: "تابعی بنویس که سانتی‌متر بگیرد و متر برگرداند (نوع <code>double</code>).",
            starter: "#include <iostream>\n\ndouble ghad(int cm) {\n    // تبدیل کن\n}\n\nint main() {\n    std::cout << ghad(170) << std::endl;\n    return 0;\n}\n",
            expected: "1.7",
            hint: "return cm / 100.0;",
            solution: "#include <iostream>\n\ndouble ghad(int cm) {\n    return cm / 100.0;\n}\n\nint main() {\n    std::cout << ghad(170) << std::endl;\n    return 0;\n}"
        }
    ],

    java: [
        {
            title: "سلام دنیا!",
            desc: "همه‌چیز در جاوا داخل یک <code>class</code> است! جمله‌ی <b>Salam donya</b> را چاپ کن.",
            starter: "public class Main {\n    public static void main(String[] args) {\n        // جمله را چاپ کن\n    }\n}\n",
            expected: "Salam donya",
            hint: "System.out.println(\"Salam donya\");",
            solution: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Salam donya");\n    }\n}'
        },
        {
            title: "جمع دو عدد",
            desc: "دو متغیر <code>int</code> بساز و جمعشان را چاپ کن.",
            starter: "public class Main {\n    public static void main(String[] args) {\n        int a = 3;\n        int b = 5;\n        // جمع را چاپ کن\n    }\n}\n",
            expected: "8",
            hint: "System.out.println(a + b);",
            solution: "public class Main {\n    public static void main(String[] args) {\n        int a = 3;\n        int b = 5;\n        System.out.println(a + b);\n    }\n}"
        },
        {
            title: "زوج یا فرد؟",
            desc: "با <code>if / else</code> و <code>%</code> بگو ۷ زوج است یا فرد.",
            starter: "public class Main {\n    public static void main(String[] args) {\n        int n = 7;\n        // شرط را بنویس\n    }\n}\n",
            expected: "fard",
            hint: "if (n % 2 == 0) ... else ...",
            solution: 'public class Main {\n    public static void main(String[] args) {\n        int n = 7;\n        if (n % 2 == 0) {\n            System.out.println("zoj");\n        } else {\n            System.out.println("fard");\n        }\n    }\n}'
        },
        {
            title: "حلقه‌ی for",
            desc: "با حلقه‌ی <code>for</code> اعداد ۱ تا ۵ را چاپ کن.",
            starter: "public class Main {\n    public static void main(String[] args) {\n        // حلقه را بنویس\n    }\n}\n",
            expected: "1\n2\n3\n4\n5",
            hint: "for (int i = 1; i <= 5; i++) { ... }",
            solution: "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(i);\n        }\n    }\n}"
        },
        {
            title: "تابع static",
            desc: "در جاوا تابع‌ها «متد» هستند و داخل class تعریف می‌شوند. متدی بنویس که سانتی‌متر بگیرد و متر برگرداند (نوع <code>double</code>).",
            starter: "public class Main {\n\n    static double ghad(int cm) {\n        // تبدیل کن\n    }\n\n    public static void main(String[] args) {\n        System.out.println(ghad(170));\n    }\n}\n",
            expected: "1.7",
            hint: "return cm / 100.0;",
            solution: "public class Main {\n\n    static double ghad(int cm) {\n        return cm / 100.0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(ghad(170));\n    }\n}"
        }
    ]
};

const LANG_NAMES = {
    python: "Python",
    javascript: "JavaScript",
    cpp: "C++",
    java: "Java"
};

/* زبان‌هایی که در مرورگر اجرا می‌شوند */
const RUNNABLE = { python: true, javascript: true, cpp: false, java: false };

/* ─── وضعیت ─── */

let currentLang = "python";
let currentTask = 0;
let pyodide = null;          // موتور پایتون (تنها در صورت نیاز بارگذاری می‌شود)
let pyodideLoading = false;

const STORAGE_KEY = "parflag_progress";

function loadProgress() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function saveProgress(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ─── عناصر ─── */

const langBar = document.getElementById("lang-bar");
const taskList = document.getElementById("task-list");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const hintBox = document.getElementById("hint-box");
const hintText = document.getElementById("hint-text");
const hintBtn = document.getElementById("hint-btn");
const editor = document.getElementById("editor");
const editorLangTag = document.getElementById("editor-lang-tag");
const runBtn = document.getElementById("run-btn");
const resetBtn = document.getElementById("reset-btn");
const solutionBtn = document.getElementById("solution-btn");
const doneBtn = document.getElementById("done-btn");
const solutionBox = document.getElementById("solution-box");
const solutionCode = document.getElementById("solution-code");
const output = document.getElementById("output");
const engineNote = document.getElementById("engine-note");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");

/* ─── نمایش ─── */

function renderTaskList() {
    const tasks = TASKS[currentLang];
    const progress = loadProgress();

    taskList.innerHTML = "";
    tasks.forEach(function(task, index) {
        const done = progress[currentLang + ":" + index] === true;

        const button = document.createElement("button");
        button.className = "task-item" +
            (index === currentTask ? " active" : "") +
            (done ? " completed" : "");

        const check = document.createElement("span");
        check.className = "check";
        check.textContent = "✓";

        const title = document.createElement("span");
        title.className = "title";
        title.textContent = (index + 1) + ". " + task.title;

        button.appendChild(check);
        button.appendChild(title);

        button.addEventListener("click", function() {
            selectTask(index);
        });

        taskList.appendChild(button);
    });
}

function renderProgress() {
    const progress = loadProgress();
    let done = 0;
    let total = 0;

    for (const lang in TASKS) {
        TASKS[lang].forEach(function(task, index) {
            total += 1;
            if (progress[lang + ":" + index] === true) {
                done += 1;
            }
        });
    }

    progressFill.style.width = total ? (done / total * 100) + "%" : "0%";
    progressLabel.textContent =
        toFa(done) + " از " + toFa(total) + " تمرین";
}

function toFa(number) {
    const digits = "۰۱۲۳۴۵۶۷۸۹";
    return String(number).replace(/[0-9]/g, function(d) {
        return digits[d];
    });
}

function selectTask(index) {
    currentTask = index;

    const task = TASKS[currentLang][index];
    const progress = loadProgress();
    const done = progress[currentLang + ":" + index] === true;

    taskTitle.textContent = (index + 1) + ". " + task.title;
    taskDesc.innerHTML = task.desc;

    hintText.textContent = task.hint;
    hintBox.hidden = true;
    hintBtn.hidden = false;

    const draftKey = "parflag_draft_" + currentLang + "_" + index;
    const draft = localStorage.getItem(draftKey);

    editor.value = draft !== null ? draft : task.starter;
    editor.disabled = !RUNNABLE[currentLang];

    editorLangTag.textContent = LANG_NAMES[currentLang];
    runBtn.hidden = !RUNNABLE[currentLang];

    if (!RUNNABLE[currentLang]) {
        output.className = "info";
        output.textContent =
            "اجرای " + LANG_NAMES[currentLang] +
            " داخل مرورگر ممکن نیست — کد را اینجا بنویس و با راه‌حل مقایسه کن. " +
            "برای اجرای واقعی، VS Code یا کد‌ブロکس را نصب کن.";
        engineNote.textContent = "حالت یادگیری";
        doneBtn.hidden = false;
    } else {
        output.className = "";
        output.textContent = "برای دیدن خروجی، دکمه‌ی «اجرا» را بزن.";
        engineNote.textContent = "";
        doneBtn.hidden = !done;
    }

    solutionCode.textContent = task.solution;
    solutionBox.hidden = true;
    solutionBox.open = false;

    renderTaskList();
}

function selectLang(lang) {
    currentLang = lang;
    currentTask = 0;

    document.querySelectorAll(".lang-btn").forEach(function(button) {
        button.classList.toggle("active", button.dataset.lang === lang);
    });

    selectTask(0);
}

/* ─── خروجی ─── */

function printOut(text, className) {
    output.className = className || "";
    output.textContent += text + "\n";
    output.scrollTop = output.scrollHeight;
}

/* ─── اجرای JavaScript ─── */

function runJavaScript(code) {
    return new Promise(function(resolve) {
        const logs = [];

        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.sandbox = "allow-scripts";
        document.body.appendChild(iframe);

        const inner = `
            (function() {
                const send = (kind, text) => parent.postMessage(
                    { parflag: true, kind: kind, text: String(text) }, "*");

                console.log = (...args) => send("log", args.join(" "));
                console.error = (...args) => send("error", args.join(" "));
                console.warn = (...args) => send("log", args.join(" "));

                window.onerror = (msg) => { send("error", msg); return true; };

                try {
                    ${code}
                } catch (err) {
                    send("error", err && err.message ? err.message : err);
                }
                send("done", "");
            })();
        `;

        function onMessage(event) {
            if (!event.data || event.data.parflag !== true) {
                return;
            }

            if (event.data.kind === "log") {
                logs.push({ kind: "log", text: event.data.text });
            } else if (event.data.kind === "error") {
                logs.push({ kind: "error", text: event.data.text });
            } else if (event.data.kind === "done") {
                window.removeEventListener("message", onMessage);
                iframe.remove();
                resolve(logs);
            }
        }

        window.addEventListener("message", onMessage);
        iframe.srcdoc = "<script>" + inner + "<\/script>";

        // پشتیبان: اگر چیزی چاپ نشد، بعد از ۲ ثانیه جمع کن
        setTimeout(function() {
            window.removeEventListener("message", onMessage);
            iframe.remove();
            resolve(logs);
        }, 2000);
    });
}

/* ─── اجرای Python ─── */

async function loadPyodide() {
    if (pyodide) {
        return pyodide;
    }

    if (!pyodideLoading) {
        pyodideLoading = true;
        output.className = "loading-note";
        output.textContent = "⏳ اولین بار موتور پایتون دانلود می‌شود (حدود ۱۰ مگابایت)… صبور باش!";

        await new Promise(function(resolve, reject) {
            const script = document.createElement("script");
            script.src = PYODIDE_URL;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });

        pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
        });
    } else {
        // بارگذاری در جریان است
        while (!pyodide) {
            await new Promise(function(resolve) {
                setTimeout(resolve, 200);
            });
        }
    }

    return pyodide;
}

async function runPython(code) {
    try {
        const py = await loadPyodide();

        let captured = "";

        py.setStdout({ batched: function(text) { captured += text + "\n"; } });
        py.setStderr({ batched: function(text) { captured += text + "\n"; } });

        await py.runPythonAsync(code);

        output.className = captured.includes("Traceback") ? "error" : "";
        output.textContent = captured.trim() || "(بدون خروجی)";
    } catch (error) {
        output.className = "error";
        output.textContent = String(error.message || error);
    }

    engineNote.textContent = "Pyodide (WebAssembly)";
}

/* ─── اجرا ─── */

async function run() {
    const code = editor.value;

    // ذخیره‌ی پیش‌نویس
    localStorage.setItem(
        "parflag_draft_" + currentLang + "_" + currentTask, code
    );

    if (!code.trim()) {
        printOut("چیزی برای اجرا نیست — اول کد بنویس!", "info");
        return;
    }

    runBtn.disabled = true;
    runBtn.textContent = "⏳ در حال اجرا…";
    output.className = "";
    output.textContent = "";

    if (currentLang === "javascript") {
        const logs = await runJavaScript(code);

        logs.forEach(function(entry) {
            printOut(entry.text, entry.kind === "error" ? "error" : "");
        });

        if (logs.length === 0) {
            printOut("(بدون خروجی — از console.log استفاده کن)", "info");
        }

        engineNote.textContent = "موتور جاوااسکریپت مرورگر";
    } else if (currentLang === "python") {
        await runPython(code);
    }

    runBtn.disabled = false;
    runBtn.textContent = "▶️ اجرا";

    // اگر خروجی با انتظار می‌خواند، دکمه‌ی «تمامش کردم» بیاید
    const task = TASKS[currentLang][currentTask];
    const got = output.textContent.trim();

    if (got && task.expected &&
        got.includes(task.expected) && !got.includes("Traceback") &&
        !output.classList.contains("error") &&
        !got.startsWith("(بدون")) {

        if (doneBtn.hidden) {
            doneBtn.hidden = false;
            printOut("🎉 عالی! خروجی درست است. اگر مطمئنی، دکمه‌ی «تمامش کردم» را بزن.", "info");
        }
    }
}

function markDone() {
    const progress = loadProgress();
    progress[currentLang + ":" + currentTask] = true;
    saveProgress(progress);

    doneBtn.hidden = true;
    renderTaskList();
    renderProgress();
}

/* ─── رویدادها ─── */

document.querySelectorAll(".lang-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        selectLang(button.dataset.lang);
    });
});

runBtn.addEventListener("click", run);

resetBtn.addEventListener("click", function() {
    editor.value = TASKS[currentLang][currentTask].starter;
    localStorage.removeItem(
        "parflag_draft_" + currentLang + "_" + currentTask
    );
});

solutionBtn.addEventListener("click", function() {
    solutionBox.hidden = false;
    solutionBox.open = true;
});

hintBtn.addEventListener("click", function() {
    hintBox.hidden = false;
    hintBtn.hidden = true;
});

doneBtn.addEventListener("click", markDone);

// اگر کاربر کد را ویرایش کرد، پیش‌نویس ذخیره شود
editor.addEventListener("input", function() {
    localStorage.setItem(
        "parflag_draft_" + currentLang + "_" + currentTask, editor.value
    );
});

/* ─── شروع ─── */

selectLang("python");
renderProgress();
