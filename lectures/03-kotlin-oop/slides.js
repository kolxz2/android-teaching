const content = (title, body, notes = "") => ({ type: "content", title, body, notes });
const section = (title, subtitle, outcome) => ({ type: "section", title, subtitle, outcome });
const practice = (title, body, solution) => ({ type: "practice", title, badge: "Практика", body, solution });

window.DECK = {
  course: "Android-разработка",
  lecture: 3,
  lectureId: "03",
  slug: "03-kotlin-oop",
  title: "Kotlin: ООП и функциональная обработка данных",
  block: "Язык",
  teacher: "Сучёв Николай Евгеньевич",
  teacherMeta: "Android-разработчик · Т-Банк · команда Вовлечение",
  hub: "../../index.html",
  photo: "../../assets/teacher.jpg",
  slides: [
    { type: "title", title: "Android-разработка", subtitle: "Лекция 3. Kotlin: ООП и функциональная обработка данных", kicker: "03 / 15", body: "- 53 слайда · 90 минут\n- Моделируем данные и защищаем правила\n- Используем лямбды для обработки коллекций\n- Ветка: `lecture-03`" },
    content("Результат занятия", "- Создавать классы, объекты, свойства и методы\n- Ограничивать изменение состояния\n- Различать наследование, интерфейс и композицию\n- Передавать поведение через лямбды\n- Строить цепочки обработки объектов"),
    { type: "content", title: "Маршрут лекции", layout: "roadmap", body: "1. Класс и объект\n2. Состояние и инкапсуляция\n3. Связи между типами\n4. Специальные классы\n5. Лямбды и цепочки" },
    content("Связь с коллекциями", "```kotlin\nval amounts = listOf(500L, 1200L, 300L)\n```\nПока список хранит только числа. Класс позволит каждой операции хранить сумму, тип и комментарий вместе."),

    section("Классы и объекты", "Класс описывает данные и доступные операции", "Студент создаёт класс, экземпляр, свойства и методы."),
    content("Класс и экземпляр", "```kotlin\nclass User(val name: String)\n\nval first = User(\"Аня\")\nval second = User(\"Борис\")\n```\nКласс описывает форму объектов. Вызов `User(...)` создаёт экземпляр. [Классы](https://kotlinlang.org/docs/classes.html)"),
    content("Основной конструктор", "```kotlin\nclass Account(\n    val id: Long,\n    val owner: String,\n    var balance: Long\n)\n```\nПараметр с `val` или `var` сразу становится свойством."),
    content("Параметр или свойство", "```kotlin\nclass User(name: String) {\n    val displayName = name.trim()\n}\n```\nПараметр без `val` или `var` участвует в инициализации, но внешний код не получает одноимённое свойство."),
    content("init-блок", "```kotlin\nclass Account(val id: Long, balance: Long) {\n    var balance: Long = balance\n        private set\n\n    init { require(balance >= 0) }\n}\n```\n`init` выполняется при создании объекта."),
    content("Порядок инициализации", "```kotlin\nclass Demo(name: String) {\n    val normalized = name.trim()\n    init { println(normalized) }\n    val length = normalized.length\n}\n```\nИнициализаторы свойств и `init` выполняются сверху вниз."),
    content("Методы", "```kotlin\nclass Account(var balance: Long) {\n    fun deposit(amount: Long) {\n        require(amount > 0)\n        balance += amount\n    }\n}\n```\nМетод работает с состоянием конкретного объекта."),
    content("Геттер и сеттер", "```kotlin\nclass Person(name: String) {\n    var name: String = name\n        set(value) { field = value.trim() }\n\n    val initials: Char\n        get() = name.first()\n}\n```\n`field` обращается к хранилищу свойства."),
    content("Модификаторы видимости", "| Модификатор | Доступ |\n| `public` | отовсюду |\n| `internal` | внутри модуля |\n| `protected` | класс и наследники |\n| `private` | текущая область или класс |\n\nБез модификатора Kotlin использует `public`."),
    content("this", "```kotlin\nclass User(name: String) {\n    val name: String\n\n    init { this.name = name.trim() }\n}\n```\n`this` указывает на текущий объект и помогает различить одноимённые значения."),
    content("Вторичный конструктор", "```kotlin\nclass User(val name: String, val age: Int) {\n    constructor(name: String) : this(name, 0)\n}\n```\nВ Kotlin значения по умолчанию и фабричные функции часто проще вторичного конструктора."),

    section("Инкапсуляция", "Состояние изменяется только через правила объекта", "Студент отличает ограничение доступа от полноценной инкапсуляции."),
    { type: "content", layout: "statement", title: "Вопрос группе: private и инкапсуляция", body: "Поле объявили `private`. Получили ли мы инкапсуляцию автоматически?", notes: "Дать группе 30–60 секунд. Ответ на следующем слайде." },
    content("private как механизм", "`private` ограничивает доступ. Инкапсуляция требует ещё и безопасных публичных операций, которые сохраняют правила объекта."),
    content("Инкапсуляция счёта", "```kotlin\nclass Account(initialBalance: Long) {\n    var balance: Long = initialBalance\n        private set\n\n    init { require(initialBalance >= 0) }\n\n    fun deposit(amount: Long) {\n        require(amount > 0)\n        balance += amount\n    }\n}\n```"),
    practice("Модель счёта", "Создайте `Account`: id и owner доступны для чтения, balance нельзя менять снаружи, отрицательный начальный баланс запрещён, deposit принимает только положительную сумму.", "Используйте свойства `val`, `private set`, проверку в `init` и `require` внутри `deposit`."),

    section("Связи между типами", "Наследование, интерфейс и композиция решают разные задачи", "Студент выбирает подходящий способ связать типы."),
    content("Четыре идеи ООП", "- Инкапсуляция защищает состояние и правила\n- Абстракция оставляет существенный контракт\n- Наследование создаёт отношение «является»\n- Полиморфизм позволяет работать через общий тип"),
    content("Классы final по умолчанию", "```kotlin\nopen class Operation(val amount: Long)\nclass Income(amount: Long) : Operation(amount)\n```\n`open` явно разрешает наследование. [Наследование](https://kotlinlang.org/docs/inheritance.html)"),
    content("Переопределение", "```kotlin\nopen class Operation {\n    open fun sign(): Int = 1\n}\nclass Expense : Operation() {\n    override fun sign(): Int = -1\n}\n```"),
    content("Абстрактный класс", "```kotlin\nabstract class Operation(val amount: Long) {\n    abstract fun apply(balance: Long): Long\n}\nclass Income(amount: Long) : Operation(amount) {\n    override fun apply(balance: Long) = balance + amount\n}\n```"),
    content("Интерфейс", "```kotlin\ninterface Printable {\n    fun format(): String\n}\nclass Receipt(val total: Long) : Printable {\n    override fun format() = \"Итого: $total\"\n}\n```\nИнтерфейс задаёт контракт. [Интерфейсы](https://kotlinlang.org/docs/interfaces.html)"),
    content("Полиморфизм", "```kotlin\nfun printItem(item: Printable) {\n    println(item.format())\n}\nprintItem(Receipt(500))\n```\nФункция зависит от общего контракта, а объект выбирает реализацию."),
    content("Композиция", "```kotlin\nclass Account(private val formatter: Printable) {\n    fun printSummary() = println(formatter.format())\n}\n```\nКомпозиция выражает отношение «использует» и позволяет заменить зависимость."),
    content("Наследование или композиция", "| Связь | Инструмент |\n| Тип действительно является частным случаем другого | наследование |\n| Объект использует другой объект для работы | композиция |\n| Нескольким типам нужен общий контракт | интерфейс |"),

    section("Специальные классы Kotlin", "Тип выражает ограничения предметной области", "Студент выбирает data class, enum, sealed или object."),
    content("data class", "```kotlin\ndata class Transaction(\n    val id: Long,\n    val amount: Long,\n    val comment: String?\n)\n```\nКомпилятор создаёт сравнение по значениям, `toString`, `copy` и деструктуризацию."),
    content("copy и деструктуризация", "```kotlin\nval original = Transaction(1, 500, null)\nval edited = original.copy(comment = \"Кофе\")\nval (id, amount, comment) = edited\n```\n`copy` создаёт новый объект с выбранными изменениями."),
    content("enum class", "```kotlin\nenum class TransactionType {\n    INCOME, EXPENSE\n}\n```\nEnum подходит для небольшого фиксированного набора однотипных значений."),
    content("sealed interface", "```kotlin\nsealed interface AddResult {\n    data class Success(val item: Transaction) : AddResult\n    data class Error(val message: String) : AddResult\n}\n```\nSealed-тип подходит для ограниченных вариантов с разными данными."),
    content("Исчерпывающий when", "```kotlin\nfun message(result: AddResult): String = when (result) {\n    is AddResult.Success -> \"Добавлено: ${result.item.id}\"\n    is AddResult.Error -> result.message\n}\n```\nКомпилятор проверяет, что обработаны все варианты."),
    content("object и companion object", "```kotlin\nobject IdGenerator {\n    private var next = 1L\n    fun nextId() = next++\n}\nclass Account {\n    companion object { const val MAX_NAME_LENGTH = 50 }\n}\n```"),
    content("Что выбрать", "| Задача | Инструмент |\n| Объект-значение | `data class` |\n| Простые фиксированные варианты | `enum class` |\n| Варианты с разными данными | `sealed` |\n| Общий контракт | `interface` |\n| Единственный экземпляр | `object` |"),
    practice("Финальная модель", "Создайте Transaction с id, суммой, типом и nullable-комментарием. Тип операции задайте через enum, результат добавления через sealed-интерфейс.", "Соедините `data class Transaction`, `enum class TransactionType` и `sealed interface AddResult`. Функция добавления возвращает Success для положительной суммы и Error в остальных случаях."),

    section("Функции как данные", "Лямбда передаёт правило обработки", "Студент читает функциональные типы и строит цепочки операций."),
    content("Лямбда", "```kotlin\nval isExpense: (Transaction) -> Boolean = { transaction ->\n    transaction.type == TransactionType.EXPENSE\n}\n```\nФункциональный тип описывает параметры и результат функции."),
    content("Параметр it", "```kotlin\nval positive: (Long) -> Boolean = { it > 0 }\n```\nДля одного параметра Kotlin предоставляет имя `it`. Явное имя полезно, когда смысл параметра неочевиден."),
    content("Функция высшего порядка", "```kotlin\nfun select(\n    items: List<Transaction>,\n    predicate: (Transaction) -> Boolean\n): List<Transaction> = items.filter(predicate)\n```\nФункция высшего порядка принимает функцию или возвращает её."),
    content("Trailing lambda", "```kotlin\nval expenses = select(transactions) { transaction ->\n    transaction.type == TransactionType.EXPENSE\n}\n```\nПоследнюю лямбду можно вынести за круглые скобки."),
    content("Цепочка преобразований", "```kotlin\nval labels = transactions\n    .filter { it.amount > 0 }\n    .sortedByDescending { it.amount }\n    .map { \"${it.id}: ${it.amount}\" }\n```\nКаждая операция получает результат предыдущей."),
    content("Проверки набора", "```kotlin\nval hasLarge = transactions.any { it.amount > 10_000 }\nval allValid = transactions.all { it.amount > 0 }\nval expenseCount = transactions.count {\n    it.type == TransactionType.EXPENSE\n}\n```"),
    content("Безопасный поиск", "```kotlin\nval item = transactions.find { it.id == targetId }\nval first = transactions.firstOrNull()\n```\nОбе операции возвращают nullable-значение, если элемент отсутствует."),
    content("Группировка и индекс", "```kotlin\nval byType = transactions.groupBy { it.type }\nval byId = transactions.associateBy { it.id }\n```\n`groupBy` хранит список для каждого ключа. `associateBy` хранит одно значение."),
    content("fold", "```kotlin\nval balance = transactions.fold(0L) { total, item ->\n    total + item.amount\n}\n```\n`fold` переносит накопленный результат от одного элемента к следующему."),
    content("Sequence", "```kotlin\nval result = transactions.asSequence()\n    .filter { it.amount > 0 }\n    .map { it.amount }\n    .take(10)\n    .toList()\n```\nSequence вычисляет элементы по мере запроса. Для коротких списков обычной цепочки обычно достаточно."),
    content("Ссылка на функцию", "```kotlin\nfun isValid(item: Transaction) = item.amount > 0\n\nval valid = transactions.filter(::isValid)\n```\nСсылка `::isValid` передаёт существующую функцию как значение."),
    content("Функциональная стратегия", "```kotlin\ntypealias FeePolicy = (Long) -> Long\n\nval noFee: FeePolicy = { 0L }\nval percentFee: FeePolicy = { amount -> amount / 100 }\n```\nНебольшое изменяемое правило можно представить функцией."),

    section("Закрепление", "Модель должна выражать данные и защищать правила", "Студент проверяет решения и получает домашнее задание."),
    content("Мини-тест", "1. Чем параметр конструктора отличается от свойства?\n2. Зачем нужен `private set`?\n3. Когда подходит интерфейс?\n4. Чем sealed отличается от enum?\n5. Когда композиция проще наследования?"),
    { type: "homework", title: "Домашнее задание", badge: "Домашнее задание", body: "- Создать предметную модель минимум из трёх типов\n- Защитить изменяемое состояние\n- Добавить интерфейс и две реализации\n- Использовать data class и sealed-результат\n- Хранить объекты в коллекции\n- Открыть PR из `lecture-03`" },
    content("Что дальше", "- Лекция 4 использует модели и коллекции вместе\n- Добавим лямбды, обработку ошибок и простые паттерны\n- Затем перенесём обычный Kotlin-код в первое Android-приложение"),
    { type: "section", title: "Вопросы", subtitle: "Классы, инкапсуляция, связи между типами", body: "- Какое правило должна защищать ваша модель?\n- Где нужен общий контракт?\n- Какой тип лучше описывает варианты состояния?" }
  ].map((slide) => {
    if (slide.type !== "practice") return slide;
    const shortQuestions = {
      "Модель счёта": {
        body: "Какой модификатор позволит читать `balance` снаружи, но запретит прямое изменение?",
        solution: "Свойство `var balance` с модификатором `private set`."
      },
      "Финальная модель": {
        body: "Что выбрать для фиксированных типов операции, а что для результата с разными данными?",
        solution: "Для типов операции подходит `enum`, для результата с разными данными подходит `sealed interface`."
      }
    };
    return {
      ...slide,
      type: "content",
      title: `Короткий вопрос: ${slide.title.toLowerCase()}`,
      badge: "Короткий ответ",
      ...shortQuestions[slide.title]
    };
  }).filter((slide) =>
    slide.badge !== "Короткий ответ" &&
    slide.title !== "Мини-тест"
  )
};
