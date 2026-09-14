# Лекция 04. Ошибки, паттерны и первое Android-приложение

**Блок:** Переход от языка к Android  
**Длительность:** 90 минут  
**Объём:** 59 слайдов  
**Ветка / PR:** `lecture-04`

## Цель

Научиться организовывать Kotlin-код с помощью небольших функций, композиции и простых паттернов, а затем применить эти приёмы в первом Android-экране.

## Содержание

- Kotlin-идиомы: неизменяемые данные, guard clauses, extension- и scope-функции
- Валидация, исключения и sealed-результаты
- Практические паттерны: Strategy, Factory, Repository, State
- Разделение UI и бизнес-логики
- Первое Android-приложение: модуль `app`, manifest, Activity, XML и обработка нажатия
- Однонаправленное обновление состояния экрана

## Границы темы

- Жизненный цикл и Context — лекция 5
- Полная XML-вёрстка — лекция 6
- RecyclerView — лекция 7
- MVVM, Clean Architecture и SOLID — лекция 13
- GoF-паттерны и Dependency Injection — лекция 14

## Практика

Студенты переносят модель операций из лекции 2 в Android-приложение. Кнопка создаёт демонстрационную операцию, обычный Kotlin-код рассчитывает новое состояние, Activity отображает результат.

## Официальные источники

- [Kotlin idioms](https://kotlinlang.org/docs/idioms.html)
- [Extensions](https://kotlinlang.org/docs/extensions.html)
- [Higher-order functions and lambdas](https://kotlinlang.org/docs/lambdas.html)
- [Scope functions](https://kotlinlang.org/docs/scope-functions.html)
- [Exceptions](https://kotlinlang.org/docs/exceptions.html)
- [Android app architecture](https://developer.android.com/topic/architecture)
- [Architecture recommendations](https://developer.android.com/topic/architecture/recommendations)
- [Activities](https://developer.android.com/guide/components/activities/intro-activities)
