"""بانک سؤالات آزمون تعیین سطح — ۴ زبان × ۳ سطح × ۶ سؤال.

ساختار هر سؤال:
    id       شناسه‌ی یکتا
    text     متن سؤال (فارسی)
    code     (اختیاری) کد برای نمایش
    options  چهار گزینه
    answer   اندیس گزینه‌ی درست (بدون ارسال به کلاینت)
"""

BANK = {
    "python": {
        "easy": [
            {
                "id": "py-e1",
                "text": "خروجی این کد چیست؟",
                "code": "print(2 + 3)",
                "options": ["۵", "۲۳", "۲+۳", "خطا"],
                "answer": 0
            },
            {
                "id": "py-e2",
                "text": "کدام نام برای متغیر درست (قانونی) است؟",
                "options": ["2cool", "my-age", "my_age", "class"],
                "answer": 2
            },
            {
                "id": "py-e3",
                "text": "خروجی این کد چیست؟",
                "code": 'print("سلام" * 2)',
                "options": ["سلام", "سلامسلام", "خطا", "سلام 2"],
                "answer": 1
            },
            {
                "id": "py-e4",
                "text": 'نوع داده‌ی مقدار "3.14" (داخل گیومه) چیست؟',
                "options": ["عدد اعشاری (float)", "رشته (str)", "عدد صحیح (int)", "منطقی (bool)"],
                "answer": 1
            },
            {
                "id": "py-e5",
                "text": "خروجی این کد چیست؟",
                "code": "print(10 // 3)",
                "options": ["۳.۳۳", "۳", "۱", "۴"],
                "answer": 1
            },
            {
                "id": "py-e6",
                "text": "در پایتون با کدام تابع چیزی را چاپ می‌کنیم؟",
                "options": ["echo()", "write()", "print()", "show()"],
                "answer": 2
            }
        ],
        "medium": [
            {
                "id": "py-m1",
                "text": "خروجی این کد چیست؟",
                "code": 'x = "5"\nprint(x * 3)',
                "options": ["۱۵", "۵۵۵", "خطا", "۵ ۵ ۵"],
                "answer": 1
            },
            {
                "id": "py-m2",
                "text": "خروجی این کد چیست؟",
                "code": 'print(len("code"))',
                "options": ["۳", "۵", "۴", "خطا"],
                "answer": 2
            },
            {
                "id": "py-m3",
                "text": "خروجی این کد چیست؟",
                "code": "for i in range(3):\n    print(i)",
                "options": ["۱ ۲ ۳", "۰ ۱ ۲", "۰ ۱ ۲ ۳", "۳ بار ۳"],
                "answer": 1
            },
            {
                "id": "py-m4",
                "text": "کدام ساخت لیست درست است؟",
                "options": ["nums = (1, 2, 3)", "nums = [1, 2, 3]", "nums = {1, 2, 3}", "nums = list{1,2,3}"],
                "answer": 1
            },
            {
                "id": "py-m5",
                "text": "خروجی این کد چیست؟",
                "code": "print(7 % 3)",
                "options": ["۲", "۲.۳۳", "۱", "۰"],
                "answer": 2
            },
            {
                "id": "py-m6",
                "text": 'کدام رشته‌ی "8" را به عدد صحیح تبدیل می‌کند؟',
                "options": ["int(\"8\")", "str(\"8\")", "number(\"8\")", "float->int(\"8\")"],
                "answer": 0
            }
        ],
        "hard": [
            {
                "id": "py-h1",
                "text": "خروجی این کد چیست؟",
                "code": "a = [1, 2, 3]\na.append(4)\nprint(len(a))",
                "options": ["۳", "۴", "خطا", "۷"],
                "answer": 1
            },
            {
                "id": "py-h2",
                "text": "خروجی این کد چیست؟",
                "code": "def f(x):\n    return x * x\n\nprint(f(3) + f(2))",
                "options": ["۱۰", "۱۳", "۲۵", "۱۲"],
                "answer": 1
            },
            {
                "id": "py-h3",
                "text": "خروجی این کد چیست؟",
                "code": 'd = {"a": 1, "b": 2}\nd["a"] = 5\nprint(d["a"] + d["b"])',
                "options": ["۳", "۶", "۷", "خطا"],
                "answer": 2
            },
            {
                "id": "py-h4",
                "text": "خروجی این کد چیست؟",
                "code": 's = "abcde"\nprint(s[1:4])',
                "options": ["abcd", "bcde", "bcd", "abc"],
                "answer": 2
            },
            {
                "id": "py-h5",
                "text": "خروجی این کد چیست؟",
                "code": "total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)",
                "options": ["۴", "۵", "۱۰", "۱۵"],
                "answer": 2
            },
            {
                "id": "py-h6",
                "text": "خروجی این کد چیست؟",
                "code": "nums = [4, 8, 15]\nprint(max(nums) - min(nums))",
                "options": ["۴", "۱۱", "۱۹", "۱۵"],
                "answer": 1
            }
        ]
    },

    "javascript": {
        "easy": [
            {
                "id": "js-e1",
                "text": "خروجی این کد چیست؟",
                "code": "console.log(2 + 2)",
                "options": ["۲", "۴", "۲۲", "خطا"],
                "answer": 1
            },
            {
                "id": "js-e2",
                "text": "کدام کلمه برای ساختن متغیری که عوض نمی‌شود؟",
                "options": ["let", "var", "const", "fixed"],
                "answer": 2
            },
            {
                "id": "js-e3",
                "text": "خروجی این کد چیست؟",
                "code": 'console.log("سلام" + " " + "دنیا")',
                "options": ["سلامدنیا", "سلام دنیا", "خطا", "سلام + دنیا"],
                "answer": 1
            },
            {
                "id": "js-e4",
                "text": "خروجی این کد چیست؟",
                "code": "console.log(typeof 5)",
                "options": ["\"number\"", "\"string\"", "\"int\"", "\"digit\""],
                "answer": 0
            },
            {
                "id": "js-e5",
                "text": "علامت کامنت (توضیح) یک‌خطی در جاوااسکریپت کدام است؟",
                "options": ["<!-- -->", "#", "/* فقط چندخطی */", "//"],
                "answer": 3
            },
            {
                "id": "js-e6",
                "text": "خروجی این کد چیست؟",
                "code": "console.log(10 % 4)",
                "options": ["۲", "۲.۵", "۰", "۱"],
                "answer": 0
            }
        ],
        "medium": [
            {
                "id": "js-m1",
                "text": "خروجی این کد چیست؟",
                "code": 'let x = "3";\nconsole.log(x + 2)',
                "options": ["۵", "۳۲", "خطا", "۲۳"],
                "answer": 1
            },
            {
                "id": "js-m2",
                "text": "خروجی این کد چیست؟",
                "code": "console.log([1, 2, 3].length)",
                "options": ["۲", "۳", "۴", "undefined"],
                "answer": 1
            },
            {
                "id": "js-m3",
                "text": "کدام حلقه ۵ بار (۰ تا ۴) اجرا می‌شود؟",
                "options": [
                    "for (let i = 0; i <= 5; i++)",
                    "for (let i = 1; i < 5; i++)",
                    "for (let i = 0; i < 5; i++)",
                    "for (let i = 0; i < 4; i++)"
                ],
                "answer": 2
            },
            {
                "id": "js-m4",
                "text": "خروجی این کد چیست؟",
                "code": "console.log(2 ** 3)",
                "options": ["۶", "۸", "۹", "۵"],
                "answer": 1
            },
            {
                "id": "js-m5",
                "text": "خروجی این کد چیست؟",
                "code": "let a = [10, 20, 30];\nconsole.log(a[1])",
                "options": ["۱۰", "۲۰", "۳۰", "۱"],
                "answer": 1
            },
            {
                "id": "js-m6",
                "text": "کدام متد یک عضو به آخر آرایه اضافه می‌کند؟",
                "options": ["add()", "append()", "push()", "insert()"],
                "answer": 2
            }
        ],
        "hard": [
            {
                "id": "js-h1",
                "text": "خروجی این کد چیست؟",
                "code": "function f(x) { return x * 2; }\nconsole.log(f(f(3)))",
                "options": ["۹", "۱۲", "۶", "۸"],
                "answer": 1
            },
            {
                "id": "js-h2",
                "text": "خروجی این کد چیست؟",
                "code": 'let s = "hello";\nconsole.log(s.toUpperCase())',
                "options": ["hello", "Hello", "HELLO", "خطا"],
                "answer": 2
            },
            {
                "id": "js-h3",
                "text": "خروجی این کد چیست؟",
                "code": 'let o = { name: "ali", age: 20 };\nconsole.log(o.age + 5)',
                "options": ["۲۰۲۵", "۲۵", "NaN", "خطا"],
                "answer": 1
            },
            {
                "id": "js-h4",
                "text": "خروجی این کد چیست؟",
                "code": "let arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length)",
                "options": ["۳", "۴", "۵", "خطا"],
                "answer": 1
            },
            {
                "id": "js-h5",
                "text": "خروجی این کد چیست؟",
                "code": 'console.log(5 === "5")',
                "options": ["true", "false", "خطا", "undefined"],
                "answer": 1
            },
            {
                "id": "js-h6",
                "text": "خروجی این کد چیست؟",
                "code": "let n = 0;\nwhile (n < 3) { n = n + 1; }\nconsole.log(n)",
                "options": ["۲", "۳", "۴", "بی‌نهایت"],
                "answer": 1
            }
        ]
    },

    "cpp": {
        "easy": [
            {
                "id": "cpp-e1",
                "text": "خروجی این دستور چیست؟",
                "code": "cout << 2 + 3;",
                "options": ["۵", "۲۳", "۲+۳", "خطای کامپایل"],
                "answer": 0
            },
            {
                "id": "cpp-e2",
                "text": "برای ورودی/خروجی کدام کتابخانه را include می‌کنیم؟",
                "options": ["#include <string>", "#include <math>", "#include <iostream>", "#include <output>"],
                "answer": 2
            },
            {
                "id": "cpp-e3",
                "text": "اجرای برنامه‌ی ++C از کجا شروع می‌شود؟",
                "options": ["از start()", "از int main()", "از اولین خط فایل", "از begin()"],
                "answer": 1
            },
            {
                "id": "cpp-e4",
                "text": "کدام تعریف متغیر صحیح درست است؟",
                "options": ["int x = 5;", "integer x = 5;", "x int = 5;", "num x := 5;"],
                "answer": 0
            },
            {
                "id": "cpp-e5",
                "text": "خروجی این کد چیست؟",
                "code": "cout << 10 / 3;",
                "options": ["۳.۳۳", "۳", "۱", "۴"],
                "answer": 1
            },
            {
                "id": "cpp-e6",
                "text": "کدام علامت کامنت یک‌خطی است؟",
                "options": ["#", "//", "<!-- -->", "**"],
                "answer": 1
            }
        ],
        "medium": [
            {
                "id": "cpp-m1",
                "text": "خروجی این کد چیست؟",
                "code": "int a = 7, b = 2;\ncout << a % b;",
                "options": ["۳.۵", "۱", "۳", "۰"],
                "answer": 1
            },
            {
                "id": "cpp-m2",
                "text": "این حلقه چند بار تکرار می‌شود؟",
                "code": "for (int i = 0; i < 3; i++) { ... }",
                "options": ["۲ بار", "۳ بار", "۴ بار", "بی‌نهایت"],
                "answer": 1
            },
            {
                "id": "cpp-m3",
                "text": "خروجی این کد چیست؟",
                "code": "double x = 5;\ncout << x / 2;",
                "options": ["۲", "۲.۵", "۳", "۲.۵۰"],
                "answer": 1
            },
            {
                "id": "cpp-m4",
                "text": "خروجی این کد چیست؟",
                "code": 'cout << "ab" << "cd";',
                "options": ["ab cd", "abcd", "ab\ncd", "خطا"],
                "answer": 1
            },
            {
                "id": "cpp-m5",
                "text": "کار <code>endl</code> چیست؟",
                "options": ["پایان برنامه", "رفتن به خط جدید", "پاک کردن صفحه", "کاهش سرعت"],
                "answer": 1
            },
            {
                "id": "cpp-m6",
                "text": "خروجی این کد چیست؟",
                "code": "int arr[3] = {1, 2, 3};\ncout << arr[2];",
                "options": ["۱", "۲", "۳", "خطا"],
                "answer": 2
            }
        ],
        "hard": [
            {
                "id": "cpp-h1",
                "text": "خروجی این کد چیست؟",
                "code": "int x = 5;\nx += 3;\ncout << x;",
                "options": ["۵", "۳", "۸", "۵۳"],
                "answer": 2
            },
            {
                "id": "cpp-h2",
                "text": "خروجی این کد چیست؟",
                "code": "int f(int n) { return n * n; }\ncout << f(4);",
                "options": ["۸", "۱۶", "۴", "۱۲"],
                "answer": 1
            },
            {
                "id": "cpp-h3",
                "text": "خروجی این کد چیست؟",
                "code": "for (int i = 2; i <= 6; i += 2) cout << i;",
                "options": ["۲۴۶", "۲ ۴ ۶", "۲۳۴۵۶", "۲۶"],
                "answer": 0
            },
            {
                "id": "cpp-h4",
                "text": "خروجی این کد چیست؟",
                "code": 'string s = "abcd";\ncout << s.length();',
                "options": ["۳", "۴", "۵", "abcd"],
                "answer": 1
            },
            {
                "id": "cpp-h5",
                "text": "خروجی این کد چیست؟",
                "code": "int a = 3;\nint b = a++ + 1;\ncout << b;",
                "options": ["۳", "۴", "۵", "۷"],
                "answer": 1
            },
            {
                "id": "cpp-h6",
                "text": "خروجی این کد چیست؟",
                "code": "int sum = 0;\nfor (int i = 1; i <= 3; i++) sum += i;\ncout << sum;",
                "options": ["۳", "۵", "۶", "۱۰"],
                "answer": 2
            }
        ]
    },

    "java": {
        "easy": [
            {
                "id": "java-e1",
                "text": "برنامه‌ی جاوا از کدام متد شروع می‌شود؟",
                "options": ["public static void main(String[] args)", "void start()", "function main()", "init()"],
                "answer": 0
            },
            {
                "id": "java-e2",
                "text": "خروجی این کد چیست؟",
                "code": "System.out.println(2 + 3);",
                "options": ["۲۳", "۵", "۲+۳", "خطا"],
                "answer": 1
            },
            {
                "id": "java-e3",
                "text": "کدام تعریف رشته درست است؟",
                "options": ["str s = \"hi\";", "String s = \"hi\";", "string s = 'hi';", "text s = \"hi\";"],
                "answer": 1
            },
            {
                "id": "java-e4",
                "text": "خروجی این کد چیست؟",
                "code": "System.out.println(10 % 3);",
                "options": ["۳", "۳.۳۳", "۱", "۰"],
                "answer": 2
            },
            {
                "id": "java-e5",
                "text": "کدام علامت کامنت یک‌خطی است؟",
                "options": ["#", "//", "<!-- -->", "--"],
                "answer": 1
            },
            {
                "id": "java-e6",
                "text": "کلاس public باید در فایلی با چه نامی ذخیره شود؟",
                "options": ["هر نامی", "هم‌نام کلاس (مثل Main.java)", "همیشه main.java", "code.java"],
                "answer": 1
            }
        ],
        "medium": [
            {
                "id": "java-m1",
                "text": "خروجی این کد چیست؟",
                "code": "int a = 7;\na += 2;\nSystem.out.println(a);",
                "options": ["۷", "۲", "۹", "۷۲"],
                "answer": 2
            },
            {
                "id": "java-m2",
                "text": "خروجی این کد چیست؟",
                "code": 'String s = "java";\nSystem.out.println(s.length());',
                "options": ["۳", "۴", "۵", "java"],
                "answer": 1
            },
            {
                "id": "java-m3",
                "text": "خروجی این کد چیست؟",
                "code": "int[] arr = {5, 10, 15};\nSystem.out.println(arr[1]);",
                "options": ["۵", "۱۰", "۱۵", "۱"],
                "answer": 1
            },
            {
                "id": "java-m4",
                "text": "خروجی این کد چیست؟",
                "code": "for (int i = 0; i < 2; i++) System.out.print(i);",
                "options": ["۰۱۲", "۰۱", "۱۲", "۰ ۱"],
                "answer": 1
            },
            {
                "id": "java-m5",
                "text": "خروجی این کد چیست؟",
                "code": "double x = 5;\nSystem.out.println(x / 2);",
                "options": ["۲", "۲.۵", "۳", "۲.۵۰"],
                "answer": 1
            },
            {
                "id": "java-m6",
                "text": "کدام دستور بدون رفتن به خط جدید چاپ می‌کند؟",
                "options": ["System.out.println", "System.out.print", "System.println", "System.write"],
                "answer": 1
            }
        ],
        "hard": [
            {
                "id": "java-h1",
                "text": "خروجی این کد چیست؟",
                "code": "int x = 4;\nint y = x * x;\nSystem.out.println(y - 6);",
                "options": ["۱۰", "۱۰۶", "۱۶", "۴"],
                "answer": 0
            },
            {
                "id": "java-h2",
                "text": "خروجی این کد چیست؟",
                "code": "static int f(int n) { return n + 100; }\nSystem.out.println(f(5));",
                "options": ["۵", "۱۰۰", "۱۰۵", "۵۰۵"],
                "answer": 2
            },
            {
                "id": "java-h3",
                "text": "خروجی این کد چیست؟",
                "code": 'String s = "abc";\ns = s + "de";\nSystem.out.println(s.length());',
                "options": ["۳", "۴", "۵", "abcde"],
                "answer": 2
            },
            {
                "id": "java-h4",
                "text": "خروجی این کد چیست؟",
                "code": "int sum = 0;\nfor (int i = 2; i <= 4; i++) sum += i;\nSystem.out.println(sum);",
                "options": ["۶", "۷", "۹", "۱۰"],
                "answer": 2
            },
            {
                "id": "java-h5",
                "text": "خروجی این کد چیست؟",
                "code": "System.out.println(5 == 5.0);",
                "options": ["true", "false", "خطای کامپایل", "۵.۰"],
                "answer": 0
            },
            {
                "id": "java-h6",
                "text": "خروجی این کد چیست؟",
                "code": "int n = 10;\nwhile (n > 7) { n--; }\nSystem.out.println(n);",
                "options": ["۸", "۷", "۶", "۱۰"],
                "answer": 1
            }
        ]
    }
}

LANG_NAMES = {
    "python": "Python",
    "javascript": "JavaScript",
    "cpp": "C++",
    "java": "Java"
}
