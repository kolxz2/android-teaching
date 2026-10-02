# Лекция 04. Ошибки, паттерны и первое приложение на Jetpack Compose

**Блок:** Переход к Android  
**Длительность:** пара 90 мин (теория + живая практика)  
**Ветка / PR:** `lecture-04`  

## Цель

Организовать Kotlin-код с помощью небольших функций и паттернов, затем собрать первый экран FinanceApp на Jetpack Compose.

## Теория

- Kotlin-идиомы: guard clauses, expression body, extension- и scope-функции
- Контракты, исключения и sealed-результаты
- Практические паттерны: Factory, Repository, State
- Разделение UI и бизнес-логики: однонаправленный поток данных (UDF)
- Мост к Android: модуль app, AndroidManifest.xml, ComponentActivity и setContent
- Composable-функции, Modifier, Material 3 и обработка событий через лямбды

## Практика на паре

- Реализация reduce(state, event) и MainUiState
- Создание composable-экрана в MainActivity через setContent
- Обновление интерфейса из MainUiState и обработка нажатия

## Домашнее задание

- Запуск и изменение стартового FinanceApp
- Смена текста / состояния по нажатию кнопки
- Вынос пользовательских строк в ресурсы и использование stringResource
- PR lecture-04

## Дальше

Лекция 5 — Activity, состояние и жизненный цикл Compose
