const md = (...lines) => lines.join("\n");

const testBlock = (tests) => md(
  "**Проверки в `main()`:**",
  ...tests.map((test) => `- \`${test.call}\` → \`${test.expected}\``)
);

const tasks = [
  {
    name: "Класс Student",
    minutes: 12,
    body: md(
      "Создайте класс `Student` с неизменяемым свойством `name`, изменяемым свойством `points` и методом `addPoints(value: Int)`. Метод принимает только положительное количество баллов. Добавьте метод `isPassed(): Boolean`: студент с 60 баллами или больше сдал курс.",
      "",
      "Стартовый код:",
      "```kotlin",
      "class Student(/* параметры */) {",
      "    // свойства и методы",
      "}",
      "",
      "fun main() {",
      "    val student = Student(\"Аня\", 55)",
      "    student.addPoints(10)",
      "    println(student.points)",
      "    println(student.isPassed())",
      "}",
      "```",
      testBlock([
        { call: "Student(\"Аня\", 55) + 10", expected: "65; true" },
        { call: "Student(\"Борис\", 0)", expected: "0; false" },
        { call: "addPoints(0)", expected: "ошибка IllegalArgumentException" }
      ])
    ),
    hint: "Параметры конструктора можно сразу объявить свойствами через `val` и `var`. Проверку аргумента сделайте с помощью `require(value > 0)`.",
    solution: md(
      "```kotlin",
      "class Student(val name: String, var points: Int) {",
      "    fun addPoints(value: Int) {",
      "        require(value > 0) { \"Баллы должны быть положительными\" }",
      "        points += value",
      "    }",
      "",
      "    fun isPassed(): Boolean = points >= 60",
      "}",
      "```",
      "`Student(...)` создаёт объект. `points` хранит его состояние, а методы описывают поведение."
    )
  },
  {
    name: "Безопасный счёт",
    minutes: 15,
    body: md(
      "Реализуйте `BankAccount`. Баланс можно прочитать снаружи, но нельзя присвоить напрямую. Деньги изменяются только методами `deposit(amount)` и `withdraw(amount)`. Оба принимают только положительную сумму. `withdraw` возвращает `false` и не меняет баланс, если денег недостаточно.",
      "",
      "Стартовый код:",
      "```kotlin",
      "class BankAccount(initialBalance: Int) {",
      "    var balance: Int = initialBalance",
      "        // запретить внешний set",
      "",
      "    fun deposit(amount: Int) { TODO() }",
      "    fun withdraw(amount: Int): Boolean = TODO()",
      "}",
      "",
      "fun main() {",
      "    val account = BankAccount(1_000)",
      "    account.deposit(500)",
      "    println(account.withdraw(1_200))",
      "    println(account.balance)",
      "    println(account.withdraw(500))",
      "}",
      "```",
      testBlock([
        { call: "1000 → deposit(500) → withdraw(1200)", expected: "true; баланс 300" },
        { call: "баланс 300 → withdraw(500)", expected: "false; баланс 300" },
        { call: "deposit(-1)", expected: "ошибка IllegalArgumentException" }
      ])
    ),
    hint: "Оставьте геттер публичным, а сеттер сделайте `private set`. В `withdraw` сначала проверьте сумму, затем достаточность баланса.",
    solution: md(
      "```kotlin",
      "class BankAccount(initialBalance: Int) {",
      "    var balance: Int = initialBalance",
      "        private set",
      "",
      "    init { require(initialBalance >= 0) }",
      "",
      "    fun deposit(amount: Int) {",
      "        require(amount > 0)",
      "        balance += amount",
      "    }",
      "",
      "    fun withdraw(amount: Int): Boolean {",
      "        require(amount > 0)",
      "        if (amount > balance) return false",
      "        balance -= amount",
      "        return true",
      "    }",
      "}",
      "```",
      "Инкапсуляция не скрывает всё: читать баланс можно, ломать состояние прямым присваиванием нельзя."
    )
  },
  {
    name: "История операций",
    minutes: 15,
    body: md(
      "Создайте `enum class OperationType` со значениями `INCOME` и `EXPENSE`, затем `data class Operation(title, amount, type)`. Напишите `expenseTitles`: оставить только расходы, отсортировать по сумме от большей к меньшей и вернуть строки вида `Кофе: 250 ₽`. Напишите `balance`: сумма доходов минус сумма расходов.",
      "",
      "```kotlin",
      "enum class OperationType { /* ... */ }",
      "data class Operation(/* ... */)",
      "",
      "fun expenseTitles(",
      "    items: List<Operation>",
      "): List<String> = TODO()",
      "fun balance(",
      "    items: List<Operation>",
      "): Int = TODO()",
      "",
      "fun main() {",
      "    val income = OperationType.INCOME",
      "    val expense = OperationType.EXPENSE",
      "    val items = listOf(",
      "        Operation(\"Зарплата\", 80_000, income),",
      "        Operation(\"Кофе\", 250, expense),",
      "        Operation(\"Книги\", 1_500, expense)",
      "    )",
      "    println(expenseTitles(items))",
      "    println(balance(items))",
      "}",
      "```",
      testBlock([
        { call: "expenseTitles(items)", expected: "[Книги: 1500 ₽, Кофе: 250 ₽]" },
        { call: "balance(items)", expected: "78250" },
        { call: "expenseTitles(emptyList())", expected: "[]" }
      ])
    ),
    hint: "Для первой функции соберите `filter → sortedByDescending → map`. Для баланса можно использовать один `sumOf` с `when` внутри.",
    solution: md(
      "```kotlin",
      "enum class OperationType { INCOME, EXPENSE }",
      "",
      "data class Operation(",
      "    val title: String,",
      "    val amount: Int,",
      "    val type: OperationType",
      ")",
      "",
      "fun expenseTitles(items: List<Operation>): List<String> = items",
      "    .filter { it.type == OperationType.EXPENSE }",
      "    .sortedByDescending { it.amount }",
      "    .map { \"${it.title}: ${it.amount} ₽\" }",
      "",
      "fun balance(items: List<Operation>): Int = items.sumOf { operation ->",
      "    when (operation.type) {",
      "        OperationType.INCOME -> operation.amount",
      "        OperationType.EXPENSE -> -operation.amount",
      "    }",
      "}",
      "```"
    )
  },
  {
    name: "Комиссия как отдельный объект",
    minutes: 13,
    body: md(
      "Опишите интерфейс `FeePolicy` с методом `fee(amount: Int): Int`. Реализуйте две политики: `NoFee` всегда возвращает 0, `PercentFee(percent)` возвращает целочисленный процент. Класс `TransferCalculator` должен получить политику через конструктор и считать полную сумму списания: перевод + комиссия.",
      "",
      "```kotlin",
      "interface FeePolicy { /* ... */ }",
      "class NoFee : FeePolicy { /* ... */ }",
      "class PercentFee(/* ... */) : FeePolicy { /* ... */ }",
      "class TransferCalculator(/* ... */) { /* ... */ }",
      "",
      "fun main() {",
      "    println(TransferCalculator(NoFee()).total(1_000))",
      "    println(TransferCalculator(PercentFee(2)).total(1_000))",
      "}",
      "```",
      testBlock([
        { call: "NoFee(), amount = 1000", expected: "1000" },
        { call: "PercentFee(2), amount = 1000", expected: "1020" },
        { call: "PercentFee(5), amount = 250", expected: "262" }
      ])
    ),
    hint: "`TransferCalculator` не должен проверять тип политики. Он просто вызывает `policy.fee(amount)`. Это композиция: один объект хранит другой и поручает ему часть работы.",
    solution: md(
      "```kotlin",
      "interface FeePolicy {",
      "    fun fee(amount: Int): Int",
      "}",
      "",
      "class NoFee : FeePolicy {",
      "    override fun fee(amount: Int): Int = 0",
      "}",
      "",
      "class PercentFee(private val percent: Int) : FeePolicy {",
      "    override fun fee(amount: Int): Int = amount * percent / 100",
      "}",
      "",
      "class TransferCalculator(private val policy: FeePolicy) {",
      "    fun total(amount: Int): Int = amount + policy.fee(amount)",
      "}",
      "```",
      "Мы можем подменить стратегию комиссии, не меняя `TransferCalculator`."
    )
  }
];

