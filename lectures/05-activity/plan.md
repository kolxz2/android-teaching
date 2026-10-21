# Лекция 05. Подходы к вёрстке: XML и Jetpack Compose. Императивный и декларативный UI

**Блок:** Основы Android  
**Длительность:** пара 90 мин (теория + живая практика)  
**Ветка / PR:** `lecture-05`  

## Цель

Понимать исторический контекст и архитектурные различия между XML-вёрсткой (View-based) и Jetpack Compose, уметь сравнивать императивный и декларативный подходы к созданию UI.

## Теория

- Эволюция вёрстки в Android: от XML + View к Jetpack Compose
- XML-подход: View, ViewGroup, layout-файлы, findViewById и ViewBinding
- Императивный UI: пошаговое изменение состояния компонентов и проблема рассинхронизации UI и данных
- Декларативный UI в Jetpack Compose: UI как функция от состояния (UI = f(State))
- Сравнение парадигм: Императивный (мутация View) vs Декларативный (рекомпозиция)
- Однонаправленный поток данных (UDF) и Single Source of Truth
- Разбор сквозного примера: один и тот же экран на XML и на Compose

## Практика на паре

- Сравнение реализации экрана формы на XML (layout + ViewBinding) и Jetpack Compose
- Переписывание императивной логики обновления UI в декларативные composable-функции
- Управление состоянием и обработка событий с помощью UDF

## Домашнее задание

- Реализовать интерактивный экран на Jetpack Compose
- В README добавить сопоставление подходов XML и Compose (плюсы, минусы, почему индустрия выбрала Compose)
- PR lecture-05

## Материалы и ссылки

- [Официальная документация Jetpack Compose](https://developer.android.com/develop/ui/compose)
- [Thinking in Compose (Ментальная модель Compose)](https://developer.android.com/develop/ui/compose/mental-model)
- [Руководство Google по архитектуре UI (UDF)](https://developer.android.com/topic/architecture/ui-layer#udf)
- [Управление состоянием в Jetpack Compose](https://developer.android.com/develop/ui/compose/state)
- [Стабильность типов и Smart Skipping](https://developer.android.com/develop/ui/compose/performance/stability)
- [Архитектура классической View-системы Android](https://developer.android.com/reference/android/view/View)
- [Руководство по ViewBinding](https://developer.android.com/topic/libraries/view-binding)
- [Интероперабельность Compose и View](https://developer.android.com/develop/ui/compose/interop/interop-apis)

## Дальше

Лекция 6 — Jetpack Compose: layout, Material 3 и тема

