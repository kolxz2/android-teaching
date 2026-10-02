window.DECK = {
  "course": "Android-разработка",
  "lecture": 1,
  "lectureId": "01",
  "slug": "01-vvedenie",
  "title": "Введение в Android. Инструменты. Git и GitHub",
  "block": "Старт и инструменты",
  "teacher": "Сучёв Николай Евгеньевич",
  "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
  "hub": "../../index.html",
  "photo": "../../assets/teacher.jpg",
  "slides": [
    {
      "type": "title",
      "title": "Android-разработка",
      "subtitle": "Лекция 1. Введение в Android. Инструменты. Git и GitHub",
      "badge": "",
      "body": "- Курс из 15 лекций\n- Пара 1,5 часа: теория + живая практика\n- Сквозной проект наращивается от лекции к лекции\n- Преподаватель: Сучёв Николай Евгеньевич",
      "notes": "Поприветствовать группу: «Меня зовут Николай Сучёв, я Android-разработчик в Т-Банке». Сказать, что сегодня не пишем сложный код: ставим инструменты, понимаем, из чего состоит приложение, и учимся сдавать работу через GitHub. Без Git с этой лекции ДЗ не принимается.",
      "kicker": "01 / 15",
      "photo": true
    },
    {
      "type": "teacher",
      "title": "Кто ведёт курс",
      "subtitle": "Сучёв Николай Евгеньевич",
      "badge": "",
      "body": "- Android-разработчик, **Т-Банк**\n- Команда **Вовлечение**\n- Middle, **2 года** коммерческого опыта",
      "notes": "1–2 минуты, не больше. Представиться полностью: Николай Евгеньевич Сучёв. Работаю Android-разработчиком в Т-Банке, команда Вовлечение — продуктовые фичи, которые возвращают человека в приложение и помогают им пользоваться. Грейд middle, два года в проде: не гуру с 15-летним стажем, а человек, который недавно проходил этот путь и до сих пор каждый день открывает Studio, Logcat и GitHub. Спросить, кто уже пробовал Android / Kotlin / Git — поднять руки. Пообещать: курс про фундамент, который используется в индустрии, а не про «магическую кнопку Run».",
      "kicker": "",
      "photo": true
    },
    {
      "type": "content",
      "title": "Что вы умеете к концу пары",
      "subtitle": "",
      "badge": "",
      "body": "- Понимаете, что такое Android-приложение (APK, манифест, компоненты)\n- Понимаете роль JDK / JVM и экосистему Android\n- Установлены Android Studio, SDK и эмулятор (или проверены)\n- Умеете открыть проект, посмотреть Logcat и запустить приложение\n- Создаёте репозиторий, делаете commit, push и Pull Request",
      "notes": "Это критерий успеха пары. Если к концу занятия репозиторий на GitHub есть — вы в графике курса.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Формат сегодняшней лекции",
      "subtitle": "",
      "badge": "",
      "body": "1. Знакомство — 3 мин\n2. О курсе: правила, проект, оценка — 8 мин\n3. Android: история, приложение, компоненты — 20 мин\n4. Android Studio: установка и обзор IDE — 14 мин\n5. Git и GitHub: теория + практика — 35 мин\n6. ДЗ и вопросы — 10 мин",
      "notes": "Практика встроена в Git-блок: init, commit, remote, push, ветка, PR. Кто уже поставил Studio — помогает соседу. Знакомство короткое: имя, Т-Банк, команда Вовлечение, 2 года опыта — и сразу к правилам курса.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "О курсе",
      "subtitle": "Формат, правила, сквозной проект",
      "badge": "",
      "body": "",
      "notes": "Сначала договоримся о правилах. Потом техника. Иначе половина группы не поймёт, зачем Git с первой пары.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "15 лекций — одна дорога",
      "subtitle": "",
      "badge": "",
      "body": "| Блок | Лекции | Тема |\n| Старт и инструменты | 1 | Android, Android Studio, Git / GitHub |\n| Язык | 2–4 | Kotlin |\n| Основы Android | 5–8 | Compose UI, состояние, LazyColumn, Navigation Compose |\n| Компоненты и сеть | 9–11 | Service / BR / CP, сеть + JSON, корутины + Flow |\n| Данные | 12 | SharedPreferences, DataStore, Room, файлы |\n| Архитектура | 13–14 | MVVM / SOLID / Clean, паттерны, DI / Hilt |\n| Финал | 15 | Сборка приложения, самопроверка, заключение |",
      "notes": "Не надо запоминать все слова. Важно: мы идём от языка → экраны → сеть → данные → архитектура. Сегодня — фундамент: среда и Git.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Одно приложение на весь курс",
      "subtitle": "",
      "badge": "",
      "body": "- Не 15 разных «Hello World», а один проект, который растёт\n- База: список → экран деталей → сеть → локальное хранение\n- К лекции 15 в одном репозитории собирается минимальный набор курса\n- Каждая лекция добавляет слой, а не выкидывает предыдущий",
      "notes": "Аналогия: дом. Сегодня — участок и инструменты. Потом стены, окна, электрика. Сносить дом каждую неделю не будем.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Как сдаём работу",
      "subtitle": "",
      "badge": "",
      "body": "1. С лекции 1 работа **только через GitHub**\n2. На каждую лекцию — ветка `lecture-NN` и Pull Request в `main`\n3. В PR: что сделано, скрин / запись экрана, вопросы преподавателю\n4. Дедлайн ДЗ: **7 дней** после лекции\n5. Код и история изменений остаются в репозитории. Архив `final.zip` не используется",
      "notes": "История коммитов помогает понять развитие решения. Несколько понятных изменений удобнее разбирать, чем один гигантский commit «всё сразу».",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Как будет расти Compose-приложение",
      "subtitle": "",
      "badge": "",
      "body": "- Лекции 1–3 — инструменты, Git и Kotlin\n- Лекция 4 — первый экран на Jetpack Compose\n- Лекции 5–8 — состояние, Material 3, LazyColumn и Navigation Compose\n- Лекции 9–11 — компоненты Android, сеть, корутины и Flow\n- Лекция 12 — DataStore и Room\n- Лекции 13–14 — архитектура, паттерны и Hilt\n- Лекция 15 — целостное приложение и разбор решений",
      "notes": "UI проекта с первого экрана создаётся на Jetpack Compose. XML, View и Fragment упоминаются только как legacy-подход.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Git с этой лекции обязателен для всех ДЗ",
      "subtitle": "",
      "badge": "",
      "body": "- Нет GitHub — нет сдачи\n- Нет ветки и PR — работа не считается сданной\n- Преподаватель смотрит код в Pull Request, не в мессенджере\n- Вопросы по ДЗ тоже лучше писать в PR: контекст рядом с кодом",
      "notes": "Это не бюрократия. В Т-Банке, как и почти везде в индустрии, код живёт в Git: ветка, PR, ревью. Курс с первой пары повторяет этот процесс.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "Что такое Android",
      "subtitle": "История, экосистема, JDK / JVM",
      "badge": "",
      "body": "",
      "notes": "Короткий исторический блок, затем — из чего состоит приложение. Без этого Studio выглядит «магической кнопкой Run».",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Android — это не только телефоны",
      "subtitle": "",
      "badge": "",
      "body": "- Операционная система на ядре Linux\n- Платформа для приложений: телефон, планшет, часы, TV, авто\n- На курсе фокус: **мобильное приложение** (телефон / эмулятор)\n- Приложения пишут в основном на **Kotlin** (раньше — Java)",
      "notes": "Android — экосистема Google. Мы учим прикладную разработку под телефоны. Wear / TV / Auto — те же идеи, другой UI.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Откуда взялся Android",
      "subtitle": "",
      "badge": "",
      "body": "- 2003 — стартап Android Inc. (Android не родился в Google)\n- 2005 — Google покупает Android\n- 2008 — Android 1.0, первый телефон (HTC Dream / T-Mobile G1)\n- 2014+ — Android становится доминирующей мобильной ОС\n- 2017–2019 — Kotlin получает официальную поддержку, затем приоритет над Java\n- Сегодня — API Level 35+, Kotlin + Jetpack — стандарт индустрии",
      "notes": "Имена версий (Cupcake, KitKat, Pie) знать не обязательно. Важно: платформа живая, API меняется, поэтому мы всегда указываем minSdk / targetSdk.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Экосистема, в которой вы работаете",
      "subtitle": "",
      "badge": "",
      "body": "- **Android OS** на устройстве\n- **Google Play** — магазин приложений (не единственный)\n- **Android SDK** — библиотеки и инструменты разработки\n- **Android Studio** — официальная IDE\n- **Jetpack** — набор библиотек от Google (Navigation, Room, ViewModel…)\n- **Kotlin** — язык",
      "notes": "Jetpack встретим с лекции 5–8. Сегодня достаточно знать, что это не «ещё один язык», а готовые библиотеки.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Зачем здесь JDK и JVM",
      "subtitle": "",
      "badge": "",
      "body": "- **JDK** (Java Development Kit) — компилятор и инструменты для JVM-языков\n- **JVM** (Java Virtual Machine) — виртуальная машина, которая исполняет байткод\n- Kotlin компилируется в байткод, совместимый с Java\n- Android Studio ставит нужный JDK сама — отдельно «искать Java» обычно не нужно\n- На устройстве код выполняется уже не классической JVM, а в среде Android (ART)",
      "notes": "Студенты часто путают «Java как язык» и «Java как платформа». Мы пишем на Kotlin, но стоим на JVM-стеке. ART (Android Runtime) — преемник Dalvik, исполняет приложение на телефоне.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "На курсе язык — Kotlin",
      "subtitle": "",
      "badge": "",
      "body": "- Google рекомендует Kotlin для нового Android-кода\n- Лекции 2–4 — только язык, почти без UI\n- Java знать полезно (старые проекты), писать на курсе не будем\n- Если умеете Java — Kotlin освоите быстрее, но это другой синтаксис",
      "notes": "Не начинайте гуглить «Android tutorial Java 2015». Стек курса: Kotlin, Jetpack Compose, Navigation Compose, Retrofit, корутины, Room, Hilt.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Версия Android ≠ версия приложения",
      "subtitle": "",
      "badge": "",
      "body": "- У ОС есть **API Level** (например, 34 = Android 14)\n- **minSdk** — минимальная версия, на которой приложение запустится\n- **targetSdk** — версия, под которую вы собирали и тестировали\n- Эмулятор должен быть ≥ minSdk\n- На курсе конкретные числа скажет шаблон проекта",
      "notes": "Не ставьте minSdk слишком высокий «на всякий случай» — отрежете старые телефоны. И слишком низкий — потеряете современные API. Для учёбы берём значение из шаблона.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "Что такое Android-приложение",
      "subtitle": "APK, манифест, компоненты — обзор на 5 минут",
      "badge": "",
      "body": "",
      "notes": "Это обзор. Подробно Activity — лекция 5, остальные компоненты — лекция 9. Сегодня нужен словарь, не реализация.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "APK — это установочный пакет",
      "subtitle": "",
      "badge": "",
      "body": "- **APK** = Android Package\n- Похож на zip-архив: код, ресурсы (картинки, вёрстка), манифест\n- Studio собирает APK (или AAB для Play) кнопкой Run / Build\n- На эмулятор/телефон ставится именно пакет, не «папка с исходниками»\n- Исходники ≠ то, что видит пользователь",
      "notes": "AAB (Android App Bundle) — формат для Google Play. На курсе достаточно APK через Run. Не рассылайте друг другу исходники мессенджером — для этого Git.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "AndroidManifest.xml — паспорт приложения",
      "subtitle": "",
      "badge": "",
      "body": "- Обязательный файл каждого приложения\n- Объявляет: имя пакета, иконку, Activity, сервисы, разрешения\n- Система читает манифест **до** запуска кода\n- Не объявили экран в манифесте — система о нём не знает\n- На курсе править манифест начнём с лекции 5, сегодня — знать, что он есть\n\n```xml\n<manifest>\n  <application>\n    <activity android:name=\".MainActivity\" />\n  </application>\n</manifest>\n```",
      "notes": "Открыть в Studio файл `app/src/main/AndroidManifest.xml` на проекте-шаблоне, показать 20 секунд, не разбирать каждую строку.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Четыре типа компонентов Android",
      "subtitle": "",
      "badge": "",
      "body": "1. **Activity** — экран, с которым работает пользователь\n2. **Service** — работа без UI (музыка, загрузка)\n3. **BroadcastReceiver** — реакция на системные и свои события\n4. **ContentProvider** — доступ к данным (контакты, медиа) для других приложений",
      "notes": "Запомнить четыре имени. Activity увидим в шаблоне Hello World. Остальные — лекция 9. Не пытайтесь сегодня написать Service.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Activity — контейнер Compose-интерфейса",
      "subtitle": "",
      "badge": "",
      "body": "- `MainActivity` служит точкой входа и вызывает `setContent { ... }`\n- Пользователь видит UI, который описывают composable-функции\n- Основной проект курса строится как single-activity приложение\n- Переходы между экранами выполняет Navigation Compose\n- Hello World курса — одно Activity и первый composable-экран",
      "notes": "Сейчас достаточно понимать границу: Android создаёт Activity, а Activity размещает Compose-интерфейс. Состояние и навигацию разберём отдельно.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Не вы запускаете Activity — система",
      "subtitle": "",
      "badge": "",
      "body": "- Пользователь нажимает иконку\n- Система читает манифест, находит launcher Activity\n- Создаёт процесс, запускает экран\n- Ваш код живёт внутри правил системы (жизненный цикл — лекция 5)\n- Поэтому «просто main() как в консоли» в Android нет на поверхности",
      "notes": "У Kotlin есть `fun main()`, мы им воспользуемся на лекциях 2–4 в scratch/консоли. В приложении точка входа — компонент, объявленный в манифесте.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "Инструменты",
      "subtitle": "Android Studio, SDK, эмулятор",
      "badge": "",
      "body": "",
      "notes": "Кто не поставил Studio заранее — ставим сейчас фоном, пока идёт обзор. Скачивание долгое: не ждать всех молча, идём дальше и возвращаемся к установке.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Минимальный набор на компьютер",
      "subtitle": "",
      "badge": "",
      "body": "- **Android Studio** (официальный сайт developer.android.com)\n- Внутри установщика: **Android SDK**, эмулятор, платформенные tools\n- **Git** (на Windows часто ставится отдельно, либо идёт с Studio)\n- Аккаунт **GitHub**\n- Желательно: 16+ ГБ RAM, свободные 15–20 ГБ диска под SDK и образы",
      "notes": "Слабые ноутбуки: эмулятор может не поехать — тогда физический телефон с USB-отладкой. Предупредить про виртуализацию (Hyper-V / VT-x / AMD-V).",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Установка Android Studio — порядок",
      "subtitle": "",
      "badge": "",
      "body": "1. Скачать установщик с developer.android.com/studio\n2. Next → принять лицензии SDK\n3. Standard-установка (не Custom, если не уверены)\n4. Дождаться загрузки SDK и системного образа эмулятора\n5. Первый запуск: не закрывать окно, пока не скачается SDK",
      "notes": "Типичная ошибка — убить установщик на 90%. Вторая — поставить Studio без образа эмулятора и удивиться, что нечего запускать.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "SDK — не «ещё одна программа», а набор платформ",
      "subtitle": "",
      "badge": "",
      "body": "- SDK Manager в Studio: Tools → SDK Manager\n- **SDK Platforms** — версии Android для компиляции и эмуляторов\n- **SDK Tools** — build-tools, emulator, platform-tools (`adb`)\n- `adb` — мост между компьютером и устройством (логи, установка APK)\n- Без SDK проект не соберётся, даже если Studio открывается",
      "notes": "Показать, где SDK Manager. Не ставить все платформы подряд — диск кончится. Нужны: одна свежая платформа + build-tools, которые просит Gradle.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Эмулятор — виртуальный телефон на ПК",
      "subtitle": "",
      "badge": "",
      "body": "- Device Manager: создать Virtual Device (AVD)\n- Рекомендация на курс: Pixel, x86_64, свежий системный образ **без** обязательного Play Store (легче и быстрее)\n- Первый запуск образа — несколько минут\n- Альтернатива: своё устройство + USB debugging\n- Эмулятор ест CPU и RAM — закройте лишние браузеры",
      "notes": "Если эмулятор чёрный экран / «waiting for device» — чаще виртуализация выключена в BIOS или конфликт Hyper-V. Не тратить на это всю пару: переключиться на телефон.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "practice",
      "title": "Практика. Проверяем, что среда живая",
      "subtitle": "",
      "badge": "Практика",
      "body": "Чеклист (галочка = готовы идти дальше):\n\n- [ ] Android Studio открывается\n- [ ] SDK Manager видит установленную платформу\n- [ ] Есть AVD или подключен телефон (`adb devices`)\n- [ ] Git установлен: в терминале `git --version`\n- [ ] Есть аккаунт GitHub",
      "notes": "5 минут. Кто застрял на эмуляторе — не блокирует группу, фиксируем проблему, идём к Git. Studio можно доставить дома, Git — нет смысла откладывать.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "Обзор Android Studio",
      "subtitle": "Проект, Gradle, Logcat, запуск",
      "badge": "",
      "body": "",
      "notes": "Не экскурсия по всем меню. Четыре вещи, без которых не проживёте неделю: дерево проекта, Gradle, кнопка Run, Logcat.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Карта окна Android Studio",
      "subtitle": "",
      "badge": "",
      "body": "- Слева — **Project**: файлы модуля `app`\n- Центр — редактор кода / XML\n- Справа / снизу — **Build**, **Logcat**, **Terminal**\n- Сверху — Run (зелёный треугольник), выбор устройства\n- Переключатель вида папок: **Android** (удобный) vs **Project** (как на диске)",
      "notes": "Вид «Android» группирует manifests / java / res. Вид «Project» нужен, когда ищем `build.gradle.kts` и `.gitignore`.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Где что лежит (модуль app)",
      "subtitle": "",
      "badge": "",
      "body": "- `app/src/main/java` (или `kotlin`) — исходный код\n- `app/src/main/res` — вёрстка, строки, цвета, картинки\n- `app/src/main/AndroidManifest.xml` — паспорт\n- `app/build.gradle.kts` — зависимости модуля\n- `build.gradle.kts` и `settings.gradle.kts` в корне — сборка проекта\n- `gradle/` — обёртка Gradle Wrapper: у всех одна версия сборки",
      "notes": "Wrapper важен: не ставим Gradle «как получится» вручную. В репозиторий коммитим `gradlew`, `gradlew.bat` и `gradle/wrapper/`.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Gradle собирает проект",
      "subtitle": "",
      "badge": "",
      "body": "- Это система сборки, не «ещё один язык программирования»\n- Читает `build.gradle.kts`: SDK, зависимости, плагины\n- Первый Sync скачивает интернет — это нормально\n- Ошибка Sync ≠ ошибка вашего Kotlin-кода\n- Пока Sync красный — Run обычно бесполезен",
      "notes": "«Failed to resolve» / proxy / DNS — частая боль в аудитории. Совет: дождаться Sync, читать первое красное сообщение, не десять подряд Rebuild.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Logcat — консоль приложения",
      "subtitle": "",
      "badge": "",
      "body": "- Поток логов с устройства / эмулятора\n- Фильтр по приложению и уровню: Verbose / Debug / Info / Warn / Error\n- В коде: `Log.d(\"MainActivity\", \"кнопка нажата\")`\n- Сюда же падает stack trace при краше\n- Без Logcat отладка превращается в угадайку",
      "notes": "Показать фильтр по пакету. Тег — короткое имя класса. `println` тоже всплывёт, но в Android принято `Log.`*.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Кнопка Run — что происходит",
      "subtitle": "",
      "badge": "",
      "body": "1. Gradle собирает модуль `app`\n2. Упаковывается APK\n3. `adb` ставит пакет на выбранное устройство\n4. Система запускает launcher Activity\n5. Logcat начинает заполняться",
      "notes": "Если выбрано «No devices» — Run некуда ставить. Сначала Device Manager или USB. «Install failed» часто значит: старое приложение с другим ключом подписи — удалить с эмулятора и поставить снова.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "practice",
      "title": "Практика. Клонируем шаблон и запускаем",
      "subtitle": "",
      "badge": "Практика",
      "body": "1. Получить URL учебного репозитория у преподавателя\n2. `git clone <url>`\n3. Open в Android Studio → Trust Project → ждать Gradle Sync\n4. Выбрать эмулятор / телефон\n5. Run ▶ — на экране должен появиться шаблон (Hello World / заготовка курса)",
      "notes": "Если шаблона ещё нет — File → New Project → Empty Activity, язык Kotlin, затем этот проект и станет репозиторием студента. Главное: чтобы хоть что-то появилось на эмуляторе.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "Git",
      "subtitle": "Зачем нужен. commit / branch / merge. .gitignore",
      "badge": "",
      "body": "",
      "notes": "Git — обязательный навык курса, не «дополнительная глава». Теория короткая, сразу в практику на своём проекте.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Git — машина времени для кода",
      "subtitle": "",
      "badge": "",
      "body": "- Хранит **историю изменений**, не только последнюю папку\n- Можно откатиться, сравнить, работать параллельно\n- Команда видит, кто что менял\n- Без Git: «у меня на флешке версия_финал_2_точно»\n- На курсе Git = способ сдачи и способ учиться как в индустрии",
      "notes": "Git ≠ GitHub. Git работает локально даже без интернета. GitHub — сайт, куда мы отправляем историю.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Working directory → Staging → Commit",
      "subtitle": "",
      "badge": "",
      "body": "1. Вы меняете файлы (рабочая папка)\n2. `git add` — отбор в индекс (staging)\n3. `git commit` — снимок отобранного с сообщением\n4. То, что не добавили — в коммит не попадёт\n5. Смотреть статус: `git status`",
      "notes": "Самая частая ошибка новичка: commit без add. Вторая: add всего подряд, включая `build/` и `.idea`. Для этого `.gitignore`.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Хороший commit",
      "subtitle": "",
      "badge": "",
      "body": "```\ngit add .\ngit commit -m \"Add Hello World screen\"\n```\n\n- Сообщение на английском или русском — но **по делу**\n- Один коммит = одно логическое изменение\n- Плохо: `git commit -m \"asdf\"` / `\"правки\"` / `\"всё\"`\n- Хорошо: `\"Add README with student name\"` / `\"Change greeting text\"`",
      "notes": "На курсе не требуем Conventional Commits в полном объёме. Важно, чтобы история изменений оставалась читаемой и помогала обсуждать код.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Ветка — изолированная линия работы",
      "subtitle": "",
      "badge": "",
      "body": "- `main` — стабильная линия (сданное, рабочее)\n- `lecture-01` — работа над ДЗ лекции 1\n- Команды:\n  - `git branch` — список\n  - `git switch -c lecture-01` — создать и перейти\n  - `git switch main` — вернуться\n- ДЗ курса **всегда** в ветке `lecture-NN`, не прямым коммитом в `main` после первой настройки",
      "notes": "Сегодня исключение: Hello World может оказаться в `main` (так написано в ДЗ: «Hello World запушен в main»). Дальше каждое ДЗ — отдельная ветка от актуального `main`.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "merge — склеить ветки",
      "subtitle": "",
      "badge": "",
      "body": "- После ревью преподавателя ветка вливается в `main`\n- На GitHub это делает **Merge Pull Request**\n- Локально идея та же: взять изменения из одной ветки в другую\n- Конфликт — оба изменили одно место; Git просит выбрать\n- На лекции 1 конфликтов быть не должно, если не правите одну строку вдвоём",
      "notes": "Не пугать конфликтами. Сказать: появится на следующих лекциях, если забыли подтянуть `main`. Лечится аккуратно, не удалением репозитория.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": ".gitignore — что не кладём в Git",
      "subtitle": "",
      "badge": "",
      "body": "Не коммитим:\n\n- `build/`, `.gradle/` — продукты сборки\n- локальный SDK path (`local.properties`)\n- кэш и крупные бинарники\n- ключи, пароли, `google-services.json` с секретами (позже)\n\nШаблон Android Studio уже содержит разумный `.gitignore` — не удаляйте его.",
      "notes": "`local.properties` содержит путь вида `C:\\Users\\...` — у преподавателя другой диск. Поэтому файл игнорируется. SDK у каждого свой.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "practice",
      "title": "Практика. git init и первый commit",
      "subtitle": "",
      "badge": "Практика",
      "body": "В папке проекта (если это не clone, а свой New Project):\n\n```\ngit init\ngit add .\ngit status\ngit commit -m \"Initial commit: Hello World\"\n```\n\nЕсли проект уже из `git clone` — `init` не нужен, история уже есть.",
      "notes": "Проверить, что `git status` чистый после коммита. Если сотни файлов в `build/` — сломан gitignore, не пушить.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "GitHub",
      "subtitle": "Репозиторий, remote, push / pull, Pull Request, Issues",
      "badge": "",
      "body": "",
      "notes": "GitHub — место сдачи. Можно GitLab/Gitea в жизни; на курсе стандарт — GitHub.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Локальный Git и удалённый GitHub",
      "subtitle": "",
      "badge": "",
      "body": "- **Repository** на GitHub — копия истории в облаке\n- **remote** — ярлык на этот адрес, обычно имя `origin`\n\n```\ngit remote add origin https://github.com/<login>/<repo>.git\ngit remote -v\n```\n\n- Один локальный проект ↔ один origin на курс\n- Приватный репозиторий: добавить преподавателя в Collaborators",
      "notes": "HTTPS vs SSH: что проще группе, то и берём. На Windows часто HTTPS + credential manager. Главное — чтобы `push` прошёл с этой машины.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "push отправляет, pull забирает",
      "subtitle": "",
      "badge": "",
      "body": "```\ngit push -u origin main\ngit push -u origin lecture-01\ngit pull\n```\n\n- `push` — отдать свои коммиты\n- `pull` — взять чужие (и слияния с GitHub)\n- `-u` (upstream) — запомнить связь ветки с remote, дальше достаточно `git push`\n- Нет push — преподаватель вашего кода не видит",
      "notes": "«У меня всё работает локально» — не сдача. Сдача = видно на GitHub. Если push отклонён: сначала pull, не force (force на курсе запрещён без отдельного разрешения).",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Pull Request — просьба влить ветку",
      "subtitle": "",
      "badge": "",
      "body": "- PR: «вот ветка `lecture-01`, влейте в `main`»\n- Здесь преподаватель делает **ревью**\n- В описании PR:\n  - что сделано\n  - скрин / короткая запись экрана\n  - вопросы, если застряли\n- Не вливаете сами до ревью, если так сказал преподаватель",
      "notes": "PR — основной артефакт сдачи. Комментарий в Telegram «я сделал» без ссылки на PR не считается.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Issues — задачи и баги, не сдача ДЗ",
      "subtitle": "",
      "badge": "",
      "body": "- Issue = тикет: баг, идея, вопрос по репозиторию\n- На курсе Issues полезны для своих заметок и вопросов к шаблону\n- Сдача ДЗ — **через PR**, не через Issue\n- Позже в индустрии: Issue → ветка → PR → ревью → merge",
      "notes": "Не путать. Студенты иногда открывают Issue «вот ДЗ» — объяснить разницу один раз.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "practice",
      "title": "Практика. Репозиторий на GitHub и push",
      "subtitle": "",
      "badge": "Практика",
      "body": "1. github.com → New repository (без README, если у вас уже есть локальный commit)\n2. Имя: например `android-course` или как указал преподаватель\n3. `git remote add origin <url>`\n4. `git push -u origin main`\n5. Добавить преподавателя: Settings → Collaborators\n6. Обновить README: ФИО, группа",
      "notes": "Если создали репозиторий С README на сайте — будет отказ push (разные истории). Решение для новичков: либо пустой репо на сайте, либо `pull --rebase` аккуратно. Проще: создавать пустой.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "Рабочий процесс курса",
      "subtitle": "ветка на ДЗ → Pull Request → ревью",
      "badge": "",
      "body": "",
      "notes": "Этот слайд-процесс будут повторять 14 раз. Стоит задержаться и прогнать вслух.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Повторяйте это 15 раз",
      "subtitle": "",
      "badge": "",
      "body": "```\ngit switch main\ngit pull\ngit switch -c lecture-NN\n# ... работа, коммиты ...\ngit push -u origin lecture-NN\n# GitHub: Open Pull Request → main\n```\n\n- Одно ДЗ — одна ветка — один PR\n- После апрува: merge в `main`, следующая лекция от свежего `main`",
      "notes": "NN с нулём: `lecture-01`, `lecture-02`, … `lecture-15`. Не `lec1`, не `dz`.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "practice",
      "title": "Практика. Ветка lecture-01 и Pull Request",
      "subtitle": "",
      "badge": "Практика",
      "body": "```\ngit switch -c lecture-01\n# небольшой коммит: README или текст на экране\ngit add .\ngit commit -m \"Add student name to README\"\ngit push -u origin lecture-01\n```\n\nНа GitHub: Compare & pull request  \nБаза: `main` ← compare: `lecture-01`",
      "notes": "Если Hello World уже в `main`, в `lecture-01` достаточно маленького коммита (скрин в README, изменение строки). Пустой PR без коммитов GitHub не откроет осмысленно.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Шаблон описания Pull Request",
      "subtitle": "",
      "badge": "",
      "body": "```\n## Что сделано\n- Репозиторий курса, Hello World на эмуляторе\n- README: ФИО, скриншот\n\n## Скрин / запись\n- (вставьте картинку)\n\n## Вопросы преподавателю\n- ...\n```\n\nБез скрина «у меня работает» проверить нельзя.",
      "notes": "Картинку можно перетащить в поле GitHub. Не присылать 200 МБ видео — 10–20 секунд или один кадр эмулятора.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "homework",
      "title": "Домашнее задание к лекции 1",
      "subtitle": "",
      "badge": "Домашнее задание",
      "body": "Обязательно:\n\n- Репозиторий создан и доступен преподавателю\n- Hello World запушен в `main`\n- README: ФИО, скриншот приложения на эмуляторе\n- Ветка `lecture-01` + Pull Request\n\nПо желанию:\n\n- Второй commit: изменить текст на экране\n\nДедлайн: **7 дней**.",
      "notes": "Опциональный второй коммит учит: изменение → add → commit → push. Кто сделает — проще на лекции 2.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Что должно быть в README",
      "subtitle": "",
      "badge": "",
      "body": "- Фамилия Имя Отчество\n- Группа / поток\n- Скриншот запущенного приложения (эмулятор или устройство)\n- Ссылка на этот репозиторий не обязательна внутри файла, но файл должен быть в корне\n- Коротко: «Курс Android-разработка, лекция 1»\n\nНе нужна биография и копипаста «Generated by Android Studio» без вашего имени.",
      "notes": "Скриншот рабочего стола Windows целиком — плохо. Кадр эмулятора с видимым текстом приложения — хорошо.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "На чём обычно спотыкаются",
      "subtitle": "",
      "badge": "",
      "body": "- В Git попала папка `build/` (gitignore сломан / add -f)\n- Репозиторий приватный, преподаватель не добавлен\n- Push только локально, на сайте пусто\n- PR из `main` в `main` (нет ветки)\n- Эмулятор не создан, скриншота нет\n- New Project на Java, а не Kotlin\n- Имя ветки `Lecture1` / `dz` вместо `lecture-01`",
      "notes": "Пройти список как предполётный чеклист перед тем, как студенты разойдутся.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Перед тем как закрыть ноутбук",
      "subtitle": "",
      "badge": "",
      "body": "- [ ] `git status` — чисто\n- [ ] На GitHub видны файлы проекта (не только README)\n- [ ] Collaborator / доступ преподавателю\n- [ ] README с ФИО и скрином\n- [ ] Открыт PR `lecture-01` → `main`\n- [ ] В PR есть описание по шаблону",
      "notes": "Попросить 2–3 человек кинуть ссылку на репозиторий в чат курса — живая проверка, что доступ не «только мне».",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Лекция 2 — Kotlin: основы языка",
      "subtitle": "",
      "badge": "",
      "body": "- Зачем Kotlin в Android\n- `val` / `var`, типы, null safety\n- Функции, `if` / `when`, циклы\n- Практика без UI: scratch / консоль / Log\n- ДЗ: задачи в пакете `kotlin.basics`, PR `lecture-02`\n\nСегодняшний Git-процесс на лекции 2 уже считается известным.",
      "notes": "Кто не поставил Studio сегодня — обязан сделать до лекции 2, иначе не напишет даже scratch. Язык пойдёт быстро.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "content",
      "title": "Что забрать с собой",
      "subtitle": "",
      "badge": "",
      "body": "1. Android-приложение = APK + манифест + компоненты; вам пока важен Activity\n2. Kotlin живёт на JVM-стеке, на устройстве исполняет ART\n3. Studio + SDK + эмулятор (или телефон) — рабочее место\n4. Gradle собирает, Logcat показывает, Run ставит пакет\n5. Git хранит историю, GitHub — сдача: ветка → PR → ревью\n6. ДЗ-1: репозиторий, Hello World в `main`, README, PR `lecture-01`",
      "notes": "Повторить вслух за 60 секунд. Вопросы — следующий слайд.",
      "kicker": "",
      "photo": false
    },
    {
      "type": "section",
      "title": "Вопросы",
      "subtitle": "Пока открыты: среда, Git, доступ к репозиторию",
      "badge": "",
      "body": "- Не работает эмулятор?\n- `git push` отвергает?\n- Не видно репозитория у преподавателя?\n\nОстаёмся после пары на 10 минут к установке.",
      "notes": "Собрать тех, у кого красный Gradle или нет GitHub. Не разбирать индивидуальный BIOS на всю аудиторию. Напомнить срок: 7 дней; вопросы можно задавать в PR и в чате курса.",
      "kicker": "",
      "photo": false
    }
  ]
};
