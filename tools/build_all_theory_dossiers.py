# -*- coding: utf-8 -*-
"""Comprehensive script to generate all 83 enriched theory dossiers with full term explanations and documentation links."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

THEORY = {}

# -------------------------------------------------------------
# Введение и цели (Slides 0-4)
# -------------------------------------------------------------
THEORY[0] = """### 📚 Теория и спецификация
- **Место темы в архитектуре Android**: Пользовательский интерфейс (**UI Layer** — *User Interface Layer*, слой представления) — ключевой слой приложения, отвечающий за отображение данных на экране и захват взаимодействий с пользователем. Согласно официальному руководству Google [Guide to app architecture](https://developer.android.com/topic/architecture/ui-layer), UI состоит из двух базовых сущностей: визуальных элементов (**UI Elements**) и состояния интерфейса (**UI State**).
- **Две технологические эпохи в Android**:
  1. **Классическая View-система (2008–2021)**: объектно-ориентированная модель на Java, глубокая иерархия классов с суперклассом `android.view.View`, пошаговое императивное мутирование свойств и декларативная верстка в XML-ресурсах (`res/layout/`).
  2. **Jetpack Compose (2021–н.в.)**: современный реактивный декларативный UI-тулкит от Google на 100% чистом языке Kotlin. Базируется на компиляторном плагине **Kotlin IR** (*Intermediate Representation* — промежуточное представление кода компилятора Kotlin, [Kotlin IR Compiler](https://kotlinlang.org/docs/whatsnew15.html#kotlin-jvm-compiler-now-uses-the-ir-backend)) и математической модели $UI = f(State)$. Официальная документация: [Jetpack Compose Overview](https://developer.android.com/develop/ui/compose).

### ⚙️ Под капотом (AOSP)
- **AOSP** (*Android Open Source Project* — проект Android с открытым исходным кодом, [source.android.com](https://source.android.com/)):
  - В системной архитектуре Android окно приложения (`PhoneWindow`) передаёт отрисованный кадровый буфер через графический интерфейс `Surface` системному композитору `SurfaceFlinger`, который объединяет слои всех окон и выводит их на физический дисплей через модуль аппаратного композитинга Hardware Composer (HWC). Спецификация: [Android Graphics Architecture](https://source.android.com/docs/core/graphics/architecture).
  - В классическом подходе разметка парсится в тяжеловесные Java-объекты `android.view.View`. В Jetpack Compose нет классов View — интерфейс описывается графом вызовов функций, сохраняемых в легковесной структуре памяти **SlotTable** (слотовая таблица).

### ⚠️ Нюансы продакшена и собеседования
- **Частый вопрос на собеседовании**: *«Почему Google создал новый тулкит Jetpack Compose с нуля вместо оптимизации старой XML/View-системы?»*
- **Ответ**: Классическая система View упёрлась в архитектурный тупик: суперкласс `View.java` разросся до 31 000+ строк кода, глубокое ООП-наследование приводило к огромным аллокациям памяти, а разделение разметки (XML) и логики (Kotlin/Java) порождало хроническую проблему рассинхронизации состояния (**Double State** — двойное состояние), когда визуальный компонент рассинхронизировался с моделью данных в коде."""

THEORY[1] = """### 📚 Теория и спецификация
- **Индустриальный контекст**: В масштабных финтех-приложениях уровня Т-Банка, Яндекса или Avito кодовые базы насчитывают миллионы строк кода, сотни модулей и тысячи экранов.
- **Двустековый стек в продакшене**:
  - Мгновенная миграция крупного коммерческого проекта с XML на Compose экономически невозможна и сопряжена с высокими рисками регрессии.
  - Поэтому инженер уровня Middle и Senior обязан в совершенстве владеть обоими подходами: понимать ограничения и фазы отрисовки классического XML для безопасной поддержки legacy-кода и применять современные паттерны Compose (**UDF**, **State Hoisting**, **Interop**) для создания новых фичей.

### ⚙️ Под капотом (Инженерные метрики UI)
- В продакшене стабильность и отзывчивость интерфейса оцениваются тремя критическими метриками (согласно [Android Vitals](https://developer.android.com/topic/performance/vitals)):
  1. **TTI** (*Time to Interactive* — время до интерактивности): интервал времени от старта экрана до момента, когда UI полностью отрисован и готов мгновенно обрабатывать нажатия пользователя без блокировки главного потока. Документация: [App Startup Time](https://developer.android.com/topic/performance/vitals/launch-time).
  2. **Frozen Frames** (замороженные кадры >700 мс) и **Slow Frames** (медленные кадры >16 мс): просадки частоты кадров ниже целевых 60 или 120 **FPS** (*Frames Per Second* — кадров в секунду). Документация: [Slow Rendering & Frozen Frames](https://developer.android.com/topic/performance/vitals/render).
  3. **Crash-Free Users**: процент пользователей без аварийных падений приложения (**NPE** — *NullPointerException*, **OOM** — *OutOfMemoryError*).

### 📖 Пояснения терминов и ссылки
- **State Hoisting** (подъём состояния) — паттерн выноса состояния из UI-компонента наверх к вызывающему коду для превращения компонента в чистую функцию. Документация: [State Hoisting in Compose](https://developer.android.com/develop/ui/compose/state#state-hoisting).
- **Compose Interop** (интероперабельность) — официальный механизм бесшовного встраивания Compose в XML (`ComposeView`) и View в Compose (`AndroidView`). Документация: [Compose Interoperability APIs](https://developer.android.com/develop/ui/compose/interop/interop-apis)."""

THEORY[2] = """### 📚 Теория и спецификация
- **Матрица ключевых компетенций занятия (Learning Outcomes)**:
  1. **Анатомия View**: знание трёх фаз отрисовки (Measure, Layout, Draw), битовой упаковки класса `MeasureSpec` и стоимости проходов замера. Спецификация: [View.MeasureSpec Reference](https://developer.android.com/reference/android/view/View.MeasureSpec).
  2. **Эволюция связывания**: понимание истории и ловушек от `findViewById` через ButterKnife и Kotlin Synthetics к `ViewBinding`. Документация: [View Binding Guide](https://developer.android.com/topic/libraries/view-binding).
  3. **Императивный кризис**: понимание проблемы **Double State** (два источника истины) и комбинаторного взрыва состояний $O(N \\times M)$.
  4. **Декларативная парадигма**: ментальный сдвиг к модели $UI = f(State)$, знание роли аннотации `@Composable` и структуры памяти **SlotTable** (слотовая таблица). Руководство Google: [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model).
  5. **Рекомпозиция и стабильность**: правила умного пропуска вызовов (**Smart Skipping**) и контракты стабильности типов (`@Stable`, `@Immutable`). Документация: [Compose Stability](https://developer.android.com/develop/ui/compose/performance/stability).
  6. **Архитектура UDF**: паттерн **UDF** (*Unidirectional Data Flow* — однонаправленный поток данных) и разделение компонентов на Stateless (без состояния) и Stateful (с состоянием). Руководство: [UI Layer Architecture](https://developer.android.com/topic/architecture/ui-layer#udf).
  7. **Интероперабельность (Interop)**: практическое использование классов `ComposeView` и функции `AndroidView` для гибридных экранов. Спецификация: [Compose Interop APIs](https://developer.android.com/develop/ui/compose/interop/interop-apis)."""

THEORY[3] = """### 📚 Теория и спецификация
- **Методическая структура занятия (8 тематических блоков)**:
  - **Блоки 1–3**: Детальный разбор классического XML-стека, внутреннего устройства `android.view.View`, фаз рендеринга и причин, по которым императивный подход исчерпал свои возможности.
  - **Блоки 4–6**: Погружение в Jetpack Compose, математическую модель $UI = f(State)$, механизм рекомпозиции, систему реактивных состояний **Snapshot State System** и архитектурный паттерн **UDF** (*Unidirectional Data Flow*). Руководство Google: [Guide to App Architecture](https://developer.android.com/topic/architecture).
  - **Блок 7**: Интероперабельность (**Interop**) — мост между XML и Compose в реальных коммерческих проектах.
  - **Блок 8**: Живая практика — рефакторинг экрана авторизации с XML/ViewBinding на чистый Jetpack Compose и домашнее задание сквозного проекта FinanceApp.
- **Официальный роадмап технологий**: развитие Android UI подробно освещается в [Jetpack Compose Roadmap](https://developer.android.com/jetpack/androidx/compose-roadmap)."""

THEORY[4] = """### 📚 Теория и спецификация
- **Официальные первоисточники Google и Kotlin**:
  - [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model) — базовый манифест Google о переходе от императивного мутирования объектов к чистым функциям и реактивному потоку данных.
  - [State and Jetpack Compose](https://developer.android.com/develop/ui/compose/state) — официальное руководство по управлению состоянием, функциям `remember`, `mutableStateOf` и подъёму состояния (State Hoisting).
  - [Compose Performance & Stability](https://developer.android.com/develop/ui/compose/performance/stability) — правила стабильности типов для оптимизации рекомпозиции компилятором Compose.
  - [View System Architecture](https://developer.android.com/reference/android/view/View) — фундаментальная документация по суперклассу `android.view.View` и фазам отрисовки экрана.
  - [AOSP Framework Source Code](https://cs.android.com/android/platform/superproject/main/+/main:frameworks/base/) — публичный репозиторий исходного кода платформы Android (`View.java`, `ViewGroup.java`, `LayoutInflater.java`)."""

# -------------------------------------------------------------
# Блок 1: Классическая вёрстка в Android (Slides 5-18)
# -------------------------------------------------------------
THEORY[5] = """### 📚 Теория и спецификация
- **Раздел 1: Устройство классического Android UI**:
  - Классический UI Android базируется на объектно-ориентированной модели Java.
  - Принцип разделения ответственности (**Separation of Concerns**) в классическом Android понимался как строгое разделение *статической структуры разметки* (файлы `res/layout/*.xml`) и *поведенческой логики* (классы `Activity` и `Fragment` на Java/Kotlin).
- **Сборка разметки утилитой AAPT2**:
  - **AAPT2** (*Android Asset Packaging Tool 2* — утилита упаковки ресурсов Android) компилирует текстовые XML-файлы макетов в компактный бинарный формат (**Binary XML**) и генерирует класс констант `R.java`. Документация: [AAPT2 Overview](https://developer.android.com/tools/aapt2).

### ⚙️ Под капотом (AOSP)
- Во время вызова `setContentView(R.layout.activity_main)` системный класс `LayoutInflater` через парсер `XmlPullParser` обходит скомпилированный бинарный XML и с помощью Java Reflection (`Class.forName(...)` и `Constructor.newInstance(...)`) конструирует объекты каждого тега разметки в куче (Heap)."""

THEORY[6] = """### 📚 Теория и спецификация
- **Аппаратные ограничения эпохи старта Android (2008 год)**:
  - Первый коммерческий смартфон: HTC Dream (T-Mobile G1) на процессоре Qualcomm MSM7201A с тактовой частотой всего 528 МГц и 192 МБ оперативной памяти (**RAM** — *Random Access Memory*).
  - Крайне медленная компиляция Java-кода на тогдашних компьютерах вынудила инженеров Google вынести разметку экранов в статические XML-ресурсы, чтобы верстать экраны без долгой перекомпиляции всей логики проекта.

### ⚙️ Под капотом (AOSP и графический движок Skia)
- В Android 1.0 графическая подсистема не имела аппаратного ускорения: отрисовка всех элементов выполнялась на центральном процессоре (**CPU** — *Central Processing Unit*) через библиотеку **Skia** (открытый 2D-движок на C++, [skia.org](https://skia.org/)) в буфер растрового изображения `Bitmap`.
- **Hardware Acceleration** (аппаратное ускорение графики через видеочип **GPU** — *Graphics Processing Unit* и API OpenGL ES) появилось в Android 3.0 Honeycomb и стало обязательным только в Android 4.0 Ice Cream Sandwich. Руководство: [Hardware Acceleration in Android](https://developer.android.com/topic/performance/hardware-accel).

### ⚠️ Нюансы продакшена и собеседования
- **Исторический парадокс**: XML создавался в 2008 году для слабых устройств, чтобы сократить время сборки, но спустя 10 лет сам XML, рефлексивный парсинг и тяжеловесные инстансы `View` стали главным тормозом производительности мобильных приложений."""

THEORY[7] = """### 📚 Теория и спецификация
- **Двухкомпонентная модель экрана**:
  - Файл макета: декларативное описание разметки в `res/layout/*.xml`.
  - Управляющий контроллер: код экрана `Activity` или `Fragment` на Java или Kotlin.
- **Инфлейт (Inflation)**:
  - Процесс превращения статического XML-файла в живой граф объектов Java в оперативной памяти кучи (Heap) через метод `LayoutInflater.inflate()`.

### ⚙️ Под капотом (AOSP: PhoneWindow и DecorView)
- Каждое окно приложения базируется на системном классе `com.android.internal.policy.PhoneWindow` (наследник `android.view.Window`, [Window Reference](https://developer.android.com/reference/android/view/Window)).
- Внутри окна создаётся корневой системный контейнер **DecorView** (наследник `FrameLayout`).
- `DecorView` содержит системную строку состояния (Status Bar), панель навигации (Navigation Bar) и контейнер контента с фиксированным системным ID `android.R.id.content`. Вызов `setContentView(R.layout.my_screen)` помещает созданное дерево View разработчика внутрь `R.id.content`.

### ⚠️ Нюансы продакшена и собеседования
- Ошибка с флагом `attachToRoot`: вызов `LayoutInflater.inflate(resId, parent, true)` внутри адаптеров списков или метода `onCreateView` фрагмента приводит к падению: *«IllegalStateException: The specified child already has a parent»*, потому что родительский контейнер пытается прикрепить элемент дважды."""

THEORY[8] = """### 📚 Теория и спецификация
- **Проблема разрыва контекста (Context Switching)**:
  - XML — статичный формат описания данных без поддержки переменных, условий, циклов и строгой типизации. Руководство: [Android Resources](https://developer.android.com/guide/topics/resources/available-resources).
  - Из-за этого единая логика одного экрана разорвана пополам: разметка описана в XML, а управление её элементами и реакция на действия пользователя находятся в Kotlin-файле.
  - Разработчик вынужден постоянно переключать контекст между двумя языками и двумя разными каталогами проекта.

### ⚙️ Под капотом (Битовая структура идентификаторов AAPT2)
- Утилита AAPT2 ([AAPT2 Documentation](https://developer.android.com/tools/aapt2)) присваивает каждому XML-элементу с атрибутом `android:id="@+id/my_button"` 32-битный шестнадцатеричный идентификатор (например, `0x7F080001`):
  - `0x7F` — идентификатор пакета приложения (Package ID).
  - `0x08` — тип ресурса (`id`, `layout`, `string` и т.д.).
  - `0x0001` — порядковый номер символа в таблице ресурсов.
- **Критический дефект**: компилятор Kotlin/Java не проверяет совместимость типов между XML и кодом во время сборки. Метод `findViewById(R.id.my_button)` возвращает сырой `View`, требуя явного приведения типов."""

THEORY[9] = """### 📚 Теория и спецификация
- **Класс `android.view.View`**:
  - Базовый суперкласс абсолютно всех визуальных элементов в классическом Android ([View Reference](https://developer.android.com/reference/android/view/View)).
  - Отвечает за прямоугольную область экрана (bounding box), замер размеров (`measure`), размещение (`layout`), отрисовку графики (`draw`) и обработку событий касаний (`onTouchEvent`).
- **Проблемы наследования в Android SDK**:
  - `class Button extends TextView extends View` — кнопка в Android наследует текстовое поле!
  - `class CheckBox extends CompoundButton extends Button extends TextView` — чекбокс тащит за собой весь код форматирования текста, спанов, выделения и мигания курсора, который ему вообще не нужен.

### ⚙️ Под капотом (AOSP)
- Исходный файл `View.java` в AOSP насчитывает **более 31 000 строк кода**.
- Каждый созданный объект `View` в оперативной памяти хранит десятки битовых полей флагов (`mPrivateFlags`, `mPrivateFlags2`), матрицы аффинных трансформаций, ссылки на слушатели кликов, аниматоры и системный `Context`.

### ⚠️ Нюансы продакшена и собеседования
- В Jetpack Compose применён принцип **«Композиция вместо наследования»** (*Composition over Inheritance*): `Button` в Compose — это не тяжеловесный класс, а легковесная функция-контейнер, принимающая любую лямбду содержимого: `content: @Composable RowScope.() -> Unit`. Документация: [Compose Button](https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary#Button)."""

THEORY[10] = """### 📚 Теория и спецификация
- **Класс `android.view.ViewGroup`**:
  - Абстрактный класс, расширяющий `View` и реализующий классический паттерн проектирования **Composite (Компоновщик)** из каталога **GoF** (*Gang of Four* — «Банда четырёх», авторы книги «Design Patterns», [Composite Pattern](https://en.wikipedia.org/wiki/Composite_pattern)).
  - Паттерн Composite позволяет коду единообразно обращаться как к одиночному элементу (`View`), так и к контейнеру, объединяющему множество дочерних элементов (`ViewGroup`). Официальная документация: [ViewGroup Reference](https://developer.android.com/reference/android/view/ViewGroup).
- **Спецификация `LayoutParams`**:
  - У каждого контейнера есть собственный внутренний класс параметров размещения (например, `LinearLayout.LayoutParams`, [ViewGroup.LayoutParams Reference](https://developer.android.com/reference/android/view/ViewGroup.LayoutParams)), указывающий родителю, как именно позиционировать дочерний элемент.

### ⚙️ Под капотом (AOSP)
- Внутри `ViewGroup` ссылки на дочерние элементы хранятся в простом массиве `View[] mChildren`.
- При вызове системного метода `dispatchDraw(Canvas canvas)` контейнер рекурсивно обходит массив `mChildren` и вызывает для каждого ребёнка метод `drawChild(canvas, child, drawingTime)`."""

THEORY[11] = """### 📚 Теория и спецификация
- **Контейнер `LinearLayout`**:
  - Контейнер линейного размещения элементов последовательно в одну строку (`HORIZONTAL`) или в один столбец (`VERTICAL`). Документация: [LinearLayout Guide](https://developer.android.com/reference/android/widget/LinearLayout).
  - **Механизм весов (`android:layout_weight`)**: распределяет оставшееся свободное пространство родителя пропорционально заданным коэффициентам.
  - **Золотое правило весов**: размер взвешенного элемента по оси распределения (`layout_width` для горизонтального или `layout_height` для вертикального) обязан быть установлен в `0dp`, иначе расчёт пропорций будет некорректным.

### ⚙️ Под капотом (Проблема двойного замера — Double Measure Pass)
- Если в `LinearLayout` задан хотя бы один дочерний элемент с `weight`, контейнер вынужден вызвать метод `onMeasure` **дважды**: сначала для расчёта базовых фиксированных размеров, затем повторно для распределения остатка пространства.
- При глубокой вложенности контейнеров `LinearLayout` с весами число вызовов замера растёт экспоненциально как $O(2^k)$, где $k$ — глубина вложенности, что гарантированно приводит к просадкам частоты кадров ниже 60 **FPS**."""

THEORY[12] = """### 📚 Теория и спецификация
- **`FrameLayout`**:
  - Простейший контейнер-стопка ([FrameLayout Reference](https://developer.android.com/reference/android/widget/FrameLayout)). Накладывает элементы слоями друг на друга по оси Z. Идеален для одного дочернего элемента, фрагментов или наложения полупрозрачного индикатора загрузки поверх контента.
- **`RelativeLayout`**:
  - Позиционирует дочерние элементы относительно границ родителя или относительно идентификаторов соседних элементов (`android:layout_toRightOf`, `android:layout_below`). Документация: [RelativeLayout Guide](https://developer.android.com/reference/android/widget/RelativeLayout).

### ⚙️ Под капотом (AOSP)
- Для разрешения взаимных зависимостей `RelativeLayout` строит граф и выполняет топологическую сортировку.
- Из-за разделения правил по горизонтали и вертикали `RelativeLayout` **всегда выполняет минимум 2 прохода замера** для каждого дочернего элемента. Вложенные `RelativeLayout` вызывали катастрофические задержки кадра."""

THEORY[13] = """### 📚 Теория и спецификация
- **ConstraintLayout (представлен Google на Google I/O 2016)**:
  - Разработан Google совместно с JetBrains для построения абсолютно плоских иерархий макетов любой сложности без вложенных контейнеров. Документация: [ConstraintLayout Guide](https://developer.android.com/develop/ui/views/layout/constraint-layout).
  - **Алгоритм Cassowary**: в основе лежит математический алгоритм решения систем линейных уравнений и неравенств **Cassowary** (разработан Г. Баддингом и А. Борнингом в 1997 г., тот же алгоритм используется в Auto Layout платформы Apple iOS). Подробнее: [Cassowary Algorithm](https://en.wikipedia.org/wiki/Cassowary_(software)).
- **Плюсы и минусы ConstraintLayout**:
  - *Плюс*: плоское дерево без оверхеда вложенных контейнеров.
  - *Минус*: перегруженный XML-код с десятками строк атрибутов ограничений на каждый виджет, крайне неудобный для ручного чтения без графического редактора."""

THEORY[14] = """### 📚 Теория и спецификация
- **Синтаксис XML-макетов в Android**:
  - Пространство имён `xmlns:android="http://schemas.android.com/apk/res/android"` связывает атрибуты с системной схемой Android SDK.
  - Обязательные атрибуты каждого элемента: `android:layout_width` и `android:layout_height` со значениями `match_parent` (занять весь размер родителя), `wrap_content` (подогнать под размер содержимого) или фиксированными единицами.
- **Единицы измерения в Android**:
  - **PX** (*Pixel*): физический пиксель матрицы экрана.
  - **DPI** (*Dots Per Inch* — точек на дюйм): плотность пикселей экрана. Базовый эталон: `mdpi` = 160 dpi.
  - **DP** / **DIP** (*Density-independent Pixel* — независимый от плотности пиксель): гарантирует одинаковый физический размер элемента на экранах любой плотности: $\\text{px} = \\text{dp} \\times \\left(\\frac{\\text{DPI}}{160}\\right)$. На экранах xxhdpi (480 dpi) 1 dp = 3 px.
  - **SP** (*Scale-independent Pixel* — масштабируемый пиксель): используется для текста и учитывает масштаб шрифта, заданный пользователем в системных настройках доступности. Спецификация: [Support different pixel densities](https://developer.android.com/training/multiscreen/screendensities)."""

THEORY[15] = """### 📚 Теория и спецификация
- **3 фазы рендеринга кадра в Android (View Lifecycle Phases)**:
  1. **Measure (Замер)**: родительский контейнер передаёт ограничения дочернему элементу через класс `MeasureSpec`. Элемент вычисляет свои желаемые размеры и сохраняет их вызовом `setMeasuredDimension(width, height)`.
  2. **Layout (Размещение)**: родитель определяет точные экранные координаты каждого ребёнка и вызывает метод `child.layout(left, top, right, bottom)`.
  3. **Draw (Отрисовка)**: элементы рисуют свои визуальные примитивы (фон, текст, векторные контуры) на графическом холсте `Canvas` ([Canvas Reference](https://developer.android.com/reference/android/graphics/Canvas)).
- **Бюджет времени кадра**: для плавности 60 **FPS** на отрисовку кадра отводится ровно **16.6 мс**; для экранов 120 Гц бюджет составляет всего **8.3 мс**. Превышение бюджета вызывает видимый пропуск кадра (Jank). Документация: [Rendering Performance](https://developer.android.com/topic/performance/vitals/render).

### ⚙️ Под капотом (Класс MeasureSpec)
- Класс `android.view.View.MeasureSpec` ([MeasureSpec API](https://developer.android.com/reference/android/view/View.MeasureSpec)) упаковывает ограничения в один 32-битный целочисленный примитив `Int`:
  - Старшие 2 бита определяют режим: `EXACTLY` (строгий размер), `AT_MOST` (не больше указанного), `UNSPECIFIED` (любой размер).
  - Младшие 30 бит кодируют доступный размер в пикселях.
- Упаковка в примитивный `Int` защищает от создания временных объектов в куче и предотвращает паузы **GC** (*Garbage Collector* — автоматический сборщик мусора)."""

THEORY[16] = """### 📚 Теория и спецификация
- **Память в классическом UI (Накладные расходы)**:
  - Даже простой экран из 50 элементов аллоцирует в оперативной памяти кучи (Java Heap) десятки килобайт данных.
  - Каждый экземпляр `View` содержит матрицы трансформации, поля битовых флагов, ссылки на слушатели событий и ссылку на системный `Context`.
- **Утечки памяти (Context Leaks)**:
  - Сохранение ссылки на `View` внутри фонового потока, корутины или статической переменной приводит к утечке всего связанного `Activity` со всеми ресурсами, порождая фатальную ошибку **OOM** (*OutOfMemoryError*).
  - При быстром скролле списков частое создание и уничтожение объектов View вызывает принудительные паузы сборщика мусора **GC Stop-The-World**, вызывающие подвисания интерфейса. Документация: [Memory Management in Android](https://source.android.com/docs/core/runtime/gc-debug)."""

THEORY[17] = """### 📚 Теория и спецификация
- **Стили (Style) и Темы (Theme) в XML**:
  - **Стиль (`Style`)**: коллекция атрибутов, применяемая точечно к конкретному элементу разметки: `style="@style/MyButton"`.
  - **Тема (`Theme`)**: глобальный контекст приложения или экрана (`Theme.Material3.DayNight`), задающий значения системных семантических атрибутов (например, `?attr/colorPrimary`). Документация: [Styles and Themes Guide](https://developer.android.com/develop/ui/views/theming/themes).
- **Класс `TypedArray`**:
  - Атрибуты темы разрешаются динамически во время выполнения через вызов `context.theme.obtainStyledAttributes(...)`.

### ⚙️ Под капотом (AOSP)
- При чтении стилей вызывается нативный C++ код в подсистеме `AssetManager.cpp`. Разработчик обязан явно вызвать метод `typedArray.recycle()`, иначе нативный буфер памяти утечёт."""

THEORY[18] = """### 📚 Теория и спецификация
- **Интерактивный вопрос к аудитории**:
  - *«Почему индустрия мобильной разработки не смогла остановиться на связке XML + ViewBinding?»*
  - *«В чём принципиальная невозможность решить проблему рассинхронизации состояния (Double State) средствами XML?»*
- **Ключевой вывод**:
  - XML решает только задачу *первичного описания структуры*.
  - Но всё последующее поведение и обновление интерфейса остаётся императивным: программист вручную пишет пошаговые команды мутации, в которых неизбежно забывает скрыть лоадер или стереть старую ошибку.
- **Подробнее о ментальном сдвиге**: [Thinking in Compose: Mental Model](https://developer.android.com/develop/ui/compose/mental-model)."""

# -------------------------------------------------------------
# Блок 2: Эволюция связи разметки с кодом (Slides 19-27)
# -------------------------------------------------------------
THEORY[19] = """### 📚 Теория и спецификация
- **Раздел 2: Эволюция связывания разметки с кодом (View Binding Evolution)**:
  - 15-летняя история попыток подружить статичный XML с логикой программы:
    1. **`findViewById` (2008)** — ручной поиск в глубину по дереву элементов.
    2. **ButterKnife (2013)** — кодогенерация через аннотации во время компиляции.
    3. **Kotlin Android Extensions / Synthetics (2017)** — синтетические свойства с неявным кэшем.
    4. **ViewBinding (2019)** — официальные строго типизированные классы-обёртки от Google. Руководство: [View Binding Guide](https://developer.android.com/topic/libraries/view-binding)."""

THEORY[20] = """### 📚 Теория и спецификация
- **Процесс инфлейта (Inflation)**:
  - Метод `LayoutInflater.from(context).inflate(layoutId, parent, attachToRoot)`. Документация: [LayoutInflater Reference](https://developer.android.com/reference/android/view/LayoutInflater).
  - Считывает скомпилированный бинарный XML (Binary XML), обходит теги через парсер `XmlPullParser` и с помощью Java Reflection создает экземпляры каждого класса виджета в памяти."""

THEORY[21] = """### 📚 Теория и спецификация
- **Метод `findViewById`**:
  - Базовый метод класса `Activity` и `View` для поиска элемента по целочисленному идентификатору `R.id.*`.
  - **DFS** (*Depth-First Search* — алгоритм поиска в глубину, [DFS on Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)): метод рекурсивно обходит всё дерево `ViewGroup`, проверяя поле `mID` у каждого узла.
  - **Вычислительная сложность**: в худшем случае $O(N)$, где $N$ — число элементов в дереве. Если экран содержит 100 элементов, а контроллер ищет 20 полей, выполняются тысячи холостых итераций. Исходный код метода: [AOSP View.java](https://cs.android.com/android/platform/superproject/main/+/main:frameworks/base/core/java/android/view/View.java)."""

THEORY[22] = """### 📚 Теория и спецификация
- **Смертельные ловушки метода `findViewById`**:
  1. **NPE** (*NullPointerException*): если элемента с указанным ID нет в текущем XML (например, кнопка есть в портретной ориентации `layout/`, но забыта в альбомной `layout-land/`), метод возвращает `null`, приводя к падению приложения при первом обращении. Руководство по защите: [Null Safety in Kotlin](https://kotlinlang.org/docs/null-safety.html).
  2. **`ClassCastException`**: приведение идентификатора кнопки к `TextView` (`findViewById<TextView>(R.id.button)`) успешно проходит компиляцию, но падает в рантайме.
  3. Полное отсутствие контроля типов на этапе сборки проекта при повороте экрана. Документация: [Handling Runtime Changes & Orientations](https://developer.android.com/guide/topics/resources/runtime-changes)."""

THEORY[23] = """### 📚 Теория и спецификация
- **Библиотека ButterKnife (автор Jake Wharton, 2013 год)**:
  - Первая массовая попытка автоматизировать связывание через аннотации `@BindView(R.id.title) lateinit var title: TextView`. Проект: [ButterKnife on GitHub](https://jakewharton.github.io/butterknife/).
  - **APT / KAPT**:
    - **APT** (*Annotation Processing Tool*) и **KAPT** (*Kotlin Annotation Processing Tool*, [KAPT Documentation](https://kotlinlang.org/docs/kapt.html)) — инструменты обработки аннотаций компилятором.
    - KAPT генерировал связывающий Java-код во время сборки проекта.
- **Минусы**: KAPT сильно замедлял сборку крупных проектов и требовал ручного вызова `unbinder.unbind()` во фрагментах для предотвращения утечек памяти."""

THEORY[24] = """### 📚 Теория и спецификация
- **Kotlin Android Extensions (Kotlin Synthetics, 2017 год)**:
  - Плагин JetBrains, позволявший обращаться к элементам разметки напрямую по их ID без явного связывания: `buttonLogin.text = "Войти"`.
- **Почему Synthetics был признан вредоносным, объявлен Deprecated и удалён**:
  - Генерировал неявный скрытый кэш `HashMap<Int, View>` внутри `Activity` или `Fragment`. Во фрагментах этот кэш жил дольше жизненного цикла View, приводя к массовым утечкам памяти.
  - Загрязнял глобальное пространство имён: разработчик мог случайно импортировать `button_submit` из разметки чужого экрана, что компилировалось без предупреждений и падало в рантайме с NPE. Официальная миграция: [Migrate from Kotlin Synthetics](https://developer.android.com/topic/libraries/view-binding/migration)."""

THEORY[25] = """### 📚 Теория и спецификация
- **ViewBinding (представлен Google в AGP 3.6 в 2019 году)**:
  - **AGP** (*Android Gradle Plugin* — официальный плагин сборки Android для Gradle, [AGP Release Notes](https://developer.android.com/build/releases/gradle-plugin)).
  - ViewBinding генерирует строго типизированный класс-обёртку (например, `ActivityMainBinding`) для каждого XML-файла напрямую компилятором, без медленного KAPT и без рефлексии. Документация: [View Binding Guide](https://developer.android.com/topic/libraries/view-binding).
  - **100% Type Safety и Null Safety**: элементы, отсутствующие в альтернативных макетах (например, альбомной ориентации), автоматически размечаются аннотацией `@Nullable`.
  - **Очистка во фрагментах**: во фрагменте обязательно нужно занулять связку `_binding = null` в методе `onDestroyView()`, чтобы предотвратить утечку памяти."""

THEORY[26] = """### 📚 Теория и спецификация
- **Провал библиотеки DataBinding**:
  - Библиотека **DataBinding** от Google попыталась внести логику и связывание прямо внутрь XML через тег `<data>` и выражения `android:text="@{viewModel.userName}"`. Документация: [Data Binding Guide](https://developer.android.com/topic/libraries/data-binding).
- **Почему индустрия отказалась от DataBinding**:
  - Логика экрана расползлась по XML-файлам, где не работают брейкпоинты отладчика.
  - Ошибки компилятора KAPT генерировали многостраничные нечитаемые стектрейсы.
  - Невозможность написать модульные unit-тесты на логику, зашитую в XML-выражения."""

THEORY[27] = """### 📚 Теория и спецификация
- **Главный архитектурный вывод раздела 2**:
  - ViewBinding решил проблему безопасного получения ссылок на элементы разметки без рефлексии и крашей.
  - Но ViewBinding **не решил проблему управления состоянием**: разработчик по-прежнему вручную пишет пошаговые мутации, рискуя забыть скрыть индикатор загрузки или оставить старый текст ошибки на экране.
- **Подробнее об архитектуре состояний**: [State Production in Android Architecture](https://developer.android.com/topic/architecture/ui-layer/state-production)."""

# -------------------------------------------------------------
# Блок 3: Императивный стиль и его проблемы (Slides 28-39)
# -------------------------------------------------------------
THEORY[28] = """### 📚 Теория и спецификация
- **Раздел 3: Императивный стиль и кризис состояния**:
  - Исследование природы императивного программирования интерфейсов и его фундаментальных архитектурных пороков, приведших индустрию к кризису сложности.
  - Официальный манифест перехода на реактивную архитектуру: [Guide to App Architecture: UI Layer](https://developer.android.com/topic/architecture/ui-layer)."""

THEORY[29] = """### 📚 Теория и спецификация
- **Суть императивного UI — ответ на вопрос «КАК делать?»**:
  - Программа представляет собой последовательность пошаговых команд, мутирующих внешнее глобальное состояние: «найди кнопку, смени цвет фона, заблокируй клики, сделай лоадер видимым».
  - Разработчик обязан лично контролировать весь *процесс перехода* между всеми возможными состояниями экрана.
  - Теоретический базис: [Imperative Programming on Wikipedia](https://en.wikipedia.org/wiki/Imperative_programming) и [Comparison of UI Paradigms](https://developer.android.com/develop/ui/compose/mental-model#paradigms)."""

THEORY[30] = """### 📚 Теория и спецификация
- **Мутабельность классических компонентов View**:
  - Каждый объект `View` в памяти мутабелен: он хранит текущий текст (`mText`), цвет, статус видимости (`mVisibility`), состояние нажатия, фокус и позицию курсора.
  - Визуальные элементы сами выступают распределёнными несинхронизированными базами данных прямо в оперативной памяти. Спецификация: [View State Saving and Restoring](https://developer.android.com/reference/android/view/View#save-state)."""

THEORY[31] = """### 📚 Теория и спецификация
- **Проблема Double State (Два источника истины)**:
  - Модель данных в оперативной памяти (класс Kotlin во ViewModel) и визуальное состояние экрана во View живут раздельно.
  - Программист выступает «живым синхронизатором», который при любом изменении модели обязан найти нужные View и вызвать соответствующие сеттеры. Любая забытая строчка приводит к рассинхронизации.
  - Альтернативный канонический подход: [UI State in Android Architecture](https://developer.android.com/topic/architecture/ui-layer#ui-state) и принцип [Single Source of Truth](https://developer.android.com/topic/architecture#single-source-of-truth)."""

THEORY[32] = """### 📚 Теория и спецификация
- **Анализ инцидента с лоадером (Залипший ProgressBar)**:
  - В блоке обработки ошибки сетевого запроса разработчик показал текст ошибки, но забыл написать `binding.progressBar.visibility = View.GONE`.
  - Результат: крутящийся поверх текста ошибки индикатор загрузки блокирует экран. Корневая причина — необходимость вручную зачищать остаточные артефакты предыдущих состояний.
  - Спецификация режимов видимости: [View.setVisibility Reference](https://developer.android.com/reference/android/view/View#setVisibility(int)) (`VISIBLE`, `INVISIBLE`, `GONE`)."""

THEORY[33] = """### 📚 Теория и спецификация
- **Сценарий валидации формы**:
  - Слушатель `android.text.TextWatcher` ([TextWatcher Reference](https://developer.android.com/reference/android/text/TextWatcher)) — тяжеловесный интерфейс с 3 обязательными методами: `beforeTextChanged`, `onTextChanged`, `afterTextChanged`.
  - При наличии 3 полей ввода проверки дублируются во всех слушателях. Добавление 4-го поля требует переписывания слушателей всех предыдущих полей."""

THEORY[34] = """### 📚 Теория и спецификация
- **Гонки состояний (Race Conditions)**:
  - **Race Condition** (состояние гонки, [Race Condition on Wikipedia](https://en.wikipedia.org/wiki/Race_condition)): асинхронные ответы сети возвращаются не в порядке отправки запросов.
  - Медленный старый ответ на предыдущий поисковый запрос может прийти позже быстрого нового ответа и перезаписать актуальные данные на экране императивными сеттерами.
  - Современный контроль параллелизма: [Shared Mutable State and Concurrency in Kotlin](https://kotlinlang.org/docs/shared-mutable-state-and-concurrency.html)."""

THEORY[35] = """### 📚 Теория и спецификация
- **Формула комбинаторного взрыва $O(N \\times M)$**:
  - Если на экране расположено $N$ независимых визуальных элементов, каждый из которых может находиться в $M$ состояниях, общее число потенциальных состояний экрана растёт экспоненциально: $M^N$.
  - Число ручных переходов между ними становится неподдающимся полному тестированию, порождая непредвиденные баги. Подробнее: [Combinatorial Explosion on Wikipedia](https://en.wikipedia.org/wiki/Combinatorial_explosion)."""

THEORY[36] = """### 📚 Теория и спецификация
- **Спагетти-метод `render(state)`**:
  - Попытка решить проблему через единый метод обновления экрана в каждой ветке `when (state)` заставляет принудительно обнулять свойства всех элементов экрана (прятать ошибки, сбрасывать лоадеры), чтобы очистить мусор от предыдущих экранов.
  - Разбор паттерна в современной архитектуре: [Model-View-Intent (MVI) in Android](https://developer.android.com/topic/architecture/ui-layer)."""

THEORY[37] = """### 📚 Теория и спецификация
- **Боль переиспользования: Custom View в XML**:
  - Создание собственного элемента в классическом Android требует более 150 строк ритуального кода:
    1. Файл описания атрибутов `res/values/attrs.xml`.
    2. Три перегруженных конструктора для инфлейтера.
    3. Парсинг `TypedArray` с обязательным вызовом `recycle()`.
    4. Ручное переопределение методов `onMeasure`, `onLayout`, `onDraw` с вызовами `invalidate()` (перерисовать) и `requestLayout()` (пересчитать размеры). Документация: [Custom View Components](https://developer.android.com/develop/ui/views/layout/custom-views/create-view)."""

THEORY[38] = """### 📚 Теория и спецификация
- **Практикум поиска багов в императивном коде**:
  - Пример типичного фрагмента авторизации с неполными ветками `if-else`.
  - Студенты должны обнаружить незачищенный `errorText` при успешной авторизации и при повторной отправке формы.
  - Обзор типичных ошибок: [Common UI Anti-patterns in Android](https://developer.android.com/topic/architecture/ui-layer#common-pitfalls)."""

THEORY[39] = """### 📚 Теория и спецификация
- **Разбор найденных багов**:
  - Ошибка не стирается при успехе, а повторный вход с `error = null` оставляет старое сообщение на экране.
  - Это фундаментальное родовое проклятие императивных мутаций: вы обязаны помнить не только то, что нужно показать, но и всё то, что нужно стереть.
  - Архитектурное решение проблемы: [UI State Modeling and Immutability](https://developer.android.com/topic/architecture/ui-layer#define-ui-state)."""

# -------------------------------------------------------------
# Блок 4: Декларативная парадигма и Jetpack Compose (Slides 40-51)
# -------------------------------------------------------------
THEORY[40] = """### 📚 Теория и спецификация
- **Раздел 4: Декларативный UI и Jetpack Compose**:
  - Переход от императивного пошагового мутирования к математической модели $UI = f(State)$. Официальное введение: [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model).
  - Пошаговый практический туториал: [Jetpack Compose Tutorial](https://developer.android.com/develop/ui/compose/tutorial)."""

THEORY[41] = """### 📚 Теория и спецификация
- **Декларативная революция в индустрии разработки**:
  - Общемировой переход на декларативные UI-фреймворки: React в вебе (2013), Flutter от Google (2017), SwiftUI от Apple (2019), Jetpack Compose в Android (2021).
  - Индустрия единогласно выбрала функциональную модель описания интерфейса как функции от неизменяемых данных. Обзор тренда: [Why Teams Adopt Jetpack Compose](https://developer.android.com/jetpack/compose/why-adopt)."""

THEORY[42] = """### 📚 Теория и спецификация
- **Суть Декларативного UI — ответ на вопрос «ЧТО?»**:
  - Описание конечного вида экрана как чистой функции от данных.
  - Разработчик описывает, как интерфейс должен выглядеть для каждого возможного значения `State`. Фреймворк Compose сам сравнивает новое дерево со старым и точечно обновляет изменившиеся пиксели. Руководство: [Thinking in Compose Guide](https://developer.android.com/develop/ui/compose/mental-model)."""

THEORY[43] = """### 📚 Теория и спецификация
- **Фундаментальная формула: $UI = f(State)$**:
  - Интерфейс — это результат применения чистой функции $f$ к неизменяемому объекту состояния `State`.
  - **Детерминированность**: одинаковый `State` гарантированно порождает строго одинаковый `UI`. У экрана больше нет скрытой истории предыдущих мутаций. Спецификация: [Compose Functions and State](https://developer.android.com/develop/ui/compose/mental-model#a-simple-composable-function)."""

THEORY[44] = """### 📚 Теория и спецификация
- **Аннотация `@Composable`**:
  - `@Composable` — это не обычная маркерная аннотация, а директива для плагина компилятора Kotlin IR ([Compose Compiler](https://developer.android.com/jetpack/androidx/releases/compose-compiler)).
  - Компилятор Compose меняет тип функции (подобно ключевому слову `suspend` для корутин) и добавляет синтетические скрытые параметры: `$composer: androidx.compose.runtime.Composer` и `$changed: Int` (битовая маска изменений)."""

THEORY[45] = """### 📚 Теория и спецификация
- **В Jetpack Compose полностью отсутствуют классы View!**:
  - `Text`, `Button`, `Column`, `Row` — это обычные Kotlin-функции, возвращающие `Unit`.
  - В памяти Heap нет объектов кнопок или текстовых полей, у которых можно вызвать методы `.setText()` или `.setVisibility()`.
  - Невозможно случайно сломать интерфейс мутацией того, на что физически нет ссылки! Руководство: [Compose Layout Basics](https://developer.android.com/develop/ui/compose/layouts/basics)."""

THEORY[46] = """### 📚 Теория и спецификация
- **Дерево композиции и структура SlotTable**:
  - **SlotTable** (слотовая таблица) и **Gap Buffer** (буфер с зазором): внутренняя структура данных рантайма Compose (`androidx.compose.runtime.SlotTable`, статья: [Under the hood of Jetpack Compose](https://medium.com/androiddevelopers/under-the-hood-of-jetpack-compose-part-2-of-2-37b2c019b7d8)).
  - В отличие от тяжеловесного дерева `View`, слотовая таблица представляет собой плоский плотный массив памяти, хранящий группы вызовов, параметры и сохранённые состояния. Весит в десятки раз меньше классического дерева View."""

THEORY[47] = """### 📚 Теория и спецификация
- **Что такое Рекомпозиция (Recomposition)?**:
  - **Recomposition** (рекомпозиция) — процесс повторного вызова тех Composable-функций, состояние которых изменилось, для обновления отображаемых данных. Документация: [Recomposition Guide](https://developer.android.com/develop/ui/compose/mental-model#recomposition).
  - Функции Compose могут вызываться движком в произвольном порядке, на фоновых потоках или многократно за секунду во время анимаций."""

THEORY[48] = """### 📚 Теория и спецификация
- **Умная рекомпозиция (Smart Recomposition и Smart Skipping)**:
  - Компилятор Compose анализирует типы входных параметров функций и размечает их контрактами стабильности: `@Immutable` (полностью неизменяемый тип) и `@Stable` (стабильный тип с уведомлением об изменениях).
  - **Smart Skipping** (умный пропуск): если ни один из стабильных параметров функции не изменился по `equals()`, рантайм Compose полностью пропускает повторный вызов функции и всего её поддерева. Подробнее: [Compose Stability](https://developer.android.com/develop/ui/compose/performance/stability)."""

THEORY[49] = """### 📚 Теория и спецификация
- **Функция `remember`**:
  - **Позиционная мемоизация**: функция `remember { ... }` сохраняет вычисленное значение в текущем слоте таблицы **SlotTable** между рекомпозициями. Документация: [State in Composables](https://developer.android.com/develop/ui/compose/state#state-in-composables).
  - Значение живёт ровно столько, сколько Composable-функция остаётся в дереве композиции. При исчезновении функции из дерева слот памяти автоматически освобождается."""

THEORY[50] = """### 📚 Теория и спецификация
- **Реактивное состояние `mutableStateOf` и Snapshot State System**:
  - Функция `mutableStateOf(value)` создает объект `MutableState<T>`, интегрированный в подсистему снимков состояний **Snapshot State System** ([State in Compose](https://developer.android.com/develop/ui/compose/state)).
  - Чтение `.value` внутри Composable-функции автоматически регистрирует её в качестве подписчика текущей области рекомпозиции (`RecomposeScope`).
  - Запись нового значения в `.value` мгновенно планирует рекомпозицию всех зарегистрированных подписчиков."""

THEORY[51] = """### 📚 Теория и спецификация
- **Переживаем поворот экрана: функция `rememberSaveable`**:
  - Функция `rememberSaveable` сохраняет значение в системный реестр **SavedStateRegistry** через сериализуемый контейнер **Bundle** ([Save state in Compose](https://developer.android.com/develop/ui/compose/state#restore-ui-state)).
  - В отличие от обычного `remember`, переживает пересоздание `Activity` при повороте экрана, смене системного языка или вытеснении процесса операционной системой в фоновом режиме."""

# -------------------------------------------------------------
# Блок 5: Детальное сравнение: XML vs Compose (Slides 52-64)
# -------------------------------------------------------------
THEORY[52] = """### 📚 Теория и спецификация
- **Раздел 5: Детальное сравнение: XML vs Compose на реальном коде**:
  - 5 сквозных сценариев из реальной практики: счётчик кликов, экран состояний сети (Loading / Error / Content), валидация форм, списки данных и цепочки модификаторов.
  - Руководство по архитектурным различиям: [Phases of Jetpack Compose](https://developer.android.com/develop/ui/compose/phases)."""

THEORY[53] = """### 📚 Теория и спецификация
- **Сводная матрица сопоставления парадигм**:
  - **Язык**: XML + Kotlin/Java vs 100% чистый Kotlin.
  - **Парадигма**: Императивная (пошаговое КАК) vs Декларативная (целевое ЧТО).
  - **Память**: Тяжеловесные объекты `View` в Heap vs плоский компактный буфер `SlotTable`.
  - **Источник истины**: Разорван (Double State) vs **SSOT** (*Single Source of Truth* — единый источник истины).
  - **Связывание**: `findViewById` / `ViewBinding` vs прямая передача параметров в функцию.
  - **Списки**: `RecyclerView` + `Adapter` + `ViewHolder` vs `LazyColumn`.
  - Руководство для Android-разработчиков: [Jetpack Compose for View Developers](https://developer.android.com/develop/ui/compose/mental-model)."""

THEORY[54] = """### 📚 Теория и спецификация
- **Счётчик кликов на XML**:
  - Требует 2 отдельных файла (`activity_counter.xml` и `CounterActivity.kt`), генерацию ViewBinding, ручной сеттер `binding.counterText.text = ...`.
  - При повороте экрана значение счётчика сбрасывается в 0, если вручную не реализовать методы `onSaveInstanceState` и `onRestoreInstanceState`. Документация: [Saving UI States in Android](https://developer.android.com/topic/libraries/architecture/saving-states)."""

THEORY[55] = """### 📚 Теория и спецификация
- **Архитектурный анализ счётчика кликов в Compose**:
  - Вся реализация — 10 строк в одном файле без вспомогательных XML, ID и классов View. Документация: [State and Jetpack Compose](https://developer.android.com/develop/ui/compose/state).
  - Конструкция `var count by rememberSaveable { mutableIntStateOf(0) }` решает одновременно три фундаментальные задачи:
    1. **Подписка на состояние (Snapshot State)**: чтение переменной `count` внутри composable-функции `Text` регистрирует текущий `RecomposeScope`. При инкременте `count++` Compose автоматически планирует повторный вызов только этой ветки UI.
    2. **Кэширование между кадрами (`remember`)**: гарантирует, что значение не сбрасывается в 0 при каждом новом вызове функции `CounterScreen`.
    3. **Переживание смены конфигурации (`rememberSaveable`)**: сохраняет значение в системный `Bundle` через `BundleSaverProvider`. При повороте экрана или смене системного языка счётчик не сбрасывается, исключая необходимость писать бойлерплейт `onSaveInstanceState` в Activity.

### ⚙️ Под капотом (Snapshot State System)
- `mutableIntStateOf(0)` использует оптимизированную примитивную реализацию `SnapshotMutableIntStateImpl`, предотвращающую автобоксинг `Integer` в Heap.
- Механизм **Snapshot State**: Compose отслеживает все чтения состояний через глобальный перехватчик `Snapshot.current.readObserver`. Это позволяет обновлять элементы интерфейса с хирургической точностью без инвалидации родительских контейнеров.

### ⚠️ Нюансы продакшена и собеседования
- **Вопрос**: *«Что произойдёт, если заменить rememberSaveable на обычный remember?»*
- **Ответ**: При обычном `remember` состояние живёт ровно столько, сколько Composable остаётся в дереве композиции. При пересоздании Activity (поворот экрана, вытеснение из памяти в фоне) `remember` создаст значение заново (счётчик вернётся в 0)."""

THEORY[56] = """### 📚 Теория и спецификация
- **Паттерн Loading / Error / Content (L/E/C) в императивном XML**:
  - Классический экран сетевого запроса имеет 3 взаимоисключающих состояния: индикатор загрузки (`ProgressBar`), блок ошибки (`TextView` + `Button` повтора) и контент (`RecyclerView`).
  - **Императивное управление через `visibility`**:
    - В каждом блоке обработки состояния разработчик обязан явно выставить `View.VISIBLE` для активного экрана и `View.GONE` для двух остальных.
    - В кодовой базе на 3 состояния требуется $3 \\times 3 = 9$ императивных присваиваний. Если в ветке ошибки забыть скрыть `progressBar.visibility = View.GONE`, на экране возникнет «фантомный лоадер», крутящийся поверх текста ошибки.

### ⚙️ Под капотом (AOSP)
- **Накладные расходы скрытых View**:
  - В XML даже элементы со статусом `View.GONE` реально существуют в куче (Heap), инициализируются через рефлексию при старте экрана и участвуют в инвалидации дерева при смене видимости. Руководство: [How Android Draws Views](https://developer.android.com/guide/topics/ui/how-android-draws).
  - В Compose при смене ветки `if (state is Loading)` неактивные composable-узлы просто не вызываются компилятором, освобождая ресурсы CPU и памяти.

### ⚠️ Нюансы продакшена и собеседования
- **Архитектурный вывод**: В XML состояния взаимоисключающие логически, но сосуществующие физически. В Compose состояния взаимоисключающие как логически, так и физически (нет данных — нет узла в графе рендера)."""

THEORY[57] = """### 📚 Теория и спецификация
- **Паттерн L/E/C в Jetpack Compose**:
  - Реализуется через идиоматичную конструкцию `when (state)`:
    - `is ScreenState.Loading -> LoadingView()`
    - `is ScreenState.Error -> ErrorView(state.message)`
    - `is ScreenState.Content -> ContentView(state.data)`
  - **Архитектурное преимущество**: неактивные Composable-узлы физически отсутствуют в слотовой таблице дерева композиции. Наложение лоадера поверх ошибки исключено на уровне архитектуры фреймворка. Документация: [Handling UI States with Sealed Interfaces](https://developer.android.com/topic/architecture/ui-layer#define-ui-state)."""

THEORY[58] = """### 📚 Теория и спецификация
- **Проблема валидации форм ввода в классическом XML**:
  - Слушатель `android.text.TextWatcher` — тяжеловесный интерфейс с 3 обязательными методами: `beforeTextChanged`, `onTextChanged`, `afterTextChanged`.
  - Изменение текста пользователем вызывает слушатель, который должен валидировать поле (например, проверять формат e-mail или маску телефона) и императивно обновлять `error = \"Неверный e-mail\"` и активность кнопки `submitButton.isEnabled = isValid`.

### ⚙️ Под капотом (Ловушка рекурсивного зацикливания)
- Если внутри `afterTextChanged` изменить текст (например, форматировать номер телефона `+7 (999)...`), `EditText` вызовет `afterTextChanged` повторно. Без защитных флагов-блокираторов (`isFormatting = true`) приложение уходит в бесконечную рекурсию и падает с `StackOverflowError`.
- **Проблема рассинхронизации фокуса**: при обновлении `EditText.setText()` из ViewModel курсор сбрасывается в начало строки, что требует ручного вызова `setSelection(text.length)`.

### ⚠️ Нюансы продакшена и собеседования
- В Compose текстовое поле `OutlinedTextField` работает в парадигме **Controlled Component** (управляемый компонент, [Text in Compose](https://developer.android.com/develop/ui/compose/text/user-input)):
  - Значение `value` задаётся сверху из `State`.
  - Событие изменения `onValueChange = { newText -> onEvent(UpdateText(newText)) }` передаёт сырой ввод во ViewModel, которая очищает и валидирует его до отправки обратно в UI. Никаких рекурсивных листенеров!"""

THEORY[59] = """### 📚 Теория и спецификация
- **Валидация формы в Jetpack Compose**:
  - Параметры формы хранятся в неизменяемом состоянии (State).
  - **Функция `derivedStateOf`**: вычисляет производное состояние активности кнопки:
    ```kotlin
    val isSubmitEnabled by remember {
        derivedStateOf { email.contains("@") && password.length >= 8 && agreed }
    }
    ```
    Compose пересчитывает `isSubmitEnabled` только тогда, когда реально изменяются зависимые поля, исключая лишние рекомпозиции. Документация: [derivedStateOf Guide](https://developer.android.com/develop/ui/compose/side-effects#derivedstateof) и [TextFields in Compose](https://developer.android.com/develop/ui/compose/text/user-input)."""

THEORY[60] = """### 📚 Теория и спецификация
- **Списки данных в классическом XML (RecyclerView)**:
  - Реализация списка требует 5 сущностей: XML-файл элемента списка, класс `ViewHolder`, адаптер `RecyclerView.Adapter`, класс расчёта диффов `DiffUtil.ItemCallback` и менеджер компоновки `LayoutManager`. Руководство: [Create dynamic lists with RecyclerView](https://developer.android.com/develop/ui/views/layout/recyclerview).
  - Свыше 80 строк ритуального шаблонного кода (бойлерплейта).
  - **DiffUtil**: алгоритм Майерса для вычисления минимального списка изменений между двумя наборами данных ([DiffUtil Reference](https://developer.android.com/reference/androidx/recyclerview/widget/DiffUtil))."""

THEORY[61] = """### 📚 Теория и спецификация
- **Списки данных в Jetpack Compose (LazyColumn)**:
  - Компонент `LazyColumn` ([Lists in Compose](https://developer.android.com/develop/ui/compose/lists)) заменяет весь бойлерплейт RecyclerView всего 15 строками декларативного кода:
    ```kotlin
    LazyColumn {
        items(users, key = { it.id }) { user ->
            UserCard(user = user)
        }
    }
    ```
  - Параметр `key = { it.id }` обеспечивает стабильную идентификацию элементов при перемещении, сортировке и удалении, а модификатор `Modifier.animateItemPlacement()` добавляет автоматические плавные анимации перестановки без ручного написания кода."""

THEORY[62] = """### 📚 Теория и спецификация
- **Цепочки модификаторов (`Modifier`) в Compose**:
  - **`Modifier`** — универсальный объект настройки размера, отступов, фона, скруглений, кликов и семантики компонентов. Документация: [Compose Modifiers Guide](https://developer.android.com/develop/ui/compose/modifiers).
  - **Критическая важность порядка вызовов**:
    - `Modifier.padding(16.dp).background(Color.Blue)` задаёт *внешний отступ* (аналог margin в XML) вокруг синей плашки.
    - `Modifier.background(Color.Blue).padding(16.dp)` задаёт *внутренний отступ* (аналог padding в XML) внутри синей плашки."""

THEORY[63] = """### 📚 Теория и спецификация
- **Инженерные метрики внедрения Compose в индустрии**:
  - По данным официальных кейсов Google, Twitter, Square и Т-Банка ([Compose Case Studies](https://developer.android.com/jetpack/compose/why-adopt)):
    - Сокращение объёма UI-кода на **40–60%**.
    - Ускорение разработки и поставки новых фичей в **1.5–2 раза**.
    - Снижение падений NPE и багов зависших лоадеров на **70%**."""

THEORY[64] = """### 📚 Теория и спецификация
- **Интерактивный вопрос к аудитории**:
  - *«Почему в Jetpack Compose полностью исчезли вызовы findViewById и идентификаторы R.id.*?»*
- **Ответ**: Composable-функции вызываются напрямую как обычный код на Kotlin с передачей строго типизированных аргументов. Внутренние узлы не имеют идентификаторов, потому что к ним не нужно обращаться извне для мутаций.
- **Подробнее об архитектуре**: [Architectural differences between Views and Composables](https://developer.android.com/develop/ui/compose/mental-model)."""

# -------------------------------------------------------------
# Блок 6: Архитектура в декларативном UI: UDF (Slides 65-72)
# -------------------------------------------------------------
THEORY[65] = """### 📚 Теория и спецификация
- **Раздел 6: Архитектура в декларативном UI: UDF (Unidirectional Data Flow)**:
  - Паттерны построения предсказуемой и легко тестируемой архитектуры пользовательского интерфейса. Официальное руководство: [Guide to App Architecture: UI Layer](https://developer.android.com/topic/architecture/ui-layer#udf)."""

THEORY[66] = """### 📚 Теория и спецификация
- **Принцип Unidirectional Data Flow (UDF — Однонаправленный поток данных)**:
  - **State (Состояние)** течёт строго **СВЕРХУ ВНИЗ**: от ViewModel / единого источника истины к Composable-компонентам отображения.
  - **Events (События)** текут строго **СНИЗУ ВВЕРХ**: от UI-компонентов к ViewModel через лямбда-колбэки (`onClick`, `onValueChange`).
  - **Ключевое правило**: UI-компоненты никогда не мутируют состояние сами, они лишь уведомляют ViewModel о намерении пользователя. Документация: [Architecture UDF Guide](https://developer.android.com/topic/architecture/ui-layer#udf)."""

THEORY[67] = """### 📚 Теория и спецификация
- **Паттерн State Hoisting (Подъём состояния)**:
  - Вынос внутреннего состояния из Composable-компонента наверх к вызывающей функции. Документация: [State Hoisting in Compose](https://developer.android.com/develop/ui/compose/state#state-hoisting).
  - Компонент превращается в чистую связку двух параметров:
    1. `value: T` — текущее значение для отображения.
    2. `onValueChange: (T) -> Unit` — событие запроса на изменение.
  - Это обеспечивает максимальную гибкость, переиспользуемость и изолированное тестирование."""

THEORY[68] = """### 📚 Теория и спецификация
- **Паттерн Stateful vs Stateless компоненты**:
  - **Stateless-компонент** (без состояния): принимает чистые данные и колбэки, ничего не знает про ViewModel или базы данных. Легко верстается и мгновенно отображается в `@Preview` Android Studio.
  - **Stateful-контейнер** (с состоянием): принимает или внедряет `ViewModel`, подписывается на поток `StateFlow` и передаёт распакованные данные в Stateless-компонент. Руководство: [Stateful vs Stateless Composables](https://developer.android.com/develop/ui/compose/state#stateful-vs-stateless)."""

THEORY[69] = """### 📚 Теория и спецификация
- **Принцип SSOT (Single Source of Truth — Единый источник истины)**:
  - За каждую порцию данных в приложении отвечает строго один владелец (обычно `ViewModel` или репозиторий). Принцип: [Single Source of Truth Principle](https://developer.android.com/topic/architecture#single-source-of-truth).
  - UI не хранит собственную копию данных и не может рассинхронизироваться с бизнес-моделью."""

THEORY[70] = """### 📚 Теория и спецификация
- **Чистые функции и Side-Effects (Побочные эффекты) в Compose**:
  - **Side-Effect** (побочный эффект) — любая операция, изменяющая состояние программы вне области видимости Composable-функции (сетевой запрос, запись в базу, навигация, показ SnackBar).
  - Поскольку функции Compose могут перезапускаться десятки раз в секунду, побочные эффекты обязаны изолироваться в специальные контролируемые обработчики:
    - **`LaunchedEffect`**: запуск корутины с отменой при смене ключа.
    - **`DisposableEffect`**: подписка на системные слушатели с обязательной очисткой в `onDispose`.
    - **`SideEffect`**: передача состояния во внешние системы после успешной рекомпозиции. Документация: [Side-effects in Compose](https://developer.android.com/develop/ui/compose/side-effects)."""

THEORY[71] = """### 📚 Теория и спецификация
- **Невероятная лёгкость тестирования Compose UI**:
  - Библиотека `androidx.compose.ui.test` и тестовое правило `createComposeRule()` ([Testing Compose](https://developer.android.com/develop/ui/compose/testing)).
  - Stateless-компоненты тестируются напрямую на виртуальной машине **JVM** (*Java Virtual Machine*) через Robolectric ([robolectric.org](https://robolectric.org/)) за доли секунды без запуска медленного эмулятора Android.
  - Поиск элементов осуществляется через семантическое дерево доступности (**Semantics Tree**): `composeTestRule.onNodeWithText("Войти").performClick()`."""

THEORY[72] = """### 📚 Теория и спецификация
- **Разбор антипаттерна в архитектуре Compose**:
  - Ошибки в коде:
    1. Состояние переключателя заперто внутри компонента через `remember { mutableStateOf(...) }` вместо подъёма состояния (State Hoisting).
    2. Прямая запись в `AppPreferences.save()` в теле функции является неконтролируемым сайд-эффектом, который будет выполняться повторно при каждой рекомпозиции экрана.
  - Руководство по лучшим практикам: [Compose State Best Practices](https://developer.android.com/develop/ui/compose/state#best-practices)."""

# -------------------------------------------------------------
# Блок 7: Интероперабельность (Slides 73-77)
# -------------------------------------------------------------
THEORY[73] = """### 📚 Теория и спецификация
- **Раздел 7: Двусторонний Interop (Интероперабельность)**:
  - Механизм совместного использования классической View-системы и Jetpack Compose в одном приложении. Официальное руководство: [Compose Interoperability Guide](https://developer.android.com/develop/ui/compose/interop/interop-apis).
  - Позволяет компаниям мигрировать крупные проекты постепенно, без остановки продуктовой разработки."""

THEORY[74] = """### 📚 Теория и спецификация
- **Стратегии миграции крупных приложений на Compose**:
  - **Bottom-Up (Снизу вверх)**: сначала переписываются базовые компоненты дизайн-системы (кнопки, плашки, поля ввода) и встраиваются в XML через `ComposeView`.
  - **Screen-by-Screen (Экран за экраном)**: все новые фичи и экраны пишутся строго на 100% чистом Compose; старые экраны переписываются только при их масштабном продуктовом редизайне. Руководство: [Migration Strategy to Jetpack Compose](https://developer.android.com/develop/ui/compose/migrate/strategy)."""

THEORY[75] = """### 📚 Теория и спецификация
- **`ComposeView`: встраивание Compose внутрь XML**:
  - Класс `androidx.compose.ui.platform.ComposeView` — это обычный наследник `ViewGroup`, создающий точку входа в мир Compose через метод `setContent { ... }`. Документация: [Compose in Views](https://developer.android.com/develop/ui/compose/interop/interop-apis#compose-in-views).
  - **Критический нюанс во фрагментах**:
    ```kotlin
    composeView.setViewCompositionStrategy(
        ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed
    )
    ```
    Без этой стратегии дерево композиции не освободится при уничтожении View фрагмента (`onDestroyView`), что приведёт к утечке памяти."""

THEORY[76] = """### 📚 Теория и спецификация
- **`AndroidView`: встраивание View внутрь Compose**:
  - Composable-функция `AndroidView` позволяет использовать компоненты, пока не имеющие нативных аналогов в Compose (Яндекс Карты `MapView`, видеоплеер Google ExoPlayer / Media3 `PlayerView`, `WebView`, сканеры штрихкодов CameraX). Документация: [Views in Compose](https://developer.android.com/develop/ui/compose/interop/interop-apis#views-in-compose).
  - **Сигнатура**:
    ```kotlin
    AndroidView(
        factory = { context -> MapView(context) },
        update = { mapView -> mapView.setCenter(coordinates) }
    )
    ```
    Лямбда `factory` создаёт View один раз, а лямбда `update` вызывается при изменении зависимых состояний."""

THEORY[77] = """### 📚 Теория и спецификация
- **Где в 2026 году вы всё ещё встретите XML?**:
  1. **Legacy-кодовые базы**: сотни тысяч строк старого кода в крупных компаниях требуют регулярной поддержки.
  2. **Виджеты рабочего стола (AppWidgets)**: исторически работают через класс `RemoteViews` и XML. Подробнее: [App Widgets Guide](https://developer.android.com/develop/ui/views/appwidgets) и декларативная библиотека [Jetpack Glance Overview](https://developer.android.com/develop/ui/compose/glance).
  3. **Кастомные системные уведомления**: `NotificationCompat.Builder.setCustomContentView(...)`.
  4. **Собеседования**: вопросы по жизненному циклу View, `MeasureSpec` и устройству XML остаются стандартом для уровней Middle и Senior."""

# -------------------------------------------------------------
# Блок 8: Практика, Домашнее задание, Вопросы и ответы (Slides 78-82)
# -------------------------------------------------------------
THEORY[78] = """### 📚 Теория и спецификация
- **Методическая цель практического блока**:
  - Закрепить ментальный переход от пошагового мутирования свойств View к реактивному преобразованию потока состояний в декларативный интерфейс.
  - На реальном коде переписать экран авторизации с XML/ViewBinding на 100% чистый Jetpack Compose. Руководство по миграции: [Migration Guide: View to Compose](https://developer.android.com/develop/ui/compose/migrate).

### ⚙️ Под капотом (Чеклист промышленного рефакторинга)
1. **Полное удаление зависимости от View**: исключение импортов `android.widget.*`, `android.view.*` и сгенерированных классов `ActivityLoginBinding`.
2. **Моделирование UI State**: описание состояния через неизменяемый `data class LoginUiState(val email: String, val isLoading: Boolean, val error: String?)`.
3. **Паттерн State Hoisting**: отделение чистого отображения (Stateless экран `LoginScreenContent`) от управления состоянием (Stateful контейнер `LoginScreenRoute` с ViewModel).
4. **Применение UDF**: обработка всех нажатий и ввода текста через события `LoginEvent`.

### ⚠️ Критерии приёмки Pull Request
- Экран корректно переживает поворот устройства без потери данных через `rememberSaveable`.
- Все строковые ресурсы вынесены в `strings.xml` и вызываются через `stringResource(...)`.
- Созданы функции `@Preview` для светлой и тёмной тем оформления."""

THEORY[79] = """### 📚 Теория и спецификация
- **Пошаговый алгоритм выполнения практики на паре**:
  1. Открываем проект курса в ветке `lecture-05`.
  2. Анализируем старый макет `activity_login.xml` и находим все точки скрытой мутации состояния в `LoginActivity.kt`.
  3. Проектируем структуру неизменяемого состояния экрана `AuthUiState`.
  4. Создаём файл `AuthScreen.kt` и верстаем поля ввода через `OutlinedTextField` и кнопку через `Button`. Документация: [Compose Tutorial](https://developer.android.com/develop/ui/compose/tutorial).
  5. Реализуем архитектуру **UDF** (*Unidirectional Data Flow*): передаем события `onLoginClick` и `onEmailChange` наверх.
  6. Тестируем поведение интерфейса при повороте экрана эмулятора."""

THEORY[80] = """### 📚 Теория и спецификация
- **Домашнее задание сквозного проекта FinanceApp**:
  - **Задача 1**: Реализовать экран аналитики расходов на Jetpack Compose с реактивным состоянием (`rememberSaveable`, `mutableStateOf`).
  - **Задача 2**: Обеспечить строгое соблюдение принципа **UDF** (подъём состояния, отделение Stateless-компонентов). Примеры реализации: [Compose Samples and Code](https://developer.android.com/develop/ui/compose/sample-apps).
  - **Задача 3 (Теоретическая)**: В файле `README.md` в корне PR написать краткое эссе (2–3 абзаца):
    - *«В чём фундаментальное отличие императивного и декларативного стилей в Android UI? Почему ручное обновление View приводит к ошибкам, и как формула UI = f(State) их устраняет?»*
- **Дедлайн**: 7 дней. Ветка `lecture-05`, Pull Request в `main`."""

THEORY[81] = """### 📚 Теория и спецификация
- **Анонс Лекции 6: «Jetpack Compose: layout, Material 3 и тема оформления»**:
  - Глубокое погружение в компоненты компоновки: `Row` (строка), `Column` (столбец), `Box` (стек по оси Z).
  - Магия цепочек модификаторов (`Modifier`): размеры, отступы, границы, клики, веса.
  - Дизайн-система **Material 3**: типографика, адаптивная цветовая палитра и динамические цвета Material You. Документация: [Material 3 in Jetpack Compose](https://developer.android.com/develop/ui/compose/designsystems/material3).
  - Полноценная вёрстка сложных коммерческих экранов по макетам из Figma."""

THEORY[82] = """### 📚 Теория и спецификация
- **Топ-5 каверзных вопросов с собеседований уровня Middle/Senior**:

1. **«Что производительнее: XML или Jetpack Compose?»**
   - *Ответ*: При первом «холодном» запуске XML может незначительно выигрывать за счёт предварительно оптимизированной системной библиотеки C++, если Compose не оптимизирован профилями компиляции **Baseline Profiles** ([Baseline Profiles Guide](https://developer.android.com/topic/performance/baselineprofiles/overview)). Но при любых динамических обновлениях, анимациях и перерисовках Compose кардинально быстрее за счёт умного пропуска вызовов (**Smart Skipping**) и отсутствия тяжеловесных проходов замера по объектам View.

2. **«Почему в теле Composable-функции категорически запрещены Side Effects (побочные эффекты)?»**
   - *Ответ*: Функции Composable могут выполняться в произвольном порядке, перезапускаться десятки раз в секунду или выполняться параллельно в пуле фоновых потоков. Любой побочный эффект (сетевой запрос, запись в базу данных, инкремент счетчика) обязан быть изолирован в специализированные обработчики эффектов: `LaunchedEffect`, `SideEffect` или `DisposableEffect` ([Side-effects in Compose](https://developer.android.com/develop/ui/compose/side-effects)).

3. **«Как устроен мост Interoperability под капотом?»**
   - *Ответ*: Класс `ComposeView` является прямым наследником `ViewGroup` (`AbstractComposeView`) и создаёт внутри себя корень дерева композиции `Composition`. В обратную сторону Composable-функция `AndroidView` создает специальный внутренний узел `LayoutNode`, управляющий замером и жизненным циклом встроенного классического `View` внутри фаз рендеринга Compose.

4. **«В каких редких сценариях в 2026 году всё ещё оправдан XML?»**
   - *Ответ*: Виджеты рабочего стола `AppWidgetProvider` через `RemoteViews` (хотя библиотека Glance активно развивается), кастомные системные уведомления и интеграция со старыми C++/NDK библиотеками рендеринга.

5. **«Что такое Stability в Compose и как компилятор решает, пропускать ли вызов функции?»**
   - *Ответ*: Компилятор Compose размечает типы метаданными: `@Immutable`, `@Stable` или `Unstable` ([Compose Stability](https://developer.android.com/develop/ui/compose/performance/stability)). Если все входные параметры Composable-функции стабильны и их значения не изменились по `equals()`, вызов тела функции полностью пропускается (**Smart Skipping**)."""

# Format output file tools/lecture5_theory_data.py
out_file = ROOT / "tools" / "lecture5_theory_data.py"

lines = [
    "# -*- coding: utf-8 -*-",
    '"""Сгенерированная расширенная теоретическая база данных для всех 83 слайдов Лекции 5.',
    'Содержит полные пояснения терминов, расшифровку сокращений и ссылки на официальную документацию.',
    '"""',
    "THEORY = {"
]

for idx in range(83):
    text = THEORY[idx]
    serialized = json.dumps(text, ensure_ascii=False)
    lines.append(f'    {idx}: {serialized},')

lines.append("}\n")

out_file.write_text("\n".join(lines), encoding="utf-8")
print(f"Successfully generated all {len(THEORY)} slides in {out_file}!")
