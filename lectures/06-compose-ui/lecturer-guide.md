# Заметки лектора к лекции 06

Этот файл расширяет слайды и [план](plan.md). Встроенная панель лектора содержит отдельное теоретическое пояснение **для каждого слайда**; здесь собраны связи между темами и ответы на сложные вопросы. Основная часть рассчитана на 60 минут.

## 1. Что объяснять сверх видимого кода

### Декларативная модель

Фраза «UI — функция состояния» полезна, но требует уточнения. Compose не перерисовывает весь экран после каждого изменения. Рекомпозиция заново выполняет те composable-функции или лямбды, входы которых могли поменяться, и может пропускать остальные. Точное количество вызовов — внутренняя деталь; нельзя помещать в тело composable код, который корректен лишь при одном вызове. Покажите на примере `InputExamples`: изменение `amount` меняет сумму, кешбэк и прогноз баланса; сам экран по-прежнему описан теми же функциями. [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model).

Разграничьте **описание UI** и **событие**. `Button(onClick = { balance = projectedBalance; operationCount += 1; ... })` фиксирует операцию в локальной симуляции. Сетевой запрос, запись в базу или аналитика прямо при выполнении `@Composable` были бы побочными эффектами; для таких задач используются отдельные слои и контролируемые Effect API. [Side-effects in Compose](https://developer.android.com/develop/ui/compose/side-effects).

### Измерение и ограничения

Родитель передаёт ребёнку ограничения, ребёнок измеряет себя в их рамках, затем родитель размещает его. Поэтому `fillMaxWidth()` означает занять **доступную ширину**, а не всю ширину физического дисплея. В FinanceApp эту ширину уже уменьшили `contentPadding(horizontal = 20.dp)` у `LazyColumn`. `size(32.dp)` тоже подчиняется ограничениям. Это стоит объяснить до попыток «исправить» неожиданную верстку случайными отступами. [Constraints and modifier order](https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers).

### Главная и поперечная оси

У `Row` главная ось горизонтальна: `horizontalArrangement` распределяет элементы вдоль неё, `verticalAlignment` работает поперёк. У `Column` наоборот. `Arrangement.spacedBy` относится к расстоянию **между детьми**; `Modifier.padding` выделяет пространство внутри или вокруг отдельного элемента в зависимости от места цепочки. `weight` делит оставшееся пространство внутри `RowScope` или `ColumnScope`, а не задаёт абсолютные проценты экрана. [Compose layout basics](https://developer.android.com/develop/ui/compose/layouts/basics), [Compose modifiers](https://developer.android.com/develop/ui/compose/modifiers).

### Сигнатуры контейнеров: что реально передаём в функции

На слайдах 9, 10 и 12 показывайте вызов как набор **именованных аргументов**, а не как магический блок кода. У `Column` четыре параметра: `modifier`, `verticalArrangement`, `horizontalAlignment`, `content`; их значения по умолчанию — соответственно пустой `Modifier`, `Arrangement.Top`, `Alignment.Start`, а у обязательного `content` значения по умолчанию нет. У `Row` тоже четыре: `modifier`, `horizontalArrangement = Arrangement.Start`, `verticalAlignment = Alignment.Top`, `content`. У `Box` с содержимым пять: `modifier`, `contentAlignment = Alignment.TopStart`, `propagateMinConstraints = false`, `content`. Вариант `Box(modifier)` без содержимого — отдельная перегрузка API.

Синтаксис `Column(...) { ... }` использует **trailing lambda** Kotlin: блок `{ ... }` передаётся в последний параметр `content`. Его тип `@Composable ColumnScope.() -> Unit` означает, что внутри доступны функции и модификаторы области `ColumnScope`, включая `weight` и `align`. Аналогично устроены `RowScope` и `BoxScope`; поэтому `weight` появляется у ребёнка внутри `Row`/`Column`, а `align` у ребёнка внутри `Box`. `spacedBy()` создаёт значение для параметра `verticalArrangement` или `horizontalArrangement`; `padding()` создаёт `Modifier` и отдельным параметром контейнера не является. [API Column](https://developer.android.com/reference/kotlin/androidx/compose/foundation/layout/Column.composable), [API Row](https://developer.android.com/reference/kotlin/androidx/compose/foundation/layout/Row.composable), [API Box](https://developer.android.com/reference/kotlin/androidx/compose/foundation/layout/Box.composable).

### Порядок модификаторов

Обе цепочки в `ModifierOrderExample` заканчиваются `size(32.dp)`, но фон охватывает разные области. Объясняйте цепочку **слева направо**: `background → padding → size` даёт окрашенную область вместе с отступом; `padding → background → size` оставляет внешний отступ неокрашенным. Аналогично расположение `clickable` до или после отступа влияет на область касания. Это не косметическое правило, а часть контракта layout. [Compose modifiers](https://developer.android.com/develop/ui/compose/modifiers).

### Системные панели и адаптивность

`enableEdgeToEdge()` позволяет рисовать под системными панелями. `windowInsetsPadding(WindowInsets.safeDrawing)` в данном учебном экране удерживает важный контент в безопасной зоне. Insets могут изменяться при появлении клавиатуры и смене режима окна; фиксированный `padding(20.dp)` не заменяет их. Для сложного дизайна фон и содержимое иногда обрабатывают раздельно, но это уже развитие темы. [Set up window insets](https://developer.android.com/develop/ui/compose/system/insets-ui).

### Компоненты Material 3

`Card` задаёт оформленную поверхность, `Text` — содержимое, `MaterialTheme` — набор общих визуальных ролей. `headlineLarge`, `titleMedium`, `bodySmall` выражают иерархию информации. В учебном коде строки захардкожены для наглядности. При развитии приложения их нужно вынести в строковые ресурсы и проверить локализацию. Тема Material 3 включает цвета, типографику и формы; в этой лекции мы используем готовую тему, а её настройку можно вынести в отдельную практику. [Material 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3).

### Список и ключи

`LazyColumn` — один вертикальный прокручиваемый контейнер экрана. `item` добавляет один блок, `items` повторяет компонент по данным. В `transactions` три элемента с разными названиями, поэтому учебный ключ `title` работает. В реальных данных названия могут совпадать; используйте постоянный `id`. Стабильные ключи помогают Compose сопоставить элементы после вставки или перестановки. Для сохранения состояния элементов ключ должен быть совместим с Android Bundle. [Lazy lists and lazy grids](https://developer.android.com/develop/ui/compose/lists).

### Как разбирать пример `LazyColumn` на доске

Начните с `private val transactions = listOf(...)` в `Lecture06Screen.kt`: каждый `SampleTransaction` имеет `title`, `date`, `amount`. На слайде 21 обведите внешний `LazyColumn` — это контейнер с прокруткой. `item { BalanceCard() }` даёт один элемент. `items(transactions, key = { it.title })` описывает три элемента по данным. Для каждого элемента лямбда получает **модель операции**, а не индекс и не готовую строку. Вызов `TransactionRow(transaction)` передаёт эту модель в composable-функцию, которая строит карточку строки. В `key` неявное `it` тоже означает модель операции; это другая лямбда. Результат фрагмента — четыре элемента, результат полного экрана включает и другие `item`. [Lazy lists](https://developer.android.com/develop/ui/compose/lists).

На новом слайде сравните `RecyclerView` и `LazyColumn` через обязанности. В View-подходе нужны `RecyclerView`, `LayoutManager`, `Adapter` и `ViewHolder`; адаптер создаёт holder и привязывает его View к данным. Здесь описание контейнера и строк находится рядом в DSL и composable-функциях. `RecyclerView` повторно использует View, а lazy-layout Compose может переиспользовать композиции сходного содержимого; не говорите, что в Compose «нет переиспользования». Ключи помогают отследить идентичность при перестановке, но не заменяют всю логику обновления данных. [RecyclerView guide](https://developer.android.com/develop/ui/views/layout/recyclerview), [Migration guide](https://developer.android.com/develop/ui/compose/migrate/migration-scenarios/recycler-view), [Lazy lists](https://developer.android.com/develop/ui/compose/lists).

### `rememberSaveable` и поднятие состояния

Локальное `mutableStateOf` делает изменения наблюдаемыми для Compose. `remember` переживает рекомпозицию; `rememberSaveable` также сохраняет подходящие небольшие значения через механизм saved instance state при пересоздании Activity. Это не долговременное хранилище и не место для больших наборов операций. Пока `InputExamples` хранит своё состояние внутри; если родителю понадобятся данные формы, передайте значение и callbacks параметрами. Это и есть state hoisting. [State in Compose](https://developer.android.com/develop/ui/compose/state), [Save UI state](https://developer.android.com/develop/ui/compose/state-saving), [Where to hoist state](https://developer.android.com/develop/ui/compose/state-hoisting).

### Связанная форма: почему это один пример, а не пять отдельных

В `InputExamples` все компоненты управляют общим прогнозом. Дайте группе конкретный сценарий: начальный учебный баланс 25 000 ₽, расход 500 ₽ → 24 500 ₽; включили кешбэк 10% → 24 550 ₽; выбрали доход → кешбэк сброшен и недоступен, прогноз 25 500 ₽; выключили учёт в балансе → прогноз 25 000 ₽. Название меняет текст предпросмотра и доступность кнопки. После добавления операции `balance` становится новым исходным значением для следующего расчёта.

`amountRub`, `cashback`, `balanceChange` и `projectedBalance` — **производные значения**. Их можно вычислить из сохранённых входов при композиции: не нужен отдельный `mutableStateOf` для каждого, а значит, нечему рассинхронизироваться. При этом `balance` и `operationCount` — результат уже совершённых действий, поэтому это самостоятельное состояние. Выбор дохода одновременно сбрасывает `withCashback` и блокирует FilterChip: правило «доход не может иметь кешбэк» поддерживается и в данных, и в интерфейсе. [State in Compose](https://developer.android.com/develop/ui/compose/state), [Where to hoist state](https://developer.android.com/develop/ui/compose/state-hoisting).

`rememberSaveable` сохраняет небольшие данные формы при пересоздании Activity, но не создаёт историю операций в постоянном хранилище. Карточка `BalanceCard` выше показывает отдельный статичный пример. Если понадобится общий баланс на всём экране, владельцем состояния должен стать `Lecture06Screen`, а вниз следует передать значение и callbacks. Если баланс станет частью бизнес-логики приложения, его источником будет репозиторий, а состояние экрана обычно предоставит ViewModel. [Save UI state](https://developer.android.com/develop/ui/compose/state-saving), [UI layer](https://developer.android.com/topic/architecture/ui-layer).

## 2. Точные переходы от слайда к коду

- Слайды про `setContent` и дерево: `MainActivity.kt`, затем `Lecture06Screen.kt`.
- Слайды про контейнеры, веса и порядок модификаторов: `LayoutExamples.kt`.
- Слайды про карточку и переиспользование: `FinanceExamples.kt`.
- Слайды про список: блок `transactions` и вызов `items` в `Lecture06Screen.kt`.
- Слайды про состояние: `InputExamples.kt`.

Файлы находятся в `C:\Users\kolxz2Aorus\AndroidStudioProjects\FinanceApp\app\src\main\java\com\example\financeapp\` на ветке `lecture-06`. Презентация показывает сокращённые фрагменты; на занятии всегда возвращайтесь к полному исходнику, чтобы студенты увидели контекст.

## 3. Вопросы и короткие ответы

**Почему обычная `Column` не заменяет `LazyColumn`?** `Column` размещает всех детей и сама по себе не прокручивается. `LazyColumn` предоставляет прокрутку и компонует элементы по мере необходимости. Для небольшого статичного блока `Column` удобнее.

**Почему `weight` иногда «не работает»?** Нужна область `RowScope` или `ColumnScope` и доступное пространство по главной оси. Проверьте ограничения, другие фиксированные элементы и то, передали ли модификатор именно дочернему компоненту.

**Можно ли всегда ставить `rememberSaveable` вместо `remember`?** Нет. Сохраняйте только небольшое UI-состояние, которое действительно нужно восстановить и которое поддерживает механизм сохранения. Производные или легко восстанавливаемые данные часто не требуют этого.

**Почему `title` в ключе списка — проблема?** Две покупки могут называться «Кофе». Повторяющийся ключ нарушит уникальность элементов; модель операции должна содержать собственный идентификатор.

**Это уже полноценный FinanceApp?** Нет. Сумма и операции демонстрационные, кнопка показывает локальное подтверждение. Следующие занятия добавят слой данных, настоящую модель и навигацию.

## 4. Граница темы

Лекция 5 уже объяснила переход от XML/View к декларативному UI. Здесь продолжайте от этих понятий к практической компоновке экрана FinanceApp. При вопросах сравнивайте код с примерами прошлой лекции, затем возвращайтесь к `Column`, `Row`, `Box`, `Modifier` и компонентам Material 3. Лекция 5 доступна в `lectures/05-activity/`, эта лекция — в `lectures/06-compose-ui/`.

## 5. Все первоисточники

- [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model)
- [Compose layout basics](https://developer.android.com/develop/ui/compose/layouts/basics)
- [Compose modifiers](https://developer.android.com/develop/ui/compose/modifiers)
- [Constraints and modifier order](https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers)
- [Lazy lists and lazy grids](https://developer.android.com/develop/ui/compose/lists)
- [State in Compose](https://developer.android.com/develop/ui/compose/state)
- [Save UI state in Compose](https://developer.android.com/develop/ui/compose/state-saving)
- [Where to hoist state](https://developer.android.com/develop/ui/compose/state-hoisting)
- [Material 3 in Compose](https://developer.android.com/develop/ui/compose/designsystems/material3)
- [Set up window insets](https://developer.android.com/develop/ui/compose/system/insets-ui)
- [Preview your UI](https://developer.android.com/develop/ui/compose/tooling/previews)


## 6. Техническое приложение: семь тем для собственного изучения

### 6.1. Что реально происходит после изменения состояния

Полезная модель — **композиция → layout → drawing**. Изменение `name` в `InputExamples` влияет на поле, общий предпросмотр и доступность кнопки. Compose отслеживает чтение состояния и планирует обновление тех областей, где оно было прочитано. Если composable читает значение при построении дерева, нужна рекомпозиция; если чтение происходит в layout или draw callback, более ранние фазы могут не повторяться. Это не означает, что любой обработчик обновится ровно один раз: Compose может пропускать, отменять и повторять вычисления. [Jetpack Compose phases](https://developer.android.com/develop/ui/compose/phases), [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model).

### 6.2. Почему элементы списка нуждаются в идентичности

Compose различает обычные вызовы по месту вызова. В `items(transactions)` один и тот же вызов `TransactionRow` повторяется для нескольких моделей. При вставке новой строки в начало списка её **позиция** меняется, но логическая операция остаётся прежней. Устойчивый ключ связывает состояние и эффекты с логической операцией, а не с бывшим номером строки. Если две операции называются «Кофе», `title` не может быть ключом. Хорошая модель содержит `id`, независимый от видимого названия. [Lifecycle of composables](https://developer.android.com/develop/ui/compose/lifecycle), [Lazy list keys](https://developer.android.com/develop/ui/compose/lists).

### 6.3. Численный разбор `weight`

Предположим, доступная ширина после внешних отступов равна **320 dp**. В `Row` два элемента и `spacedBy(8.dp)`, значит распределяется **312 dp**. Вес 2f получает **208 dp**, вес 1f — **104 dp**. Если справа добавить третью кнопку без веса шириной 60 dp и ещё один промежуток 8 dp, для двух взвешенных детей останется **244 dp**. Их ширины будут примерно **162,7 dp** и **81,3 dp**. Именно поэтому `weight(2f)` не означает «две трети ширины экрана»: это доля **остатка после фиксированных детей и промежутков**. [Compose modifiers](https://developer.android.com/develop/ui/compose/modifiers).

### 6.4. Однопроходное измерение и intrinsic size

Обычно custom layout в Compose должен измерять каждого ребёнка один раз за проход; повторное измерение того же ребёнка вызывает ошибку. Если родителю заранее нужна информация о предпочтительной ширине или высоте, существуют intrinsic measurements (`minIntrinsicWidth`, `maxIntrinsicHeight` и аналоги). Они не равны обычному измерению и не должны подменять его без причины. На уровне этой лекции хватит `Row`, `Column` и `Box`, но это объясняет, откуда берутся специальные API для более сложной геометрии. [Intrinsic measurements in Compose layouts](https://developer.android.com/develop/ui/compose/layouts/intrinsic-measurements).

### 6.5. Визуальное дерево и дерево доступности

Пользователь видит карточку и строку, но сервисы доступности читают **семантическое дерево**. Material-кнопка обычно представляет свои дочерние иконку и текст как один интерактивный элемент. А строка с Checkbox и подписью, собранная вручную, может требовать `toggleable` на родителе, чтобы вся строка стала единым переключателем. При разработке собственного компонента думайте о том, какая роль, название и действие попадут в семантику, а не только о выравнивании пикселей. [Semantics](https://developer.android.com/develop/ui/compose/accessibility/semantics), [Accessibility API defaults](https://developer.android.com/develop/ui/compose/accessibility/api-defaults).

### 6.6. Три срока жизни данных

`remember` удерживает объект при рекомпозиции, пока соответствующий узел находится в композиции. `rememberSaveable` дополнительно сохраняет небольшие поддерживаемые значения через `Bundle` при пересоздании Activity. Постоянный источник данных — файл, база или репозиторий — нужен для сущностей, которые должны существовать между запусками. Это **три разных требования**, и выбор зависит от смысла данных. Сохранение крупного списка операций в `rememberSaveable` опасно из-за ограниченного размера Bundle. [State in Compose](https://developer.android.com/develop/ui/compose/state), [Save UI state](https://developer.android.com/develop/ui/compose/state-saving).

### 6.7. Отступы, экранная клавиатура и системные панели

`WindowInsets.safeDrawing` защищает от статус-бара, навигации и других опасных областей экрана. При вводе текста появляется IME — экранная клавиатура, для которой предусмотрены отдельные inset API. Вложенные inset padding modifiers учитывают уже потреблённую родителем область, поэтому одинаковый системный отступ обычно не суммируется дважды. Это отличается от двух обычных `Modifier.padding`, которые честно складываются. [Set up window insets](https://developer.android.com/develop/ui/compose/system/insets-ui).

## 7. Проверочный маршрут по первоисточникам

После занятия можно пройти документы в таком порядке: [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model) → [Compose phases](https://developer.android.com/develop/ui/compose/phases) → [Constraints and modifier order](https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers) → [Lazy lists](https://developer.android.com/develop/ui/compose/lists) → [State saving](https://developer.android.com/develop/ui/compose/state-saving) → [Accessibility semantics](https://developer.android.com/develop/ui/compose/accessibility/semantics). Каждый следующий документ отвечает на вопрос, который возникает при чтении текущего учебного кода.
