# Лекция 08. Базы данных и Room

**Блок:** Основы Android
**Формат:** теоретический доклад, 92 слайда с заметками преподавателя
**Сквозной пример:** FinanceApp
**Презентация:** [index.html](index.html)

## Цель

Объяснить реляционную модель, основные классы SQL-команд и устройство локальной базы Android на Room. FinanceApp служит примером структуры данных и запросов.

## Маршрут доклада

1. Почему данные нужно хранить за пределами ViewModel.
2. Таблицы, строки, типы, первичные и внешние ключи.
3. DDL, DQL, DML, DCL и TCL; фильтры, сортировка и агрегаты.
4. INNER, LEFT, RIGHT, FULL, CROSS и SELF JOIN со схемами кругов Эйлера и полными SQL-запросами.
5. Аномалии данных и нормализация до 3НФ.
6. SQLite и Room 3: Entity, DAO, Database и KSP.
7. Flow, Repository, ViewModel и Compose как путь данных.
8. Транзакции БД, индексы, версии схемы и миграции.

На слайдах находятся тезисы, код и схемы. Развёрнутые пояснения расположены в панели заметок преподавателя. Для подробного разбора 92 слайдов может потребоваться две пары.

## Источники

- [Нормальные формы баз данных, Хабр](https://habr.com/ru/articles/254773/).
- [Классы SQL-команд](https://www.geeksforgeeks.org/sql/sql-ddl-dql-dml-dcl-tcl-commands/) и [JOIN в SQLite](https://www.sqlite.org/lang_select.html).
- [Room: официальный обзор](https://developer.android.com/training/data-storage/room).
- [Room 3.0: версии и зависимости](https://developer.android.com/jetpack/androidx/releases/room3).
- [Entity](https://developer.android.com/training/data-storage/room/defining-data), [DAO](https://developer.android.com/training/data-storage/room/accessing-data), [миграции](https://developer.android.com/training/data-storage/room/migrating-db-versions).

Код слайдов ориентирован на Room 3.0.3, стабильную версию на 26 октября 2026 года. Версию KSP выбирают совместимой с Kotlin в конкретном проекте.
