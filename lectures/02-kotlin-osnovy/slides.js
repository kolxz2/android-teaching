const CODE_RESULTS = {
  "Точка входа main": "**Вывод:**\n```text\nHello, Kotlin!\n```",
  "Структура Kotlin-файла": "**Вывод:** `10`. Сначала подключается `abs`, затем `main` вызывает `abs(-10)`.",
  "val и var": "**Результат:** `completedLessons` станет равен `2`. Попытка присвоить новое значение `course` не скомпилируется.",
  "Свойство val со стороны Java": "**Результат:** объект предоставляет `getName()`. Метода `setName(...)` нет, поэтому заменить `name` снаружи нельзя.",
  "var с private set со стороны Java": "**Результат:** прочитать `name` можно через публичный getter. Вызвать setter можно только из кода самого класса `User`.",
  "val не делает объект неизменяемым": "**Результат:** список станет `[1, 2, 3, 4]`. Заменить ссылку `numbers` другим списком нельзя.",
  "Kotlin определяет тип один раз": "**Результат:** `topic` можно заменить другой строкой. Присваивание числа `42` даст ошибку типов ещё до запуска.",
  "Boolean и логические операции": "**Результат при `age = 20`:** `isAdult = true`, `canEnter = true`, `needsHelp = false`.",
  "Char и String": "**Результат:** `first` содержит символ `'K'`, `length` содержит число `6`.",
  "Шаблоны строк": "**Вывод:**\n- `Маша: 8 баллов`\n- `Следующий балл: 9`",
  "Многострочные строки": "**Значение `message`:** две строки: `Имя: Маша` и `Курс: Kotlin`. Общий отступ удалит `trimIndent()`.",
  "Арифметика и остаток": "**Результат:** `sum = 10`, `quotient = 2`, `exact ≈ 2.333`, `remainder = 1`.",
  "Сравнение значений и ссылок": "**Результат:** `a == b` сравнивает текст и возвращает `true`. `a === b` проверяет, являются ли значения одним объектом, поэтому полагаться на конкретный ответ здесь нельзя.",
  "Разминка: типы": "**После вычисления:** `a = 2`, `b = 2.5`, `c = \"5 + 2 = 7\"`, `d = true`.",
  "Nullable и non-null типы": "**Результат:** `title` всегда содержит строку, `subtitle` может содержать строку или `null`. Строка `title = null` не скомпилируется.",
  "Проверка на null и smart cast": "**Результат:** для строки функция напечатает её длину. Для `null` тело `if` не выполнится.",
  "Безопасный вызов ?. ": "**Результат:** `length` получит `null`. Если `comment` содержит строку, `length` получит количество её символов.",
  "Оператор Элвиса ?: ": "**Результат:** при `null` переменная `displayName` получит `\"Гость\"`, а `length` получит `0`.",
  "Ранний выход через ?: ": "**Результат:** при `id = null` функция сразу завершится. Для непустого `id` она напечатает `User: значение`.",
  "Оператор !!": "**Результат:** для строки вычислится длина. Для `null` программа получит `NullPointerException`.",
  "Null safety: исправление": "**Результат текущего кода:** имя переводится в верхний регистр, но `null` приводит к `NullPointerException`. В решении `null` превращается в `\"Гость\"`.",
  "if как выражение": "**Результат:** при `age >= 18` переменная `access` получит `\"разрешён\"`, иначе `\"запрещён\"`.",
  "Условия читаются сверху вниз": "**Результат:** `score = 95` даёт `A`, `score = 80` даёт `B`, `score = 60` даёт `C`.",
  "when по значению": "**Результат:** код `200` превращается в `OK`, `400` в `Bad Request`, `404` в `Not Found`, остальные значения в `Unknown`.",
  "Несколько вариантов и диапазон": "**Результат:** переменная `message` получит подпись диапазона, в который входит `score`. Значение вне `0..10` даст `\"Ошибка\"`.",
  "when без аргумента": "**Результат:** проверяется первое истинное условие. Например, `temperature = 10` даёт `\"прохладно\"`.",
  "Диапазоны": "**Результат:** созданы четыре последовательности. Они пока не печатаются, но их можно перебрать циклом `for`.",
  "while и do-while": "**Результат:** первый цикл увеличит `attempts` до `3`. Второй попросит ввод минимум один раз и повторится, пока строка пустая.",
  "Объявление функции": "**Результат:** функция объявлена, но ещё не выполнена. Вызов `calculateTotal(100, 3)` вернёт `300`.",
  "Функция-выражение": "**Результат:** работает так же, как предыдущая функция. `calculateTotal(100, 3)` вернёт `300`.",
  "Именованные аргументы": "**Результат:** `createUser` получает `name = \"Лена\"`, `age = 20`, `active = true`. Имена показывают смысл каждого аргумента.",
  "Значения параметров по умолчанию": "**Результат:** первый вызов вернёт `\"Привет, Ира!\"`, второй — `\"Добрый день, Ира!\"`.",
  "Чистая функция": "**Результат:** `finalPrice(1000, 150)` всегда возвращает `850` и не меняет внешние данные.",
  "Класс и экземпляр": "**Результат:** создаются два разных объекта `User`. У первого `name = \"Аня\"`, у второго `name = \"Борис\"`.",
  "Основной конструктор": "**Результат:** вызов `Account(1, \"Аня\", 1000)` создаст счёт с тремя свойствами. Изменять разрешено только `balance`.",
  "init-блок": "**Результат:** неотрицательный баланс создаёт объект. Отрицательный баланс приводит к `IllegalArgumentException`.",
  "Методы": "**Результат:** `deposit(500)` увеличит баланс на `500`. Ноль и отрицательная сумма не пройдут проверку `require`.",
  "Геттер и сеттер": "**Результат:** при присваивании имя очищается через `trim()`. Свойство `initials` каждый раз возвращает первый символ имени.",
  "Инкапсуляция": "**Результат:** корректное списание уменьшает баланс и возвращает `true`. Некорректное оставляет баланс прежним и возвращает `false`.",
  "Классы final по умолчанию": "**Результат:** `Income` может наследовать `Operation`, потому что родитель явно помечен `open`.",
  "Переопределение": "**Результат:** `Operation().sign()` вернёт `1`, а `Expense().sign()` вернёт `-1`.",
  "Абстрактный класс": "**Результат:** `Income(500).apply(1000)` вернёт `1500`. Создать `Operation(...)` напрямую нельзя.",
  "Интерфейс": "**Результат:** объект `Receipt(500)` обязан реализовать `format()` и возвращает строку `\"Итого: 500\"`.",
  "Полиморфизм": "**Вывод:** `Итого: 500`. Функция знает только интерфейс `Printable`, а реализацию выбирает объект `Receipt`.",
  "data class": "**Результат:** компилятор создаст сравнение по значениям, читаемый `toString()`, деструктуризацию и функцию `copy()`.",
  "copy и деструктуризация": "**Результат:** `edited` получит комментарий `\"Кофе\"`, а `original` останется без комментария. Затем свойства раскладываются в три переменные.",
  "enum class": "**Результат:** тип `TransactionType` допускает только два объявленных значения: `INCOME` и `EXPENSE`.",
  "sealed interface": "**Результат:** операция может завершиться одним из трёх известных вариантов, причём каждый вариант хранит подходящие ему данные.",
  "Исчерпывающий when": "**Результат:** `Success` покажет номер чека, `Error` покажет сообщение, `Cancelled` даст `\"Отменено\"`.",
  "object и companion object": "**Результат:** `IdGenerator.nextId()` возвращает новый id при каждом вызове. `Account.MAX_NAME_LENGTH` доступен через имя класса.",
  "FizzBuzz": "**Результат решения:** числа, кратные 15, дают `FizzBuzz`; кратные 3 дают `Fizz`; кратные 5 дают `Buzz`; остальные печатаются как числа.",
  "Модель счёта": "**Результат решения:** объект создаётся только с неотрицательным балансом. Пополнение меняет баланс внутри класса, а внешний код не может присвоить его напрямую.",
  "Финальная модель": "**Результат решения:** положительная сумма даёт `AddResult.Success`, нулевая или отрицательная сумма даёт `AddResult.Error`.",
  "Домашнее задание": "**Результат работы:** консольная программа создаёт операции, проверяет суммы, безопасно обрабатывает комментарии и печатает историю.",
  "Чек-лист перед PR": "**Результат проверки:** готовый PR компилируется, не содержит `!!` и сохраняет правила модели внутри классов."
};

