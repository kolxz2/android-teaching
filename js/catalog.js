window.COURSE = {
  "title": "Android-разработка",
  "lecturesCount": 15,
  "teacher": "Сучёв Николай Евгеньевич",
  "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
  "photo": "assets/teacher.jpg",
  "subtitle": "15 лекций · пара 1,5 часа · сквозной проект",
  "lectures": [
    {
      "id": "01",
      "slug": "01-vvedenie",
      "title": "Введение в Android. Инструменты. Git и GitHub",
      "block": "Старт и инструменты",
      "href": "lectures/01-vvedenie/index.html",
      "goal": "Студент ставит окружение, понимает, что такое Android-приложение, и умеет сохранить работу в Git/GitHub."
    },
    {
      "id": "02",
      "slug": "02-kotlin-osnovy",
      "title": "Kotlin: основы языка и коллекции",
      "block": "Язык",
      "href": "lectures/02-kotlin-osnovy/index.html",
      "goal": "Писать простые программы на Kotlin без Android и обрабатывать наборы данных через коллекции."
    },
    {
      "id": "03",
      "slug": "03-kotlin-oop",
      "title": "Kotlin: ООП и функциональная обработка данных",
      "block": "Язык",
      "href": "lectures/03-kotlin-oop/index.html",
      "goal": "Моделировать данные классами и обрабатывать коллекции объектов с помощью лямбд."
    },
    {
      "id": "04",
      "slug": "04-kotlin-collections",
      "title": "Ошибки, паттерны и первое приложение на Jetpack Compose",
      "block": "Переход к Android",
      "href": "lectures/04-kotlin-collections/index.html",
      "goal": "Организовать Kotlin-код с помощью небольших функций и паттернов, затем собрать первый экран FinanceApp на Jetpack Compose."
    },
    {
      "id": "05",
      "slug": "05-activity",
      "title": "Activity, состояние и жизненный цикл Compose",
      "block": "Основы Android",
      "href": "lectures/05-activity/index.html",
      "goal": "Понимать роль Activity как контейнера Compose и безопасно управлять состоянием экрана."
    },
    {
      "id": "06",
      "slug": "06-compose-ui",
      "title": "Jetpack Compose: layout, Material 3 и тема",
      "block": "Основы Android",
      "href": "lectures/06-compose-ui/index.html",
      "goal": "Создавать адаптивные экраны декларативно с помощью Jetpack Compose и Material 3."
    },
    {
      "id": "07",
      "slug": "07-compose-lists",
      "title": "Списки в Compose: LazyColumn и состояние",
      "block": "Основы Android",
      "href": "lectures/07-compose-lists/index.html",
      "goal": "Эффективно показывать списки данных в Compose и обрабатывать действия пользователя."
    },
    {
      "id": "08",
      "slug": "08-navigation-compose",
      "title": "Navigation Compose",
      "block": "Основы Android",
      "href": "lectures/08-navigation-compose/index.html",
      "goal": "Собрать многоэкранное Compose-приложение с типобезопасной навигацией и понятным back stack."
    },
    {
      "id": "09",
      "slug": "09-components",
      "title": "Service, BroadcastReceiver, ContentProvider, Bundle",
      "block": "Компоненты и сеть",
      "href": "lectures/09-components/index.html",
      "goal": "Знать карту компонентов Android и уметь применить Service / Broadcast на простом примере."
    },
    {
      "id": "10",
      "slug": "10-network",
      "title": "Сеть: HTTP, OkHttp, Retrofit. JSON и сериализация",
      "block": "Компоненты и сеть",
      "href": "lectures/10-network/index.html",
      "goal": "Загрузить данные из API и разобрать JSON."
    },
    {
      "id": "11",
      "slug": "11-coroutines-flow",
      "title": "Coroutines и Flow",
      "block": "Компоненты и сеть",
      "href": "lectures/11-coroutines-flow/index.html",
      "goal": "Асинхронщина без callback-ада; стримы данных через Flow."
    },
    {
      "id": "12",
      "slug": "12-storage",
      "title": "Хранение данных: SharedPreferences, DataStore, Room, файлы",
      "block": "Данные",
      "href": "lectures/12-storage/index.html",
      "goal": "Выбрать способ хранения и реализовать минимум два из них."
    },
    {
      "id": "13",
      "slug": "13-architecture",
      "title": "Архитектура: MVVM, MVP, MVI. SOLID и Clean Architecture",
      "block": "Архитектура",
      "href": "lectures/13-architecture/index.html",
      "goal": "Разложить Compose-приложение по слоям и вынести состояние и бизнес-логику из UI."
    },
    {
      "id": "14",
      "slug": "14-patterns-hilt",
      "title": "Паттерны проектирования. Dependency Injection и Hilt",
      "block": "Архитектура",
      "href": "lectures/14-patterns-hilt/index.html",
      "goal": "Узнавать частые паттерны и собрать зависимости через Hilt, а не вручную."
    },
    {
      "id": "15",
      "slug": "15-final",
      "title": "Итоговое приложение. Самопроверка. Заключение",
      "block": "Финал",
      "href": "lectures/15-final/index.html",
      "goal": "Собрать требования курса в одно приложение и зафиксировать, чему научились."
    }
  ],
  "practices": [
    {
      "id": "git",
      "kind": "practice",
      "afterLecture": "01",
      "slug": "git-practice",
      "title": "Практика Git: 10 базовых задач и 5 со звёздочкой",
      "block": "Практика",
      "href": "practice/git/index.html",
      "goal": "Практические задачи от состояния файлов до работы с удалённым репозиторием."
    },
    {
      "id": "kotlin-02",
      "kind": "practice",
      "afterLecture": "02",
      "slug": "kotlin-02-practice",
      "title": "Практика 02: Kotlin, массивы и Map",
      "block": "Язык",
      "href": "practice/kotlin-02/index.html",
      "goal": "Kotlin Koans и задачи на синтаксис, коллекции и преобразование данных."
    },
    {
      "id": "kotlin-03",
      "kind": "practice",
      "afterLecture": "03",
      "slug": "kotlin-03-practice",
      "title": "Практика 03: Kotlin ООП и первый Compose-проект",
      "block": "Язык",
      "href": "practice/kotlin-03/index.html",
      "goal": "Классы, data class, интерфейсы и композиция в Kotlin; затем разбор классов первого Android-проекта на Jetpack Compose."
    },
    {
      "id": "kotlin-04",
      "kind": "practice",
      "afterLecture": "04",
      "slug": "kotlin-04-practice",
      "title": "Практика 04: обновление FinanceApp и первый экран Compose",
      "block": "Переход к Android",
      "href": "practice/kotlin-04/index.html",
      "goal": "Безопасно перенести старый XML/View-проект на Compose, реализовать состояние, события и чистый reducer."
    }
  ]
};
