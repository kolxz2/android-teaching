const md = (...lines) => lines.join("\n");

const testBlock = (tests) => md(
  "**Проверки в `main()`:**",
  ...tests.map((test) => `- \`${test.call}\` → \`${test.expected}\``)
);

const tasks = [
  {
    name: "Класс Counter",
    minutes: 12,
    body: md(
      "Создайте класс `Counter` с неизменяемым свойством `name`, изменяемым свойством `value` и методом `increment(step: Int)`. Шаг должен быть положительным. Добавьте метод `hasReached(target: Int): Boolean`.",
      "",
      "Стартовый код:",
      "```kotlin",
      "class Counter(/* параметры */) {",
      "    // свойства и методы",
      "}",
      "",
      "fun main() {",
      "    val counter = Counter(\"Загрузка\", 55)",
      "    counter.increment(10)",
      "    println(counter.value)",
      "    println(counter.hasReached(60))",
      "}",
      "```",
      testBlock([
        { call: "Counter(\"Загрузка\", 55) + 10", expected: "65; true" },
        { call: "Counter(\"Шаги\", 0)", expected: "0; false" },
        { call: "increment(0)", expected: "ошибка IllegalArgumentException" }
      ])
    ),
    hint: "Параметры конструктора можно сразу объявить свойствами через `val` и `var`. Проверку аргумента сделайте с помощью `require(value > 0)`.",
    solution: md(
      "```kotlin",
      "class Counter(val name: String, var value: Int) {",
      "    fun increment(step: Int) {",
      "        require(step > 0) { \"Шаг должен быть положительным\" }",
      "        value += step",
      "    }",
      "",
      "    fun hasReached(target: Int): Boolean = value >= target",
      "}",
      "```",
      "`Counter(...)` создаёт объект. `value` хранит его состояние, а методы описывают поведение."
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
      title: "Часть 2. Встречаем Jetpack Compose",
      subtitle: "FinanceApp · 22 минуты",
      body: "Ничего не заучиваем. Наша задача — увидеть, как знакомые классы, функции и лямбды используются в Compose-проекте."
    },
    {
      type: "content",
      title: "Карта Compose-проекта",
      badge: "Android Studio",
      body: "1. `AndroidManifest.xml` — сообщает системе о стартовой Activity.\n2. `MainActivity.kt` — Kotlin-класс, который размещает Compose UI через `setContent`.\n3. `ui/theme` — цветовая схема, типографика и тема Material 3.\n4. `res/values/strings.xml` — пользовательские тексты для `stringResource`.\n\nДополнительно: локальные тесты запускаются на компьютере, инструментальные — на устройстве или эмуляторе."
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
        "class MainActivity : ComponentActivity() {",
        "    override fun onCreate(savedInstanceState: Bundle?) {",
        "        super.onCreate(savedInstanceState)",
        "        setContent { FinanceAppTheme { FinanceScreen() } }",
        "    }",
        "}",
        "```",
        "- `: ComponentActivity()` — наследование от готового Android-класса.\n- `override` — своя реализация метода родителя.\n- `Bundle?` — параметр может быть `null`.\n- `setContent` задаёт корень Compose-интерфейса."
      )
    },
    {
      type: "content",
      title: "Composable-функция описывает интерфейс",
      badge: "FinanceScreen.kt",
      body: md(
        "```kotlin",
        "@Composable",
        "fun FinanceScreen() {",
        "    Column(modifier = Modifier.padding(16.dp)) {",
        "        Text(text = stringResource(R.string.test_screen_message))",
        "        Button(onClick = { /* событие */ }) {",
        "            Text(stringResource(R.string.check_button))",
        "        }",
        "    }",
        "}",
        "```",
        "Composable-функции декларативно описывают текущий интерфейс. `Modifier` настраивает расположение и внешний вид, а лямбда `onClick` сообщает о событии."
      )
    },
    {
      type: "content",
      title: "Состояние управляет интерфейсом",
      badge: "rememberSaveable",
      body: md(
        "```kotlin",
        "var checked by rememberSaveable { mutableStateOf(false) }",
        "Button(onClick = { checked = true }) {",
        "    Text(if (checked) \"Готово\" else \"Проверить\")",
        "}",
        "```",
        "Compose читает состояние и перестраивает затронутую часть интерфейса после его изменения. UI не ищет и не изменяет View-объекты вручную."
      )
    },
    {
      type: "content",
      title: "Событие — обычная лямбда",
      badge: "Объекты и поведение",
      body: md(
        "```kotlin",
        "@Composable",
        "fun CheckButton(onCheck: () -> Unit) {",
        "    Button(onClick = onCheck) { Text(\"Проверить\") }",
        "}",
        "```",
        "1. Composable получает событие как параметр.\n2. `Button` получает эту лямбду в `onClick`.\n3. Пользователь нажимает кнопку.\n4. Compose вызывает лямбду.\n5. Владелец состояния решает, как изменить данные."
      )
    },
    {
      type: "practice",
      title: "Экскурсия: найдите знакомые конструкции",
      badge: "Работа в парах · 7 минут",
      body: "Откройте `MainActivity.kt` и файл экрана. Покажите друг другу:\n\n- [ ] объявление класса и родительский класс\n- [ ] переопределённый метод\n- [ ] вызов реализации родителя\n- [ ] `setContent`\n- [ ] аннотацию `@Composable`\n- [ ] параметры composable-функции\n- [ ] `Modifier`\n- [ ] лямду `onClick`\n- [ ] чтение строкового ресурса\n- [ ] чтение и изменение состояния\n\nПосле этого объясните путь события от нажатия до нового UI."
    },
    {
      type: "practice",
      title: "Первое безопасное изменение",
      badge: "Android Studio · 6 минут",
      body: "1. Откройте composable-функцию экрана.\n2. Найдите `Text`, `Button` и обработчик `onClick`.\n3. Добавьте локальное состояние через `rememberSaveable`.\n4. После нажатия меняйте текст на экране.\n5. Запустите приложение и проверьте поведение после поворота.\n\nПользовательские строки оставьте в `strings.xml` и читайте через `stringResource`."
    },
    {
      type: "content",
      title: "Что пока можно считать чёрным ящиком",
      badge: "Не перегружаемся",
      body: "Сегодня не требуется понимать подробно:\n\n- как работает Gradle и весь `build.gradle.kts`;\n- как устроены рекомпозиция и snapshot system;\n- зачем нужны системные insets;\n- все состояния жизненного цикла Activity;\n- разницу между локальными и инструментальными тестами.\n\nДостаточно видеть границы: Android создаёт Activity, Activity вызывает `setContent`, а composable-функции показывают состояние и отправляют события."
    },
    {
      type: "homework",
      title: "Exit ticket",
      badge: "Последние 2 минуты",
      body: "Закончите три фразы:\n\n1. `MainActivity` — это класс, который наследуется от …\n2. `setContent { ... }` задаёт …\n3. Код в `onClick = { ... }` называется … и выполняется, когда …\n\nПрактика завершена, если четыре задания запускаются в Playground, приложение стартует, а студент может объяснить путь `manifest → MainActivity → setContent → composable → state`."
    }
  ]
};
