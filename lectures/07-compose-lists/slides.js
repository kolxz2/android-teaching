window.DECK = {
  "course": "Android-разработка",
  "lecture": 7,
  "lectureId": "07",
  "slug": "07-compose-lists",
  "title": "ViewModel и состояние экрана в Compose",
  "block": "Основы Android",
  "teacher": "Сучёв Николай Евгеньевич",
  "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
  "hub": "../../index.html",
  "photo": "../../assets/teacher.jpg",
  "slides": [
    {
      "type": "title",
      "title": "Android-разработка",
      "subtitle": "Лекция 7. ViewModel и состояние экрана",
      "kicker": "07 / 15",
      "body": "FinanceApp · ветка `lecture-07` от `lecture-04`\n\nОт ввода транзакции до обновления баланса: **UI → Event → ViewModel → State → UI**.",
      "notes": "Запустите FinanceApp и покажите форму. Попросите предположить, где сейчас хранится баланс.",
      "theory": "### Задача занятия\nРазобрать ViewModel на реальном экране, а не только дать определение. Код находится в ветке `lecture-07`, созданной от `lecture-04`. Старый экран сохранён в пакете `legacy`. Подробный маршрут по файлам дан в `lecturer-guide.md`."
    },
    {
      "type": "content",
      "title": "Что меняется по сравнению с лекцией 4",
      "body": "```kotlin\n// Лекция 4: состояние внутри composable\nvar state by remember { mutableStateOf(MainUiState()) }\nstate = reduce(state, MainUiEvent.AddTransaction(tx))\n```\n\nТеперь форму, баланс и историю держит **TransactionViewModel**. Экран только читает состояние и отправляет действия.",
      "notes": "Откройте `legacy/FinanceAppScreen.kt`, затем новый `TransactionScreen.kt`.",
      "theory": "### Почему возникла потребность\nВ старом примере две кнопки создавали транзакции с фиксированной суммой. Новый экран содержит ввод описания и суммы, выбор типа, ошибки и историю. Если всю обработку оставить в composable, UI станет владельцем правил проверки и баланса. ViewModel собирает эту логику в одном держателе состояния. `remember` нужен для локального состояния композиции; `viewModel()` получает экранный объект с другим жизненным циклом. [ViewModel overview](https://developer.android.com/topic/libraries/architecture/viewmodel)."
    },
    {
      "type": "content",
      "title": "Что такое ViewModel",
      "body": "**ViewModel — держатель состояния и логики одного UI-экрана.**\n\n- Принимает действия пользователя.\n- Готовит состояние, которое можно отобразить.\n- Переживает обычное пересоздание Activity.\n- Не рисует Compose и не хранит ссылку на Activity или View.",
      "notes": "Сформулируйте границу: ViewModel отвечает за состояние, composable — за отображение.",
      "theory": "### Определение и границы\nAndroidX `ViewModel` сохраняется в `ViewModelStoreOwner`. В этой реализации владелец — `MainActivity`. Объект существует, пока владелец не удалён окончательно; обычная конфигурационная пересоздача Activity его сохраняет. ViewModel не является постоянным хранилищем: система может завершить процесс, после чего объект будет создан заново. Не передавайте внутрь ViewModel Activity, View или composable-контекст: так можно удержать старый экземпляр Activity. [ViewModel overview](https://developer.android.com/topic/libraries/architecture/viewmodel)."
    },
    {
      "type": "content",
      "title": "Архитектура экрана транзакции",
      "image": "architecture-viewmodel.svg",
      "imageKind": "visual",
      "imageAlt": "Схема потока событий и состояния между Compose UI и ViewModel",
      "imageCaption": "Событие вправо, новое состояние влево; Activity владеет ViewModel.",
      "body": "`TransactionScreen` отправляет `MainUiEvent`. `TransactionViewModel` обрабатывает его и публикует `MainUiState`.",
      "notes": "Проследите стрелки в обе стороны. Подчеркните, что это два разных типа данных и одно направление для каждого.",
      "theory": "### Однонаправленный поток данных\nСобытие возникает в UI и передаётся во ViewModel. ViewModel применяет reducer и публикует новый снимок состояния. UI читает снимок и описывает, что нарисовать. На схеме `MainActivity` показана как владелец ViewModel: `viewModel()` находит её через `ViewModelStoreOwner`. Это не означает, что Activity вручную меняет баланс. [UI layer](https://developer.android.com/topic/architecture/ui-layer)."
    },
    {
      "type": "content",
      "title": "Как экран получает ViewModel",
      "body": "```kotlin\n@Composable\ninternal fun TransactionScreen(\n    viewModel: TransactionViewModel = viewModel(),\n) {\n    val state = viewModel.uiState\n    // UI читает state и отправляет события\n}\n```\n\n`viewModel()` возвращает объект, связанный с владельцем экрана.",
      "notes": "Покажите импорт `androidx.lifecycle.viewmodel.compose.viewModel` и зависимость в Gradle.",
      "theory": "### Создание и получение\nЗависимость `androidx.lifecycle:lifecycle-viewmodel-compose` предоставляет функцию `viewModel()`. При повторной композиции вызывается composable-функция, но ViewModel не создаётся заново: `viewModel()` возвращает экземпляр из хранилища владельца. Для этого экрана владелец — Activity. Если позже появится Navigation Compose, у destination может быть другой `ViewModelStoreOwner`, и область жизни изменится. [ViewModel in Compose](https://developer.android.com/develop/ui/compose/libraries#viewmodel)."
    },
    {
      "type": "content",
      "title": "Состояние экрана — один снимок",
      "body": "```kotlin\ninternal data class MainUiState(\n    val amount: String = \"\",\n    val description: String = \"\",\n    val type: TransactionType = TransactionType.EXPENSE,\n    val balance: Int = 0,\n    val transactions: List<Transaction> = emptyList(),\n    val error: TransactionError? = null,\n)\n```\n\nСчётчик операций также хранится в модели. Поля формы — черновик; история — подтверждённые операции.",
      "notes": "Спросите, почему amount имеет тип String, хотя подтверждённая сумма — Int.",
      "theory": "### Что хранить в UiState\n`MainUiState` объединяет всё, что экран читает для отображения: текст формы, выбранный тип, баланс, счётчик, историю и тип ошибки. `amount` остаётся строкой, потому что пустое поле — корректный промежуточный этап ввода. `Transaction` появляется только после проверки. `data class` и `copy` позволяют создавать новый снимок без мутации прежнего. [State in Compose](https://developer.android.com/develop/ui/compose/state)."
    },
    {
      "type": "content",
      "title": "Событие описывает действие",
      "body": "```kotlin\ninternal sealed interface MainUiEvent {\n    data class AmountChanged(val value: String) : MainUiEvent\n    data class DescriptionChanged(val value: String) : MainUiEvent\n    data class TypeChanged(val type: TransactionType) : MainUiEvent\n    data class AddTransaction(val transaction: Transaction) : MainUiEvent\n    data object InvalidTransaction : MainUiEvent\n    data object AmountTooLarge : MainUiEvent\n}\n```",
      "notes": "Попросите различить `AmountChanged` и `AddTransaction`: первое меняет черновик, второе фиксирует операцию.",
      "theory": "### Зачем sealed interface\nЗакрытый набор событий делает варианты явными и позволяет компилятору проверять полноту `when`. Событие говорит, что произошло; оно не содержит готового нового баланса. UI не выбирает, как пересчитать финансы. Разделение `AmountChanged` и `AddTransaction` не даёт изменять баланс при каждом набранном символе. [UI layer](https://developer.android.com/topic/architecture/ui-layer)."
    },
    {
      "type": "content",
      "title": "Контролируемое поле ввода",
      "body": "```kotlin\nOutlinedTextField(\n    value = state.amount,\n    onValueChange = {\n        viewModel.onEvent(MainUiEvent.AmountChanged(it))\n    },\n    label = { Text(stringResource(R.string.transaction_amount)) },\n)\n```\n\nЗначение идёт **из состояния**, изменение — **в событие**.",
      "notes": "Введите 250 на эмуляторе и покажите ветку `AmountChanged` в обработчике.",
      "theory": "### Управляемый UI\n`OutlinedTextField` не владеет подтверждённой суммой. `value` каждый раз приходит из `MainUiState`; callback отправляет изменение во ViewModel. Reducer принимает только цифры, записывает новый черновик и очищает прежнюю ошибку. `stringResource` выполняется в composable, поэтому ViewModel не нужен Android Context. [State in Compose](https://developer.android.com/develop/ui/compose/state), [String resources](https://developer.android.com/guide/topics/resources/string-resource)."
    },
    {
      "type": "content",
      "title": "ViewModel принимает и публикует",
      "body": "```kotlin\ninternal class TransactionViewModel : ViewModel() {\n    var uiState by mutableStateOf(MainUiState())\n        private set\n\n    fun onEvent(event: MainUiEvent) {\n        uiState = reduce(uiState, event)\n    }\n}\n```\n\nВнешний код читает состояние, но изменить его напрямую может только ViewModel.",
      "notes": "Обведите `private set`, затем присваивание нового состояния.",
      "theory": "### Механизм обновления Compose\n`mutableStateOf` создаёт наблюдаемое snapshot-состояние Compose. Когда `uiState` получает новое значение, части композиции, которые прочитали это значение, могут быть рекомпозированы. `private set` сохраняет единственную точку записи. В этом проекте выбран `mutableStateOf`, а не `StateFlow`; не приписывайте примеру `collectAsStateWithLifecycle`. [State in Compose](https://developer.android.com/develop/ui/compose/state)."
    },
    {
      "type": "content",
      "title": "Reducer меняет состояние по событию",
      "body": "```kotlin\nprivate fun reduce(state: MainUiState, event: MainUiEvent) =\n    when (event) {\n        is MainUiEvent.AmountChanged ->\n            if (event.value.all(Char::isDigit))\n                state.copy(amount = event.value, error = null)\n            else state\n        is MainUiEvent.TypeChanged ->\n            state.copy(type = event.type, error = null)\n        // другие события...\n    }\n```",
      "notes": "Покажите полный `when` в TransactionViewModel.kt. На слайде приведён сокращённый фрагмент.",
      "theory": "### Связь с лекцией 4\nТот же принцип `reduce(oldState, event) → newState` теперь живёт внутри ViewModel. Функция не рисует UI. Для изменения поля она создаёт копию состояния и не трогает баланс. Если ввод суммы содержит недопустимый символ, возвращается прежний state. После присваивания в `onEvent` Compose увидит новое значение, когда оно действительно отличается. Reducer в текущем коде приватный метод ViewModel."
    },
    {
      "type": "content",
      "title": "Добавление транзакции: граница черновика",
      "body": "```kotlin\nfun addTransaction() {\n    val description = uiState.description.trim()\n    if (uiState.amount.isEmpty() || description.isEmpty()) {\n        onEvent(MainUiEvent.InvalidTransaction)\n        return\n    }\n    val amount = uiState.amount.toIntOrNull()\n    if (amount == null) {\n        onEvent(MainUiEvent.AmountTooLarge)\n        return\n    }\n    if (amount <= 0) {\n        onEvent(MainUiEvent.InvalidTransaction)\n        return\n    }\n    onEvent(MainUiEvent.AddTransaction(\n        Transaction(amount, uiState.type, description)\n    ))\n}\n```",
      "notes": "Введите пустое описание, затем корректные данные. Сравните два пути.",
      "theory": "### Проверка перед подтверждением\nПустой черновик и слишком большое для Int значение не должны превращаться в операцию. `toIntOrNull` возвращает null без исключения. После проверки создаётся модель `Transaction` и отправляется `AddTransaction`. `InvalidTransaction` и `AmountTooLarge` задают разные типы ошибок; текст выбирается в UI из ресурсов. В reducer есть `require` как защита инварианта при прямом вызове события."
    },
    {
      "type": "content",
      "title": "Доход и расход меняют баланс",
      "body": "```kotlin\nval change = when (transaction.type) {\n    TransactionType.INCOME -> transaction.amount\n    TransactionType.EXPENSE -> -transaction.amount\n}\nval newBalance = state.balance.toLong() + change\n// проверка диапазона Int\nstate.copy(\n    balance = newBalance.toInt(),\n    transactions = state.transactions + transaction,\n    transactionCount = state.transactionCount + 1,\n)\n```",
      "notes": "Считайте вслух: старт 0, расход 250 → −250, доход 500 → 250.",
      "theory": "### Почему Long\nСумма транзакции хранится как Int. Перед сложением баланс переводится в Long, чтобы заметить переполнение диапазона Int. Если итог выходит за пределы Int, reducer сохраняет прежний баланс и выставляет `AMOUNT_TOO_LARGE`. После успешного добавления черновик очищается, история и счётчик обновляются одновременно. Учебный пример допускает отрицательный баланс и хранит целые рубли."
    },
    {
      "type": "content",
      "title": "Ошибки и текстовые ресурсы",
      "body": "```kotlin\n// Состояние: смысл ошибки, без текста\nenum class TransactionError { INVALID_INPUT, AMOUNT_TOO_LARGE }\n\n// UI: локализованный текст\nval message = when (state.error) {\n    TransactionError.INVALID_INPUT -> R.string.transaction_invalid_input\n    TransactionError.AMOUNT_TOO_LARGE -> R.string.transaction_amount_too_large\n    null -> null\n}\nmessage?.let { Text(stringResource(it)) }\n```",
      "notes": "Откройте strings.xml и покажите строку с форматированием баланса.",
      "theory": "### Зачем отделять ошибку от текста\nViewModel сообщает тип проблемы, а UI выбирает представление для текущей локали. Видимые строки не захардкожены в Kotlin: подписи, кнопка, история и ошибки лежат в `strings.xml`. Строки с балансом и историей используют аргументы формата. Код слайда показывает тот же принцип в компактном виде; в исходном экране `null` обрабатывается внешним `let`. [String resources](https://developer.android.com/guide/topics/resources/string-resource)."
    },
    {
      "type": "content",
      "title": "Когда ViewModel живёт, а когда нет",
      "body": "- **Рекомпозиция:** тот же экземпляр ViewModel.\n- **Поворот устройства:** обычно тот же экземпляр.\n- **Экран закрыт окончательно:** ViewModel очищается.\n- **Процесс завершён:** состояние в памяти теряется.\n\n`ViewModel` ≠ постоянное хранение данных.",
      "notes": "Поверните эмулятор. Затем объясните, почему убийство процесса — иной сценарий.",
      "theory": "### Восстановление и владение\nViewModel переживает конфигурационное пересоздание, потому что владелец сохраняет ViewModelStore. Однако процесс Android может быть завершён. Для небольшого восстанавливаемого состояния используют `SavedStateHandle`; для долговременной истории нужен репозиторий с постоянным хранилищем. Сам `rememberSaveable` относится к сохранению UI-состояния Compose и не заменяет репозиторий. [ViewModel overview](https://developer.android.com/topic/libraries/architecture/viewmodel), [Save UI state](https://developer.android.com/develop/ui/compose/state-saving)."
    },
    {
      "type": "content",
      "title": "Разбор одного действия целиком",
      "body": "**Ввод:** «Кофе» · `250` · расход\n\n1. `onValueChange` отправляет события черновика.\n2. Кнопка вызывает `addTransaction()`.\n3. `AddTransaction` попадает в `reduce`.\n4. Баланс: `0 → −250`, история: `0 → 1`.\n5. `mutableStateOf` сообщает Compose о новом состоянии.\n6. Экран показывает новый баланс и строку истории.",
      "notes": "Попросите студентов назвать файл для каждого шага.",
      "theory": "### Маршрут по исходникам\n`TransactionScreen.kt` создаёт события, `TransactionViewModel.kt` проверяет ввод и вызывает reducer, `MainUiState.kt` задаёт типы данных. `MainActivity.kt` только открывает активный экран. Старые файлы `legacy` позволяют увидеть эволюцию подхода. В этом примере нет базы данных, Flow, Hilt или сетевого слоя."
    },
    {
      "type": "content",
      "title": "Главное о ViewModel",
      "body": "**ViewModel владеет состоянием экрана.**\n\nUI отправляет события; ViewModel проверяет их и создаёт новое состояние; Compose отображает результат. Поворот сохраняет ViewModel, смерть процесса — нет. Строки UI живут в ресурсах. История в этой версии хранится только в памяти.\n\n[Открыть отдельную практическую презентацию](practice.html)",
      "notes": "Попросите пересказать архитектуру по схеме без чтения слайда.",
      "theory": "### Итог\nПокажите схему архитектуры ещё раз. Если студент может проследить действие от `OutlinedTextField` до `state.copy` и обратно к `Text`, цель лекции достигнута. Для дальнейшего развития можно добавить постоянное хранилище и SavedStateHandle, но их нет в текущем коде."
    }
  ]
};
