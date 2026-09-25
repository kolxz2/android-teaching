# Лекция 03. Kotlin: ООП и функциональная обработка данных

**Блок:** Язык  
**Длительность:** 90 минут  
**Объём:** 73 слайда  
**Ветка / PR:** `lecture-03`

## Цель

Научиться моделировать предметную область классами Kotlin, защищать состояние объекта, читать простые лямбды в готовых операциях и понимать порядок инициализации при наследовании.

## План занятия

- 0–6 минут — связь объектов с данными из коллекций
- 6–24 минуты — классы, свойства, конструкторы, методы и видимость
- 24–34 минуты — инкапсуляция и практика с моделью счёта
- 34–45 минут — наследование, абстракция, интерфейсы и композиция
- 45–55 минут — сравнение объектов, smart cast, nested и `inner class`
- 55–70 минут — специальные классы на сквозной модели операции
- 70–78 минут — простые лямбды в `filter`, `map` и обработчике нажатия
- 78–86 минут — порядок инициализации базового класса и наследника
- 86–90 минут — вопросы на чтение и объяснение кода

## Практические примеры

- сравнение объектов `data class` через `==` и `===`
- сравнение обычных объектов и smart cast после проверки `is`
- создание вложенного класса через `House.Room()` и inner-класса через `house.Room()`
- пример утечки памяти из-за ссылки `inner`-объекта на внешний экран
- изменение состояния через `copy()` и ограничение поверхностного копирования
- выбор между `enum`, `sealed`, `object`, `companion object` и `value class`
- чтение простой лямбды с явным параметром и с `it`
- пошаговая работа `filter` и `map`
- обработчик нажатия в Android
- порядок `companion object`, свойств, `init` и конструкторов при наследовании

В конце лекции — только блок вопросов. Домашнего задания нет.

## Официальные источники

- [Классы](https://kotlinlang.org/docs/classes.html)
- [Свойства](https://kotlinlang.org/docs/properties.html)
- [Видимость](https://kotlinlang.org/docs/visibility-modifiers.html)
- [Наследование](https://kotlinlang.org/docs/inheritance.html)
- [Интерфейсы](https://kotlinlang.org/docs/interfaces.html)
- [Вложенные и inner-классы](https://kotlinlang.org/docs/nested-classes.html)
- [Data-классы](https://kotlinlang.org/docs/data-classes.html)
- [Enum-классы](https://kotlinlang.org/docs/enum-classes.html)
- [Sealed-классы и интерфейсы](https://kotlinlang.org/docs/sealed-classes.html)
- [Object declarations](https://kotlinlang.org/docs/object-declarations.html)
- [Лямбды и функции высшего порядка](https://kotlinlang.org/docs/lambdas.html)
- [Операции с коллекциями](https://kotlinlang.org/docs/collection-operations.html)
