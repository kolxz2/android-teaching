const md = (...lines) => lines.join("\n");

window.DECK = {
  course: "Android-разработка",
  lecture: "Практика",
  lectureId: "04",
  slug: "kotlin-04-practice",
  title: "Практика 04. Kotlin-логика состояния в FinanceApp",
  block: "Переход к Android",
  teacher: "Сучёв Николай Евгеньевич",
  teacherMeta: "Android-разработчик · Т-Банк · команда Вовлечение",
  hub: "../../index.html",
  photo: "../../assets/teacher.jpg",
  slides: [
    {
      type: "title",
      title: "Практика 04",
      subtitle: "Доход, расход и чистое обновление состояния",
      kicker: "04 / практика",
      body: "Сначала обновляем проект до подготовленной Compose-базы. Затем работаем преимущественно с Kotlin: моделируем транзакцию, состояние и событие, пишем reducer и подключаем его к двум кнопкам. Вёрстку изменяем минимально."
    },
    {
      type: "content",
      title: "Результат пары",
      badge: "90 минут",
      body: "**Сначала:** получить Compose-обновление и проверить сборку.\n\n**Затем:**\n- Описать доход и расход обычными Kotlin-типами\n- Представить экран неизменяемым состоянием\n- Описать действия sealed-событиями\n- Реализовать чистый `reduce(state, event)`\n- Подключить кнопки дохода и расхода\n- Применить `internal` к внутренним сущностям\n- Отправить ветку `lecture-04`"
    },
    {
      type: "content",
      title: "Маршрут на сегодня",
      badge: "План",
      body: "- 0–15: обновление проекта, Sync и запуск\n- 15–35: вёрстка и строковые ресурсы\n- 35–45: отдельный файл экрана и запуск\n- 45–55: Kotlin-модели, событие и reducer\n- 55–60: перерыв\n- 60–75: подключение двух кнопок к логике\n- 75–82: проверка и `internal`\n- 82–90: Detekt, commit, push"
    },
    {
      type: "section",
      title: "Часть 1. Обновляем основу",
      subtitle: "Получаем готовую Compose-базу из remote",
      body: "Старую XML/View-версию вручную не переделываем. Сначала обновляем проект до подготовленной преподавателем версии, проверяем запуск и только затем пишем код практики."
    },
    {
      type: "practice",
      title: "1. Убедитесь, что проект готов к обновлению",
      badge: "PowerShell · 2 минуты",
      body: md(
        "В Terminal выполните:",
        "",
        "```powershell",
        "git status",
        "git branch --show-current",
        "```",
        "Ожидаемый результат: ветка `master`, рабочее дерево чистое (`nothing to commit, working tree clean`). Ничего коммитить на этом шаге не требуется."
      )
    },
    {
      type: "content",
      title: "Откуда приходят изменения",
      badge: "origin ≠ upstream",
      body: "- `origin` — ваш репозиторий, куда вы отправляете домашнюю работу.\n- `upstream` — учебный FinanceApp преподавателя.\n- `fetch` скачивает ссылки и коммиты, но не меняет файлы.\n- `merge` переносит обновления в вашу ветку.\n\nCompose-версия уже опубликована в `upstream/master` и отмечена тегом `v1.0.4`."
    },
    {
      type: "practice",
      title: "2. Подключите учебный remote",
      badge: "Git · 3 минуты",
      body: md(
        "`origin` — ваш репозиторий. Добавьте репозиторий преподавателя как `upstream`:",
        "",
        "```powershell",
        "git remote -v",
        "git remote add upstream https://github.com/kolxz2/FinanceApp.git",
        "```",
        "Если `upstream` уже существует, команду `remote add` выполнять повторно не нужно. Проверьте адрес: `git remote get-url upstream`."
      )
    },
    {
      type: "content",
      title: "3. Обновите master до Compose-версии",
      badge: "Git · 5 минут",
      body: md(
        "```powershell",
        "git fetch upstream",
        "git switch master",
        "git merge upstream/master -m \"Update project to Compose\"",
        "git push origin master",
        "```",
        "Обычный merge нужен, потому что в вашем `master` уже есть commit с настройкой собственного репозитория. `upstream/master` содержит Compose-миграцию и тег `v1.0.4`. Если Git сообщает о конфликте, ничего не исправляйте наугад — позовите преподавателя."
      )
    },
    {
      type: "practice",
      title: "4. Проверьте обновление",
      badge: "Android Studio · 7 минут",
      body: md(
        "1. Нажмите **Sync Project with Gradle Files**.",
        "2. Выполните в Terminal:",
        "```powershell",
        ".\\gradlew.bat assembleDebug",
        "```",
        "3. Запустите приложение на эмуляторе — должен открыться стартовый Compose-экран.",
        "4. Только после успешного запуска создайте ветку практики:",
        "```powershell",
        "git switch -c lecture-04",
        "```"
      )
    },
    {
      type: "section",
      title: "Часть 2. Сначала настраиваем экран",
      subtitle: "Готовая Column → один текст и две кнопки",
      body: "Стартовый экран уже содержит `Surface`, `Column`, один `Text`, одну `Button` и состояние `checkSucceeded`. Новые правила вёрстки не изучаем: сохраняем контейнеры и меняем только содержимое `Column`."
    },
    {
      type: "practice",
      title: "5. Найдите изменяемую часть",
      badge: "Чтение кода · 3 минуты",
      body: md(
        "В стартовом `FinanceAppScreen` найдите:",
        "",
        "- `checkSucceeded`;",
        "- `rememberSaveable`;",
        "- условный выбор `check_success_message` и `test_screen_message`;",
        "- кнопку с `check_button`;",
        "",
        "Удалите только эти части. `Surface`, `Column`, модификаторы, отступы, выравнивание и стили оставьте без изменений. Пока вместо состояния задайте локально `balance = 25_000` и `transactionCount = 0`."
      )
    },
    {
      type: "practice",
      title: "6. Создайте строковые ресурсы",
      badge: "strings.xml · 4 минуты",
      body: md(
        "Удалите старые строки экрана и добавьте:",
        "```xml",
        "<string name=\"balance_summary\">Баланс: %1$d ₽\\nОпераций: %2$d</string>",
        "<string name=\"add_income_button\">Добавить доход 500 ₽</string>",
        "<string name=\"add_expense_button\">Добавить расход 250 ₽</string>",
        "```",
        "`%1$d` и `%2$d` — места для двух целых чисел, которые будут переданы в `stringResource`."
      )
    },
    {
      type: "practice",
      title: "7. Соберите конечную вёрстку",
      badge: "Compose · 10 минут",
      body: md(
        "Логику состояния мы ещё не писали, поэтому в начале `FinanceAppScreen` временно объявите два локальных значения:",
        "```kotlin",
        "val balance = 25_000",
        "val transactionCount = 0",
        "```",
        "Затем внутри существующей `Column` оставьте один `Text` и добавьте две кнопки:",
        "```kotlin",
        "Text(",
        "    text = stringResource(",
        "        R.string.balance_summary,",
        "        balance,",
        "        transactionCount,",
        "    ),",
        "    style = MaterialTheme.typography.headlineSmall,",
        ")",
        "Button(onClick = { }) {",
        "    Text(text = stringResource(R.string.add_income_button))",
        "}",
        "Button(onClick = { }) {",
        "    Text(text = stringResource(R.string.add_expense_button))",
        "}",
        "```",
        "Обработчики пока намеренно пустые. На шаге 11 временные `balance` и `transactionCount` будут удалены и заменены на значения из `state`."
      ),
      timerTaskId: "layout-task"
    },
    {
      type: "content",
      title: "7. Подсказка по вёрстке",
      badge: "Через 5 минут",
      body: "Не создавайте новую `Column` и не меняйте существующие модификаторы. Замените только содержимое блока уже готовой `Column`.",
      timedReveal: {
        taskId: "layout-task",
        minutes: 5,
        label: "Подсказка",
        content: "Если `stringResource` не принимает числа, проверьте, что после id ресурса переданы `balance` и `transactionCount`, а в XML используются `%1$d` и `%2$d`."
      }
    },
    {
      type: "content",
      title: "7. Проверьте экран",
      badge: "До логики",
      body: "Запустите приложение. На экране должны быть баланс `25 000 ₽`, счётчик `0` и две кнопки. Нажатия пока ничего не делают — это ожидаемо.",
      timedReveal: {
        taskId: "layout-task",
        minutes: 9,
        label: "Проверка",
        content: "Если экран не собирается, верните временные `val balance = 25_000` и `val transactionCount = 0` в начало `FinanceAppScreen`, затем проверьте имена ресурсов."
      }
    },
    {
      type: "content",
      title: "8. Вынесите экран в отдельный файл",
      badge: "Декомпозиция · 7 минут",
      body: "Создайте `FinanceAppScreen.kt` в том же package и перенесите туда `FinanceAppScreen` вместе с Preview. Объявите экран как `internal`, Preview оставьте `private`. В `MainActivity.kt` оставьте Activity и `FinanceAppTheme`; тему объявите `internal`, потому что Preview вызывает её из другого файла. Повторно запустите приложение."
    },
    {
      type: "section",
      title: "Часть 3. Теперь пишем Kotlin-логику",
      subtitle: "State, transaction, event и reducer",
      body: "Вёрстка уже готова и запускается. Теперь временные числа заменяем моделью состояния, а пустые `onClick` связываем с чистой Kotlin-функцией."
    },
    {
      type: "practice",
      title: "9. Подсказки к модели состояния",
      badge: "MainUiState.kt · 10 минут",
      body: md(
        "Создайте `MainUiState.kt`. Заполните пропуски самостоятельно:",
        "```kotlin",
        "internal data class MainUiState(",
        "    // Какое начальное значение у баланса?",
        "    // Как посчитать выполненные операции?",
        ")",
        "",
        "internal enum class TransactionType {",
        "    // Какие два типа нужны кнопкам?",
        "}",
        "",
        "internal data class Transaction(",
        "    // Какие два свойства полностью описывают операцию?",
        ")",
        "",
        "internal sealed interface MainUiEvent {",
        "    // Одно событие должно переносить созданную транзакцию",
        "}",
        "```",
        "Ориентиры: баланс и сумма — `Int`; счётчик начинается с нуля; начальный баланс вынесите в `private const val`; для события подойдёт вложенный `data class`."
      )
    },
    {
      type: "practice",
      title: "10. Подсказки к reducer",
      badge: "Чистый Kotlin · 10 минут",
      body: md(
        "Reducer должен выполнить четыре действия:",
        "",
        "1. получить транзакцию из события;",
        "2. проверить `amount > 0` через `require`;",
        "3. через `when` получить положительное изменение для дохода и отрицательное для расхода;",
        "4. вернуть `state.copy(...)` с новым балансом и счётчиком `+ 1`.",
        "",
        "Начало функции:",
        "```kotlin",
        "internal fun reduce(",
        "    state: MainUiState,",
        "    event: MainUiEvent,",
        "): MainUiState = when (event) {",
        "    // Получите данные события и верните новое состояние",
        "}",
        "```",
        "В reducer не должно быть Compose, `Context`, строковых ресурсов и изменения свойств старого state."
      )
    },
    {
      type: "content",
      title: "11. Подключите две кнопки",
      badge: "Доход и расход",
      body: md(
        "Вернитесь в `FinanceAppScreen.kt`. Удалите временные `balance` и `transactionCount`, затем добавьте:",
        "```kotlin",
        "var state by remember { mutableStateOf(MainUiState()) }",
        "```",
        "",
        "В `Text` передайте `state.balance` и `state.transactionCount`. В каждом `onClick`:",
        "",
        "1. создайте `Transaction` с нужной суммой и типом;",
        "2. создайте событие добавления транзакции;",
        "3. выполните `state = reduce(state, event)`.",
        "",
        "Доход равен `500`, расход — `250`. Вынесите эти числа в `private const val` файла экрана. Не рассчитывайте баланс внутри composable."
      )
    },
    {
      type: "practice",
      title: "12. Проверьте границы файлов",
      badge: "internal · 4 минуты",
      body: md(
        "Должно получиться три файла:",
        "",
        "- `MainActivity.kt`: публичная `MainActivity` и `internal FinanceAppTheme`;",
        "- `FinanceAppScreen.kt`: `internal FinanceAppScreen`, private-константы и private Preview;",
        "- `MainUiState.kt`: internal-модели, internal-событие и internal reducer.",
        "",
        "Запустите приложение: доход должен дать `25 500 ₽` и одну операцию, следующий расход — `25 250 ₽` и две операции."
      )
    },
    {
      type: "homework",
      title: "13. Финальная проверка и сдача",
      badge: "PR lecture-04 → master",
      body: md(
        "Проверьте в приложении: доход увеличивает баланс, расход уменьшает, счётчик растёт после каждой операции.",
        "",
        "Проверьте модификаторы видимости: модели, события, reducer, экран и тема — `internal`; публичной остаётся `MainActivity`.",
        "",
        "```powershell",
        ".\\gradlew.bat detekt testDebugUnitTest lintDebug assembleDebug",
        "git status",
        "git add app/src",
        "git commit -m \"Add income and expense state logic\"",
        "git push -u origin lecture-04",
        "```",
        "После push откройте Pull Request из `lecture-04` в `master`."
      )
    }
  ]
};
