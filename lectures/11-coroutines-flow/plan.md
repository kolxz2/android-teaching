# Лекция 11. Coroutines и Flow

**Блок:** Компоненты и сеть  
**Длительность:** пара 90 мин (теория + живая практика)  
**Ветка / PR:** `lecture-11`  
**Баллы:** 7

## Цель

Асинхронщина без callback-ада; стримы данных через Flow.

## Теория

- Зачем корутины, чем отличаются от потоков
- CoroutineScope, Job, Dispatchers
- Builders: launch, async / await, runBlocking (только для понимания)
- Отмена (cancellation)
- suspend-функции в Retrofit
- Flow: холодный поток, collect
- Операторы: map, filter, catch, onEach
- Связка с UI: lifecycleScope / repeatOnLifecycle (обзор)

## Практика на паре

- Переписать сетевой запрос на корутины
- Простой Flow (таймер или обновление списка)

## Домашнее задание

- Сеть только через suspend + корутины
- Один сценарий на Flow
- PR lecture-11

## Дальше

Лекция 12 — SharedPreferences, DataStore, Room, файлы
