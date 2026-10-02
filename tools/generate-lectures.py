# -*- coding: utf-8 -*-
"""Generate per-lecture folders, plan.md and slides.js from PLAN + lecture 1 prompt."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LECTURES = ROOT / "lectures"

LECTURE_META = [
    {
        "id": "01",
        "slug": "01-vvedenie",
        "title": "Введение в Android. Инструменты. Git и GitHub",
        "block": "Старт и инструменты",
        "minutes": "90",
        "goal": "Студент ставит окружение, понимает, что такое Android-приложение, и умеет сохранить работу в Git/GitHub.",
        "theory": [
            "О курсе: формат, правила сдачи, сквозной проект",
            "История и экосистема Android, роль JDK / JVM",
            "Что такое Android-приложение: APK, манифест, компоненты (обзор)",
            "Установка Android Studio, SDK, эмулятор",
            "Обзор IDE: проект, Gradle, Logcat, запуск на эмуляторе",
            "Git: зачем нужен, commit / branch / merge, .gitignore",
            "GitHub: репозиторий, remote, push / pull, Pull Request, Issues",
            "Рабочий процесс курса: ветка на ДЗ → PR → ревью",
        ],
        "practice": [
            "Установка / проверка Android Studio",
            "Клонирование основного проекта и запуск",
            "git init, первый commit",
            "Репозиторий на GitHub, git remote add, git push",
            "Ветка lecture-01 и Pull Request",
        ],
        "homework": [
            "Репозиторий курса создан и доступен преподавателю",
            "Hello World запушен в main",
            "README: ФИО, скриншот приложения на эмуляторе",
            "(по желанию) второй commit с изменением текста на экране",
        ],
        "branch": "lecture-01",
        "next": "Лекция 2 — Kotlin: основы языка и коллекции",
    },
    {
        "id": "02",
        "slug": "02-kotlin-osnovy",
        "title": "Kotlin: основы языка и коллекции",
        "block": "Язык",
        "minutes": "90",
        "goal": "Писать простые программы на Kotlin без Android и обрабатывать наборы данных через коллекции.",
        "theory": [
            "Зачем Kotlin в Android, отличие от Java (кратко)",
            "Переменные: val / var, вывод типов",
            "Базовые типы: числа, String, Boolean, Char",
            "Null safety: ?, ?: , !!, ?.",
            "Функции: параметры, возвращаемый тип, default / named args, single-expression",
            "Управляющие конструкции: if как выражение, when, циклы for / while",
            "Массивы: Array<T>, массивы примитивов, преобразование в List",
            "Коллекции: List, Set, Map, ArrayDeque; read-only и mutable варианты",
            "Реализации: ArrayList, HashSet, LinkedHashSet, HashMap, LinkedHashMap",
            "Операции: filter, map, find, any, all, count, сортировка и groupBy",
        ],
        "practice": [
            "Kotlin-файл / scratch в Android Studio (без UI)",
            "Несколько функций: ввод → обработка → вывод в Log / консоль",
            "Задачи на выбор коллекции и цепочки преобразований",
        ],
        "homework": [
            "Пройти все задания раздела Introduction в Kotlin Koans",
            "Пройти все задания раздела Collections в Kotlin Koans",
            "Приложить два скриншота с зелёными отметками выполнения",
        ],
        "branch": "lecture-02",
        "next": "Лекция 3 — Kotlin: ООП и функциональная обработка данных",
    },
    {
        "id": "03",
        "slug": "03-kotlin-oop",
        "title": "Kotlin: ООП и функциональная обработка данных",
        "block": "Язык",
        "minutes": "90",
        "goal": "Моделировать данные классами и обрабатывать коллекции объектов с помощью лямбд.",
        "theory": [
            "Класс, свойства, конструкторы, init",
            "Видимость, this",
            "Наследование, open, override",
            "Абстрактные классы и интерфейсы",
            "Принципы ООП: инкапсуляция, наследование, полиморфизм, абстракция",
            "Data-классы",
            "enum, sealed class / sealed interface",
            "object (синглтон), companion object, анонимные объекты",
            "Лямбды, функции высшего порядка и цепочки обработки коллекций",
            "Ссылки на функции, fold и Sequence",
        ],
        "practice": [
            "Модель предметной области курса (Transaction, User, статусы через enum / sealed)",
            "Реализация TransactionRepository и фильтрация операций",
        ],
        "homework": [
            "Пройти раздел Classes на Kotlin Playground",
            "Доменная модель: Transaction, Category, TransactionType, TransactionRepository",
            "PR lecture-03 в FinanceApp",
        ],
        "branch": "lecture-03",
        "next": "Лекция 4 — Ошибки, паттерны и первое приложение на Compose",
    },
    {
        "id": "04",
        "slug": "04-kotlin-collections",
        "title": "Ошибки, паттерны и первое приложение на Jetpack Compose",
        "block": "Переход к Android",
        "minutes": "90",
        "goal": "Организовать Kotlin-код с помощью небольших функций и паттернов, затем собрать первый экран FinanceApp на Jetpack Compose.",
        "theory": [
            "Kotlin-идиомы: guard clauses, expression body, extension- и scope-функции",
            "Контракты, исключения и sealed-результаты",
            "Практические паттерны: Factory, Repository, State",
            "Разделение UI и бизнес-логики: однонаправленный поток данных (UDF)",
            "Мост к Android: модуль app, AndroidManifest.xml, ComponentActivity и setContent",
            "Composable-функции, Modifier, Material 3 и обработка событий через лямбды",
        ],
        "practice": [
            "Реализация reduce(state, event) и MainUiState",
            "Создание composable-экрана в MainActivity через setContent",
            "Обновление интерфейса из MainUiState и обработка нажатия",
        ],
        "homework": [
            "Запуск и изменение стартового FinanceApp",
            "Смена текста / состояния по нажатию кнопки",
            "Вынос пользовательских строк в ресурсы и использование stringResource",
            "PR lecture-04",
        ],
        "branch": "lecture-04",
        "next": "Лекция 5 — Activity, состояние и жизненный цикл Compose",
    },
    {
        "id": "05",
        "slug": "05-activity",
        "title": "Activity, состояние и жизненный цикл Compose",
        "block": "Основы Android",
        "minutes": "90",
        "goal": "Понимать роль Activity как контейнера Compose и безопасно управлять состоянием экрана.",
        "theory": [
            "Компоненты приложения: зачем четыре типа (обзор)",
            "ComponentActivity как точка входа и контейнер Compose",
            "Context: зачем нужен, Activity vs applicationContext",
            "setContent, дерево композиции и рекомпозиция",
            "Жизненный цикл Activity",
            "Состояние: remember, mutableStateOf и rememberSaveable",
            "Подъём состояния и однонаправленный поток данных",
        ],
        "practice": [
            "Экран формы на Compose с состоянием, поднятым в родительский composable",
            "Поворот экрана без потери введённых данных через rememberSaveable",
        ],
        "homework": [
            "Экран Compose с состоянием и событиями",
            "Корректное восстановление состояния после поворота",
            "PR lecture-05",
        ],
        "branch": "lecture-05",
        "next": "Лекция 6 — Jetpack Compose: layout, Material 3 и тема",
    },
    {
        "id": "06",
        "slug": "06-compose-ui",
        "title": "Jetpack Compose: layout, Material 3 и тема",
        "block": "Основы Android",
        "minutes": "90",
        "goal": "Создавать адаптивные экраны декларативно с помощью Jetpack Compose и Material 3.",
        "theory": [
            "Декларативный UI и правила работы composable-функций",
            "Row, Column, Box и базовые элементы Material 3",
            "Modifier: размер, отступы, фон, порядок модификаторов",
            "Text, TextField, Button, Image и прокрутка",
            "dp, sp, WindowInsets и адаптивные ограничения",
            "MaterialTheme: цветовая схема, типографика и формы",
        ],
        "practice": [
            "Экран формы или профиля на Compose",
            "Превью, тема и переиспользуемые composable-компоненты",
        ],
        "homework": [
            "Сверстать 1–2 экрана по макету (или по скрину преподавателя)",
            "Строки вынесены в ресурсы, цвета и типографика заданы темой",
            "PR lecture-06",
        ],
        "branch": "lecture-06",
        "next": "Лекция 7 — Списки в Compose: LazyColumn и состояние",
    },
    {
        "id": "07",
        "slug": "07-compose-lists",
        "title": "Списки в Compose: LazyColumn и состояние",
        "block": "Основы Android",
        "minutes": "90",
        "goal": "Эффективно показывать списки данных в Compose и обрабатывать действия пользователя.",
        "theory": [
            "LazyColumn и LazyRow: ленивое создание элементов",
            "items, стабильные key и contentType",
            "Карточка элемента и события через лямбды",
            "Состояния загрузки, пустого списка и ошибки",
            "Производительность, стабильность параметров и derivedStateOf",
        ],
        "practice": [
            "LazyColumn со списком из data-классов лекции 3",
            "Переход на экран деталей по клику",
        ],
        "homework": [
            "Список + детали в сквозном приложении",
            "Переиспользуемая карточка и корректные ключи элементов",
            "PR lecture-07",
        ],
        "branch": "lecture-07",
        "next": "Лекция 8 — Navigation Compose",
    },
    {
        "id": "08",
        "slug": "08-navigation-compose",
        "title": "Navigation Compose",
        "block": "Основы Android",
        "minutes": "90",
        "goal": "Собрать многоэкранное Compose-приложение с типобезопасной навигацией и понятным back stack.",
        "theory": [
            "Navigation Compose: NavHost, NavController и destinations",
            "Маршруты и типобезопасная передача аргументов",
            "Вложенные графы и структура навигации",
            "Сохранение состояния экранов",
            "Back stack",
        ],
        "practice": [
            "Связать два composable-экрана через Navigation Compose",
            "Передача аргумента на экран деталей",
        ],
        "homework": [
            "Сквозное приложение использует Navigation Compose",
            "Минимум два composable-экрана в графе",
            "PR lecture-08",
        ],
        "branch": "lecture-08",
        "next": "Лекция 9 — Service, BroadcastReceiver, ContentProvider",
    },
    {
        "id": "09",
        "slug": "09-components",
        "title": "Service, BroadcastReceiver, ContentProvider, Bundle",
        "block": "Компоненты и сеть",
        "minutes": "90",
        "goal": "Знать карту компонентов Android и уметь применить Service / Broadcast на простом примере.",
        "theory": [
            "Bundle ещё раз: что в него кладут и чего нельзя",
            "Service: типы, когда нужен, когда лучше WorkManager",
            "BroadcastReceiver: системные и свои события",
            "ContentProvider: зачем системе (контакты, медиа), свой провайдер — обзор",
            "Как компоненты объявляются в манифесте",
        ],
        "practice": [
            "Простой Service или BroadcastReceiver (заряд батареи / своё событие)",
        ],
        "homework": [
            "Один рабочий пример: Service или BroadcastReceiver",
            "Короткий конспект в README: чем отличаются 4 компонента",
            "PR lecture-09",
        ],
        "branch": "lecture-09",
        "next": "Лекция 10 — Сеть: HTTP, OkHttp, Retrofit, JSON",
    },
    {
        "id": "10",
        "slug": "10-network",
        "title": "Сеть: HTTP, OkHttp, Retrofit. JSON и сериализация",
        "block": "Компоненты и сеть",
        "minutes": "90",
        "goal": "Загрузить данные из API и разобрать JSON.",
        "theory": [
            "HTTP: метод, URL, заголовки, тело, коды ответа",
            "Сокеты vs HTTP (очень кратко)",
            "OkHttp: клиент, interceptors (идея)",
            "Retrofit: интерфейс API, конвертеры",
            "JSON и сериализация / десериализация (kotlinx.serialization или Moshi/Gson)",
            "Ручная сериализация — когда и зачем (обзор)",
        ],
        "practice": [
            "GET-запрос к публичному API",
            "Отображение результата в LazyColumn",
        ],
        "homework": [
            "Список с сервера + экран деталей",
            "Модели под JSON, обработка ошибки сети (тост / текст на экране)",
            "PR lecture-10",
        ],
        "branch": "lecture-10",
        "next": "Лекция 11 — Coroutines и Flow",
    },
    {
        "id": "11",
        "slug": "11-coroutines-flow",
        "title": "Coroutines и Flow",
        "block": "Компоненты и сеть",
        "minutes": "90",
        "goal": "Асинхронщина без callback-ада; стримы данных через Flow.",
        "theory": [
            "Зачем корутины, чем отличаются от потоков",
            "CoroutineScope, Job, Dispatchers",
            "Builders: launch, async / await, runBlocking (только для понимания)",
            "Отмена (cancellation)",
            "suspend-функции в Retrofit",
            "Flow: холодный поток, collect",
            "Операторы: map, filter, catch, onEach",
            "Связка с Compose UI: collectAsStateWithLifecycle",
        ],
        "practice": [
            "Переписать сетевой запрос на корутины",
            "Простой Flow (таймер или обновление списка)",
        ],
        "homework": [
            "Сеть только через suspend + корутины",
            "Один сценарий на Flow",
            "PR lecture-11",
        ],
        "branch": "lecture-11",
        "next": "Лекция 12 — SharedPreferences, DataStore, Room, файлы",
    },
    {
        "id": "12",
        "slug": "12-storage",
        "title": "Хранение данных: SharedPreferences, DataStore, Room, файлы",
        "block": "Данные",
        "minutes": "90",
        "goal": "Выбрать способ хранения и реализовать минимум два из них.",
        "theory": [
            "Карта хранения: память, prefs, БД, файлы, сеть",
            "SharedPreferences",
            "DataStore (Preferences) — современная замена prefs",
            "Файловая система Android: internal / external, кэш",
            "Основы БД: таблица, первичный ключ",
            "Room: Entity, DAO, Database",
            "Связка Room + Flow / корутины",
        ],
        "practice": [
            "Сохранить настройку (тема / имя) в DataStore или SharedPreferences",
            "Entity + DAO: кэш списка с сервера",
        ],
        "homework": [
            "Настройка переживает перезапуск приложения",
            "Room: локальный кэш списка (или избранное)",
            "По желанию: сохранение файла (текст / картинка)",
            "PR lecture-12",
        ],
        "branch": "lecture-12",
        "next": "Лекция 13 — MVVM, SOLID и Clean Architecture",
    },
    {
        "id": "13",
        "slug": "13-architecture",
        "title": "Архитектура: MVVM, MVP, MVI. SOLID и Clean Architecture",
        "block": "Архитектура",
        "minutes": "90",
        "goal": "Разложить Compose-приложение по слоям и вынести состояние и бизнес-логику из UI.",
        "theory": [
            "Зачем архитектура в Android",
            "MVP, MVVM, MVI — сравнение, акцент на MVVM",
            "ViewModel, UiState, односторонний поток данных",
            "SOLID на Android-примерах",
            "Clean Architecture: UI → domain → data, зависимости внутрь",
        ],
        "practice": [
            "Вынести логику экрана списка в ViewModel",
            "Репозиторий между UI и Retrofit/Room",
        ],
        "homework": [
            "Сквозное приложение: MVVM + репозиторий",
            "Коротко в README: почему выбран MVVM, как слои связаны с SOLID",
            "PR lecture-13",
        ],
        "branch": "lecture-13",
        "next": "Лекция 14 — Паттерны проектирования, DI и Hilt",
    },
    {
        "id": "14",
        "slug": "14-patterns-hilt",
        "title": "Паттерны проектирования. Dependency Injection и Hilt",
        "block": "Архитектура",
        "minutes": "90",
        "goal": "Узнавать частые паттерны и собрать зависимости через Hilt, а не вручную.",
        "theory": [
            "Виды паттернов: порождающие, структурные, поведенческие",
            "На курсе: Singleton, Factory, Observer, Repository, Adapter",
            "Service Locator vs Dependency Injection",
            "Hilt: @HiltAndroidApp, @Inject, @Module, @Provides / @Binds, скоупы",
            "Как Hilt стыкуется с ViewModel и Retrofit",
        ],
        "practice": [
            "Подключить Hilt",
            "Прокинуть Retrofit / Room / репозиторий через DI",
        ],
        "homework": [
            "Hilt в сквозном проекте",
            "Самопроверка: где какой паттерн уже используется",
            "PR lecture-14",
        ],
        "branch": "lecture-14",
        "next": "Лекция 15 — Итоговое приложение, самопроверка, заключение",
    },
    {
        "id": "15",
        "slug": "15-final",
        "title": "Итоговое приложение. Самопроверка. Заключение",
        "block": "Финал",
        "minutes": "90",
        "goal": "Собрать требования курса в одно приложение и зафиксировать, чему научились.",
        "theory": [
            "Чеклист курса: что должно быть в итоговом приложении",
            "Типичные ошибки (нестабильное состояние, лишние рекомпозиции, сеть на главном потоке, логика в composable)",
            "Что учить дальше: тестирование Compose, WorkManager, пагинация, безопасность",
            "Обратная связь по курсу",
        ],
        "practice": [
            "Разбор типовых дыр в работах",
            "Демо сильных решений студентов",
            "Q&A",
        ],
        "homework": [
            "Финальный PR / тег release-1.0",
            "Короткое ретро в README: что было сложно, что получилось",
            "Анонимный опрос по курсу",
        ],
        "final_checklist": [
            "Kotlin, Git-история с лекции 1",
            "Несколько экранов на Navigation Compose",
            "Список на LazyColumn",
            "Сеть (Retrofit) + JSON",
            "Корутины (и желательно Flow)",
            "Локальное хранение (Room и/или DataStore)",
            "MVVM + репозиторий",
            "Hilt",
        ],
        "branch": "release-1.0",
        "next": "Курс завершён. Что дальше — тестирование Compose, WorkManager и пагинация.",
    },
]

PRACTICES = [
    {
        "id": "git",
        "kind": "practice",
        "afterLecture": "01",
        "slug": "git-practice",
        "title": "Практика Git: 10 базовых задач и 5 со звёздочкой",
        "block": "Практика",
        "href": "practice/git/index.html",
        "goal": "Практические задачи от состояния файлов до работы с удалённым репозиторием.",
    },
    {
        "id": "kotlin-02",
        "kind": "practice",
        "afterLecture": "02",
        "slug": "kotlin-02-practice",
        "title": "Практика 02: Kotlin, массивы и Map",
        "block": "Язык",
        "href": "practice/kotlin-02/index.html",
        "goal": "Kotlin Koans и задачи на синтаксис, коллекции и преобразование данных.",
    },
    {
        "id": "kotlin-03",
        "kind": "practice",
        "afterLecture": "03",
        "slug": "kotlin-03-practice",
        "title": "Практика 03: Kotlin ООП и первый Compose-проект",
        "block": "Язык",
        "href": "practice/kotlin-03/index.html",
        "goal": "Классы, data class, интерфейсы и композиция в Kotlin; затем разбор классов первого Android-проекта на Jetpack Compose.",
    },
]

INDEX_HTML = """<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Лекция {id}. {title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../css/deck.css" />
</head>
<body>
  <div id="deck" class="deck"></div>
  <script src="slides.js"></script>
  <script src="../../js/deck.js"></script>
</body>
</html>
"""


def bullets_md(items: list[str]) -> str:
    return "\n".join(f"- {x}" for x in items)


def plan_md(meta: dict) -> str:
    theory = "\n".join(f"- {x}" for x in meta["theory"])
    practice = "\n".join(f"- {x}" for x in meta["practice"])
    hw = "\n".join(f"- {x}" for x in meta["homework"])
    extra = ""
    if meta.get("final_checklist"):
        extra = "\n\n### Итоговое приложение\n\n" + "\n".join(
            f"- {x}" for x in meta["final_checklist"]
        )
    return f"""# Лекция {meta['id']}. {meta['title']}

**Блок:** {meta['block']}  
**Длительность:** пара {meta['minutes']} мин (теория + живая практика)  
**Ветка / PR:** `{meta['branch']}`  

## Цель

{meta['goal']}

## Теория

{theory}

## Практика на паре

{practice}

## Домашнее задание

{hw}{extra}

## Дальше

{meta['next']}
"""


def course_plan_md() -> str:
    sections = [
        "# План курса «Android-разработка на Jetpack Compose»",
        "",
        "Курс построен вокруг одного сквозного приложения на Kotlin и Jetpack Compose. "
        "XML-разметка, View и Fragment не используются в проекте; они упоминаются только как legacy-подход, который можно встретить в существующих приложениях.",
        "",
        "## Формат",
        "",
        "- 15 занятий по 90 минут: теория и живая практика.",
        "- На каждом занятии студенты развивают один Compose-проект.",
        "- Изменения сохраняются в Git и обсуждаются через Pull Request.",
        "- В лекциях собраны материал, примеры и практические задания.",
        "",
        "## Лекции",
        "",
    ]
    for meta in LECTURE_META:
        sections.extend(
            [
                f"### {int(meta['id'])}. {meta['title']}",
                "",
                meta["goal"],
                "",
                "**Материал**",
                "",
                bullets_md(meta["theory"]),
                "",
                "**Практика**",
                "",
                bullets_md(meta["practice"]),
                "",
                "**Самостоятельная работа**",
                "",
                bullets_md(meta["homework"]),
                "",
            ]
        )
        if meta.get("final_checklist"):
            sections.extend(
                ["**Итоговый проект**", "", bullets_md(meta["final_checklist"]), ""]
            )
    return "\n".join(sections).rstrip() + "\n"


def outline_slides(meta: dict) -> list[dict]:
    n = int(meta["id"])
    slides = [
        {
            "type": "title",
            "title": "Android-разработка",
            "subtitle": f"Лекция {n}. {meta['title']}",
            "body": bullets_md(
                [
                    "Курс из 15 лекций · пара 1,5 часа",
                    f"Блок: **{meta['block']}**",
                    f"Ветка: `{meta['branch']}`",
                    "Преподаватель: Сучёв Николай Евгеньевич",
                ]
            ),
            "kicker": f"{meta['id']} / 15",
        },
        {
            "type": "content",
            "title": "Что вы умеете к концу пары",
            "body": bullets_md([meta["goal"]] + meta["theory"][:3]),
        },
        {
            "type": "section",
            "title": "Теория",
            "subtitle": meta["title"],
        },
        {
            "type": "content",
            "title": "План теории",
            "body": bullets_md(meta["theory"]),
        },
        {
            "type": "section",
            "title": "Практика",
            "subtitle": "На паре, руками",
            "badge": "Практика",
        },
        {
            "type": "content",
            "title": "Практика на паре",
            "badge": "Практика",
            "body": bullets_md(meta["practice"]),
        },
        {
            "type": "content",
            "title": "Домашнее задание",
            "badge": "Домашнее задание",
            "body": bullets_md(meta["homework"])
            + f"\n\nДедлайн: **7 дней**. Ветка `{meta['branch']}`, PR в `main`.",
        },
    ]
    if meta.get("final_checklist"):
        slides.insert(
            -1,
            {
                "type": "content",
                "title": "Минимальный набор итогового приложения",
                "body": bullets_md(meta["final_checklist"]),
            },
        )
    slides.extend(
        [
            {
                "type": "content",
                "title": "Что дальше",
                "body": bullets_md([meta["next"], "Git-процесс тот же: ветка → commit → push → PR."]),
            },
            {
                "type": "section",
                "title": "Вопросы",
                "subtitle": "Сучёв Николай Евгеньевич · Т-Банк, команда Вовлечение",
            },
        ]
    )
    return slides


def parse_lecture1(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    chunks = re.split(r"\n### СЛАЙД (\d+) — (.+)\n", text)
    slides = []
    i = 1
    while i < len(chunks):
        num = chunks[i]
        label = chunks[i + 1].strip()
        body = chunks[i + 2]
        i += 3
        if "КОНЕЦ ПРОМПТА" in body:
            body = body.split("## КОНЕЦ ПРОМПТА")[0]
        slide = parse_slide_body(num, label, body)
        slides.append(slide)
    return slides


def field(block: str, name: str) -> str | None:
    m = re.search(rf"\*\*{name}:\*\*\s*(.*)", block)
    return m.group(1).strip() if m else None


def section_after(block: str, name: str, stop_names: list[str]) -> str:
    m = re.search(rf"\*\*{name}:\*\*\s*\n?", block)
    if not m:
        return ""
    rest = block[m.end() :]
    stops = [rf"\*\*{n}:\*\*" for n in stop_names]
    nxt = re.search("|".join(stops), rest)
    if nxt:
        rest = rest[: nxt.start()]
    rest = re.split(r"\n---\s*\n", rest)[0]
    return rest.strip()


def parse_slide_body(num: str, label: str, raw: str) -> dict:
    title = field(raw, "Заголовок") or label
    subtitle = field(raw, "Подзаголовок")
    badge = field(raw, "Бейдж")
    deadline = field(raw, "Дедлайн")
    body = section_after(raw, "Текст на слайде", ["Визуал", "Заметки спикера"])
    notes = section_after(raw, "Заметки спикера", ["Визуал"])
    visual = section_after(raw, "Визуал", ["Заметки спикера"])

    stype = "content"
    if "Раздел" in label or (not body and subtitle):
        stype = "section"
    if num == "1":
        stype = "title"
    if num == "2":
        stype = "teacher"
    if badge == "Практика":
        stype = "practice"
    if badge == "Домашнее задание":
        stype = "homework"
    if title == "Вопросы":
        stype = "section"

    extra = ""
    if deadline:
        extra = f"\n\nДедлайн: **{deadline}**."
    if visual and "```" in visual:
        extra += "\n\n" + visual[visual.find("```") :]

    return {
        "type": stype,
        "title": title,
        "subtitle": subtitle or "",
        "badge": badge or "",
        "body": (body + extra).strip(),
        "notes": notes,
        "kicker": "01 / 15" if num == "1" else "",
        "photo": True if num in ("1", "2") else False,
    }


def write_slides_js(path: Path, meta: dict, slides: list[dict]) -> None:
    payload = {
        "course": "Android-разработка",
        "lecture": int(meta["id"]),
        "lectureId": meta["id"],
        "slug": meta["slug"],
        "title": meta["title"],
        "block": meta["block"],
        "teacher": "Сучёв Николай Евгеньевич",
        "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
        "hub": "../../index.html",
        "photo": "../../assets/teacher.jpg",
        "slides": slides,
    }
    path.write_text(
        "window.DECK = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )


def main() -> None:
    catalog = []
    for meta in LECTURE_META:
        folder = LECTURES / meta["slug"]
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "plan.md").write_text(plan_md(meta), encoding="utf-8")
        (folder / "index.html").write_text(
            INDEX_HTML.format(id=meta["id"], title=meta["title"]),
            encoding="utf-8",
        )
        # Лекции 1 и 2 содержат расширенные авторские слайды и не должны
        # перезаписываться кратким шаблоном при обновлении структуры курса.
        if meta["id"] not in {"01", "02"}:
            write_slides_js(folder / "slides.js", meta, outline_slides(meta))
        catalog.append(
            {
                "id": meta["id"],
                "slug": meta["slug"],
                "title": meta["title"],
                "block": meta["block"],
                "href": f"lectures/{meta['slug']}/index.html",
                "goal": meta["goal"],
            }
        )

    (ROOT / "js").mkdir(exist_ok=True)
    (ROOT / "js" / "catalog.js").write_text(
        "window.COURSE = "
        + json.dumps(
            {
                "title": "Android-разработка",
                "lecturesCount": 15,
                "teacher": "Сучёв Николай Евгеньевич",
                "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
                "photo": "assets/teacher.jpg",
                "subtitle": "15 лекций · пара 1,5 часа · сквозной проект",
                "lectures": catalog,
                "practices": PRACTICES,
            },
            ensure_ascii=False,
            indent=2,
        )
        + ";\n",
        encoding="utf-8",
    )
    (ROOT / "PLAN.md").write_text(course_plan_md(), encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
