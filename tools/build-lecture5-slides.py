# -*- coding: utf-8 -*-
"""Generate comprehensive slide deck (80+ slides) for Lecture 05:
Approaches to UI layout: XML vs Jetpack Compose, Imperative vs Declarative paradigm.
"""
import json
from pathlib import Path

ROOT = Path(r"c:\Users\kolxz2Aorus\IdeaProjects\android-teaching")
SLIDES_JS = ROOT / "lectures" / "05-activity" / "slides.js"

slides = [
    # -------------------------------------------------------------
    # Введение и цели (Slides 1-5)
    # -------------------------------------------------------------
    {
        "type": "title",
        "title": "Android-разработка",
        "subtitle": "Лекция 5. Подходы к вёрстке: XML и Jetpack Compose. Императивный и декларативный UI",
        "kicker": "05 / 15",
        "photo": True,
        "body": "- 82 слайда · 90 минут\n- Блок: **Основы Android**\n- От классических XML-макетов к декларативному UI\n- Ветка: `lecture-05`\n- Преподаватель: Сучёв Николай Евгеньевич",
        "notes": "Приветствие. Сегодня мы совершаем фундаментальный переход курса: погружаемся в то, как устроен UI в Android, почему больше десяти лет стандартом был XML и View, какие фундаментальные проблемы накопились в императивном подходе и как Jetpack Compose полностью перевернул создание интерфейсов.",
    },
    {
        "type": "teacher",
        "title": "Кто ведёт курс",
        "subtitle": "Сучёв Николай Евгеньевич",
        "photo": True,
        "body": "- Android-разработчик, **Т-Банк**\n- Команда **Вовлечение**\n- Стек: Kotlin, Jetpack Compose, Coroutines, Flow, Architecture Components\n- Практический опыт миграции крупных коммерческих фичей с XML на Compose",
        "notes": "Коротко представиться: в продакшене Т-Банка ежедневно сталкиваемся как с поддержкой старых XML-экранов, так и с написанием всех новых фичей на Jetpack Compose. Поэтому разницу разберём не абстрактно, а на реальных болях индустрии.",
    },
    {
        "type": "content",
        "title": "Результат занятия",
        "body": "- Понимать архитектуру классической View-системы Android и структуру XML-макетов\n- Знать историю доступа к элементам: от `findViewById` до `ViewBinding`\n- Объяснять суть императивного UI и проблему рассинхронизации состояния (Double State)\n- Понимать математическую основу декларативного UI: `UI = f(State)`\n- Знать, как устроены дерево композиции, рекомпозиция и `remember`\n- Уметь сопоставлять экраны на XML и Compose и применять паттерн UDF",
        "notes": "Это критерии успеха сегодняшней пары. В конце лекции мы вернёмся к этому слайду и проверим, всё ли усвоено.",
    },
    {
        "type": "content",
        "title": "Маршрут лекции",
        "body": "1. Классическая вёрстка: XML, `View`, `ViewGroup` и фазы отрисовки\n2. Эволюция связи разметки с кодом: от `findViewById` до `ViewBinding`\n3. Императивный стиль: мутация View и кризис синхронизации состояния\n4. Декларативная парадигма: рождение Jetpack Compose и формула `UI = f(State)`\n5. Детальное сравнение: XML vs Compose на реальных примерах\n6. Архитектура декларативного UI: Unidirectional Data Flow (UDF)\n7. Интероперабельность (Interop) и опыт индустрии\n8. Практика на паре и домашнее задание",
        "notes": "Лекция поделена на логические блоки: сначала понимаем прошлое и причины его создания, затем вскрываем его проблемы, и далее детально изучаем современное решение.",
    },
    {
        "type": "content",
        "title": "Официальная документация и материалы",
        "body": "- [Документация Jetpack Compose](https://developer.android.com/jetpack/compose)\n- [Психология мышления в Compose (Thinking in Compose)](https://developer.android.com/jetpack/compose/mental-model)\n- [Архитектура View-системы Android](https://developer.android.com/reference/android/view/View)\n- [Переход с View на Compose](https://developer.android.com/jetpack/compose/migrate)\n- Документация — ключевой инструмент: учимся понимать концепции, а не зубрить названия атрибутов.",
        "notes": "Все ссылки в презентации кликабельны. Рекомендую обязательно прочитать статью 'Thinking in Compose' от Google.",
    },

    # -------------------------------------------------------------
    # Блок 1: Классическая вёрстка в Android (Slides 6-17)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Раздел 1. Классическая вёрстка в Android",
        "subtitle": "XML, View, ViewGroup и фазы отрисовки экрана",
        "notes": "Погружаемся в историю: как создавался UI в Android с первых версий 2008 года.",
    },
    {
        "type": "content",
        "title": "Исторический контекст: Android в 2008 году",
        "image": "../../assets/concepts/android-devices.png",
        "imageKind": "screenshot",
        "imageCaption": "Эволюция Android-устройств: от первых экранов 320x480 к современным флагманам",
        "body": "- В 2008 году вышел Android 1.0 (первый коммерческий смартфон HTC Dream / T-Mobile G1)\n- Смартфоны обладали крайне слабым «железом»: 192 МБ оперативной памяти и процессор 528 МГц\n- Компьютеры разработчиков были медленными, компиляция Java занимала много времени\n- Идея разделения: интерфейс выносится в статичный декларативный XML-файл ресурсов, чтобы дизайнеры или верстальщики могли править разметку без перекомпиляции всей логики",
        "notes": "XML казался идеальным решением в эпоху Java и слабых процессоров. Никто тогда не предполагал, насколько сложными станут мобильные приложения через 10-15 лет.",
    },
    {
        "type": "content",
        "title": "Как верстали экраны в Android (2008–2021)",
        "image": "../../assets/concepts/activity-screen.png",
        "imageKind": "screenshot",
        "imageCaption": "Анатомия экрана: статус-бар, контейнер окна DecorView и корневая разметка",
        "body": "- **Два раздельных мира**: структура экрана описывается в XML-файлах (`res/layout/`), а логика пишется в Kotlin/Java (`Activity`, `Fragment`)\n- **View и ViewGroup**:\n  - `View` — базовый визуальный элемент (`TextView`, `Button`, `ImageView`)\n  - `ViewGroup` — контейнер для компоновки дочерних элементов (`LinearLayout`, `FrameLayout`, `ConstraintLayout`)\n- **Древовидная иерархия**: система парсит разметку и строит дерево объектов View в памяти, запуская циклы Measure → Layout → Draw",
        "notes": "Разработчик вынужден был постоянно переключаться между XML и кодом. Поведение настраивалось в двух разных местах.",
    },
    {
        "type": "content",
        "title": "Архитектурная модель: разделение на два мира",
        "body": "- **Мир ресурсов (`res/layout/*.xml`)**:\n  - Статическое описание иерархии элементов в формате XML\n  - Задаёт структуру экрана, цвета, размеры, отступы и строки\n- **Мир кода (`*.kt` / `*.java`)**:\n  - `Activity` или `Fragment`, отвечающие за бизнес-логику и реакцию на действия\n- **Проблема разрыва контекста**:\n  - Разработчик вынужден постоянно переключаться между двумя языками (XML и Kotlin) и двумя разными файловыми структурами",
        "notes": "Разделение на XML и код позиционировалось как separation of concerns, но на практике это было разделение по технологиям, а не по смыслу фичи.",
    },
    {
        "type": "content",
        "title": "Базовый кирпичик: класс android.view.View",
        "body": "- `View` — фундаментальный базовый класс для всех UI-компонентов в классическом Android\n- Занимает прямоугольную область экрана и отвечает за замер своего размера, отрисовку и обработку касаний\n- Примеры наследников `View`:\n  - `TextView` — отображение текста\n  - `ImageView` — показ картинок\n  - `Button` — кнопка (является прямым наследником `TextView`!)\n  - `EditText` — поле ввода текста\n  - `ProgressBar` — индикатор загрузки",
        "notes": "Интересный факт: Button в Android наследуется от TextView. Иерархия наследования в классическом View SDK была очень глубокой и запутанной.",
    },
    {
        "type": "content",
        "title": "Контейнеры: класс android.view.ViewGroup",
        "image": "../../assets/concepts/xml-view-hierarchy.svg",
        "imageKind": "visual",
        "imageCaption": "Дерево View: корень DecorView -> контейнеры ViewGroup -> листовые View",
        "body": "- `ViewGroup` — это специальный `View`, который может содержать внутри себя другие `View` (дочерние элементы)\n- `ViewGroup` отвечает за правила позиционирования своих детей на экране\n- Позволяет строить древовидную структуру макета (View Hierarchy)\n- Паттерн проектирования: классический **Composite** (Компоновщик) из GoF",
        "notes": "Каждый экран в классическом Android — это древовидная структура, где корень — ViewGroup, а листья — View.",
    },
    {
        "type": "content",
        "title": "Основные контейнеры: LinearLayout",
        "body": "- Располагает дочерние элементы строго друг за другом в одну линию:\n  - Либо по горизонтали (`android:orientation=\"horizontal\"`)\n  - Либо по вертикали (`android:orientation=\"vertical\"`)\n- Поддерживает веса (`android:layout_weight`):\n  - Позволяет распределять свободное пространство пропорционально\n  - Минус весов: требует двойного прогона фазы измерения (Measure pass), что снижает производительность при вложенности",
        "notes": "LinearLayout — самый первый и простой контейнер. Но когда нужно сложное расположение, приходилось вкладывать LinearLayout в LinearLayout.",
    },
    {
        "type": "content",
        "title": "Основные контейнеры: FrameLayout и RelativeLayout",
        "body": "- **FrameLayout**:\n  - Простейший контейнер-стопка: элементы накладываются друг на друга по слоям (Z-order)\n  - Отлично подходит для одного элемента или наложения плавающего лоадера поверх контента\n- **RelativeLayout**:\n  - Позиционирует элементы относительно друг друга или относительно границ родителя\n  - Примеры: `layout_toRightOf`, `layout_below`, `layout_alignParentBottom`\n  - Минус: алгоритм расчёта связей приводит к повторным замерам элементов",
        "notes": "FrameLayout легок и быстр. RelativeLayout давал гибкость, но при сложных экранах сильно тормозил.",
    },
    {
        "type": "content",
        "title": "Революция ConstraintLayout (2016)",
        "body": "- Google представил `ConstraintLayout`, чтобы решить проблему глубокой вложенности\n- Позволяет строить плоские иерархии экранов любой сложности через систему ограничений (constraints)\n- Поддерживает барьеры (Barriers), направляющие (Guidelines), цепочки (Chains) и соотношения сторон\n- Плюс: плоское дерево без вложенных контейнеров\n- Минус: огромные, плохо читаемые XML-файлы с десятками служебных строк на один элемент",
        "notes": "ConstraintLayout был вершиной эволюции XML. Но код разметки стал настолько перегруженным, что редактировать его можно было только через визуальный редактор.",
    },
    {
        "type": "content",
        "title": "Пример классического XML-макета",
        "body": "```xml\n<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<LinearLayout \n    xmlns:android=\"http://schemas.android.com/apk/res/android\"\n    android:layout_width=\"match_parent\"\n    android:layout_height=\"wrap_content\"\n    android:orientation=\"vertical\"\n    android:padding=\"16dp\">\n\n    <TextView\n        android:id=\"@+id/titleText\"\n        android:layout_width=\"wrap_content\"\n        android:layout_height=\"wrap_content\"\n        android:text=\"Баланс счёта\"\n        android:textSize=\"20sp\" />\n\n    <Button\n        android:id=\"@+id/refreshButton\"\n        android:layout_width=\"match_parent\"\n        android:layout_height=\"wrap_content\"\n        android:text=\"Обновить\" />\n</LinearLayout>\n```",
        "notes": "Обратите внимание: без уникального android:id связать этот XML-элемент с кодом в Activity будет невозможно.",
    },
    {
        "type": "content",
        "title": "Три фазы жизни дерева View: Measure → Layout → Draw",
        "image": "../../assets/concepts/view-lifecycle-phases.svg",
        "imageKind": "visual",
        "imageCaption": "3 рекурсивные фазы отрисовки кадра: Measure -> Layout -> Draw (бюджет 16 мс на 60 FPS)",
        "body": "Когда система отображает XML-экран, она рекурсивно обходит дерево View:\n\n1. **Measure (Замер)**: каждый элемент вычисляет свои размеры с учётом ограничений родителя (`MeasureSpec`)\n2. **Layout (Размещение)**: каждый контейнер определяет координаты (лево, верх, право, низ) для своих дочерних View\n3. **Draw (Отрисовка)**: элементы рисуют себя на Canvas графической подсистемы\n\n- Чем глубже дерево, тем больше рекурсивных прогонов и тем вероятнее просадки FPS (frame drops).",
        "notes": "Понимание трёх фаз критично: 60 кадров в секунду требуют уложиться в 16 миллисекунд. Любая задержка в Measure/Layout приводит к дёрганью интерфейса.",
    },
    {
        "type": "content",
        "title": "Накладные расходы класса View в памяти",
        "body": "- Класс `android.view.View` содержит **более 30 000 строк кода** в Android SDK\n- Каждый объект `View` в памяти хранит сотни полей:\n  - слушатели кликов и скролла, параметры анимации, фон, границы, паддинги, теги, состояние доступности (accessibility)\n- Создание даже простого экрана с 50 элементами выделяет в куче (Heap) сотни тяжёлых Java-объектов\n- Это создавало огромную нагрузку на сборщик мусора (Garbage Collector)",
        "notes": "Подумайте: простой Text в Compose — это всего лишь вызов функции. А TextView в XML — это гигантский объект на сотни килобайт.",
    },
    {
        "type": "content",
        "title": "Стили и темы в XML",
        "body": "- Вёрстка в XML требовала выноса стилей в отдельные файлы `res/values/styles.xml` и `themes.xml`\n- Каскадное наследование стилей через `parent=\"...\"`\n- Атрибуты темы `?attr/colorPrimary`\n- Минусы системы тем XML:\n  - Нет статической проверки типов: опечатка в имени стиля обнаруживается только в рантайме\n  - Сложно переопределять стили динамически в коде",
        "notes": "Стили в XML часто приводили к непредсказуемому поведению из-за неявного наследования сотен системных атрибутов.",
    },
    {
        "type": "practice",
        "title": "Вопрос группе: в чём главная слабость XML?",
        "badge": "Вопрос",
        "body": "XML описывает статическую структуру экрана в момент компиляции.\n\nЧто происходит, когда пользователю нужно показать или скрыть блок в зависимости от ответа сервера?\n\n- Где пишется эта логика?\n- Какие опасности возникают, если состояние экрана становится динамическим?",
        "notes": "Дать аудитории 30-45 секунд подумать. Подвести к тому, что разметка мертва без кода, а оживление разметки кодом порождает хаос.",
    },

    # -------------------------------------------------------------
    # Блок 2: Эволюция связывания XML с кодом (Slides 18-25)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Раздел 2. Как код находил разметку",
        "subtitle": "От findViewById до ViewBinding и DataBinding",
        "notes": "Разберём эволюцию способов взаимодействия между Kotlin-кодом и XML-разметкой.",
    },
    {
        "type": "content",
        "title": "Инфлейт: превращение текста XML в объекты",
        "body": "- Метод `setContentView(R.layout.activity_main)` в Activity запускает системный `LayoutInflater`\n- `LayoutInflater`:\n  - Читает скомпилированный бинарный XML (AXML)\n  - Через рефлексию создаёт экземпляры Java-классов (`new TextView(...)`, `new LinearLayout(...)`)\n  - Строит в оперативной памяти древовидную иерархию объектов View",
        "notes": "Инфлейт — операция недешёвая. Рефлексия и выделение памяти под дерево занимают драгоценные миллисекунды при старте Activity.",
    },
    {
        "type": "content",
        "title": "Эра findViewById: ручной поиск по ID",
        "body": "```kotlin\nclass MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n\n        val title = findViewById<TextView>(R.id.titleText)\n        val button = findViewById<Button>(R.id.refreshButton)\n\n        button.setOnClickListener {\n            title.text = \"Данные обновлены\"\n        }\n    }\n}\n```\n- Метод `findViewById` рекурсивно обходит всё дерево View сверху вниз в поисках нужного целочисленного ID.",
        "notes": "Классический способ, живший больше 10 лет. Каждый разработчик написал тысячи вызовов findViewById.",
    },
    {
        "type": "content",
        "title": "Смертельные ловушки findViewById",
        "body": "- **Риск NullPointerException (NPE)**:\n  - Если элемента с таким `id` нет в макете (например, перепутали макет альбомной и портретной ориентации) — `findViewById` вернёт `null`\n- **Риск ClassCastException**:\n  - Случайно запросили `findViewById<Button>(R.id.titleText)` — падение в рантайме при касте типов\n- **Падение производительности**:\n  - Поиск `O(N)` на каждый элемент при каждом открытии экрана\n- **Огромный шаблонный код (Boilerplate)**: десятки строк на связывание ссылок.",
        "notes": "Сколько продакшен-крэшей случилось из-за того, что разработчик переименовал id в XML, а в коде забыл!",
    },
    {
        "type": "content",
        "title": "Попытка спасения 1: Библиотека ButterKnife (2013)",
        "body": "- Джейк Уортон создал библиотеку `ButterKnife` на основе аннотаций:\n```java\n@BindView(R.id.titleText) TextView title;\n@BindView(R.id.refreshButton) Button button;\n\n@Override\nprotected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n    ButterKnife.bind(this);\n}\n```\n- Генерация связывающего кода во время компиляции через annotation processing (APT)\n- Уменьшила бойлерплейт, но не устранила проблемы рассинхронизации типов.",
        "notes": "ButterKnife был огромным шагом вперед, но увеличивал время сборки проекта из-за обработки аннотаций.",
    },
    {
        "type": "content",
        "title": "Попытка спасения 2: Kotlin Android Extensions (Synthetics)",
        "body": "- Команда Kotlin предложила плагин `kotlin-android-extensions`:\n```kotlin\nimport kotlinx.android.synthetic.main.activity_main.*\n\n// Можно было сразу писать по id без объявлений:\ntitleText.text = \"Hello\"\nrefreshButton.setOnClickListener { ... }\n```\n- **Почему плагин закрыли и объявили Deprecated?**\n  - Загрязнял глобальное пространство имён\n  - Не проверял наличие элемента в разных конфигурациях экрана (крэши в рантайме)\n  - Работал только в Kotlin-файлах и создавал скрытый кэш.",
        "notes": "Синтетики казались магией, но магия вышла боком: частые скрытые NPE в рантайме привели к их полному удалению из Kotlin.",
    },
    {
        "type": "content",
        "title": "Вершина эволюции связывания: ViewBinding (2019)",
        "body": "- `ViewBinding` генерирует для каждого XML-файла строго типизированный класс-обёртку:\n```kotlin\nclass MainActivity : AppCompatActivity() {\n    private lateinit var binding: ActivityMainBinding\n\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        binding = ActivityMainBinding.inflate(layoutInflater)\n        setContentView(binding.root)\n\n        binding.titleText.text = \"Готово\"\n        binding.refreshButton.setOnClickListener { ... }\n    }\n}\n```\n- **100% Type-safety**: тип каждого свойства точно совпадает с элементом в XML\n- **Null-safety**: если элемент есть не во всех конфигурациях, свойство помечается `@Nullable`.",
        "notes": "ViewBinding — лучший инструмент эпохи XML. Он решил проблему поиска по ID, но не решил фундаментальную проблему императивного UI.",
    },
    {
        "type": "content",
        "title": "Тупиковая ветвь: DataBinding",
        "body": "- `DataBinding` попытался внести логику прямо в XML через теги `<data>`:\n```xml\n<TextView\n    android:layout_width=\"wrap_content\"\n    android:layout_height=\"wrap_content\"\n    android:text=\"@{viewModel.userName}\"\n    android:visibility=\"@{viewModel.isLoading ? View.GONE : View.VISIBLE}\" />\n```\n- **Почему индустрия обожглась на DataBinding?**\n  - Логика расползлась по XML-файлам, где нет нормального автодополнения и рефакторинга\n  - Ошибки компиляции DataBinding генерировали нечитаемые простыни трейсов\n  - Невозможность написать unit-тест на логику, спрятанную внутри XML-атрибута.",
        "notes": "DataBinding пытался стать декларативным поверх императивного движка. Это показало: нельзя сделать декларативный UI, просто прикрутив выражения к XML.",
    },
    {
        "type": "practice",
        "title": "Резюме раздела: почему ViewBinding не решил всех проблем?",
        "badge": "Самопроверка",
        "body": "- ViewBinding гарантирует, что `binding.refreshButton` — это действительно существующая кнопка `Button`.\n- Но что произойдёт, если:\n  - Кнопку нужно заблокировать при загрузке данных?\n  - При успехе показать галочку, а при ошибке — красный текст?\n  - Кто отвечает за своевременный вызов `binding.progressBar.visibility = GONE`?\n- **Ответ**: Разработчик вручную, шаг за шагом. И здесь начинается катастрофа императивного стиля.",
        "notes": "Плавно переводим внимание аудитории к главному виновнику багов — императивному мутированию.",
    },

    # -------------------------------------------------------------
    # Блок 3: Императивный стиль и кризис синхронизации (Slides 26-38)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Раздел 3. Императивный стиль и его проблемы",
        "subtitle": "Пошаговые команды, мутация компонентов и кризис состояния",
        "notes": "Переходим к глубинному анализу архитектурных проблем императивного программирования интерфейсов.",
    },
    {
        "type": "content",
        "title": "Что такое Императивное программирование в UI?",
        "subtitle": "Парадигма «КАК?»",
        "body": "- **Императивный стиль отвечает на вопрос: «КАК изменить интерфейс?»**\n- Программа представляет собой последовательность команд, мутирующих внешнее состояние:\n  1. Сделай лоадер видимым (`progressBar.visibility = VISIBLE`)\n  2. Отключи кнопку отправки (`submitButton.isEnabled = false`)\n  3. Очисти текст ошибки (`errorText.text = \"\"`)\n  4. По завершении ответа: скрой лоадер, обнови список, включи кнопку обратно\n- Вы управляете **процессом мутации**, а не конечным состоянием экрана.",
        "notes": "Аналогия: вы не говорите строителю 'мне нужен синий дом'. Вы говорите: 'возьми кисть, окуни в синюю краску, сделай мазок слева направо'.",
    },
    {
        "type": "content",
        "title": "Мутабельность компонентов View",
        "body": "- Каждый объект `View` в Android **мутабелен и хранит своё собственное состояние**:\n  - `TextView` помнит свой текущий текст, цвет, размер и видимость\n  - `CheckBox` помнит, нажат ли он в данный момент (`isChecked`)\n  - `EditText` хранит введённую строку и положение курсора\n  - `View` хранит флаг `visibility` (`VISIBLE`, `INVISIBLE`, `GONE`)\n- Вы в любой момент можете залезть в объект и изменить его поле через сеттер.",
        "notes": "В классическом Android UI сами визуальные элементы являются хранилищами данных.",
    },
    {
        "type": "content",
        "title": "Проблема двух источников истины (Double State)",
        "image": "../../assets/concepts/double-state-problem.svg",
        "imageKind": "visual",
        "imageCaption": "Конфликт рассинхронизации: модель данных в памяти и внутреннее состояние View живут раздельно",
        "body": "- В любом интерактивном приложении есть два состояния:\n  1. **Модель данных в коде** (`var balance = 1000`, `user.isBlocked`)\n  2. **Внутреннее состояние View-элементов** (`balanceTextView.text`, `statusIcon.visibility`)\n- Эти два мира **не связаны автоматически**\n- Разработчик выступает «живым синхронизатором»:\n  - При любом изменении переменной вы обязаны найти все View, зависящие от неё, и вызвать нужные сеттеры\n  - При вводе данных пользователем вы обязаны прочитать View и обновить модель.",
        "notes": "Главный источник 80% багов в UI — рассинхронизация между моделью в памяти и тем, что нарисовано на экране.",
    },
    {
        "type": "content",
        "title": "Сценарий 1: Залипший индикатор загрузки",
        "body": "```kotlin\nfun loadUserData() {\n    binding.progressBar.visibility = View.VISIBLE\n    binding.contentLayout.visibility = View.GONE\n\n    api.fetchUser(\n        onSuccess = { user ->\n            binding.progressBar.visibility = View.GONE\n            binding.contentLayout.visibility = View.VISIBLE\n            binding.userName.text = user.name\n        },\n        onError = { error ->\n            // Забыли написать: binding.progressBar.visibility = View.GONE!\n            binding.errorText.text = error.message\n            binding.errorText.visibility = View.VISIBLE\n        }\n    )\n}\n```\n*Итог: при ошибке сети лоадер крутится поверх ошибки бесконечно.*",
        "notes": "Классика любого Android-приложения на XML. Достаточно забыть одну строчку в блоке onError — и экран сломан.",
    },
    {
        "type": "content",
        "title": "Сценарий 2: Валидация формы и активность кнопки",
        "body": "- Форма регистрации: Email, Пароль, Чекбокс согласия, Кнопка «Зарегистрироваться»\n- Кнопка должна быть активна ТОЛЬКО если:\n  - Email валиден И Пароль длиннее 8 символов И Чекбокс нажат\n- В императивном стиле:\n  - Слушатель на изменение Email → проверка 3 условий → `button.isEnabled = ...`\n  - Слушатель на изменение Пароля → проверка 3 условий → `button.isEnabled = ...`\n  - Слушатель на Чекбокс → проверка 3 условий → `button.isEnabled = ...`\n- Появляется 4-е поле (Промокод) — нужно переписать все 3 существующих слушателя!",
        "notes": "Логика валидации размазывается тонким слоем по слушателям компонентов.",
    },
    {
        "type": "content",
        "title": "Сценарий 3: Гонки состояний (Race Conditions)",
        "body": "- Пользователь нажал «Загрузить отчёт» (ушёл сетевой запрос 1)\n- Не дожидаясь ответа, переключил фильтр на «За месяц» (ушёл сетевой запрос 2)\n- Запрос 2 вернулся быстрее: обновил `TextView` новыми данными\n- Через секунду долетел запоздавший ответ от запроса 1: затер актуальные данные старыми!\n- В императивном подходе отслеживать отмену и соответствие экрану приходится через сложную паутину флагов и проверок.",
        "notes": "Асинхронность умножает сложность императивного управления состоянием в разы.",
    },
    {
        "type": "content",
        "title": "Взрыв сложности состояний: формула O(N × M)",
        "body": "- Пусть у экрана есть $N$ визуальных элементов (`View`)\n- Пусть у каждого элемента есть $M$ возможных состояний (видимость, активность, текст, цвет, фокус)\n- В императивном коде число возможных комбинаций и переходов растёт комбинаторно:\n  $$\\text{Количество переходов} \\sim O(N \\times M)$$\n- Разработчик физически не может удержать в голове все переходы из любого состояния в любое другое\n- В коде появляются костыли: «когда нажимаем сюда, сбрось флаг А, но только если флаг Б не равен true...»",
        "notes": "Комбинаторный взрыв состояний делает кодовую базу хрупкой: починив один сценарий, вы ломаете два других.",
    },
    {
        "type": "content",
        "title": "Классический спагетти-метод render(state)",
        "body": "```kotlin\nfun render(state: ScreenState) {\n    when (state) {\n        is ScreenState.Loading -> {\n            binding.loader.visibility = View.VISIBLE\n            binding.content.visibility = View.GONE\n            binding.error.visibility = View.GONE\n            binding.retryBtn.visibility = View.GONE\n            binding.actionBtn.isEnabled = false\n        }\n        is ScreenState.Error -> {\n            binding.loader.visibility = View.GONE\n            binding.content.visibility = View.GONE\n            binding.error.visibility = View.VISIBLE\n            binding.error.text = state.message\n            binding.retryBtn.visibility = View.VISIBLE\n            binding.actionBtn.isEnabled = false\n        }\n        is ScreenState.Success -> {\n            binding.loader.visibility = View.GONE\n            binding.content.visibility = View.VISIBLE\n            binding.error.visibility = View.GONE\n            binding.retryBtn.visibility = View.GONE\n            binding.actionBtn.isEnabled = true\n            binding.valueText.text = state.data.title\n        }\n    }\n}\n```",
        "notes": "Каждый раз при появлении нового состояния нужно руками прописать состояние ВСЕХ элементов экрана, чтобы очистить мусор от предыдущего состояния!",
    },
    {
        "type": "content",
        "title": "Боль переиспользования: Custom View в XML",
        "body": "Что требовалось, чтобы сделать переиспользуемую карточку в XML?\n1. Создать XML-макет `layout_card.xml`\n2. Описать пользовательские атрибуты в `res/values/attrs.xml` (`<declare-styleable>`)\n3. Написать Java/Kotlin класс `CustomCardView : FrameLayout`\n4. В конструкторе вручную прочитать `TypedArray` и не забыть вызвать `typedArray.recycle()`\n5. Написать геттеры и сеттеры для каждого свойства с вызовом `invalidate()` и `requestLayout()`\n\n*Итог: 150 строк кода на простую карточку с иконкой и текстом!*",
        "notes": "Вспомните типичный Custom View: конструкторы с AttributeSet, defStyleAttr, переопределение onMeasure, onDraw... Порог входа был гигантским.",
    },
    {
        "type": "practice",
        "title": "Практическое задание: найдите 2 бага в коде",
        "badge": "Практика",
        "body": "```kotlin\nfun updateLoginState(isLoggedIn: Boolean, error: String?) {\n    if (isLoggedIn) {\n        binding.welcomeText.text = \"Добро пожаловать!\"\n        binding.welcomeText.visibility = View.VISIBLE\n        binding.loginForm.visibility = View.GONE\n    } else {\n        if (error != null) {\n            binding.errorText.text = error\n            binding.errorText.visibility = View.VISIBLE\n        }\n        binding.loginForm.visibility = View.VISIBLE\n    }\n}\n```\n- Что сломается, если сначала произошла ошибка входа, а затем пользователь снова нажал «Войти» без ошибки?",
        "notes": "Дайте студентам найти: 1) errorText не скрывается при успешном входе; 2) errorText не скрывается, если error == null при повторной попытке.",
    },
    {
        "type": "content",
        "title": "Разбор найденных багов",
        "body": "- **Баг 1**: Если сначала была ошибка (`error != null`), а затем пользователь вошёл успешно (`isLoggedIn = true`) — `errorText` останется висеть на экране, потому что его видимость никто не сбросил в `GONE`!\n- **Баг 2**: Если повторная попытка входа идёт с `error = null`, блок `if (error != null)` не выполнится, и старый текст ошибки останется на экране.\n\n```kotlin\n// Приходится дописывать костыли:\nbinding.errorText.visibility = View.GONE // очистка мусора в начале метода!\n```\n*Это фундаментальное родовое проклятие императивного мутирования.*",
        "notes": "Подведите итог: разработчик тратит 50% времени не на создание фич, а на зачистку старого состояния View.",
    },

    # -------------------------------------------------------------
    # Блок 4: Декларативная парадигма и Jetpack Compose (Slides 39-50)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Раздел 4. Декларативный UI и Jetpack Compose",
        "subtitle": "Интерфейс как функция от состояния: UI = f(State)",
        "notes": "Переходим к современной парадигме и детальному изучению того, как устроен Jetpack Compose.",
    },
    {
        "type": "content",
        "title": "Декларативная революция в индустрии",
        "image": "../../assets/concepts/compose-preview-demo.jpg",
        "imageKind": "screenshot",
        "imageCaption": "Современная среда разработки Android Studio: декларативный код и интерактивный Live Preview",
        "body": "- Проблема императивного UI возникла не только в Android — с ней столкнулась вся индустрия ПО:\n  - В вебе: React (2013) перевернул фронтенд концепцией виртуального DOM и декларативных компонентов\n  - В кроссплатформе: Flutter (2017) показал невероятную скорость разработки на декларативных виджетах\n  - В iOS: Apple представила SwiftUI (2019)\n- **В июле 2021 года Google выпустил Jetpack Compose 1.0** — современный декларативный UI-фреймворк для Android, написанный с нуля на чистом Kotlin.",
        "notes": "Compose — это не просто библиотека. Это новая парадигма, синхронизировавшая Android с мировыми стандартами разработки интерфейсов.",
    },
    {
        "type": "content",
        "title": "Суть Декларативного UI: вопрос «ЧТО?»",
        "body": "- **Декларативный стиль отвечает на вопрос: «ЧТО должно отображаться для данного состояния?»**\n- Вы больше не пишете пошаговых команд по изменению интерфейса\n- Вы описываете финальный вид экрана как **чистую функцию от данных**\n- Когда данные меняются, фреймворк сам вычисляет разницу и обновляет только нужные пиксели на экране\n- Вы управляете **данными (состоянием)**, а отрисовкой управляет фреймворк.",
        "notes": "Ментальный сдвиг: вместо 'пойди и измени текст кнопки' вы говорите 'кнопка ВСЕГДА отображает значение переменной text'.",
    },
    {
        "type": "content",
        "title": "Фундаментальная формула: UI = f(State)",
        "image": "../../assets/concepts/declarative-ui-formula.svg",
        "imageKind": "visual",
        "imageCaption": "Концептуальная модель UI = f(State): чистая функция отображения неизменяемых данных",
        "body": "Каждый экран в Jetpack Compose подчиняется строгой формуле:\n\n$$\\mathbf{UI} = f(\\mathbf{State})$$\n\n- $\\mathbf{State}$ (Состояние): неизменяемый объект данных (например, data-класс с текущим балансом)\n- $f$: ваша Composable-функция (чистая функция отображения)\n- $\\mathbf{UI}$: итоговое визуальное представление на экране устройства\n\n**Следствие**: при одинаковом входном `State` функция $f$ гарантированно выдаст идентичный интерфейс. Никаких побочных эффектов и скрытой истории мутаций!",
        "notes": "Формула UI = f(State) должна стать вашей второй натурой при работе с Compose.",
    },
    {
        "type": "content",
        "title": "Строительный блок: функции с аннотацией @Composable",
        "body": "```kotlin\n@Composable\nfun Greeting(name: String) {\n    Text(text = \"Привет, $name!\")\n}\n```\n- Аннотация `@Composable` меняет тип функции для компилятора Kotlin (через Compose Compiler Plugin)\n- `@Composable` функции могут вызываться **только из других Composable-функций**\n- Composable-функция ничего не возвращает (`Unit`), она излучает (emit) узел в дерево интерфейса\n- Принимает данные на вход в виде обычных аргументов функции.",
        "notes": "Аналогия: ключевое слово suspend для корутин меняет контекст выполнения. Аннотация @Composable делает то же самое для построения графа UI.",
    },
    {
        "type": "content",
        "title": "В Compose нет классов View!",
        "body": "- В Jetpack Compose **полностью отсутствуют** классы `Button`, `TextView`, `LinearLayout` из Android SDK\n- `Text` — это обычная Kotlin-функция, объявленная как `fun Text(...)`\n- `Button` — это функция `fun Button(...)`\n- `Row`, `Column`, `Box` — функции компоновки\n- **У вас физически нет объекта кнопки в памяти**, у которого можно было бы вызвать сеттер `button.setText(\"...\")`!\n- Нельзя мутировать то, к чему у вас нет объектной ссылки.",
        "notes": "Это ключевой барьер для начинающих: 'А где ссылка на мою кнопку? Как мне вызвать у нее метод?' Ответ: никак. Кнопки как мутабельного объекта не существует.",
    },
    {
        "type": "content",
        "title": "Дерево композиции (Composition Tree)",
        "body": "- При первом вызове Composable-функций фреймворк выполняет фазу **Композиции (Composition)**\n- Создаётся внутренний легковесный граф — **дерево слотов (Slot Table)**\n- В дереве сохраняется информация:\n  - Какие Composable-функции были вызваны\n  - Какие параметры были им переданы\n  - На чтение каких изменяемых состояний (`State`) подписалась каждая функция\n- В отличие от дерева View, узлы композиции весят байты, а не сотни килобайт.",
        "notes": "Compose хранит структуру интерфейса в специальной структуре данных, похожей на gap buffer в текстовых редакторах.",
    },
    {
        "type": "content",
        "title": "Что такое Рекомпозиция (Recomposition)?",
        "body": "- **Рекомпозиция** — это процесс повторного вызова Composable-функций с новыми данными при изменении состояния\n- Когда значение `State`, которое читает функция, меняется:\n  - Compose помечает эту функцию как требующую обновления (invalidated)\n  - В следующем кадре функция выполняется заново с новым значением\n- **Дерево интерфейса перестраивается декларативно**, отражая актуальный `State`.",
        "notes": "Рекомпозиция — сердце Compose. Функция вызывается заново так часто, как меняются ее входные данные.",
    },
    {
        "type": "content",
        "title": "Умная рекомпозиция (Smart Recomposition)",
        "image": "../../assets/concepts/recomposition-smart-skipping.svg",
        "imageKind": "visual",
        "imageCaption": "Интеллектуальный пропуск: Compose рекомпозирует только изменившиеся узлы дерева",
        "body": "- Перевызывать весь экран при изменении одной буквы в поле ввода было бы неэффективно\n- **Compose рекомпозирует ТОЛЬКО те функции, чьи параметры изменились**:\n```kotlin\n@Composable\nfun Screen(counter: Int, title: String) {\n    Header(title)       // НЕ рекомпозируется при изменении counter!\n    Counter(counter)    // Рекомпозируется\n}\n```\n- Неизменившиеся ветки дерева пропускаются целиком (**Smart Skipping**)\n- Условие пропуска: параметры функции должны быть стабильными (`@Stable` / `@Immutable`).",
        "notes": "Smart Recomposition обеспечивает непревзойденную производительность: Compose точечно обновляет лишь нужные узлы.",
    },
    {
        "type": "content",
        "title": "Как Composable помнит состояние: remember",
        "body": "- Поскольку Composable-функция может вызываться заново десятки раз в секунду, обычная локальная переменная сбрасывалась бы при каждом вызове:\n```kotlin\n// ОШИБКА: при каждой рекомпозиции count будет снова 0!\nvar count = 0\n```\n- Функция `remember` сохраняет значение в дереве композиции между рекомпозициями:\n```kotlin\nval count = remember { mutableStateOf(0) }\n```\n- При повторном вызове `remember` возвращает ранее сохранённое значение.",
        "notes": "Функция remember привязывает объект к конкретной позиции в дереве композиции.",
    },
    {
        "type": "content",
        "title": "Реактивное состояние: mutableStateOf",
        "body": "- `mutableStateOf(value)` создаёт наблюдаемый реактивный контейнер `MutableState<T>`\n- Когда Composable-функция читает свойство `.value`, Compose **автоматически подписывает её на обновления**\n- При записи нового значения в `.value` Compose автоматически запускает рекомпозицию всех функций-подписчиков:\n```kotlin\nvar count by remember { mutableStateOf(0) }\n\nButton(onClick = { count++ }) {\n    Text(\"Нажато: $count раз\")\n}\n```\n- Делегат `by` позволяет работать со `State` как с обычной переменной.",
        "notes": "Синтаксис 'by remember { mutableStateOf(...) }' — это стандарт де-факто для локального состояния в Compose.",
    },
    {
        "type": "content",
        "title": "Переживаем поворот экрана: rememberSaveable",
        "body": "- При повороте экрана Activity уничтожается и создаётся заново (Configuration Change)\n- Обычный `remember` теряет данные, так как дерево композиции создаётся заново\n- `rememberSaveable` сохраняет значение в системный `Bundle` (как `onSaveInstanceState`):\n```kotlin\nvar text by rememberSaveable { mutableStateOf(\"\") }\n```\n- Работает автоматически для примитивных типов, строк и Parcelable-объектов\n- Пользователь повернул экран — введённый текст в форме не стёрся!",
        "notes": "rememberSaveable — простое и элегантное решение вечной боли Android-разработчиков с потерей данных при повороте.",
    },

    # -------------------------------------------------------------
    # Блок 5: Детальное сравнение на коде (Slides 51-64)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Раздел 5. Детальное сравнение: XML vs Compose",
        "subtitle": "5 сквозных примеров от простых кнопок до сложных списков",
        "notes": "Сравним решение одинаковых прикладных задач на XML и Jetpack Compose лицом к лицу.",
    },
    {
        "type": "content",
        "title": "Сводная таблица сравнения парадигм",
        "body": "| Критерий | XML + View (Императивный) | Jetpack Compose (Декларативный) |\n|---|---|---|\n| **Язык разработки** | XML + Kotlin/Java | 100% чистый Kotlin |\n| **Парадигма** | Инструкции «КАК» менять | Описание «ЧТО» показывать |\n| **Обновление UI** | Ручные сеттеры (`setText`) | Автоматическая рекомпозиция |\n| **Источник истины** | Разделен (переменная + View) | Single Source of Truth |\n| **Связывание с кодом** | `findViewById`, `ViewBinding` | Передача параметров в функцию |\n| **Компоненты** | Мутабельные тяжелые объекты | Немутабельные чистые функции |\n| **Кастомизация** | Сложный XML + CustomView | Обычные функции + `Modifier` |",
        "notes": "Ключевая таблица всей лекции. Пройдитесь по каждому пункту, акцентируя внимание на преимуществах Compose.",
    },
    {
        "type": "content",
        "title": "Пример 1: Простой счётчик кликов на XML",
        "body": "**Файл разметки (`res/layout/activity_counter.xml`):**\n```xml\n<LinearLayout ... android:orientation=\"vertical\">\n    <TextView android:id=\"@+id/counterText\" android:text=\"0\" ... />\n    <Button android:id=\"@+id/incrementBtn\" android:text=\"+\" ... />\n</LinearLayout>\n```\n**Файл логики (`CounterActivity.kt`):**\n```kotlin\nclass CounterActivity : AppCompatActivity() {\n    private var count = 0\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        val binding = ActivityCounterBinding.inflate(layoutInflater)\n        setContentView(binding.root)\n\n        binding.incrementBtn.setOnClickListener {\n            count++\n            binding.counterText.text = count.toString() // ручной сеттер!\n        }\n    }\n}\n```",
        "notes": "Два разных файла, поиск ссылок, ручной сеттер при каждом клике.",
    },
    {
        "type": "content",
        "title": "Пример 1: Простой счётчик кликов на Compose",
        "body": "**Один компактный файл (`CounterScreen.kt`):**\n```kotlin\n@Composable\nfun CounterScreen() {\n    var count by rememberSaveable { mutableStateOf(0) }\n\n    Column(modifier = Modifier.padding(16.dp)) {\n        Text(\n            text = \"$count\",\n            style = MaterialTheme.typography.headlineMedium\n        )\n        Button(onClick = { count++ }) {\n            Text(\"+\")\n        }\n    }\n}\n```\n- Нет XML-файла\n- Нет `ViewBinding`\n- Автоматическое обновление `Text` при смене `count`\n- Состояние переживает поворот экрана благодаря `rememberSaveable`!",
        "notes": "Покажите, насколько чище и нагляднее код. Связь данных и представления очевидна из одного взгляда.",
    },
    {
        "type": "content",
        "title": "Пример 2: Экран трёх состояний (L/E/C) на XML",
        "body": "```kotlin\nfun render(state: ProfileUiState) {\n    when (state) {\n        is ProfileUiState.Loading -> {\n            binding.loader.visibility = View.VISIBLE\n            binding.contentLayout.visibility = View.GONE\n            binding.errorLayout.visibility = View.GONE\n        }\n        is ProfileUiState.Error -> {\n            binding.loader.visibility = View.GONE\n            binding.contentLayout.visibility = View.GONE\n            binding.errorLayout.visibility = View.VISIBLE\n            binding.errorMsg.text = state.message\n        }\n        is ProfileUiState.Success -> {\n            binding.loader.visibility = View.GONE\n            binding.contentLayout.visibility = View.VISIBLE\n            binding.errorLayout.visibility = View.GONE\n            binding.userName.text = state.user.name\n        }\n    }\n}\n```\n*Огромное количество ручного переключения видимости.*",
        "notes": "Обратите внимание: мы вынуждены явно вызывать visibility = GONE для всех остальных веток в каждой ветке!",
    },
    {
        "type": "content",
        "title": "Пример 2: Экран трёх состояний на Compose",
        "body": "```kotlin\n@Composable\nfun ProfileScreen(state: ProfileUiState, onRetry: () -> Unit) {\n    when (state) {\n        is ProfileUiState.Loading -> {\n            CircularProgressIndicator()\n        }\n        is ProfileUiState.Error -> {\n            Column {\n                Text(text = state.message, color = MaterialTheme.colorScheme.error)\n                Button(onClick = onRetry) { Text(\"Повторить\") }\n            }\n        }\n        is ProfileUiState.Success -> {\n            Text(text = state.user.name, style = MaterialTheme.typography.titleLarge)\n        }\n    }\n}\n```\n- Невозможно забыть скрыть лоадер: ветка `Loading` просто больше не вызывается!\n- Физически невозможно получить рассинхронизацию интерфейса.",
        "notes": "Это главный триумф декларативного стиля. Если ветка when не выполняется, ее элементов просто нет в дереве.",
    },
    {
        "type": "content",
        "title": "Пример 3: Валидация формы в реальном времени на XML",
        "body": "```kotlin\nval watcher = object : TextWatcher {\n    override fun afterTextChanged(s: Editable?) {\n        val emailValid = binding.emailInput.text.contains(\"@\")\n        val passValid = binding.passwordInput.text.length >= 8\n        val agreed = binding.agreeCheckBox.isChecked\n        binding.submitButton.isEnabled = emailValid && passValid && agreed\n    }\n    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}\n    override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}\n}\nbinding.emailInput.addTextChangedListener(watcher)\nbinding.passwordInput.addTextChangedListener(watcher)\nbinding.agreeCheckBox.setOnCheckedChangeListener { _, isChecked ->\n    // Снова дублируем ту же логику проверки...\n}\n```",
        "notes": "Громоздкие TextWatcher с тремя пустыми методами и дублирование проверок в нескольких слушателях.",
    },
    {
        "type": "content",
        "title": "Пример 3: Валидация формы в реальном времени на Compose",
        "body": "```kotlin\n@Composable\nfun RegistrationForm() {\n    var email by rememberSaveable { mutableStateOf(\"\") }\n    var password by rememberSaveable { mutableStateOf(\"\") }\n    var agreed by rememberSaveable { mutableStateOf(false) }\n\n    val isSubmitEnabled = email.contains(\"@\") && password.length >= 8 && agreed\n\n    Column(modifier = Modifier.padding(16.dp)) {\n        TextField(value = email, onValueChange = { email = it }, label = { Text(\"Email\") })\n        TextField(value = password, onValueChange = { password = it }, label = { Text(\"Пароль\") })\n        Checkbox(checked = agreed, onCheckedChange = { agreed = it })\n\n        Button(onClick = { /* submit */ }, enabled = isSubmitEnabled) {\n            Text(\"Зарегистрироваться\")\n        }\n    }\n}\n```\n`isSubmitEnabled` пересчитывается автоматически при изменении любой переменной!",
        "notes": "Чистая элегантность: переменная isSubmitEnabled объявлена декларативно и всегда актуальна.",
    },
    {
        "type": "content",
        "title": "Пример 4: Списки данных в XML (RecyclerView)",
        "body": "Чтобы показать простой список элементов в XML, требовалось:\n1. Создать разметку экрана со списком `res/layout/item_user.xml`\n2. Написать класс `UserViewHolder : RecyclerView.ViewHolder`\n3. Написать класс `UserAdapter : RecyclerView.Adapter<UserViewHolder>`:\n   - Переопределить `onCreateViewHolder` (инфлейт XML)\n   - Переопределить `onBindViewHolder` (связывание данных с View)\n   - Переопределить `getItemCount`\n4. Написать реализацию `DiffUtil.ItemCallback` для анимации изменений\n5. В Activity инициализировать `LayoutManager` и передать адаптер\n\n*Минимум 60–80 строк церемониального шаблонного кода.*",
        "notes": "RecyclerView был мощным, но требовал огромного количества ритуального кода даже для списка из трех строк.",
    },
    {
        "type": "content",
        "title": "Пример 4: Списки данных в Compose (LazyColumn)",
        "body": "```kotlin\n@Composable\nfun UserList(users: List<User>, onUserClick: (User) -> Unit) {\n    LazyColumn {\n        items(\n            items = users,\n            key = { user -> user.id }\n        ) { user ->\n            UserRow(user = user, onClick = { onUserClick(user) })\n        }\n    }\n}\n\n@Composable\nfun UserRow(user: User, onClick: () -> Unit) {\n    Card(onClick = onClick, modifier = Modifier.fillMaxWidth().padding(8.dp)) {\n        Text(text = user.name, modifier = Modifier.padding(16.dp))\n    }\n}\n```\n- Всего 15 строк кода вместо 5 файлов и классов адаптера!",
        "notes": "LazyColumn создаёт и переиспользует элементы на лету декларативно без единого Adapter или ViewHolder.",
    },
    {
        "type": "content",
        "title": "Пример 5: Настройка стилей и отступов (Modifier)",
        "body": "- В XML за оформление отвечали десятки разрозненных атрибутов:\n  - `android:layout_margin`, `android:padding`, `android:background`, `android:elevation`, `android:onClick`\n- В Compose вся настройка внешнего вида и поведения унифицирована через **`Modifier`**:\n```kotlin\nBox(\n    modifier = Modifier\n        .fillMaxWidth()\n        .padding(16.dp)\n        .background(Color.White, shape = RoundedCornerShape(8.dp))\n        .clickable { doAction() }\n        .padding(12.dp)\n)\n```\n- Порядок цепочки модификаторов имеет строгое значение (padding до или после background)!",
        "notes": "Modifier объединил размеры, отступы, отрисовку, клики и анимации в одну предсказуемую цепочку.",
    },
    {
        "type": "content",
        "title": "Экономия кода: метрики реальных проектов",
        "body": "- Согласно официальным исследованиям Google и кейсам компаний (Twitter, Airbnb, Т-Банк):\n  - Объём UI-кодовой базы при миграции с XML на Jetpack Compose сокращается на **40–60%**\n  - Время разработки новых экранов сокращается в **1.5–2 раза**\n  - Скорость интеграции дизайнеров в код возрастает благодаря мгновенному предпросмотру (`@Preview`)\n  - Количество багов, связанных с состоянием (`NullPointerException`, зависшие лоадеры), снижается почти до нуля.",
        "notes": "Бизнес любит Compose за сокращение Time to Market и резкое падение количества багов.",
    },
    {
        "type": "practice",
        "title": "Вопрос группе: почему в Compose исчез findViewById NPE?",
        "badge": "Вопрос",
        "body": "Вспомните: в XML частый крэш в продакшене звучал так:\n`NullPointerException: findViewById(R.id.user_name) must not be null`\n\nПочему в Jetpack Compose эта категория ошибок невозможна в принципе?\n\n- Как Composable-функция получает доступ к своим дочерним элементам?\n- Существуют ли вообще идентификаторы `R.id` в Compose?",
        "notes": "Попросите ответить: в Compose дочерние элементы вызываются напрямую как функции, с передачей строго типизированных параметров в коде Kotlin.",
    },

    # -------------------------------------------------------------
    # Блок 6: Архитектура в декларативном UI: UDF (Slides 65-72)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Раздел 6. Архитектура в декларативном UI: UDF",
        "subtitle": "Unidirectional Data Flow и подъём состояния (State Hoisting)",
        "notes": "Декларативный UI требует правильной архитектуры. Разберём Unidirectional Data Flow.",
    },
    {
        "type": "content",
        "title": "Принцип Unidirectional Data Flow (UDF)",
        "image": "../../assets/concepts/udf-cycle.svg",
        "imageKind": "visual",
        "imageCaption": "Однонаправленный поток данных: State течет сверху вниз, Events поднимаются снизу вверх",
        "body": "- **Однонаправленный поток данных (UDF)** — архитектурный паттерн, идеально подходящий для Compose:\n  - **State (Состояние)** течёт **СВЕРХУ ВНИЗ** (от бизнес-логики/ViewModel к UI)\n  - **Events (События)** текут **СНИЗУ ВВЕРХ** (от UI к ViewModel)\n- UI никогда не меняет данные сам: он лишь сообщает «пользователь нажал кнопку»\n- ViewModel обрабатывает событие, меняет State, и Compose автоматически запускает рекомпозицию.",
        "notes": "UDF разрывает порочный круг взаимных мутаций и делает поведение системы абсолютно прозрачным.",
    },
    {
        "type": "content",
        "title": "Подъём состояния (State Hoisting)",
        "body": "- **State Hoisting** — ключевой паттерн в Compose, когда состояние перемещается выше по дереву компонентов\n- Компонент избавляется от внутреннего состояния и превращается в пару параметров:\n  1. `value: T` — текущее отображаемое значение (входные данные)\n  2. `onValueChange: (T) -> Unit` — событие запроса на изменение (лямбда)\n\n```kotlin\n// Компонент стал чистым, переиспользуемым и легко тестируемым!\n@Composable\nfun CounterInput(value: Int, onIncrement: () -> Unit) {\n    Button(onClick = onIncrement) {\n        Text(\"Значение: $value\")\n    }\n}\n```",
        "notes": "State hoisting делает ваши компоненты глупыми (dumb/stateless), а значит максимально переиспользуемыми.",
    },
    {
        "type": "content",
        "title": "Паттерн: Stateful vs Stateless компоненты",
        "body": "- **Stateless Composable**:\n  - Не хранит никакого собственного состояния\n  - Принимает данные и коллбэки снаружи\n  - Легко тестировать, легко вызывать в `@Preview`, легко переиспользовать в других экранах\n- **Stateful Composable**:\n  - Владеет состоянием (создаёт его через `remember` или получает из ViewModel)\n  - Управляет подъёмом состояния и передаёт данные в дочерние Stateless-компоненты\n- **Правило хорошего тона**: делать 90% компонентов вашего приложения Stateless.",
        "notes": "Разделение на Stateful контейнеры и Stateless презентационные компоненты — основа чистой архитектуры в Compose.",
    },
    {
        "type": "content",
        "title": "Единый источник истины (Single Source of Truth)",
        "body": "- В Compose состояние экрана должно существовать в **единственном экземпляре**\n- Обычно источником истины выступает `StateFlow` внутри `ViewModel`:\n```kotlin\ndata class MainUiState(\n    val balance: Long = 0,\n    val isLoading: Boolean = false,\n    val errorMessage: String? = null\n)\n```\n- Экран просто подписывается на `uiState.collectAsStateWithLifecycle()`\n- Больше никаких двух источников истины (как было в XML) — есть только один `UiState`!",
        "notes": "Single Source of Truth устраняет саму возможность возникновения неконсистентного состояния.",
    },
    {
        "type": "content",
        "title": "Чистые функции и отсутствие Side-Effects",
        "body": "- Composable-функция должна быть **детерминированной (чистой)**:\n  - Одинаковые параметры всегда должны давать одинаковое дерево\n- **Чего КАТЕГОРИЧЕСКИ НЕЛЬЗЯ делать внутри Composable**:\n  - Запускать сетевые запросы напрямую в теле функции\n  - Менять глобальные переменные\n  - Записывать данные в БД или SharedPreferences\n- Рекомпозиция может вызываться каждый кадр, отменяться или выполняться параллельно в пуле потоков!\n- Для побочных эффектов в Compose существуют специальные API (`LaunchedEffect`, `DisposableEffect`).",
        "notes": "Любой сайд-эффект в теле Composable — это бомба замедленного действия. Compose оптимизирует вызовы и может вызвать функцию вне главного потока.",
    },
    {
        "type": "content",
        "title": "Невероятная лёгкость тестирования",
        "body": "- Тестировать XML-экраны было сущим адом: требовалось поднимать медленный Robolectric или запускать instrumentation-тесты на эмуляторе\n- Тестировать Stateless Composable — удовольствие:\n```kotlin\n@Test\nfun testGreetingDisplaysCorrectName() {\n    composeTestRule.setContent {\n        Greeting(name = \"Николай\")\n    }\n    composeTestRule.onNodeWithText(\"Привет, Николай!\").assertExists()\n}\n```\n- Тесты выполняются за миллисекунды прямо на JVM без запуска тяжелого эмулятора.",
        "notes": "Compose разрабатывался с прицелом на первоклассную тестируемость каждого изолированного кирпичика.",
    },
    {
        "type": "practice",
        "title": "Вопрос: найдите ошибку в архитектуре",
        "badge": "Вопрос",
        "body": "Посмотрите на код компонента переключателя темы:\n```kotlin\n@Composable\nfun ThemeSwitch() {\n    var isDark by remember { mutableStateOf(false) }\n    Switch(\n        checked = isDark,\n        onCheckedChange = {\n            isDark = it\n            AppPreferences.saveTheme(it) // запись в настройки!\n        }\n    )\n}\n```\n- Нарушен ли принцип UDF и State Hoisting?\n- Сможет ли родительский экран узнать о переключении темы?",
        "notes": "Студенты должны заметить: состояние заперто внутри компонента, родитель о нем не знает, а запись в AppPreferences является неконтролируемым побочным эффектом.",
    },

    # -------------------------------------------------------------
    # Блок 7: Интероперабельность (Interop) и опыт индустрии (Slides 73-77)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Раздел 7. Интероперабельность (Interop)",
        "subtitle": "Как подружить новый Compose со старым кодом на XML",
        "notes": "В реальной работе вам не дадут переписать проект с нуля за день. Нужна бесшовная совместимость.",
    },
    {
        "type": "content",
        "title": "Как крупные приложения переходят на Compose",
        "image": "../../assets/concepts/interop-bridge.svg",
        "imageKind": "visual",
        "imageCaption": "Мост интероперабельности: ComposeView внутри XML и AndroidView внутри Compose",
        "body": "- Ни одна компания в здравом уме не станет переписывать приложение на 500 000 строк с нуля\n- Google заложил в Compose **двустороннюю совместимость (Interop)** с самого первого дня:\n  - Можно встроить Composable-компонент внутрь старого XML-макета (`ComposeView`)\n  - Можно встроить старый `View` внутрь Composable-экрана (`AndroidView`)\n- Приложения мигрируют поэтапно, экран за экраном или даже виджет за виджетом.",
        "notes": "Двусторонний Interop позволил Т-Банку и другим крупным компаниям плавно внедрять Compose в миллионные кодовые базы без остановки бизнеса.",
    },
    {
        "type": "content",
        "title": "Compose внутри XML: ComposeView",
        "body": "- В старом `activity_main.xml` или `Fragment` объявляется специальный контейнер:\n```xml\n<androidx.compose.ui.platform.ComposeView\n    android:id=\"@+id/composeView\"\n    android:layout_width=\"match_parent\"\n    android:layout_height=\"wrap_content\" />\n```\n- В Activity / Fragment мы просто вызываем `setContent`:\n```kotlin\nbinding.composeView.setContent {\n    MaterialTheme {\n        NewAwesomeFeatureScreen()\n    }\n}\n```\n- Новая фича пишется на Compose, а старый экран вокруг продолжает работать на XML.",
        "notes": "Так выглядит 90% реальной миграции: новая кнопка, баннер или форма делаются на Compose внутри существующего фрагмента.",
    },
    {
        "type": "content",
        "title": "XML / View внутри Compose: AndroidView",
        "body": "- Что делать, если у сторонней библиотеки пока нет версии на Compose (например, Яндекс Карты, Google MapView, плеер ExoPlayer или WebView)?\n- Используем обёртку `AndroidView`:\n```kotlin\n@Composable\nfun MapComponent() {\n    AndroidView(\n        factory = { context ->\n            MapView(context).apply { onCreate(null) }\n        },\n        update = { mapView ->\n            // Обновление свойств при рекомпозиции\n        }\n    )\n}\n```\n- Старый View полноценно живёт внутри дерева Compose.",
        "notes": "AndroidView гарантирует, что вы никогда не упрётесь в стену: любой старый компонент или сторонний SDK можно использовать в Compose.",
    },
    {
        "type": "content",
        "title": "Когда в 2026 году вы всё ещё встретите XML?",
        "body": "- **Поддержка legacy-кода**: проекты старше 3–4 лет, где часть экранов ещё не успели переписать\n- **Специфические системные компоненты**: виджеты домашнего экрана (AppWidgets / Glance постепенно заменяет XML, но база на RemoteViews), кастомные уведомления\n- **Резюме для карьеры**:\n  - На собеседованиях джуниора спросят разницу XML и Compose и принципы работы ViewBinding\n  - В работе 95% нового кода пишется на Jetpack Compose\n  - Понимание обоих подходов отличает сильного инженера от простого генератора кода.",
        "notes": "Подчеркните: мы учим Compose, потому что это будущее и настоящее, но понимаем XML, чтобы ориентироваться в любом коммерческом проекте.",
    },

    # -------------------------------------------------------------
    # Блок 8: Практика, Домашнее задание и финал (Slides 78-82)
    # -------------------------------------------------------------
    {
        "type": "section",
        "title": "Практика на паре и Домашнее задание",
        "subtitle": "Закрепляем материал на коде",
        "notes": "Переходим к практической части занятия.",
    },
    {
        "type": "practice",
        "title": "Практика на паре: переписываем экран",
        "badge": "Практика · 25 минут",
        "body": "1. Открываем проект курса в ветке `lecture-05`\n2. Смотрим на заготовку: старый экран авторизации на XML и ViewBinding\n3. Анализируем все точки мутации состояния: где меняется видимость и текст ошибок\n4. Создаём декларативный `AuthScreen.kt` на Jetpack Compose\n5. Моделируем состояние экрана через `data class AuthUiState`\n6. Реализуем UDF: передача событий `onLoginClick` и `onEmailChange` наверх\n7. Проверяем поведение при повороте экрана.",
        "notes": "Пошаговый план живой практики с преподавателем. Делаем экран вместе, показываем контраст до и после.",
    },
    {
        "type": "homework",
        "title": "Домашнее задание",
        "badge": "Домашнее задание",
        "body": "- **Задача 1**: Реализовать интерактивный экран сквозного проекта FinanceApp на Jetpack Compose с реактивным состоянием (`rememberSaveable`, `mutableStateOf`)\n- **Задача 2**: Обеспечить строгое соблюдение принципа UDF (подъём состояния, Stateless-компоненты)\n- **Задача 3 (Теоретическая)**: В файле `README.md` в корне PR написать краткое эссе (2–3 абзаца):\n  - *«В чём фундаментальное отличие императивного и декларативного стилей в Android UI? Почему ручное обновление View приводит к ошибкам, и как формула UI = f(State) их устраняет?»*\n\nДедлайн: **7 дней**. Ветка `lecture-05`, Pull Request в `main`.",
        "notes": "Напомнить про правила оформления PR: скриншот работы, понятное описание изменений, конспект в README.",
    },
    {
        "type": "content",
        "title": "Что нас ждёт на следующей лекции",
        "body": "- **Лекция 6: Jetpack Compose — layout, Material 3 и тема оформления**\n- Глубокое погружение в компоненты компоновки: `Row`, `Column`, `Box`\n- Магия цепочек `Modifier`: размеры, отступы, границы, клики, веса\n- Дизайн-система Material 3: типографика, адаптивная цветовая палитра и формы\n- Полноценная вёрстка сложных экранов по макетам из Figma.",
        "notes": "Анонс лекции 6: теперь, когда мы поняли парадигму Compose, перейдём к профессиональной вёрстке по дизайн-макетам.",
    },
    {
        "type": "section",
        "title": "Вопросы и ответы",
        "subtitle": "Сучёв Николай Евгеньевич · Т-Банк, команда Вовлечение",
        "body": "Спасибо за внимание! Вопросы по лекции, XML, Compose или домашнему заданию?",
        "notes": "Ответить на вопросы студентов, разобрать непонятные моменты.",
    },
]

import sys
sys.path.insert(0, str(ROOT))
from tools.lecture5_theory_data import THEORY

for i, slide in enumerate(slides):
    if i in THEORY:
        slide["theory"] = THEORY[i]

payload = {
    "course": "Android-разработка",
    "lecture": 5,
    "lectureId": "05",
    "slug": "05-activity",
    "disableCopy": True,
    "title": "Подходы к вёрстке: XML и Jetpack Compose. Императивный и декларативный UI",
    "block": "Основы Android",
    "teacher": "Сучёв Николай Евгеньевич",
    "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
    "hub": "../../index.html",
    "photo": "../../assets/teacher.jpg",
    "slides": slides,
}

SLIDES_JS.write_text(
    "window.DECK = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8",
)
print(f"Generated slides.js with {len(slides)} slides and {len(THEORY)} theoretical dossiers successfully!")