function slidesForTasks() {
  return tasks.flatMap((task, index) => {
    const number = index + 1;
    const taskId = `oop-task-${number}`;
    return [
      {
        type: "practice",
        title: `${number}. ${task.name}`,
        badge: `${task.minutes} минут · Kotlin Playground`,
        body: task.body,
        timerTaskId: taskId
      },
      {
        type: "content",
        title: `${number}. Подсказка`,
        badge: "Через 5 минут",
        body: "Сначала перечитайте проверки в `main()`. Подсказка откроется через 5 минут после запуска таймера или по паролю преподавателя.",
        timedReveal: { taskId, minutes: 5, label: "Подсказка", content: task.hint }
      },
      {
        type: "content",
        title: `${number}. Разбор решения`,
        badge: "После самостоятельной работы",
        body: "Решение откроется через 12 минут после запуска таймера или по паролю преподавателя. Важно уметь объяснить каждую строку.",
        timedReveal: { taskId, minutes: 12, label: "Решение", content: task.solution }
      }
    ];
  });
}

window.DECK = {
  course: "Android-разработка",
  lecture: "Практика",
  lectureId: "03",
  slug: "kotlin-03-practice",
  title: "Практика 03. Kotlin: ООП и первый Android-проект",
  block: "Язык → Android",
  teacher: "Сучёв Николай Евгеньевич",
  teacherMeta: "Android-разработчик · Т-Банк · команда Вовлечение",
  hub: "../../index.html",
  photo: "../../assets/teacher.jpg",
  slides: [
    {
      type: "title",
      title: "Практика 03",
      subtitle: "Классы в Kotlin и те же идеи внутри Android",
      kicker: "03 / практика",
      body: "Четыре программы пишем и запускаем в Kotlin Playground. Затем открываем пустой `FinanceApp` в Android Studio и находим в настоящем проекте знакомые конструкции: класс, наследование, `override`, nullable-параметр, generic и лямбду."
    },
    {
      type: "content",
      title: "Маршрут на 90 минут",
      badge: "План",
      body: "- 0–5: открыть [Kotlin Playground](https://play.kotlinlang.org/) и проверить `main()`\n- 5–60: четыре задания от класса до интерфейса и композиции\n- 60–65: перерыв, запуск `FinanceApp`\n- 65–82: экскурсия по файлам пустого Android-проекта\n- 82–88: изменить строковый ресурс и запустить приложение\n- 88–90: короткая самопроверка"
    },
    {
      type: "content",
      title: "Как работаем в Playground",
      badge: "Перед стартом",
      body: "1. Откройте [play.kotlinlang.org](https://play.kotlinlang.org/).\n2. Выберите Kotlin/JVM и оставьте функцию `main()`.\n3. Копируйте стартовый код задачи целиком.\n4. Сначала прочитайте проверки и предскажите результат.\n5. Нажимайте Run после каждого небольшого изменения.\n\nAndroid-импорты в Playground недоступны — до Android-блока пишем только чистый Kotlin."
    },
    {
      type: "section",
      title: "Часть 1. Моделируем данные",
      subtitle: "Kotlin Playground · 55 минут",
      body: "Класс → инкапсуляция → data class и enum → интерфейс и композиция"
    },
    ...slidesForTasks(),
    {
      type: "section",
      title: "Часть 2. Встречаем Android",
      subtitle: "FinanceApp · 22 минуты",
      body: "Ничего не заучиваем. Наша задача — увидеть, что Android-проект тоже состоит из классов, объектов, методов и связей между ними."
    },
    {
      type: "content",
      title: "Карта проекта: четыре остановки",
      badge: "Android Studio",
      body: "1. `AndroidManifest.xml` — сообщает системе, какие компоненты есть в приложении.\n2. `MainActivity.kt` — Kotlin-класс первого экрана и его поведение.\n3. `res/layout/activity_main.xml` — описание дерева объектов интерфейса.\n4. `res/values/strings.xml` — тексты отдельно от кода и разметки.\n\nДополнительно: `ExampleUnitTest` запускается на компьютере, `ExampleInstrumentedTest` — на Android-устройстве или эмуляторе."
    },
    {
      type: "content",
      title: "Кто запускает MainActivity?",
      badge: "AndroidManifest.xml",
      body: md(
        "```xml",
        "<activity",
        "    android:name=\".MainActivity\"",
        "    android:exported=\"true\">",
        "    <intent-filter>",
        "        <action android:name=\"android.intent.action.MAIN\" />",
        "        <category android:name=\"android.intent.category.LAUNCHER\" />",
        "    </intent-filter>",
        "</activity>",
        "```",
        "Android читает manifest, создаёт объект `MainActivity` и вызывает его методы. Мы не пишем `MainActivity()` и не вызываем `onCreate()` сами."
      )
    },
    {
      type: "content",
      title: "MainActivity — знакомый Kotlin-класс",
      badge: "Наследование и override",
      body: md(
        "```kotlin",
        "class MainActivity : AppCompatActivity() {",
        "    override fun onCreate(savedInstanceState: Bundle?) {",
        "        super.onCreate(savedInstanceState)",
        "        setContentView(R.layout.activity_main)",
        "    }",
        "}",
        "```",
        "- `: AppCompatActivity()` — наследование от готового Android-класса.\n- `override` — своя реализация метода родителя.\n- `Bundle?` — параметр может быть `null`.\n- `super.onCreate(...)` — сначала даём родителю выполнить его часть работы."
      )
    },
    {
      type: "content",
      title: "XML превращается в объекты",
      badge: "activity_main.xml",
      body: md(
        "```xml",
        "<TextView",
        "    android:id=\"@+id/statusText\"",
        "    android:text=\"@string/test_screen_message\" />",
        "",
        "<Button",
        "    android:id=\"@+id/checkButton\"",
        "    android:text=\"@string/check_button\" />",
        "```",
        "`TextView` и `Button` — имена классов Android. При `setContentView(...)` система читает XML и создаёт объекты этих классов. Атрибуты задают их свойства. `@+id/...` даёт объекту идентификатор."
      )
    },
    {
      type: "content",
      title: "R — сгенерированный класс-связка",
      badge: "Код ↔ ресурсы",
      body: md(
        "```kotlin",
        "setContentView(R.layout.activity_main)",
        "val statusText = findViewById<TextView>(R.id.statusText)",
        "```",
        "`R` не написан вручную: Android Gradle Plugin генерирует его из файлов в `res`. Внутри есть идентификаторы `layout`, `id`, `string` и других ресурсов.\n\n`findViewById<TextView>` — generic-функция: мы сообщаем ожидаемый тип найденного объекта."
      )
    },
    {
      type: "content",
      title: "Нажатие — обычная лямбда",
      badge: "Объекты и поведение",
      body: md(
        "```kotlin",
        "findViewById<Button>(R.id.checkButton).setOnClickListener {",
        "    statusText.setText(R.string.check_success_message)",
        "}",
        "```",
        "1. Находим объект `Button`.\n2. Передаём в его метод лямбду — действие на будущее.\n3. Android хранит listener.\n4. Пользователь нажимает кнопку — Android вызывает лямбду.\n5. У объекта `TextView` вызывается `setText`."
      )
    },
    {
      type: "practice",
      title: "Экскурсия: найдите 10 знакомых конструкций",
      badge: "Работа в парах · 7 минут",
      body: "Откройте `MainActivity.kt` и покажите друг другу:\n\n- [ ] объявление класса и родительский класс\n- [ ] переопределённый метод\n- [ ] вызов реализации родителя\n- [ ] nullable-параметр\n- [ ] generic-вызов с `TextView`\n- [ ] объект класса `Button`\n- [ ] лямбду-обработчик\n- [ ] обращение к сгенерированному классу `R`\n- [ ] два идентификатора из XML\n- [ ] изменение состояния объекта `TextView`\n\nПосле этого один студент объясняет путь события от нажатия до нового текста."
    },
    {
      type: "practice",
      title: "Первое безопасное изменение",
      badge: "Android Studio · 6 минут",
      body: "1. Откройте `res/values/strings.xml`.\n2. Найдите ресурсы `check_button` и `check_success_message`.\n3. Измените оба текста, не меняя их имена.\n4. Запустите приложение.\n5. Нажмите кнопку и проверьте новый текст.\n\nПочему начинаем со `strings.xml`: Kotlin-код и XML уже ссылаются на имена ресурсов, поэтому меняется содержимое, а связи между объектами остаются прежними."
    },
    {
      type: "content",
      title: "Что пока можно считать чёрным ящиком",
      badge: "Не перегружаемся",
      body: "Сегодня не требуется понимать подробно:\n\n- как работает Gradle и весь `build.gradle.kts`;\n- зачем нужны `enableEdgeToEdge` и системные insets;\n- все состояния жизненного цикла Activity;\n- правила ConstraintLayout;\n- разницу между локальными и инструментальными тестами.\n\nДостаточно видеть границы: Android создаёт Activity, Activity создаёт интерфейс из XML, а объекты View реагируют на события."
    },
    {
      type: "homework",
      title: "Exit ticket",
      badge: "Последние 2 минуты",
      body: "Закончите три фразы:\n\n1. `MainActivity` — это класс, который наследуется от …\n2. После `setContentView(...)` XML превращается в …\n3. Код внутри `setOnClickListener { ... }` называется … и выполняется, когда …\n\n**Сдано, если:** четыре задания запускаются в Playground, приложение стартует, а студент может объяснить путь `manifest → MainActivity → XML → Button → TextView`."
    }
  ]
};
