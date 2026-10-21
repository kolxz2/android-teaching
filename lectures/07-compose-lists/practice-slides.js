window.DECK = {
  "course": "Android-разработка",
  "lecture": 7,
  "lectureId": "07",
  "slug": "07-compose-lists",
  "disableCopy": true,
  "title": "Практика 7. ViewModel и экран транзакции",
  "block": "Основы Android",
  "teacher": "Сучёв Николай Евгеньевич",
  "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
  "hub": "index.html",
  "photo": "../../assets/teacher.jpg",
  "slides": [
    {
      "type": "title",
      "title": "Практика 07",
      "subtitle": "Экран транзакции с ViewModel",
      "kicker": "Работаем вместе",
      "body": "FinanceApp · ветка `lecture-07` от `lecture-04`\n\nНа каждом слайде: **куда добавить код**, **что он делает** и **как проверить шаг**.",
      "theory": "Это отдельная практическая презентация. Код берём из FinanceApp. Преподаватель сначала показывает место в файле, затем студенты повторяют и проверяют результат."
    },
    {
      "type": "content",
      "title": "Как устроен экран",
      "image": "architecture-viewmodel.svg",
      "imageKind": "visual",
      "imageAlt": "События идут из Compose UI во ViewModel, состояние возвращается в UI",
      "body": "Поле и кнопка отправляют события. ViewModel принимает их и меняет `MainUiState`. Compose читает новый снимок и обновляет экран.",
      "theory": "Пройдите по стрелкам диаграммы. Отдельно покажите, что Activity владеет ViewModel, но не рассчитывает баланс."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 1. Создайте ветку",
      "body": "**Где:** Терминал в корне FinanceApp. Начните с чистого `lecture-04`.\n\n```shell\ngit switch lecture-04\ngit switch -c lecture-07\n```\n\n**Зачем:** практика развивается от версии с событиями и reducer.\n\n**Проверьте:** `git branch --show-current` выводит `lecture-07`.",
      "notes": "Покажите файл и место вставки. Объясните: практика развивается от версии с событиями и reducer.",
      "theory": "### Место в проекте\nТерминал в корне FinanceApp. Начните с чистого `lecture-04`.\n\n### Причина изменения\nпрактика развивается от версии с событиями и reducer.\n\n### Проверка\n`git branch --show-current` выводит `lecture-07`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 2. Сохраните код лекции 4",
      "body": "**Где:** `app/src/main/java/com/example/financeapp/`: создайте пакет `legacy`, перенесите в него `FinanceAppScreen.kt` и старый `MainUiState.kt`.\n\n```kotlin\npackage com.example.financeapp.legacy\n\n// В старом FinanceAppScreen.kt дополнительно:\nimport com.example.financeapp.R\nimport com.example.financeapp.FinanceAppTheme\n```\n\n**Зачем:** старый экран остаётся доступен для сравнения и не конфликтует с новыми моделями.\n\n**Проверьте:** оба файла лежат в `legacy`; `MainActivity` позже откроет новый экран.",
      "notes": "Покажите файл и место вставки. Объясните: старый экран остаётся доступен для сравнения и не конфликтует с новыми моделями.",
      "theory": "### Место в проекте\n`app/src/main/java/com/example/financeapp/`: создайте пакет `legacy`, перенесите в него `FinanceAppScreen.kt` и старый `MainUiState.kt`.\n\n### Причина изменения\nстарый экран остаётся доступен для сравнения и не конфликтует с новыми моделями.\n\n### Проверка\nоба файла лежат в `legacy`; `MainActivity` позже откроет новый экран."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 3. Укажите версию Lifecycle",
      "body": "**Где:** `gradle/libs.versions.toml`, существующий раздел `[versions]`. Добавьте одну строку, второй заголовок `[versions]` не создавайте.\n\n```toml\nlifecycle = \"2.10.0\"\n```\n\n**Зачем:** версия будет общей для AndroidX Lifecycle зависимости.\n\n**Проверьте:** в TOML только один раздел `[versions]`.",
      "notes": "Покажите файл и место вставки. Объясните: версия будет общей для AndroidX Lifecycle зависимости.",
      "theory": "### Место в проекте\n`gradle/libs.versions.toml`, существующий раздел `[versions]`. Добавьте одну строку, второй заголовок `[versions]` не создавайте.\n\n### Причина изменения\nверсия будет общей для AndroidX Lifecycle зависимости.\n\n### Проверка\nв TOML только один раздел `[versions]`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 4. Добавьте alias библиотеки",
      "body": "**Где:** Тот же `gradle/libs.versions.toml`, существующий раздел `[libraries]`.\n\n```toml\nandroidx-lifecycle-viewmodel-compose = {\n    group = \"androidx.lifecycle\",\n    name = \"lifecycle-viewmodel-compose\",\n    version.ref = \"lifecycle\"\n}\n```\n\n**Зачем:** alias связывает координаты библиотеки с версией из предыдущего шага.\n\n**Проверьте:** Android Studio распознаёт `libs.androidx.lifecycle.viewmodel.compose`.",
      "notes": "Покажите файл и место вставки. Объясните: alias связывает координаты библиотеки с версией из предыдущего шага.",
      "theory": "### Место в проекте\nТот же `gradle/libs.versions.toml`, существующий раздел `[libraries]`.\n\n### Причина изменения\nalias связывает координаты библиотеки с версией из предыдущего шага.\n\n### Проверка\nAndroid Studio распознаёт `libs.androidx.lifecycle.viewmodel.compose`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 5. Подключите библиотеку в app",
      "body": "**Где:** `app/build.gradle.kts`, внутрь существующего блока `dependencies { ... }`.\n\n```kotlin\nimplementation(libs.androidx.lifecycle.viewmodel.compose)\n```\n\n**Зачем:** библиотека даёт composable-функцию `viewModel()` для получения экземпляра ViewModel.\n\n**Проверьте:** нажмите **Sync Project with Gradle Files**; ошибок зависимости нет.",
      "notes": "Покажите файл и место вставки. Объясните: библиотека даёт composable-функцию `viewModel()` для получения экземпляра ViewModel.",
      "theory": "### Место в проекте\n`app/build.gradle.kts`, внутрь существующего блока `dependencies { ... }`.\n\n### Причина изменения\nбиблиотека даёт composable-функцию `viewModel()` для получения экземпляра ViewModel.\n\n### Проверка\nнажмите **Sync Project with Gradle Files**; ошибок зависимости нет."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 6. Объявите тип и ошибку",
      "body": "**Где:** Создайте новый `MainUiState.kt` в пакете `com.example.financeapp`.\n\n```kotlin\ninternal enum class TransactionType { INCOME, EXPENSE }\n\ninternal enum class TransactionError {\n    INVALID_INPUT, AMOUNT_TOO_LARGE\n}\n```\n\n**Зачем:** тип операции влияет на знак суммы, а тип ошибки позже выбирает строковый ресурс.\n\n**Проверьте:** новые enum доступны в основном пакете; старые типы остаются в `legacy`.",
      "notes": "Покажите файл и место вставки. Объясните: тип операции влияет на знак суммы, а тип ошибки позже выбирает строковый ресурс.",
      "theory": "### Место в проекте\nСоздайте новый `MainUiState.kt` в пакете `com.example.financeapp`.\n\n### Причина изменения\nтип операции влияет на знак суммы, а тип ошибки позже выбирает строковый ресурс.\n\n### Проверка\nновые enum доступны в основном пакете; старые типы остаются в `legacy`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 7. Опишите готовую транзакцию",
      "body": "**Где:** Ниже enum в `MainUiState.kt`.\n\n```kotlin\ninternal data class Transaction(\n    val amount: Int,\n    val type: TransactionType,\n    val description: String,\n)\n```\n\n**Зачем:** это уже проверенные данные. Текст черновика ещё не транзакция.\n\n**Проверьте:** `Transaction(250, TransactionType.EXPENSE, \"Кофе\")` создаётся без ошибки.",
      "notes": "Покажите файл и место вставки. Объясните: это уже проверенные данные. Текст черновика ещё не транзакция.",
      "theory": "### Место в проекте\nНиже enum в `MainUiState.kt`.\n\n### Причина изменения\nэто уже проверенные данные. Текст черновика ещё не транзакция.\n\n### Проверка\n`Transaction(250, TransactionType.EXPENSE, \"Кофе\")` создаётся без ошибки."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 8. Создайте черновик в UiState",
      "body": "**Где:** В том же `MainUiState.kt` начните `data class MainUiState`.\n\n```kotlin\ninternal data class MainUiState(\n    val amount: String = \"\",\n    val description: String = \"\",\n    val type: TransactionType = TransactionType.EXPENSE,\n```\n\n**Зачем:** поля ввода могут быть пустыми, поэтому сумма формы хранится как `String`.\n\n**Проверьте:** пока не закрывайте `)` класса: добавим остальные поля на следующем слайде.",
      "notes": "Покажите файл и место вставки. Объясните: поля ввода могут быть пустыми, поэтому сумма формы хранится как `String`.",
      "theory": "### Место в проекте\nВ том же `MainUiState.kt` начните `data class MainUiState`.\n\n### Причина изменения\nполя ввода могут быть пустыми, поэтому сумма формы хранится как `String`.\n\n### Проверка\nпока не закрывайте `)` класса: добавим остальные поля на следующем слайде."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 9. Завершите UiState",
      "body": "**Где:** Сразу после поля `type` в `MainUiState.kt`.\n\n```kotlin\n    val balance: Int = 0,\n    val transactionCount: Int = 0,\n    val transactions: List<Transaction> = emptyList(),\n    val error: TransactionError? = null,\n)\n```\n\n**Зачем:** один снимок содержит всё, что экран должен показать.\n\n**Проверьте:** `MainUiState()` создаётся с нулевым балансом и пустой формой.",
      "notes": "Покажите файл и место вставки. Объясните: один снимок содержит всё, что экран должен показать.",
      "theory": "### Место в проекте\nСразу после поля `type` в `MainUiState.kt`.\n\n### Причина изменения\nодин снимок содержит всё, что экран должен показать.\n\n### Проверка\n`MainUiState()` создаётся с нулевым балансом и пустой формой."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 10. Добавьте события ввода",
      "body": "**Где:** Ниже `MainUiState` в том же файле. Начните `sealed interface MainUiEvent`.\n\n```kotlin\ninternal sealed interface MainUiEvent {\n    data class AmountChanged(val value: String) : MainUiEvent\n    data class DescriptionChanged(val value: String) : MainUiEvent\n    data class TypeChanged(val type: TransactionType) : MainUiEvent\n```\n\n**Зачем:** событие описывает действие пользователя; оно само не меняет баланс.\n\n**Проверьте:** оставьте интерфейс открытым до следующего слайда.",
      "notes": "Покажите файл и место вставки. Объясните: событие описывает действие пользователя; оно само не меняет баланс.",
      "theory": "### Место в проекте\nНиже `MainUiState` в том же файле. Начните `sealed interface MainUiEvent`.\n\n### Причина изменения\nсобытие описывает действие пользователя; оно само не меняет баланс.\n\n### Проверка\nоставьте интерфейс открытым до следующего слайда."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 11. Завершите набор событий",
      "body": "**Где:** После `TypeChanged` внутри `MainUiEvent`.\n\n```kotlin\n    data class AddTransaction(val transaction: Transaction) : MainUiEvent\n    data object InvalidTransaction : MainUiEvent\n    data object AmountTooLarge : MainUiEvent\n}\n```\n\n**Зачем:** подтверждение операции и два вида ошибки получают отдельные типы.\n\n**Проверьте:** `MainUiEvent` компилируется; все варианты перечислены явно.",
      "notes": "Покажите файл и место вставки. Объясните: подтверждение операции и два вида ошибки получают отдельные типы.",
      "theory": "### Место в проекте\nПосле `TypeChanged` внутри `MainUiEvent`.\n\n### Причина изменения\nподтверждение операции и два вида ошибки получают отдельные типы.\n\n### Проверка\n`MainUiEvent` компилируется; все варианты перечислены явно."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 12. Создайте ViewModel",
      "body": "**Где:** Новый файл `TransactionViewModel.kt` в основном пакете. Добавьте импорты через IDE.\n\n```kotlin\ninternal class TransactionViewModel : ViewModel() {\n    var uiState by mutableStateOf(MainUiState())\n        private set\n}\n```\n\n**Зачем:** ViewModel владеет состоянием, а `mutableStateOf` сообщает Compose о его изменении.\n\n**Проверьте:** IDE импортирует `ViewModel`, `mutableStateOf`, `getValue`, `setValue`.",
      "notes": "Покажите файл и место вставки. Объясните: ViewModel владеет состоянием, а `mutableStateOf` сообщает Compose о его изменении.",
      "theory": "### Место в проекте\nНовый файл `TransactionViewModel.kt` в основном пакете. Добавьте импорты через IDE.\n\n### Причина изменения\nViewModel владеет состоянием, а `mutableStateOf` сообщает Compose о его изменении.\n\n### Проверка\nIDE импортирует `ViewModel`, `mutableStateOf`, `getValue`, `setValue`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 13. Сделайте вход для событий",
      "body": "**Где:** Внутри `TransactionViewModel`, перед закрывающей `}` класса.\n\n```kotlin\nfun onEvent(event: MainUiEvent) {\n    uiState = reduce(uiState, event)\n}\n```\n\n**Зачем:** экран посылает событие, ViewModel вычисляет и публикует новый снимок.\n\n**Проверьте:** `reduce` пока подсвечен: реализуем его следующими шагами.",
      "notes": "Покажите файл и место вставки. Объясните: экран посылает событие, ViewModel вычисляет и публикует новый снимок.",
      "theory": "### Место в проекте\nВнутри `TransactionViewModel`, перед закрывающей `}` класса.\n\n### Причина изменения\nэкран посылает событие, ViewModel вычисляет и публикует новый снимок.\n\n### Проверка\n`reduce` пока подсвечен: реализуем его следующими шагами."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 14. Начните reducer",
      "body": "**Где:** Там же, ниже `onEvent`. Следующие ветки вставляйте внутрь `when`.\n\n```kotlin\nprivate fun reduce(\n    state: MainUiState, event: MainUiEvent,\n): MainUiState = when (event) {\n    // сюда добавим ветки событий\n}\n```\n\n**Зачем:** `reduce` получает старое состояние и одно событие, затем возвращает новый снимок.\n\n**Проверьте:** временная ошибка неполного `when` исчезнет после всех веток.",
      "notes": "Покажите файл и место вставки. Объясните: `reduce` получает старое состояние и одно событие, затем возвращает новый снимок.",
      "theory": "### Место в проекте\nТам же, ниже `onEvent`. Следующие ветки вставляйте внутрь `when`.\n\n### Причина изменения\n`reduce` получает старое состояние и одно событие, затем возвращает новый снимок.\n\n### Проверка\nвременная ошибка неполного `when` исчезнет после всех веток."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 15. Обработайте сумму формы",
      "body": "**Где:** Вместо комментария внутри `when` метода `reduce`.\n\n```kotlin\nis MainUiEvent.AmountChanged ->\n    if (event.value.all(Char::isDigit))\n        state.copy(amount = event.value, error = null)\n    else state\n```\n\n**Зачем:** цифры обновляют черновик; посторонний символ оставляет состояние прежним.\n\n**Проверьте:** ввод `250` не меняет баланс.",
      "notes": "Покажите файл и место вставки. Объясните: цифры обновляют черновик; посторонний символ оставляет состояние прежним.",
      "theory": "### Место в проекте\nВместо комментария внутри `when` метода `reduce`.\n\n### Причина изменения\nцифры обновляют черновик; посторонний символ оставляет состояние прежним.\n\n### Проверка\nввод `250` не меняет баланс."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 16. Обработайте описание и тип",
      "body": "**Где:** Сразу после ветки `AmountChanged` в том же `when`.\n\n```kotlin\nis MainUiEvent.DescriptionChanged ->\n    state.copy(description = event.value, error = null)\nis MainUiEvent.TypeChanged ->\n    state.copy(type = event.type, error = null)\n```\n\n**Зачем:** каждый ввод меняет только своё поле и снимает прежнюю ошибку.\n\n**Проверьте:** переключение типа не создаёт операцию.",
      "notes": "Покажите файл и место вставки. Объясните: каждый ввод меняет только своё поле и снимает прежнюю ошибку.",
      "theory": "### Место в проекте\nСразу после ветки `AmountChanged` в том же `when`.\n\n### Причина изменения\nкаждый ввод меняет только своё поле и снимает прежнюю ошибку.\n\n### Проверка\nпереключение типа не создаёт операцию."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 17. Обработайте ошибки",
      "body": "**Где:** Следующие ветки внутри `when`, после `TypeChanged`.\n\n```kotlin\nMainUiEvent.InvalidTransaction ->\n    state.copy(error = TransactionError.INVALID_INPUT)\nMainUiEvent.AmountTooLarge ->\n    state.copy(error = TransactionError.AMOUNT_TOO_LARGE)\n```\n\n**Зачем:** состояние хранит смысл ошибки, а текст будет выбран в Compose из `strings.xml`.\n\n**Проверьте:** баланс и история не меняются при ошибке.",
      "notes": "Покажите файл и место вставки. Объясните: состояние хранит смысл ошибки, а текст будет выбран в Compose из `strings.xml`.",
      "theory": "### Место в проекте\nСледующие ветки внутри `when`, после `TypeChanged`.\n\n### Причина изменения\nсостояние хранит смысл ошибки, а текст будет выбран в Compose из `strings.xml`.\n\n### Проверка\nбаланс и история не меняются при ошибке."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 18. Начните добавление операции",
      "body": "**Где:** Последняя ветка `when` в `reduce`, после веток ошибок.\n\n```kotlin\nis MainUiEvent.AddTransaction -> {\n    val tx = event.transaction\n    require(tx.amount > 0)\n    require(tx.description.isNotBlank())\n    // расчёт на следующем слайде\n}\n```\n\n**Зачем:** защитные условия не позволяют добавить операцию с неверными данными напрямую.\n\n**Проверьте:** ветка временно не завершена; продолжайте следующим шагом.",
      "notes": "Покажите файл и место вставки. Объясните: защитные условия не позволяют добавить операцию с неверными данными напрямую.",
      "theory": "### Место в проекте\nПоследняя ветка `when` в `reduce`, после веток ошибок.\n\n### Причина изменения\nзащитные условия не позволяют добавить операцию с неверными данными напрямую.\n\n### Проверка\nветка временно не завершена; продолжайте следующим шагом."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 19. Рассчитайте новый баланс",
      "body": "**Где:** Внутри ветки `AddTransaction`, вместо комментария.\n\n```kotlin\nval change = if (tx.type == TransactionType.INCOME)\n    tx.amount else -tx.amount\nval next = state.balance.toLong() + change\n```\n\n**Зачем:** доход прибавляет сумму, расход вычитает; `Long` помогает увидеть переполнение `Int`.\n\n**Проверьте:** для расхода `250` от нуля промежуточный итог равен `−250`.",
      "notes": "Покажите файл и место вставки. Объясните: доход прибавляет сумму, расход вычитает; `Long` помогает увидеть переполнение `Int`.",
      "theory": "### Место в проекте\nВнутри ветки `AddTransaction`, вместо комментария.\n\n### Причина изменения\nдоход прибавляет сумму, расход вычитает; `Long` помогает увидеть переполнение `Int`.\n\n### Проверка\nдля расхода `250` от нуля промежуточный итог равен `−250`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 20. Проверьте диапазон баланса",
      "body": "**Где:** Сразу после `val next` в ветке `AddTransaction`.\n\n```kotlin\nif (next !in Int.MIN_VALUE.toLong()..Int.MAX_VALUE.toLong()) {\n    state.copy(error = TransactionError.AMOUNT_TOO_LARGE)\n} else {\n    // успешный результат на следующем слайде\n}\n```\n\n**Зачем:** если итог не помещается в `Int`, операция не должна попасть в историю.\n\n**Проверьте:** сейчас ветка `else` ещё не завершена.",
      "notes": "Покажите файл и место вставки. Объясните: если итог не помещается в `Int`, операция не должна попасть в историю.",
      "theory": "### Место в проекте\nСразу после `val next` в ветке `AddTransaction`.\n\n### Причина изменения\nесли итог не помещается в `Int`, операция не должна попасть в историю.\n\n### Проверка\nсейчас ветка `else` ещё не завершена."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 21. Запишите успешную операцию",
      "body": "**Где:** Замените комментарий внутри `else` на `state.copy(...)`.\n\n```kotlin\nstate.copy(\n    amount = \"\", description = \"\",\n    balance = next.toInt(),\n    transactionCount = state.transactionCount + 1,\n    transactions = state.transactions + tx, error = null,\n)\n```\n\n**Зачем:** баланс, история и счётчик меняются вместе; поля формы очищаются.\n\n**Проверьте:** `when` теперь обрабатывает все события и ViewModel компилируется.",
      "notes": "Покажите файл и место вставки. Объясните: баланс, история и счётчик меняются вместе; поля формы очищаются.",
      "theory": "### Место в проекте\nЗамените комментарий внутри `else` на `state.copy(...)`.\n\n### Причина изменения\nбаланс, история и счётчик меняются вместе; поля формы очищаются.\n\n### Проверка\n`when` теперь обрабатывает все события и ViewModel компилируется."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 22. Проверьте пустые поля",
      "body": "**Где:** В `TransactionViewModel`, новый метод `addTransaction()` перед `reduce`.\n\n```kotlin\nfun addTransaction() {\n    val description = uiState.description.trim()\n    if (uiState.amount.isEmpty() || description.isEmpty()) {\n        onEvent(MainUiEvent.InvalidTransaction)\n        return\n    }\n    // продолжение на следующем слайде\n}\n```\n\n**Зачем:** пустой черновик не превращается в подтверждённую транзакцию.\n\n**Проверьте:** ошибка будет соответствовать `INVALID_INPUT`.",
      "notes": "Покажите файл и место вставки. Объясните: пустой черновик не превращается в подтверждённую транзакцию.",
      "theory": "### Место в проекте\nВ `TransactionViewModel`, новый метод `addTransaction()` перед `reduce`.\n\n### Причина изменения\nпустой черновик не превращается в подтверждённую транзакцию.\n\n### Проверка\nошибка будет соответствовать `INVALID_INPUT`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 23. Отличите большую сумму от нуля",
      "body": "**Где:** Внутри `addTransaction()`, вместо комментария и до закрывающей `}`.\n\n```kotlin\nval amount = uiState.amount.toIntOrNull()\nif (amount == null) {\n    onEvent(MainUiEvent.AmountTooLarge)\n    return\n}\nif (amount <= 0) {\n    onEvent(MainUiEvent.InvalidTransaction)\n    return\n}\n```\n\n**Зачем:** цифровая строка за пределами `Int` даёт особую ошибку; ноль даёт ошибку ввода.\n\n**Проверьте:** `2147483648` и `0` попадут в разные ветки.",
      "notes": "Покажите файл и место вставки. Объясните: цифровая строка за пределами `Int` даёт особую ошибку; ноль даёт ошибку ввода.",
      "theory": "### Место в проекте\nВнутри `addTransaction()`, вместо комментария и до закрывающей `}`.\n\n### Причина изменения\nцифровая строка за пределами `Int` даёт особую ошибку; ноль даёт ошибку ввода.\n\n### Проверка\n`2147483648` и `0` попадут в разные ветки."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 24. Отправьте готовую транзакцию",
      "body": "**Где:** В конце `addTransaction()`, после проверки `amount <= 0`.\n\n```kotlin\nonEvent(MainUiEvent.AddTransaction(\n    Transaction(\n        amount = amount,\n        type = uiState.type,\n        description = description,\n    )\n))\n```\n\n**Зачем:** после проверки текст превращается в модель и попадает в reducer.\n\n**Проверьте:** сумма и описание не записываются напрямую в баланс из UI.",
      "notes": "Покажите файл и место вставки. Объясните: после проверки текст превращается в модель и попадает в reducer.",
      "theory": "### Место в проекте\nВ конце `addTransaction()`, после проверки `amount <= 0`.\n\n### Причина изменения\nпосле проверки текст превращается в модель и попадает в reducer.\n\n### Проверка\nсумма и описание не записываются напрямую в баланс из UI."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 25. Добавьте подписи в ресурсы",
      "body": "**Где:** `app/src/main/res/values/strings.xml`, внутри существующего `<resources>`.\n\n```xml\n<string name=\"transaction_title\">Новая транзакция</string>\n<string name=\"transaction_description\">Описание</string>\n<string name=\"transaction_amount\">Сумма, ₽</string>\n<string name=\"transaction_income\">Доход</string>\n<string name=\"transaction_expense\">Расход</string>\n```\n\n**Зачем:** UI-текст хранится в ресурсах и позже читается через `stringResource`.\n\n**Проверьте:** не создавайте второй тег `<resources>`.",
      "notes": "Покажите файл и место вставки. Объясните: UI-текст хранится в ресурсах и позже читается через `stringResource`.",
      "theory": "### Место в проекте\n`app/src/main/res/values/strings.xml`, внутри существующего `<resources>`.\n\n### Причина изменения\nUI-текст хранится в ресурсах и позже читается через `stringResource`.\n\n### Проверка\nне создавайте второй тег `<resources>`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 26. Добавьте кнопку и ошибки",
      "body": "**Где:** Тот же `strings.xml`, после подписей.\n\n```xml\n<string name=\"transaction_add\">Добавить транзакцию</string>\n<string name=\"transaction_history\">История операций</string>\n<string name=\"transaction_invalid_input\">Введите описание и сумму больше нуля</string>\n<string name=\"transaction_amount_too_large\">Сумма слишком велика</string>\n```\n\n**Зачем:** ViewModel хранит enum ошибки; Compose выбирает подходящий ресурс.\n\n**Проверьте:** `R.string.transaction_amount_too_large` доступен в коде.",
      "notes": "Покажите файл и место вставки. Объясните: ViewModel хранит enum ошибки; Compose выбирает подходящий ресурс.",
      "theory": "### Место в проекте\nТот же `strings.xml`, после подписей.\n\n### Причина изменения\nViewModel хранит enum ошибки; Compose выбирает подходящий ресурс.\n\n### Проверка\n`R.string.transaction_amount_too_large` доступен в коде."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 27. Добавьте формат истории",
      "body": "**Где:** Тот же `strings.xml`. `balance_summary` уже был в лекции 4: не дублируйте его.\n\n```xml\n<string name=\"transaction_history_income\">%1$s: +%2$d ₽</string>\n<string name=\"transaction_history_expense\">%1$s: −%2$d ₽</string>\n```\n\n**Зачем:** `%1$s` подставит описание, `%2$d` сумму.\n\n**Проверьте:** в файле есть по одной строке для дохода, расхода и `balance_summary`.",
      "notes": "Покажите файл и место вставки. Объясните: `%1$s` подставит описание, `%2$d` сумму.",
      "theory": "### Место в проекте\nТот же `strings.xml`. `balance_summary` уже был в лекции 4: не дублируйте его.\n\n### Причина изменения\n`%1$s` подставит описание, `%2$d` сумму.\n\n### Проверка\nв файле есть по одной строке для дохода, расхода и `balance_summary`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 28. Создайте экран Compose",
      "body": "**Где:** Новый `TransactionScreen.kt` в пакете `com.example.financeapp`. Добавьте импорты через IDE.\n\n```kotlin\n@Composable\n@Suppress(\"FunctionNaming\")\ninternal fun TransactionScreen(\n    viewModel: TransactionViewModel = viewModel(),\n) {\n    val state = viewModel.uiState\n    // содержимое добавим далее\n}\n```\n\n**Зачем:** `viewModel()` получает ViewModel у владельца экрана; UI читает её состояние.\n\n**Проверьте:** IDE импортирует `androidx.lifecycle.viewmodel.compose.viewModel`.",
      "notes": "Покажите файл и место вставки. Объясните: `viewModel()` получает ViewModel у владельца экрана; UI читает её состояние.",
      "theory": "### Место в проекте\nНовый `TransactionScreen.kt` в пакете `com.example.financeapp`. Добавьте импорты через IDE.\n\n### Причина изменения\n`viewModel()` получает ViewModel у владельца экрана; UI читает её состояние.\n\n### Проверка\nIDE импортирует `androidx.lifecycle.viewmodel.compose.viewModel`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 29. Разместите содержимое",
      "body": "**Где:** В `TransactionScreen`, вместо комментария после `val state`.\n\n```kotlin\nSurface(modifier = Modifier.fillMaxSize()) {\n    Column(\n        modifier = Modifier\n            .windowInsetsPadding(WindowInsets.safeDrawing)\n            .verticalScroll(rememberScrollState())\n            .padding(24.dp),\n    ) {\n        // элементы следующих шагов\n    }\n}\n```\n\n**Зачем:** `Column` выстраивает элементы, прокрутка помогает на узком экране.\n\n**Проверьте:** корень экрана пока пустой; ошибок ViewModel нет.",
      "notes": "Покажите файл и место вставки. Объясните: `Column` выстраивает элементы, прокрутка помогает на узком экране.",
      "theory": "### Место в проекте\nВ `TransactionScreen`, вместо комментария после `val state`.\n\n### Причина изменения\n`Column` выстраивает элементы, прокрутка помогает на узком экране.\n\n### Проверка\nкорень экрана пока пустой; ошибок ViewModel нет."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 30. Покажите заголовок и баланс",
      "body": "**Где:** Внутри `Column`, вместо комментария.\n\n```kotlin\nText(stringResource(R.string.transaction_title))\nText(stringResource(\n    R.string.balance_summary,\n    state.balance, state.transactionCount,\n))\n```\n\n**Зачем:** текст берётся из ресурсов, числа из ViewModel.\n\n**Проверьте:** до добавления операций экран показывает баланс `0` и счётчик `0`.",
      "notes": "Покажите файл и место вставки. Объясните: текст берётся из ресурсов, числа из ViewModel.",
      "theory": "### Место в проекте\nВнутри `Column`, вместо комментария.\n\n### Причина изменения\nтекст берётся из ресурсов, числа из ViewModel.\n\n### Проверка\nдо добавления операций экран показывает баланс `0` и счётчик `0`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 31. Добавьте поле описания",
      "body": "**Где:** Внутри `Column`, после баланса.\n\n```kotlin\nOutlinedTextField(\n    value = state.description,\n    onValueChange = {\n        viewModel.onEvent(MainUiEvent.DescriptionChanged(it))\n    },\n    label = { Text(stringResource(R.string.transaction_description)) },\n)\n```\n\n**Зачем:** поле получает значение из UiState и отправляет новое значение событием.\n\n**Проверьте:** при наборе описания баланс остаётся прежним.",
      "notes": "Покажите файл и место вставки. Объясните: поле получает значение из UiState и отправляет новое значение событием.",
      "theory": "### Место в проекте\nВнутри `Column`, после баланса.\n\n### Причина изменения\nполе получает значение из UiState и отправляет новое значение событием.\n\n### Проверка\nпри наборе описания баланс остаётся прежним."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 32. Добавьте поле суммы",
      "body": "**Где:** Внутри `Column`, после поля описания. Импортируйте `KeyboardOptions` и `KeyboardType`.\n\n```kotlin\nOutlinedTextField(\n    value = state.amount,\n    onValueChange = { viewModel.onEvent(\n        MainUiEvent.AmountChanged(it)) },\n    label = { Text(stringResource(R.string.transaction_amount)) },\n    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),\n)\n```\n\n**Зачем:** клавиатура подсказывает цифры, но проверка всё равно остаётся во ViewModel.\n\n**Проверьте:** ввод `250` меняет только сумму черновика.",
      "notes": "Покажите файл и место вставки. Объясните: клавиатура подсказывает цифры, но проверка всё равно остаётся во ViewModel.",
      "theory": "### Место в проекте\nВнутри `Column`, после поля описания. Импортируйте `KeyboardOptions` и `KeyboardType`.\n\n### Причина изменения\nклавиатура подсказывает цифры, но проверка всё равно остаётся во ViewModel.\n\n### Проверка\nввод `250` меняет только сумму черновика."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 33. Добавьте выбор расхода",
      "body": "**Где:** Внутри `Column`, после полей: начните `Row { ... }`.\n\n```kotlin\nRow {\n    FilterChip(\n        selected = state.type == TransactionType.EXPENSE,\n        onClick = { viewModel.onEvent(\n            MainUiEvent.TypeChanged(TransactionType.EXPENSE)) },\n        label = { Text(stringResource(R.string.transaction_expense)) },\n    )\n    // второй чип на следующем слайде\n}\n```\n\n**Зачем:** вид выбранного чипа определяется `state.type`.\n\n**Проверьте:** первоначально выбран расход.",
      "notes": "Покажите файл и место вставки. Объясните: вид выбранного чипа определяется `state.type`.",
      "theory": "### Место в проекте\nВнутри `Column`, после полей: начните `Row { ... }`.\n\n### Причина изменения\nвид выбранного чипа определяется `state.type`.\n\n### Проверка\nпервоначально выбран расход."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 34. Добавьте выбор дохода",
      "body": "**Где:** В том же `Row`, вместо комментария.\n\n```kotlin\nFilterChip(\n    selected = state.type == TransactionType.INCOME,\n    onClick = { viewModel.onEvent(\n        MainUiEvent.TypeChanged(TransactionType.INCOME)) },\n    label = { Text(stringResource(R.string.transaction_income)) },\n)\n```\n\n**Зачем:** чип меняет тип будущей операции, не баланс.\n\n**Проверьте:** нажатие «Доход» переключает выбор.",
      "notes": "Покажите файл и место вставки. Объясните: чип меняет тип будущей операции, не баланс.",
      "theory": "### Место в проекте\nВ том же `Row`, вместо комментария.\n\n### Причина изменения\nчип меняет тип будущей операции, не баланс.\n\n### Проверка\nнажатие «Доход» переключает выбор."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 35. Покажите ошибку",
      "body": "**Где:** Внутри `Column`, после `Row` с чипами.\n\n```kotlin\nstate.error?.let { error ->\n    val textId = when (error) {\n        TransactionError.INVALID_INPUT -> R.string.transaction_invalid_input\n        TransactionError.AMOUNT_TOO_LARGE -> R.string.transaction_amount_too_large\n    }\n    Text(stringResource(textId),\n        color = MaterialTheme.colorScheme.error)\n}\n```\n\n**Зачем:** экран переводит тип ошибки в локализованный текст.\n\n**Проверьте:** при отсутствии ошибки строка не показывается.",
      "notes": "Покажите файл и место вставки. Объясните: экран переводит тип ошибки в локализованный текст.",
      "theory": "### Место в проекте\nВнутри `Column`, после `Row` с чипами.\n\n### Причина изменения\nэкран переводит тип ошибки в локализованный текст.\n\n### Проверка\nпри отсутствии ошибки строка не показывается."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 36. Добавьте кнопку",
      "body": "**Где:** Внутри `Column`, после блока ошибки.\n\n```kotlin\nButton(onClick = viewModel::addTransaction) {\n    Text(stringResource(R.string.transaction_add))\n}\n```\n\n**Зачем:** кнопка просит ViewModel проверить черновик и отправить событие.\n\n**Проверьте:** пустая форма показывает ошибку ввода.",
      "notes": "Покажите файл и место вставки. Объясните: кнопка просит ViewModel проверить черновик и отправить событие.",
      "theory": "### Место в проекте\nВнутри `Column`, после блока ошибки.\n\n### Причина изменения\nкнопка просит ViewModel проверить черновик и отправить событие.\n\n### Проверка\nпустая форма показывает ошибку ввода."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 37. Покажите историю",
      "body": "**Где:** Внутри `Column`, после кнопки.\n\n```kotlin\nif (state.transactions.isNotEmpty()) {\n    Text(stringResource(R.string.transaction_history))\n    state.transactions.asReversed().forEach { tx ->\n        val row = if (tx.type == TransactionType.INCOME)\n            R.string.transaction_history_income\n        else R.string.transaction_history_expense\n        Text(stringResource(row, tx.description, tx.amount))\n    }\n}\n```\n\n**Зачем:** новая операция показывается сверху; пустая история не занимает место.\n\n**Проверьте:** после добавления расхода появляется одна строка.",
      "notes": "Покажите файл и место вставки. Объясните: новая операция показывается сверху; пустая история не занимает место.",
      "theory": "### Место в проекте\nВнутри `Column`, после кнопки.\n\n### Причина изменения\nновая операция показывается сверху; пустая история не занимает место.\n\n### Проверка\nпосле добавления расхода появляется одна строка."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 38. Откройте новый экран",
      "body": "**Где:** `MainActivity.kt`, внутри существующего `setContent { FinanceAppTheme { ... } }`.\n\n```kotlin\nsetContent {\n    FinanceAppTheme {\n        TransactionScreen()\n    }\n}\n```\n\n**Зачем:** Activity открывает активный экран; старые файлы остаются в `legacy`.\n\n**Проверьте:** запустите `app`: видны два поля, два чипа и кнопка.",
      "notes": "Покажите файл и место вставки. Объясните: Activity открывает активный экран; старые файлы остаются в `legacy`.",
      "theory": "### Место в проекте\n`MainActivity.kt`, внутри существующего `setContent { FinanceAppTheme { ... } }`.\n\n### Причина изменения\nActivity открывает активный экран; старые файлы остаются в `legacy`.\n\n### Проверка\nзапустите `app`: видны два поля, два чипа и кнопка."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 39. Проверьте доход и расход",
      "body": "**Где:** Запущенное приложение на эмуляторе.\n\n```text\nКофе + 250 + Расход = баланс −250\nЗарплата + 500 + Доход = баланс 250\n```\n\n**Зачем:** каждая подтверждённая операция один раз меняет баланс и историю.\n\n**Проверьте:** две записи в истории; после добавления поля очищаются.",
      "notes": "Покажите файл и место вставки. Объясните: каждая подтверждённая операция один раз меняет баланс и историю.",
      "theory": "### Место в проекте\nЗапущенное приложение на эмуляторе.\n\n### Причина изменения\nкаждая подтверждённая операция один раз меняет баланс и историю.\n\n### Проверка\nдве записи в истории; после добавления поля очищаются."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 40. Проверьте ошибки и поворот",
      "body": "**Где:** Запущенное приложение; при доступном Gradle затем терминал проекта.\n\n```text\n0 → INVALID_INPUT\n2147483648 → AMOUNT_TOO_LARGE\nПоворот → состояние ViewModel сохраняется\n\n./gradlew testDebugUnitTest assembleDebug\n```\n\n**Зачем:** пустой ввод и переполнение имеют разные причины; ViewModel переживает обычный поворот.\n\n**Проверьте:** ошибки различаются, баланс не меняется, сборка и тесты проходят при доступном Gradle.",
      "notes": "Покажите файл и место вставки. Объясните: пустой ввод и переполнение имеют разные причины; ViewModel переживает обычный поворот.",
      "theory": "### Место в проекте\nЗапущенное приложение; при доступном Gradle затем терминал проекта.\n\n### Причина изменения\nпустой ввод и переполнение имеют разные причины; ViewModel переживает обычный поворот.\n\n### Проверка\nошибки различаются, баланс не меняется, сборка и тесты проходят при доступном Gradle."
    }
  ]
};