// Короткие результаты, которые показываются внутри блока кода как `// ...`.
const EXACT_CODE_RESULTS = {
  "Точка входа main": "Hello, Kotlin!",
  "Структура Kotlin-файла": "10",
  "val и var": "completedLessons == 2; присваивание course = \"iOS\" не компилируется",
  "Свойство val со стороны Java": "user.getName() == \"Alex\"; метода setName(...) нет",
  "var с private set со стороны Java": "user.getName() == \"Alex\"; setName(...) доступен только внутри User",
  "val не делает объект неизменяемым": "numbers == [1, 2, 3, 4]; заменить ссылку numbers нельзя",
  "Kotlin определяет тип один раз": "topic == \"Android\"; присваивание topic = 42 не компилируется",
  "Boolean и логические операции": "при age = 20: isAdult == true, canEnter == true, needsHelp == false",
  "Char и String": "first == 'K'; length == 6",
  "Шаблоны строк": "Маша: 8 баллов; Следующий балл: 9",
  "Многострочные строки": "Имя: Маша; Курс: Kotlin",
  "Арифметика и остаток": "",
  "Сравнение значений и ссылок": "a == b возвращает true; a === b проверяет, один ли это объект",
  "Разминка: типы": "a == 2; b == 2.5; c == \"5 + 2 = 7\"; d == true",
  "Nullable и non-null типы": "title == \"Kotlin\"; subtitle == null; title = null не компилируется",
  "Проверка на null и smart cast": "printLength(\"Kotlin\") печатает 6; printLength(null) ничего не печатает",
  "Безопасный вызов ?. ": "length == null",
  "Оператор Элвиса ?: ": "при userName = null: displayName == \"Гость\"; length == 0",
  "Ранний выход через ?: ": "printUser(null) сразу завершится; printUser(\"42\") напечатает User: 42",
  "Оператор !!": "для строки получится её длина; для null произойдёт NullPointerException",
  "Null safety: исправление": "greeting(\"аня\") == \"Привет, АНЯ\"; greeting(null) == \"Привет, Гость\"",
  "if как выражение": "при age = 20: access == \"разрешён\"; при age = 16: access == \"запрещён\"",
  "Условия читаются сверху вниз": "score = 95 даёт A; score = 80 даёт B; score = 60 даёт C",
  "when по значению": "200 даёт OK; 400 даёт Bad Request; 404 даёт Not Found; 500 даёт Unknown",
  "Несколько вариантов и диапазон": "0 даёт Нет результата; 2 даёт Начало; 6 даёт Хорошо; 9 даёт Отлично",
  "when без аргумента": "temperature = -5 даёт мороз; 10 даёт прохладно; 20 даёт тепло",
  "Диапазоны": "",
  "Цикл while: счётчик попыток": "",
  "Цикл do-while: проверка ввода": "",
  "Объявление функции": "calculateTotal(100, 3) == 300",
  "Функция-выражение": "calculateTotal(100, 3) == 300",
  "Именованные аргументы": "name == \"Лена\"; age == 20; active == true",
  "Значения параметров по умолчанию": "greeting(\"Ира\") == \"Привет, Ира!\"; второй вызов == \"Добрый день, Ира!\"",
  "Чистая функция": "finalPrice(1000, 150) == 850",
  "Класс и экземпляр": "first.name == \"Аня\"; second.name == \"Борис\"; first !== second",
  "Основной конструктор": "Account(1, \"Аня\", 1000).balance == 1000",
  "init-блок": "Account(1, 100) создастся; Account(1, -100) даст IllegalArgumentException",
  "Методы": "при balance = 1000 вызов deposit(500) делает balance == 1500",
  "Геттер и сеттер": "после person.name = \"  Alex  \" значение name == \"Alex\"; initials == 'A'",
  "Инкапсуляция": "withdraw(300) при balance = 1000 вернёт true и оставит balance == 700",
  "Классы final по умолчанию": "Income(500).amount == 500; без open наследование не скомпилируется",
  "Переопределение": "Operation().sign() == 1; Expense().sign() == -1",
  "Абстрактный класс": "Income(500).apply(1000) == 1500; Operation создать нельзя",
  "Интерфейс": "Receipt(500).format() == \"Итого: 500\"",
  "Полиморфизм": "printItem(Receipt(500)) печатает Итого: 500",
  "data class": "",
  "copy и деструктуризация": "edited.comment == \"Кофе\"; original.comment == null; id == 1; amount == 500",
  "enum class": "",
  "sealed interface": "",
  "Исчерпывающий when": "Success(\"42\") даёт Чек 42; Error(\"Сбой\") даёт Сбой; Cancelled даёт Отменено",
  "object и companion object": "первые вызовы nextId() возвращают 1 и 2; Account.MAX_NAME_LENGTH == 50",
  "FizzBuzz": "15 печатает FizzBuzz; 9 печатает Fizz; 10 печатает Buzz; 7 печатает 7",
  "Модель счёта": "deposit(500) увеличивает balance на 500; отрицательный initialBalance запрещён",
  "Финальная модель": "amount > 0 даёт AddResult.Success; amount <= 0 даёт AddResult.Error"
};

function asCodeComments(markdown) {
  const plain = markdown
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\n-\s*/g, "; ")
    .replace(/\n+/g, " ")
    .replace(/:\s*;\s*/g, ": ")
    .trim();
  const words = plain.split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    if (line && `${line} ${word}`.length > 76) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  });
  if (line) lines.push(line);
  return lines.map((value) => `// ${value}`).join("\n");
}

function annotateLastCodeBlock(markdown, explanation) {
  if (!markdown || !/```[a-z]*\n/.test(markdown)) return markdown;
  const blocks = [...markdown.matchAll(/```[a-z]*\n[\s\S]*?\n```/g)];
  const last = blocks.at(-1);
  if (!last) return markdown;
  const closingOffset = last[0].lastIndexOf("\n```");
  const insertAt = last.index + closingOffset;
  const comments = asCodeComments(explanation);
  return `${markdown.slice(0, insertAt)}\n\n${comments}${markdown.slice(insertAt)}`;
}

window.DECK = {
  course: "Android-разработка",
  lecture: 2,
  lectureId: "02",
  slug: "02-kotlin-osnovy",
  title: "Kotlin: основы языка и коллекции",
  block: "Язык",
  teacher: "Сучёв Николай Евгеньевич",
  teacherMeta: "Android-разработчик · Т-Банк · команда Вовлечение",
  hub: "../../index.html",
  photo: "../../assets/teacher.jpg",
  slides: [
    { type: "title", title: "Android-разработка", subtitle: "Лекция 2. Kotlin: основы языка и коллекции", kicker: "02 / 15", body: "- 80 слайдов · 90 минут\n- От базового синтаксиса к обработке наборов данных\n- Лекция без Android UI\n- Ветка: `lecture-02`", notes: "Спросить, кто уже писал на Java, Python, C# или Kotlin. Объяснить: сегодня важнее научиться читать Kotlin, чем запомнить все ключевые слова." },
    { type: "content", title: "Результат занятия", body: "- Объявлять значения и выбирать подходящие типы\n- Писать условия, циклы и функции\n- Безопасно обрабатывать отсутствие значения\n- Выбирать List, Set или Map\n- Преобразовывать и искать данные в коллекциях", notes: "Это критерии успеха. В конце вернуться к ним и попросить студентов оценить себя." },
    { type: "content", title: "Маршрут лекции", layout: "roadmap", body: "1. Синтаксис\n2. Типы и null\n3. Управление потоком\n4. Функции\n5. Коллекции", notes: "Пять крупных частей. После третьей части полезна короткая пауза или вопрос группе." },
    { type: "content", title: "Официальная документация", body: "- [Базовый синтаксис Kotlin](https://kotlinlang.org/docs/basic-syntax.html)\n- [Kotlin в Android](https://developer.android.com/kotlin/overview)\n- [Соглашения по оформлению](https://kotlinlang.org/docs/coding-conventions.html)\n- Документация входит в навык разработчика: ищем по задаче, не учим справочник наизусть", notes: "Все ссылки в презентации кликабельны. Основной источник — kotlinlang.org, для Android-контекста — developer.android.com." },

    { type: "section", title: "Kotlin и первая программа", subtitle: "Как устроен файл и откуда начинается выполнение", outcome: "Студент запускает main и узнаёт базовые элементы файла." },
    { type: "content", title: "Почему Kotlin в Android", body: "- Статически типизированный язык\n- Поддерживает объектный и функциональный стиль\n- Совместим с Java-кодом на JVM\n- Google рекомендует Kotlin для нового Android-кода\n- [Официальный обзор Kotlin для Android](https://developer.android.com/kotlin/overview)", notes: "Не уходить в историю языка. Связать выбор Kotlin с будущими Android API и Jetpack." },
    { type: "content", title: "Где выполняется Kotlin-код", body: "```kotlin\nИсходник.kt\n    ↓ компилятор\nJVM bytecode\n    ↓\nJVM или Android Runtime\n```\nНа лекции запускаем обычный Kotlin/JVM-код. Android API пока не нужен.", notes: "Подчеркнуть: язык и Android SDK — разные уровни. Сначала учим язык." },
    { type: "content", title: "Точка входа main", body: "```kotlin\nfun main() {\n    println(\"Hello, Kotlin!\")\n}\n```\n`fun` объявляет функцию. Фигурные скобки ограничивают её тело. [Basic syntax](https://kotlinlang.org/docs/basic-syntax.html#program-entry-point)", notes: "Запустить пример в scratch-файле или Kotlin Playground." },
    { type: "content", title: "Вывод и чтение", body: "```kotlin\nfun main() {\n    print(\"Ваше имя: \" )\n    val name = readln()\n    println(\"Привет, $name!\")\n}\n```\n`print` не переносит строку, `println` переносит, `readln` возвращает `String`.", notes: "Показать живой запуск. Спросить, какой тип у name." },
    { type: "content", title: "Структура Kotlin-файла", body: "```kotlin\npackage course.kotlin\n\nimport kotlin.math.abs\n\nconst val COURSE = \"Android\"\n\nfun main() {\n    println(abs(-10))\n}\n```\nПорядок: пакет, импорты, объявления верхнего уровня.", notes: "В Kotlin функция не обязана жить внутри класса. Ссылка: https://kotlinlang.org/docs/packages.html" },
    { type: "content", title: "Комментарии", body: "```kotlin\n// Однострочный комментарий\n\n/* Блочный комментарий\n   может содержать /* вложенный */ блок */\n\n/** KDoc для публичного API */\nfun calculate() = 42\n```\nКомментарии объясняют причину решения, а не пересказывают код.", notes: "Ссылка: https://kotlinlang.org/docs/kotlin-doc.html" },

    { type: "section", title: "Значения, переменные и типы", subtitle: "Что хранит программа и что проверяет компилятор", outcome: "Студент выбирает val по умолчанию и понимает вывод типов." },
    { type: "content", title: "val и var", body: "```kotlin\nval course = \"Android\"\nvar completedLessons = 1\n\ncompletedLessons = 2   // можно\n// course = \"iOS\"    // нельзя\n```\n`val` запрещает повторное присваивание. `var` разрешает присвоить новое значение.", notes: "На этом слайде говорим только о результате для программиста. На следующих двух показываем, как свойства представлены для Java и JVM. Локальные переменные не имеют getter и setter." },
    { type: "content", layout: "editorial", title: "Свойство val со стороны Java", body: "```kotlin\nclass User {\n    val name = \"Alex\"\n}\n```\nПримерное представление после компиляции:\n```java\npublic final class User {\n    private final String name = \"Alex\";\n\n    public final String getName() {\n        return name;\n    }\n}\n```", notes: "Это упрощённый Java-эквивалент, а не буквальный исходник декомпилятора. Для обычного свойства с backing field: val даёт private-поле и getter, но setter отсутствует. Официальная документация: https://kotlinlang.org/docs/java-to-kotlin-interop.html#properties и https://kotlinlang.org/docs/properties.html" },
    { type: "content", layout: "editorial", title: "var с private set со стороны Java", body: "```kotlin\nclass User {\n    var name = \"Alex\"\n        private set\n}\n```\nУпрощённый Java-эквивалент:\n```java\npublic final class User {\n    private String name = \"Alex\";\n\n    public final String getName() { return name; }\n    private final void setName(String value) { name = value; }\n}\n```", notes: "Именно здесь существует setter с ограниченной видимостью. В реальном JVM bytecode детали и имена могут отличаться. Официальная документация: https://kotlinlang.org/docs/properties.html#getters-and-setters и https://kotlinlang.org/docs/java-to-kotlin-interop.html#properties" },
    { type: "content", title: "val не делает объект неизменяемым", body: "```kotlin\nval numbers = mutableListOf(1, 2, 3)\n\nnumbers.add(4)              // можно изменить объект\n// numbers = mutableListOf(5) // нельзя заменить ссылку\n```\n`val` запрещает присвоить переменной другую ссылку. Сам объект может оставаться изменяемым.", notes: "Сравнить коробку и наклейку: наклейку нельзя переставить на другую коробку, но содержимое изменяемой коробки менять можно. Ссылка: https://kotlinlang.org/docs/basic-syntax.html#variables" },
    { type: "content", title: "Kotlin определяет тип один раз", body: "```kotlin\nval students = 18      // тип Int\nvar topic = \"Kotlin\"  // тип String\n\ntopic = \"Android\"    // можно: тоже String\n// topic = 42          // нельзя: Int вместо String\n```\nKotlin определяет тип при объявлении, и потом этот тип не меняется. В Python одна переменная может сначала хранить строку, а затем число. В Kotlin так нельзя.", notes: "Сравнить с Python: `topic = \"Kotlin\"`, затем `topic = 42` допустимо во время выполнения. Kotlin статически типизирован: после объявления `topic` имеет тип String, даже если тип не написан явно. Документация: https://kotlinlang.org/docs/basic-syntax.html#variables и https://kotlinlang.org/docs/basic-types.html" },
    { type: "content", title: "Основные числовые типы", body: "| Тип | Размер значения | Пример | Обычно нужен для |\n| Byte | 8 бит · 1 байт | `1` | компактные двоичные данные |\n| Short | 16 бит · 2 байта | `1` | специальные форматы |\n| Int | 32 бита · 4 байта | `42` | счётчики, идентификаторы |\n| Long | 64 бита · 8 байт | `42L` | большие целые, время |\n| Float | 32 бита · 4 байта | `3.14f` | API, где нужен Float |\n| Double | 64 бита · 8 байт | `3.14` | дробные вычисления |\n\n[Числовые типы Kotlin](https://kotlinlang.org/docs/numbers.html)", notes: "Размер в таблице относится к самому числовому значению. На JVM nullable-значение, элемент generic-коллекции или поле объекта может быть представлено упакованным объектом и занимать больше памяти. Для денег Float и Double не подходят из-за ошибок двоичного представления: используем Long в минимальных единицах или BigDecimal." },
    { type: "content", title: "Числа не расширяются автоматически", body: "```kotlin\nval count: Int = 10\nval total: Long = count.toLong()\n\n// val broken: Long = count // ошибка\n```\nПреобразование выражается явно: `toLong()`, `toDouble()` и другие функции.", notes: "Сравнить с Java, где часть расширяющих преобразований неявная." },
    { type: "content", title: "Boolean и логические операции", body: "```kotlin\nval isAdult = age >= 18\nval hasTicket = true\nval canEnter = isAdult && hasTicket\nval needsHelp = !canEnter\n```\n`&&` — И, `||` — ИЛИ, `!` — НЕ. Вычисление `&&` и `||` останавливается, когда результат уже известен.", notes: "Короткое замыкание пригодится при проверках nullable-значений." },
    { type: "content", title: "Char и String", body: "```kotlin\nval grade: Char = 'A'\nval language: String = \"Kotlin\"\nval first = language[0]\nval length = language.length\n```\nОдинарные кавычки создают `Char`, двойные — `String`.", notes: "Ссылка: https://kotlinlang.org/docs/characters.html и https://kotlinlang.org/docs/strings.html" },
    { type: "content", title: "Шаблоны строк", body: "```kotlin\nval name = \"Маша\"\nval score = 8\n\nprintln(\"$name: $score баллов\")\nprintln(\"Следующий балл: ${score + 1}\")\n```\nДля имени достаточно `$name`, для выражения нужны `${...}`.", notes: "Показать, почему конкатенация через + хуже читается." },
    { type: "content", title: "Многострочные строки", body: "```kotlin\nval message = \"\"\"\n    Имя: $name\n    Курс: Kotlin\n\"\"\".trimIndent()\n```\nТройные кавычки сохраняют переносы. `trimIndent()` убирает общий отступ.", notes: "Удобно для JSON-заготовок, SQL и тестовых данных. Ссылка: https://kotlinlang.org/docs/strings.html#multiline-strings" },
    { type: "content", title: "Арифметика и остаток", body: "```kotlin\nval sum = 7 + 3      // 10\nval quotient = 7 / 3 // 2\nval exact = 7.0 / 3  // 2.333...\nval remainder = 7 % 3 // 1\n```\nТип операндов влияет на результат деления.", notes: "Спросить результат 7 / 3 до показа. Типичная ошибка новичков." },
    { type: "content", title: "Сравнение значений и ссылок", body: "```kotlin\nval a = \"kot\" + \"lin\"\nval b = \"kotlin\"\n\nprintln(a == b)   // равны значения\nprintln(a === b)  // один ли объект\n```\nВ прикладном коде почти всегда нужен `==`.", notes: "Ссылка: https://kotlinlang.org/docs/equality.html. Не обещать конкретный результат === для строк из-за оптимизаций." },
    { type: "content", title: "Константы", body: "```kotlin\nconst val MAX_ATTEMPTS = 3\n\nclass RetryPolicy {\n    val delayMs = 1_000L\n}\n```\n`const val` хранит значение, известное во время компиляции, и объявляется на верхнем уровне, в object или companion object.", notes: "Ссылка: https://kotlinlang.org/docs/properties.html#compile-time-constants" },
    { type: "practice", title: "Разминка: типы", badge: "Практика · 3 минуты", body: "Определите тип и значение каждого выражения:\n```kotlin\nval a = 5 / 2\nval b = 5 / 2.0\nval c = \"5 + 2 = ${5 + 2}\"\nval d = 10 > 3 && 2 == 2\n```", solution: "`a: Int = 2`, `b: Double = 2.5`, `c: String = \"5 + 2 = 7\"`, `d: Boolean = true`." },

    { type: "section", title: "Null safety", subtitle: "Отсутствие значения становится частью типа", outcome: "Студент различает String и String? и выбирает безопасный оператор." },
    { type: "content", title: "Nullable и non-null типы", body: "```kotlin\nval title: String = \"Kotlin\"\nval subtitle: String? = null\n\n// title = null // ошибка компиляции\n```\nЗнак `?` сообщает: значение может отсутствовать. [Null safety](https://kotlinlang.org/docs/null-safety.html)", notes: "Главная идея: компилятор заставляет обработать отсутствие до запуска программы." },
    { type: "content", title: "Проверка на null и smart cast", body: "```kotlin\nfun printLength(text: String?) {\n    if (text != null) {\n        println(text.length)\n    }\n}\n```\nПосле проверки компилятор рассматривает `text` как `String` внутри ветки.", notes: "Smart cast работает, когда компилятор уверен, что значение не изменится между проверкой и использованием." },
    { type: "content", title: "Безопасный вызов ?. ", body: "```kotlin\nval comment: String? = null\nval length: Int? = comment?.length\n```\nЕсли слева `null`, цепочка возвращает `null`. Иначе вызывается свойство или функция.", notes: "Ссылка: https://kotlinlang.org/docs/null-safety.html#safe-call-operator" },
    { type: "content", title: "Оператор Элвиса ?: ", body: "```kotlin\nval displayName = userName ?: \"Гость\"\nval length = comment?.length ?: 0\n```\n`?:` возвращает левую часть, если она не `null`, иначе правую.", notes: "Попросить прочитать выражение словами слева направо." },
    { type: "content", title: "Ранний выход через ?: ", body: "```kotlin\nfun printUser(id: String?) {\n    val safeId = id ?: return\n    println(\"User: $safeId\")\n}\n```\nСправа от `?:` допустимы `return` и `throw`.", notes: "Такой guard clause уменьшает вложенность." },
    { type: "content", title: "Оператор !!", body: "```kotlin\nval name: String? = loadName()\nval length = name!!.length\n```\n`!!` обещает компилятору, что значение точно не `null`. Если обещание нарушено, программа получает `NullPointerException`.\n\n**Инвариант** — условие, которое должно оставаться истинным в определённой части программы. Здесь инвариант звучит так: «в этой строке `name` всегда не `null`».", notes: "Слово «инвариант» можно объяснить как правило, которое код обязан сохранять. Пример: баланс счёта никогда не отрицательный; после успешной авторизации userId всегда заполнен. `!!` допустим только при реальной гарантии non-null, но обычная проверка, `?.` или `?:` чаще понятнее и безопаснее. Документация: https://kotlinlang.org/docs/null-safety.html#not-null-assertion-operator" },
    { type: "content", title: "Безопасное приведение as?", body: "```kotlin\nval value: Any = \"42\"\nval text: String? = value as? String\nval number: Int? = value as? Int\n```\n`as?` возвращает `null`, если тип не подходит. Обычный `as` бросит исключение.", notes: "Ссылка: https://kotlinlang.org/docs/typecasts.html#unsafe-cast-operator" },
    { type: "practice", title: "Null safety: исправление", badge: "Практика · 4 минуты", body: "Перепишите без `!!`. Если имя отсутствует, используйте «Гость».\n```kotlin\nfun greeting(name: String?): String {\n    return \"Привет, ${name!!.uppercase()}\"\n}\n```", solution: "```kotlin\nfun greeting(name: String?): String {\n    val safeName = name?.uppercase() ?: \"Гость\"\n    return \"Привет, $safeName\"\n}\n```" },

    { type: "section", title: "Условия, when и циклы", subtitle: "Управление выполнением без лишнего шаблонного кода", outcome: "Студент использует выражения if и when и перебирает диапазон." },
    { type: "content", title: "if как выражение", body: "```kotlin\nval access = if (age >= 18) {\n    \"разрешён\"\n} else {\n    \"запрещён\"\n}\n```\nВетка возвращает последнее выражение. Тернарный оператор Kotlin не нужен.", notes: "Ссылка: https://kotlinlang.org/docs/control-flow.html#if-expression" },
    { type: "content", title: "Условия читаются сверху вниз", body: "```kotlin\nval grade = if (score >= 90) {\n    \"A\"\n} else if (score >= 75) {\n    \"B\"\n} else {\n    \"C\"\n}\n```\nПервое истинное условие определяет результат.", notes: "Обратить внимание на порядок границ." },
    { type: "content", title: "when по значению", body: "```kotlin\nval label = when (statusCode) {\n    200 -> \"OK\"\n    400 -> \"Bad Request\"\n    404 -> \"Not Found\"\n    else -> \"Unknown\"\n}\n```\n`when` заменяет длинную цепочку сравнений.", notes: "Ссылка: https://kotlinlang.org/docs/control-flow.html#when-expressions-and-statements" },
    { type: "content", title: "Несколько вариантов и диапазон", body: "```kotlin\nval message = when (score) {\n    0 -> \"Нет результата\"\n    1, 2, 3 -> \"Начало\"\n    in 4..7 -> \"Хорошо\"\n    in 8..10 -> \"Отлично\"\n    else -> \"Ошибка\"\n}\n```", notes: "Показать запятую для нескольких значений и in для диапазона." },
    { type: "content", title: "when без аргумента", body: "```kotlin\nval category = when {\n    temperature < 0 -> \"мороз\"\n    temperature < 15 -> \"прохладно\"\n    else -> \"тепло\"\n}\n```\nКаждая ветка содержит произвольное Boolean-выражение.", notes: "Сравнить с if/else if. Выбор зависит от читаемости." },
    { type: "content", title: "Диапазоны", body: "```kotlin\nval inclusive = 1..5        // 1, 2, 3, 4, 5\nval untilEnd = 1..<5        // 1, 2, 3, 4\nval backwards = 5 downTo 1 // 5, 4, 3, 2, 1\nval odds = 1..9 step 2      // 1, 3, 5, 7, 9\n```\n[Ranges and progressions](https://kotlinlang.org/docs/ranges.html)", notes: "`downTo` создаёт последовательность с шагом -1. `step 2` меняет величину шага на 2, поэтому в примере остаются нечётные числа. Оператор `..<` исключает правую границу. В старом коде вместо него часто встречается `until`." },
    { type: "content", title: "Цикл for", body: "```kotlin\nfor (index in 0..<3) {\n    println(index)\n}\n// 0, 1, 2, каждое число с новой строки\n\nfor (char in \"Kotlin\") {\n    println(char)\n}\n// K, o, t, l, i, n, каждый символ с новой строки\n```\n`for` перебирает всё, что предоставляет итератор.", notes: "Первый цикл перебирает диапазон с исключённой правой границей. Второй цикл перебирает строку посимвольно. На этой лекции достаточно диапазона и строки." },
    { type: "content", title: "Индекс и значение", body: "```kotlin\nval names = listOf(\"Аня\", \"Борис\")\n\nfor ((index, name) in names.withIndex()) {\n    println(\"$index: $name\")\n}\n```\nДеструктуризация раскладывает пару на две переменные.", notes: "Не углубляться в компонентные функции. Вернуться к ним на data-классах." },
    { type: "content", title: "Цикл while: счётчик попыток", body: "```kotlin\nvar attempts = 0 // начинаем с нуля\n\nwhile (attempts < 3) {\n    attempts++\n    println(\"Попытка $attempts\")\n}\n// Попытка 1\n// Попытка 2\n// Попытка 3\n// attempts == 3, условие 3 < 3 ложно\n```\n`while` проверяет условие перед каждой итерацией. Цикл работает, пока `attempts < 3`.", notes: "Пройти исполнение по шагам: 0 меньше 3, увеличиваем до 1; затем до 2; затем до 3. После третьей итерации проверка `3 < 3` возвращает false. Документация: https://kotlinlang.org/docs/control-flow.html#while-loops" },
    { type: "content", title: "Цикл do-while: проверка ввода", body: "```kotlin\nvar name: String // сюда запишем ввод пользователя\n\ndo {\n    print(\"Введите непустое имя: \" )\n    name = readln()\n} while (name.isBlank())\n// Ввод пустой строки повторяет запрос\n// Ввод \"Alex\" завершает цикл\n// name == \"Alex\"\n```\n`do-while` сначала запрашивает имя, затем проверяет его. Поэтому запрос выполнится хотя бы один раз.", notes: "`readln()` возвращает строку, введённую в консоль. `isBlank()` возвращает true для пустой строки и строки из пробелов. Когда пользователь вводит Alex, проверка возвращает false и цикл завершается. Документация: https://kotlinlang.org/docs/control-flow.html#while-loops" },
    { type: "content", title: "break и continue", body: "```kotlin\nfor (number in 1..10) {\n    if (number == 3) continue\n    if (number == 7) break\n    println(number)\n}\n```\n`continue` пропускает итерацию, `break` завершает цикл.", notes: "Ссылка: https://kotlinlang.org/docs/returns.html" },
    { type: "content", title: "FizzBuzz: задача и решение", body: "Для чисел от 1 до 20 выведите `FizzBuzz`, если число делится на 3 и 5, `Fizz` — только на 3, `Buzz` — только на 5. В остальных случаях выведите число.\n\n```kotlin\nfor (number in 1..20) {\n    val result = when {\n        number % 15 == 0 -> \"FizzBuzz\"\n        number % 3 == 0 -> \"Fizz\"\n        number % 5 == 0 -> \"Buzz\"\n        else -> number.toString()\n    }\n    println(result)\n}\n// 7 печатает 7\n// 9 печатает Fizz\n// 10 печатает Buzz\n// 15 печатает FizzBuzz\n```", notes: "Сначала проверяется делимость на 15. Если начать с делимости на 3, число 15 попадёт в первую подходящую ветку и программа напечатает только Fizz. Остаток от деления вычисляет оператор `%`." },

    { type: "section", title: "Функции", subtitle: "Имена, параметры, результат и область видимости", outcome: "Студент выделяет повторяемую логику в небольшую функцию." },
    { type: "content", title: "Объявление функции", body: "```kotlin\nfun calculateTotal(price: Int, count: Int): Int {\n    return price * count\n}\n```\nТип параметра указывается после имени. Тип результата — после списка параметров. [Functions](https://kotlinlang.org/docs/functions.html)", notes: "Разобрать сигнатуру слева направо." },
    { type: "content", title: "Функция-выражение", body: "```kotlin\nfun calculateTotal(price: Int, count: Int) =\n    price * count\n```\nДля одного выражения фигурные скобки и `return` не нужны. Тип результата выводится.", notes: "Для публичного API явный тип результата облегчает сопровождение." },
    { type: "content", title: "Unit и Nothing", body: "```kotlin\nfun log(message: String): Unit {\n    println(message)\n}\n\nfun fail(message: String): Nothing {\n    throw IllegalStateException(message)\n}\n```\n`Unit` означает отсутствие полезного результата. `Nothing` означает, что функция нормально не завершится.", notes: "Обычно : Unit опускают. Nothing нужен для понимания throw и TODO()." },
    { type: "content", title: "Именованные аргументы", body: "```kotlin\nfun createUser(name: String, age: Int, active: Boolean) = Unit\n\ncreateUser(\n    name = \"Лена\",\n    age = 20,\n    active = true\n)\n```\nИмена делают вызов понятнее и позволяют менять порядок аргументов.", notes: "Ссылка: https://kotlinlang.org/docs/functions.html#named-arguments" },
    { type: "content", title: "Значения параметров по умолчанию", body: "```kotlin\nfun greeting(\n    name: String,\n    prefix: String = \"Привет\"\n): String = \"$prefix, $name!\"\n\ngreeting(\"Ира\")\ngreeting(\"Ира\", prefix = \"Добрый день\")\n```", notes: "Параметры по умолчанию часто заменяют перегрузки из Java." },
    { type: "content", title: "vararg", body: "```kotlin\nfun average(vararg values: Int): Double {\n    return values.average()\n}\n\naverage(4, 5, 3, 5)\n```\n`vararg` собирает переменное число аргументов в массив.", notes: "Ссылка: https://kotlinlang.org/docs/functions.html#variable-number-of-arguments-varargs" },
    { type: "content", title: "Область видимости", body: "```kotlin\nval courseName = \"Android\" // верхний уровень\n\nfun demo() {\n    val lesson = 2          // функция\n    if (lesson > 1) {\n        val topic = \"Kotlin\" // блок\n        println(topic)\n    }\n}\n```\nИмя доступно внутри области, где объявлено.", notes: "Не путать область видимости и время жизни. Пока достаточно лексической области." },
    { type: "content", title: "Чистая функция", body: "```kotlin\nfun finalPrice(price: Int, discount: Int): Int {\n    return price - discount\n}\n```\nОдинаковые аргументы дают одинаковый результат, внешнее состояние не меняется. Такие функции проще проверять тестами.", notes: "Это вводная идея, не формальное занятие по функциональному программированию." },
    { type: "section", title: "Классы и объекты", subtitle: "Модель данных объединяет состояние и поведение", outcome: "Студент создаёт класс, экземпляр, свойства и методы." },
    { type: "content", title: "Класс и экземпляр", body: "```kotlin\nclass User(val name: String)\n\nval first = User(\"Аня\")\nval second = User(\"Борис\")\n```\nКласс описывает форму объектов. Вызов `User(...)` создаёт экземпляр. [Classes](https://kotlinlang.org/docs/classes.html)", notes: "Термины: класс, объект или экземпляр, свойство." },
    { type: "content", title: "Основной конструктор", body: "```kotlin\nclass Account(\n    val id: Long,\n    val owner: String,\n    var balance: Long\n)\n```\nПараметр с `val` или `var` сразу становится свойством.", notes: "Если убрать val/var, параметр доступен при инициализации, но не становится свойством." },
    { type: "content", title: "init-блок", body: "```kotlin\nclass Account(val id: Long, balance: Long) {\n    var balance: Long = balance\n        private set\n\n    init {\n        require(balance >= 0)\n    }\n}\n```\n`init` выполняется при создании объекта.", notes: "Ссылка: https://kotlinlang.org/docs/classes.html#constructors. require бросает IllegalArgumentException при нарушении входного условия." },
    { type: "content", title: "Методы", body: "```kotlin\nclass Account(var balance: Long) {\n    fun deposit(amount: Long) {\n        require(amount > 0)\n        balance += amount\n    }\n}\n```\nМетод — функция, объявленная внутри класса и работающая с его состоянием.", notes: "Обсудить, почему account.balance += -100 хуже контролируется." },
    { type: "content", title: "Геттер и сеттер", body: "```kotlin\nclass Person(name: String) {\n    var name: String = name\n        set(value) {\n            field = value.trim()\n        }\n\n    val initials: Char\n        get() = name.first()\n}\n```\n`field` обращается к хранилищу свойства.", notes: "Ссылка: https://kotlinlang.org/docs/properties.html#getters-and-setters" },
    { type: "content", title: "Модификаторы видимости", body: "| Модификатор | Доступ |\n| public — по умолчанию | отовсюду |\n| internal | внутри модуля |\n| protected | класс и его наследники |\n| private | только текущая область или класс |\n\n```kotlin\nclass User          // то же самое, что public class User\nfun loadUser() {}  // то же самое, что public fun loadUser()\n// Оба объявления доступны из других частей программы\n```\nЕсли модификатор не указан, Kotlin использует `public`. [Документация](https://kotlinlang.org/docs/visibility-modifiers.html)", notes: "По умолчанию классы, функции, свойства и другие объявления имеют видимость public. Модуль обычно соответствует Gradle-модулю. `protected` доступен внутри класса и его подклассов, но не используется для объявлений верхнего уровня." },
    { type: "content", layout: "statement", title: "Вопрос группе: private и инкапсуляция", body: "Поле объявили `private`. Получили ли мы инкапсуляцию автоматически?", notes: "Не показывать ответ сразу. Дать группе 30–60 секунд и собрать 2–3 версии. Уточняющие вопросы: кто теперь может менять поле; гарантирует ли private корректность изменений внутри класса; как внешний код выполнит разрешённую операцию? Ответ находится на следующем слайде." },
    { type: "content", title: "private — инструмент инкапсуляции", body: "```kotlin\nclass Account(initialBalance: Long) {\n    private var balance: Long = initialBalance\n\n    fun deposit(amount: Long) {\n        require(amount > 0)\n        balance += amount\n    }\n\n    fun currentBalance(): Long = balance\n}\n// account.deposit(500) меняет баланс по правилам класса\n// account.balance = -100 не компилируется\n```\n`private` только ограничивает доступ. **Инкапсуляция** скрывает состояние и предоставляет безопасные операции, которые сохраняют правила объекта.", notes: "Ответ на предыдущий слайд: private — модификатор видимости, то есть языковой механизм. Инкапсуляция — принцип проектирования. Одного private недостаточно, если публичный метод всё равно позволяет записать некорректное состояние. Здесь deposit проверяет сумму, а currentBalance разрешает чтение без прямого изменения. Документация: https://kotlinlang.org/docs/visibility-modifiers.html и https://kotlinlang.org/docs/classes.html" },
    { type: "content", title: "this", body: "```kotlin\nclass User(name: String) {\n    val name: String\n\n    init {\n        this.name = name.trim()\n    }\n}\n```\n`this` указывает на текущий объект и помогает различить одноимённые значения.", notes: "Не использовать this повсеместно. Он нужен при неоднозначности или для явной ссылки на объект." },
    { type: "content", title: "Вторичный конструктор", body: "```kotlin\nclass User(val name: String, val age: Int) {\n    constructor(name: String) : this(name, 0)\n}\n```\nВторичный конструктор делегирует основному через `this(...)`.", notes: "В Kotlin чаще хватает значений по умолчанию и фабричных функций. Ссылка: https://kotlinlang.org/docs/classes.html#secondary-constructors" },
    { type: "practice", title: "Модель счёта", badge: "Практика · 7 минут", body: "Создайте `Account`:\n- `id` и `owner` доступны только для чтения\n- `balance` нельзя менять снаружи\n- отрицательный начальный баланс запрещён\n- `deposit(amount)` принимает только положительную сумму", solution: "```kotlin\nclass Account(\n    val id: Long,\n    val owner: String,\n    initialBalance: Long\n) {\n    var balance: Long = initialBalance\n        private set\n\n    init { require(initialBalance >= 0) }\n\n    fun deposit(amount: Long) {\n        require(amount > 0)\n        balance += amount\n    }\n}\n```" },

    { type: "section", title: "ООП в Kotlin", subtitle: "Наследование, полиморфизм, абстракция и композиция", outcome: "Студент выбирает подходящий способ связать типы." },
    { type: "content", title: "Четыре идеи ООП", body: "- Инкапсуляция защищает состояние и правила\n- Абстракция оставляет существенный контракт\n- Наследование создаёт отношение «является»\n- Полиморфизм позволяет работать через общий тип\n\nЭто инструменты моделирования, а не обязательная иерархия для каждой задачи.", notes: "Привязать каждую идею к Account и операциям." },
    { type: "content", title: "Классы final по умолчанию", body: "```kotlin\nopen class Operation(val amount: Long)\n\nclass Income(amount: Long) : Operation(amount)\n```\n`open` явно разрешает наследование. [Inheritance](https://kotlinlang.org/docs/inheritance.html)", notes: "Это ограничивает случайное наследование и делает намерение автора явным." },
    { type: "content", title: "Переопределение", body: "```kotlin\nopen class Operation {\n    open fun sign(): Int = 1\n}\n\nclass Expense : Operation() {\n    override fun sign(): Int = -1\n}\n```\nРодитель открывает член через `open`, наследник явно пишет `override`.", notes: "Методы тоже final по умолчанию." },
    { type: "content", title: "Абстрактный класс", body: "```kotlin\nabstract class Operation(val amount: Long) {\n    abstract fun apply(balance: Long): Long\n}\n\nclass Income(amount: Long) : Operation(amount) {\n    override fun apply(balance: Long) = balance + amount\n}\n```\nАбстрактный класс нельзя создать напрямую.", notes: "Он может хранить состояние и готовую реализацию." },
    { type: "content", title: "Интерфейс", body: "```kotlin\ninterface Printable {\n    fun format(): String\n}\n\nclass Receipt(val total: Long) : Printable {\n    override fun format() = \"Итого: $total\"\n}\n```\nИнтерфейс задаёт контракт. [Interfaces](https://kotlinlang.org/docs/interfaces.html)", notes: "Класс может реализовать несколько интерфейсов, но наследовать только один класс." },
    { type: "content", title: "Полиморфизм", body: "```kotlin\nfun printItem(item: Printable) {\n    println(item.format())\n}\n\nprintItem(Receipt(500))\n```\nФункция зависит от контракта `Printable`, а конкретный объект выбирает реализацию.", notes: "Не нужно писать if по каждому конкретному классу." },
    { type: "content", title: "Композиция", body: "```kotlin\nclass Account(\n    private val formatter: Printable\n) {\n    fun printSummary() = println(formatter.format())\n}\n```\nКомпозиция выражает отношение «содержит» или «использует» и позволяет заменять зависимость.", notes: "Практическое правило: сначала рассмотреть композицию, наследование использовать при настоящем отношении «является»." },
    { type: "content", title: "data class", body: "```kotlin\ndata class Transaction(\n    val id: Long,\n    val amount: Long,\n    val comment: String?\n)\n// Transaction хранит одну запись об операции\n```\n**Когда использовать:** объект в основном хранит данные, а два объекта с одинаковыми значениями должны считаться равными. Например, операция из базы данных, ответ сервера или состояние экрана.\n\nКомпилятор создаёт `equals`, `hashCode`, `toString`, `componentN` и `copy`. [Документация](https://kotlinlang.org/docs/data-classes.html)", notes: "Data-класс описывает значение. Пример: две операции с одинаковыми id, amount и comment сравниваются через содержимое свойств. Не каждый класс должен быть data: объект с собственной идентичностью и сложным изменяемым состоянием часто лучше оставить обычным классом." },
    { type: "content", title: "copy и деструктуризация", body: "```kotlin\nval original = Transaction(1, 500, null)\nval edited = original.copy(comment = \"Кофе\")\n\nval (id, amount, comment) = edited\n```\n`copy` создаёт новый объект с отдельными изменениями. Копирование поверхностное.", notes: "Не злоупотреблять деструктуризацией, если имена свойств читаются лучше." },
    { type: "content", title: "enum class", body: "```kotlin\nenum class TransactionType {\n    INCOME,\n    EXPENSE\n}\n// TransactionType.EXPENSE обозначает расход\n```\n**Когда использовать:** существует небольшой фиксированный набор однотипных вариантов. Например, тип операции, день недели или направление сортировки.\n\nУ всех значений enum один тип и одинаковый набор свойств. [Документация](https://kotlinlang.org/docs/enum-classes.html)", notes: "Enum подходит, когда варианты являются константами и не требуют разного набора данных. Новый экземпляр TransactionType во время работы программы создать нельзя." },
    { type: "content", title: "sealed interface", body: "```kotlin\nsealed interface PaymentResult {\n    data class Success(val receiptId: String) : PaymentResult\n    data class Error(val message: String) : PaymentResult\n    data object Cancelled : PaymentResult\n}\n// Success хранит id чека, Error хранит текст ошибки\n```\n**Когда использовать:** набор вариантов ограничен, но каждому варианту нужны собственные данные. Например, результат оплаты или состояние загрузки экрана.\n\n[Документация](https://kotlinlang.org/docs/sealed-classes.html)", notes: "Главное отличие от enum: экземпляры sealed-наследников могут хранить разные данные и иметь разную структуру. Для экрана типичный набор: Loading, Content(data), Error(message). Компилятор помогает проверить все варианты в when." },
    { type: "content", title: "Исчерпывающий when", body: "```kotlin\nfun message(result: PaymentResult): String = when (result) {\n    is PaymentResult.Success -> \"Чек ${result.receiptId}\"\n    is PaymentResult.Error -> result.message\n    PaymentResult.Cancelled -> \"Отменено\"\n}\n```\nДля sealed-типа компилятор проверяет обработку вариантов.", notes: "Добавление нового варианта подсветит места, где when нужно обновить." },
    { type: "content", title: "object и companion object", body: "```kotlin\nobject IdGenerator {\n    private var next = 1L\n    fun nextId() = next++\n}\n\nclass Account {\n    companion object {\n        const val MAX_NAME_LENGTH = 50\n    }\n}\n```\n[Object declarations](https://kotlinlang.org/docs/object-declarations.html)", notes: "object создаёт единственный экземпляр. Companion связан с классом, но остаётся объектом." },
    { type: "content", title: "Что выбрать", body: "| Задача | Инструмент |\n| Объект-значение | `data class` |\n| Несколько простых констант | `enum class` |\n| Закрытые варианты с разными данными | `sealed` |\n| Контракт для разных реализаций | `interface` |\n| Общая база с состоянием | `abstract class` |\n| Единственный экземпляр | `object` |", notes: "Это эвристика, не строгий закон. Главное — выразить модель понятно." },
    { type: "practice", title: "Финальная модель", badge: "Практика · 8 минут", body: "Соберите модель операции:\n- `Transaction` хранит id, сумму, тип и nullable-комментарий\n- тип операции задаётся через enum\n- результат добавления задаётся sealed-интерфейсом\n- функция возвращает Success или Error", solution: "```kotlin\nenum class TransactionType { INCOME, EXPENSE }\n\ndata class Transaction(\n    val id: Long,\n    val amount: Long,\n    val type: TransactionType,\n    val comment: String? = null\n)\n\nsealed interface AddResult {\n    data class Success(val transaction: Transaction) : AddResult\n    data class Error(val message: String) : AddResult\n}\n\nfun add(transaction: Transaction): AddResult =\n    if (transaction.amount > 0) AddResult.Success(transaction)\n    else AddResult.Error(\"Сумма должна быть положительной\")\n```" },

    { type: "section", title: "Массивы", subtitle: "Фиксированный размер и доступ по индексу", outcome: "Студент отличает Array от коллекций и знает массивы примитивов." },
    { type: "content", title: "Array", body: "```kotlin\nval names: Array<String> = arrayOf(\"Аня\", \"Борис\")\n\nprintln(names[0])\nprintln(names.size)\n```\n`Array<T>` хранит элементы одного типа. Размер массива задаётся при создании и не меняется.", notes: "Документация: https://kotlinlang.org/docs/arrays.html" },
    { type: "content", title: "Создание массива", body: "```kotlin\nval squares = Array(5) { index ->\n    index * index\n}\n\n// [0, 1, 4, 9, 16]\n```\nКонструктор `Array` получает размер и функцию, которая вычисляет элемент для каждого индекса." },
    { type: "content", title: "Изменение элемента массива", body: "```kotlin\nval names = arrayOf(\"Аня\", \"Борис\")\nnames[1] = \"Вера\"\n\nprintln(names.contentToString())\n```\nЭлементы можно заменять. Добавить третий элемент без создания нового массива нельзя." },
    { type: "content", title: "Массивы примитивов", body: "```kotlin\nval ids = intArrayOf(10, 20, 30)\nval prices = longArrayOf(500L, 900L)\nval flags = booleanArrayOf(true, false)\n```\n`IntArray`, `LongArray`, `DoubleArray` и другие специальные типы хранят значения без упаковки в `Array<Int>` или `Array<Long>`.", notes: "Для большинства прикладных наборов данных удобнее List. Примитивные массивы важны для производительности и API, которые принимают массив." },
    { type: "content", title: "Array и List", body: "| Свойство | `Array` | `List` |\n| Размер | фиксированный | новый список может иметь другой размер |\n| Изменение элемента | возможно | зависит от `List` или `MutableList` |\n| Основное применение | API, буферы, вычисления | прикладные наборы данных |\n\n```kotlin\nval list = names.toList()\nval array = list.toTypedArray()\n```" },

    { type: "section", title: "Коллекции", subtitle: "List, Set и Map хранят наборы данных", outcome: "Студент выбирает тип коллекции и выполняет основные операции." },
    { type: "content", title: "Три вида коллекций", body: "| Коллекция | Что хранит | Когда выбирать |\n| `List` | элементы по порядку | важны порядок и повторы |\n| `Set` | уникальные элементы | нужно убрать повторы |\n| `Map` | пары ключ и значение | нужен поиск по ключу |\n\n[Обзор коллекций](https://kotlinlang.org/docs/collections-overview.html)", notes: "Связать выбор структуры с вопросом, который задаёт программа к данным." },
    { type: "content", title: "List", body: "```kotlin\nval topics = listOf(\"Kotlin\", \"Git\", \"Android\")\n\nprintln(topics[0])\nprintln(topics.size)\nprintln(\"Kotlin\" in topics)\n```\n`List` сохраняет порядок и допускает одинаковые элементы.", notes: "Индекс начинается с нуля. Обращение по неверному индексу завершится исключением." },
    { type: "content", title: "Безопасное чтение по индексу", body: "```kotlin\nval first = topics.firstOrNull()\nval third = topics.getOrNull(2)\nval missing = topics.getOrNull(20)\n```\nБезопасные функции возвращают nullable-значение, если элемента нет.", notes: "Связать с уже изученными `?.` и `?:`." },
    { type: "content", title: "MutableList", body: "```kotlin\nval topics = mutableListOf(\"Kotlin\", \"Git\")\ntopics.add(\"Android\")\ntopics.remove(\"Git\")\ntopics[0] = \"Kotlin basics\"\n```\nИзменяемый список можно дополнять, сокращать и обновлять.", notes: "Напомнить: `val` запрещает заменить ссылку, но не запрещает менять mutable-объект." },
    { type: "content", title: "Read-only и mutable", body: "```kotlin\nval source = mutableListOf(1, 2, 3)\nval view: List<Int> = source\nsource += 4\n\nprintln(view) // [1, 2, 3, 4]\n```\nТип `List` не даёт методов изменения через эту ссылку, но не гарантирует неизменяемость исходного объекта.", notes: "Не называть List глубоко неизменяемой коллекцией. Для независимой копии используют `source.toList()`." },
    { type: "content", title: "Перебор списка", body: "```kotlin\nfor (topic in topics) {\n    println(topic)\n}\n\ntopics.forEach { topic ->\n    println(topic)\n}\n```\n`for` удобен для управления выполнением. `forEach` передаёт действие для каждого элемента.", notes: "Пока не углубляться в лямбды. Достаточно прочитать блок как действие над элементом." },
    { type: "practice", title: "Практика: список оценок", badge: "Практика · 4 минуты", body: "Создайте список оценок `5, 4, 3, 5`. Выведите количество оценок, первую оценку и каждое значение отдельной строкой.", solution: "```kotlin\nval grades = listOf(5, 4, 3, 5)\nprintln(grades.size)\nprintln(grades.firstOrNull())\nfor (grade in grades) println(grade)\n```" },
    { type: "content", title: "Set", body: "```kotlin\nval tags = setOf(\"kotlin\", \"android\", \"kotlin\")\n\nprintln(tags.size) // 2\nprintln(\"android\" in tags) // true\n```\n`Set` хранит только уникальные элементы.", notes: "Порядок не должен быть частью логики обычного Set, даже если конкретная реализация его сохраняет." },
    { type: "content", title: "MutableSet", body: "```kotlin\nval visited = mutableSetOf<String>()\nvisited += \"lesson-01\"\nvisited += \"lesson-01\"\n\nprintln(visited.size) // 1\n```\nДобавление уже существующего значения не создаёт копию.", notes: "Set удобен для отметок о посещении, выбранных идентификаторов и проверки уникальности." },
    { type: "content", title: "Map", body: "```kotlin\nval scores = mapOf(\n    \"Аня\" to 5,\n    \"Борис\" to 4\n)\n\nprintln(scores[\"Аня\"]) // 5\nprintln(scores[\"Ира\"]) // null\n```\n`Map` связывает уникальный ключ со значением.", notes: "Оператор `to` создаёт пару. Чтение по ключу возвращает nullable-значение." },
    { type: "content", title: "MutableMap", body: "```kotlin\nval scores = mutableMapOf(\"Аня\" to 5)\nscores[\"Борис\"] = 4\nscores[\"Аня\"] = 3\nscores.remove(\"Борис\")\n```\nЗапись по существующему ключу заменяет значение.", notes: "Сравнить с адресной книгой: один ключ ведёт к одному текущему значению." },
    { type: "content", title: "Реализации коллекций", body: "| Тип | Особенность |\n| `ArrayList` | список на основе массива |\n| `HashSet` | уникальные элементы без требования к порядку |\n| `LinkedHashSet` | сохраняет порядок добавления |\n| `HashMap` | поиск значения по ключу |\n| `LinkedHashMap` | сохраняет порядок добавления ключей |\n\nФункции `mutableListOf`, `mutableSetOf` и `mutableMapOf` обычно скрывают конкретную реализацию." },
    { type: "content", title: "ArrayDeque", body: "```kotlin\nval queue = ArrayDeque<String>()\nqueue.addLast(\"first\")\nqueue.addLast(\"second\")\nprintln(queue.removeFirst())\n```\n`ArrayDeque` добавляет и удаляет элементы с обоих концов. Он подходит для очереди и стека.", notes: "Документация: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-array-deque/" },
    { type: "content", title: "Перебор Map", body: "```kotlin\nfor ((name, score) in scores) {\n    println(\"$name: $score\")\n}\n```\nДеструктуризация пары даёт имя ключа и значения.", notes: "Полный разбор деструктуризации будет в лекции 3 вместе с data class." },
    { type: "content", title: "filter", body: "```kotlin\nval scores = listOf(5, 2, 4, 3, 5)\nval passed = scores.filter { score ->\n    score >= 3\n}\n```\n`filter` создаёт список элементов, которые прошли проверку.", notes: "Исходная коллекция не меняется. Результат нужно сохранить или сразу использовать." },
    { type: "content", title: "map", body: "```kotlin\nval scores = listOf(5, 4, 3)\nval labels = scores.map { score ->\n    \"Оценка: $score\"\n}\n```\n`map` преобразует каждый элемент и возвращает коллекцию результатов.", notes: "Не путать функцию map и коллекцию Map. Название одно, назначение определяется контекстом." },
    { type: "content", title: "Цепочка операций", body: "```kotlin\nval labels = scores\n    .filter { it >= 3 }\n    .map { \"Зачёт: $it\" }\n```\nКаждый шаг получает результат предыдущего: сначала отбор, затем преобразование.", notes: "Читать цепочку сверху вниз и называть промежуточный тип после каждой строки." },
    { type: "content", title: "Поиск элемента", body: "```kotlin\nval firstExcellent = scores.find { it == 5 }\nval firstFailed = scores.firstOrNull { it < 3 }\n```\nОбе операции возвращают первый подходящий элемент или `null`.", notes: "Поиск не требует отдельного цикла и временного флага." },
    { type: "content", title: "Проверки коллекции", body: "```kotlin\nval hasExcellent = scores.any { it == 5 }\nval allPassed = scores.all { it >= 3 }\nval failedCount = scores.count { it < 3 }\n```\n`any` и `all` возвращают Boolean, `count` возвращает количество совпадений.", notes: "Попросить студентов сформулировать каждую строку обычной фразой." },
    { type: "content", title: "Сортировка", body: "```kotlin\nval ascending = scores.sorted()\nval descending = scores.sortedDescending()\nval namesByLength = names.sortedBy { it.length }\n```\nФункции `sorted...` возвращают новый список.", notes: "Не путать с `sort`, который изменяет MutableList." },
    { type: "content", title: "Группировка", body: "```kotlin\nval words = listOf(\"cat\", \"car\", \"dog\")\nval byFirstLetter = words.groupBy { it.first() }\n\n// c -> [cat, car]\n// d -> [dog]\n```\n`groupBy` возвращает Map, где каждому ключу соответствует список элементов.", notes: "Это верхняя граница блока. Более сложные цепочки и функции высшего порядка разбираются в лекции 4." },
    { type: "practice", title: "Практика: обработка оценок", badge: "Практика · 7 минут", body: "Для списка `5, 2, 4, 3, 5` получите только проходные оценки, отсортируйте их по убыванию и превратите в строки вида `Оценка: 5`.", solution: "```kotlin\nval result = listOf(5, 2, 4, 3, 5)\n    .filter { it >= 3 }\n    .sortedDescending()\n    .map { \"Оценка: $it\" }\n\nprintln(result)\n```" },
    { type: "content", title: "Выбор операции", body: "| Вопрос к данным | Операция |\n| Какие подходят? | `filter` |\n| Как изменить каждый? | `map` |\n| Есть ли подходящий? | `any` |\n| Какой первый подходит? | `find` |\n| Сколько подходит? | `count` |\n| Как разбить на группы? | `groupBy` |", notes: "Предложить сначала сформулировать вопрос, затем выбирать функцию." },
    { type: "content", title: "Граница лекции", body: "- Сегодня: базовые коллекции и готовые операции\n- Лекция 3: классы, ООП, лямбды и функции высшего порядка\n- Там же: более сложные цепочки обработки коллекций\n\nКоллекции станут данными для моделей из следующей лекции.", notes: "Зафиксировать связь между двумя занятиями по Kotlin." },

    { type: "section", title: "Закрепление", subtitle: "Проверка понимания и следующий шаг", outcome: "Студент видит границы темы и получает конкретное домашнее задание." },
    { type: "content", title: "Частые ошибки", body: "- `var` используется без необходимости\n- `!!` скрывает необработанный случай\n- Целочисленное деление принимают за дробное\n- В `when` неверно упорядочены условия\n- Для уникальных значений выбран List\n- Результат `filter` или `map` не сохранён", notes: "Быстро пройти список и попросить привести исправление для каждого пункта." },
    { type: "content", title: "Мини-тест", body: "1. Чем `val` отличается от неизменяемого объекта?\n2. Как получить длину `String?` или ноль?\n3. Что возвращает `if` в Kotlin?\n4. Чем List отличается от Set?\n5. В чём разница между filter и map?", solution: "1. `val` запрещает переназначить ссылку, но объект может быть изменяемым. 2. `text?.length ?: 0`. 3. Значение выбранной ветки. 4. List хранит порядок и повторы, Set хранит уникальные элементы. 5. filter отбирает элементы, map преобразует каждый элемент." },
    { type: "content", title: "Практика на занятии", badge: "Практика", body: "- Решаем короткие задачи на условия и циклы\n- Выделяем повторяющуюся логику в функции\n- Обрабатываем nullable-значения\n- Выбираем List, Set или Map\n- Собираем цепочки из filter, map и sorted\n\nГлавная цель — переводить условие задачи в понятный Kotlin-код.", notes: "Подбирать короткие задачи, которые решаются за 5–10 минут. Перед кодом попросить сформулировать вопрос к данным." },
    { type: "content", title: "Домашнее задание: Kotlin Koans", badge: "Домашнее задание", body: "Пройдите все задания в двух разделах:\n\n1. [Introduction](https://play.kotlinlang.org/koans/Introduction/Hello,%20world!/Task.kt)\n2. [Collections](https://play.kotlinlang.org/koans/Collections/Introduction/Task.kt)\n\nПереходите к следующему заданию только после успешной проверки текущего.", notes: "Kotlin Koans состоит из упражнений с тестами. Студент заменяет TODO рабочим кодом и запускает проверку. Официальный обзор: https://play.kotlinlang.org/koans/overview" },
    { type: "content", title: "Сдача домашнего задания", body: "- В разделе `Introduction` все задания отмечены зелёной галочкой\n- В разделе `Collections` все задания отмечены зелёной галочкой\n- Приложены два скриншота с открытыми списками заданий\n- На скриншотах видны названия разделов и завершённые задания\n\nКод отдельно отправлять не требуется.", notes: "Попросить сделать один скриншот раскрытого Introduction и один скриншот раскрытого Collections." },
    { type: "content", title: "Шпаргалка по документации", body: "- [Basic syntax](https://kotlinlang.org/docs/basic-syntax.html)\n- [Basic types](https://kotlinlang.org/docs/basic-types.html)\n- [Null safety](https://kotlinlang.org/docs/null-safety.html)\n- [Control flow](https://kotlinlang.org/docs/control-flow.html)\n- [Functions](https://kotlinlang.org/docs/functions.html)\n- [Collections overview](https://kotlinlang.org/docs/collections-overview.html)\n- [Collection operations](https://kotlinlang.org/docs/collection-operations.html)", notes: "Этот слайд можно оставить открытым на время домашней работы." },
    { type: "content", title: "Что дальше", body: "- Следующая лекция посвящена классам и объектам\n- Разберём инкапсуляцию, наследование и полиморфизм\n- Добавим лямбды и функции высшего порядка\n- Построим цепочки обработки объектов в коллекциях", notes: "Связать следующий материал с уже знакомыми списками." },
    { type: "section", title: "Вопросы", subtitle: "Синтаксис, null safety, функции и коллекции", body: "- Что осталось непонятно?\n- Какой пример разобрать ещё раз?\n- Где компилятор уже помог найти ошибку?", notes: "Вернуться к слайду «Результат занятия» и коротко проверить каждую цель." }
  ].filter((slide) => !new Set([
    "Где выполняется Kotlin-код",
    "Вывод и чтение",
    "Комментарии",
    "Многострочные строки",
    "Модель счёта",
    "Финальная модель",
    "Числа не расширяются автоматически",
    "Константы",
    "Безопасное приведение as?",
    "Индекс и значение",
    "break и continue",
    "Unit и Nothing",
    "vararg",
    "Область видимости",
    "this",
    "Вторичный конструктор",
    "Композиция",
    "Классы и объекты",
    "Класс и экземпляр",
    "Основной конструктор",
    "init-блок",
    "Методы",
    "Геттер и сеттер",
    "Модификаторы видимости",
    "Вопрос группе: private и инкапсуляция",
    "private — инструмент инкапсуляции",
    "ООП в Kotlin",
    "Четыре идеи ООП",
    "Классы final по умолчанию",
    "Переопределение",
    "Абстрактный класс",
    "Интерфейс",
    "Полиморфизм",
    "data class",
    "copy и деструктуризация",
    "enum class",
    "sealed interface",
    "Исчерпывающий when",
    "object и companion object",
    "Что выбрать"
  ]).has(slide.title)).map((slide) => {
    const hasExactResult = Object.prototype.hasOwnProperty.call(EXACT_CODE_RESULTS, slide.title);
    const result = hasExactResult ? EXACT_CODE_RESULTS[slide.title] : CODE_RESULTS[slide.title];
    if (!result) return slide;
    if (/```[a-z]*\n/.test(slide.body || "")) {
      return { ...slide, body: annotateLastCodeBlock(slide.body, result) };
    }
    if (/```[a-z]*\n/.test(slide.solution || "")) {
      return { ...slide, solution: annotateLastCodeBlock(slide.solution, result) };
    }
    return slide;
  }).map((slide) => {
    if (slide.type === "practice") {
      const shortQuestions = {
        "Null safety: исправление": {
          body: "Какое выражение вернёт имя пользователя, а при `null` строку `Гость`?",
          solution: "`userName ?: \"Гость\"`"
        },
        "Практика: список оценок": {
          body: "Какой размер у списка `listOf(5, 4, 3, 5)` и чему равен его первый элемент?",
          solution: "Размер равен `4`, первый элемент равен `5`."
        },
        "Практика: обработка оценок": {
          body: "Какая операция оставляет только подходящие элементы, а какая преобразует каждый элемент?",
          solution: "`filter` отбирает элементы, `map` преобразует каждый элемент."
        }
      };
      const shortQuestion = shortQuestions[slide.title];
      return {
        ...slide,
        type: "content",
        title: slide.title
          .replace("Разминка: ", "Короткий вопрос: ")
          .replace("Null safety: исправление", "Короткий вопрос: null safety")
          .replace("Практика: ", "Короткий вопрос: "),
        badge: "Короткий ответ",
        ...(shortQuestion || {})
      };
    }
    if (slide.title === "Практика на занятии") {
      return {
        ...slide,
        title: "Короткие вопросы по ходу лекции",
        badge: "Самопроверка",
        body: "- Какой тип получит выражение?\n- Что вернёт безопасный вызов?\n- Какая ветка `when` сработает?\n- Чем List отличается от Set?\n- Какую операцию коллекции выбрать?\n\nНа каждый вопрос достаточно короткого устного ответа."
      };
    }
    return slide;
  }).filter((slide) =>
    slide.badge !== "Короткий ответ" &&
    slide.badge !== "Самопроверка" &&
    slide.title !== "Мини-тест"
  )
};
