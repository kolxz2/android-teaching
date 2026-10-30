window.DECK = {
  "course": "Android-разработка",
  "lecture": 8,
  "lectureId": "08",
  "slug": "08-room-practice",
  "disableCopy": true,
  "title": "Практика 08. Сохранение операций через Room",
  "block": "Основы Android",
  "teacher": "Сучёв Николай Евгеньевич",
  "teacherMeta": "Android-разработчик · Т-Банк · команда Вовлечение",
  "hub": "index.html",
  "photo": "../../assets/teacher.jpg",
  "slides": [
    {
      "type": "title",
      "title": "Практика 08",
      "subtitle": "Сохраняем операции FinanceApp через Room",
      "kicker": "Пошаговая работа",
      "body": "Стартуем с принятой версии практики 7 в `master`. На каждом шаге: место в проекте, код для ручного ввода, причина и проверка. Копирование отключено.",
      "theory": "Перед началом убедитесь, что практика 7 уже принята и объединена в master. Тогда PR по практике 8 покажет только изменения Room. Код на слайдах вводят вручную; защита от выделения и копирования работает так же, как в практике 7."
    },
    {
      "type": "content",
      "title": "Проблема после лекции 7",
      "body": "`TransactionViewModel` хранит историю только в памяти. Закройте процесс приложения и откройте его снова: список и баланс вернутся к начальным значениям.\n\n**Цель практики:** после перезапуска восстановить операции из локальной базы.",
      "theory": "Попросите студентов сначала воспроизвести потерю данных. Поворот экрана не подходит как доказательство: ViewModel может пережить пересоздание Activity. Нужно завершить процесс приложения или остановить его через настройки устройства. Объясните, что поле состояния экрана и долговременное хранилище решают разные задачи."
    },
    {
      "type": "content",
      "title": "Путь данных после изменений",
      "body": "Экран отправляет событие во `ViewModel`. `ViewModel` проверяет ввод и обращается к репозиторию. Репозиторий вызывает Room DAO, а Room работает с файлом базы.\n\nПри запуске данные проходят обратно: база → DAO → репозиторий → `ViewModel` → экран.",
      "theory": "Пройдите по пути записи и чтения отдельно. Для записи важен порядок: сначала успешная операция в базе, затем изменение видимого состояния. Для чтения ViewModel получает сохранённые операции и восстанавливает тот же баланс, который раньше считала для новой операции."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 1. Создайте рабочую ветку",
      "body": "**Где:** Терминал FinanceApp после принятия практики 7.\n\n**Сделайте:** Обновите `master` и создайте отдельную ветку.\n\n```shell\ngit switch master\ngit pull\ngit switch -c lecture-08\ngit branch --show-current\n```\n\n**Зачем:** PR в `master` должен содержать только работу по Room, а не повторять уже принятую практику 7.\n\n**Проверьте:** Текущая ветка — `lecture-08`; код экрана из практики 7 есть в проекте.",
      "theory": "Практика 7 должна быть объединена в master до создания новой ветки. Попросите студентов проверить, что в master есть TransactionViewModel и TransactionScreen. Если предыдущий PR ещё не принят, не создавайте новый PR с двумя практиками сразу. После обновления master создайте ветку lecture-08 и работайте только в ней."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 2. Зафиксируйте ожидаемое поведение",
      "body": "**Где:** Запущенный FinanceApp и список операций на экране.\n\n**Сделайте:** Добавьте доход и расход, запишите ожидаемый баланс, затем завершите процесс и откройте приложение снова.\n\n**Зачем:** Это исходная проверка: позже тем же сценарием докажем, что данные сохраняются.\n\n**Проверьте:** Сейчас после нового запуска история пуста; вы можете объяснить, почему ViewModel не хранит её постоянно.",
      "theory": "### Что объяснить студентам\nПопросите одного студента предсказать результат до перезапуска. Уточните, что ViewModel сохраняет состояние только в пределах жизни процесса приложения. Room появится как источник данных после нового запуска.\n\n### Контроль шага\nСейчас после нового запуска история пуста; вы можете объяснить, почему ViewModel не хранит её постоянно."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 3. Добавьте версии зависимостей",
      "body": "**Где:** `gradle/libs.versions.toml`, существующий раздел версий.\n\n**Сделайте:** Добавьте отдельные версии для Room и KSP. Ориентир этой практики: Room 2.8.5 и KSP 2.3.12.\n\n```toml\n# gradle/libs.versions.toml → [versions]\nroom = \"2.8.5\"\nksp = \"2.3.12\"\n```\n\n**Зачем:** Каталог версий позволяет менять номера библиотек в одном месте и не дублировать их по файлам Gradle.\n\n**Проверьте:** В файле один раздел версий; Gradle распознаёт новые имена.",
      "theory": "### Что объяснить студентам\nНапомните, что в теоретической лекции 8 есть материал про Room 3, но FinanceApp в этой практике подключает Room 2.8.5. Нельзя смешивать пакеты и зависимости двух поколений. KSP нужен для генерации реализации DAO и базы на этапе сборки.\n\n### Контроль шага\nВ файле один раздел версий; Gradle распознаёт новые имена."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 4. Опишите библиотеки в каталоге",
      "body": "**Где:** `gradle/libs.versions.toml`, раздел библиотек и раздел плагинов.\n\n**Сделайте:** Добавьте alias для `room-runtime`, `room-compiler` и плагина KSP. Свяжите каждый alias с версией из прошлого шага.\n\n```toml\n# [libraries]\nandroidx-room-runtime = { group = \"androidx.room\", name = \"room-runtime\", version.ref = \"room\" }\nandroidx-room-compiler = { group = \"androidx.room\", name = \"room-compiler\", version.ref = \"room\" }\n\n# [plugins]\nksp = { id = \"com.google.devtools.ksp\", version.ref = \"ksp\" }\n```\n\n**Зачем:** Runtime содержит API Room, compiler создаёт реализацию по аннотациям, а плагин KSP запускает обработку Kotlin-кода.\n\n**Проверьте:** IDE видит новые `libs`-alias; существующие зависимости остались на месте.",
      "theory": "### Что объяснить студентам\nРазделите три роли на доске. Runtime нужен приложению во время работы; compiler нужен сборке; KSP подключается как Gradle plugin. Ошибка в одном alias проявится до компиляции Kotlin, во время Gradle Sync.\n\n### Контроль шага\nIDE видит новые `libs`-alias; существующие зависимости остались на месте."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 5. Подключите KSP к сборке",
      "body": "**Где:** Корневой `build.gradle.kts` и `app/build.gradle.kts`.\n\n**Сделайте:** Объявите KSP в корневом файле без применения, затем примените его в модуле `app`.\n\n```kotlin\n// Корневой build.gradle.kts → plugins\nalias(libs.plugins.ksp) apply false\n\n// app/build.gradle.kts → plugins\nalias(libs.plugins.ksp)\n```\n\n**Зачем:** Генерация кода нужна только модулю, где находятся Entity, DAO и Database.\n\n**Проверьте:** Gradle Sync проходит; плагин доступен в модуле приложения.",
      "theory": "### Что объяснить студентам\nСравните `apply false` в корне с применением плагина в app. Корень задаёт версию для проекта, модуль включает работу плагина. Не добавляйте второй блок plugins и не удаляйте существующие Android и Compose плагины.\n\n### Контроль шага\nGradle Sync проходит; плагин доступен в модуле приложения."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 6. Подключите Room к модулю",
      "body": "**Где:** `app/build.gradle.kts`, существующий блок зависимостей.\n\n**Сделайте:** Добавьте Room runtime как зависимость приложения, а Room compiler в конфигурацию KSP. После этого запустите Gradle Sync.\n\n```kotlin\n// app/build.gradle.kts → dependencies\nimplementation(libs.androidx.room.runtime)\nksp(libs.androidx.room.compiler)\n```\n\n**Зачем:** Аннотации без процессора не создадут рабочую реализацию базы; процессор без runtime тоже недостаточен.\n\n**Проверьте:** Импорты Room доступны, а Gradle Sync завершается без ошибки.",
      "theory": "### Что объяснить студентам\nПопросите студентов назвать, какая зависимость нужна во время работы приложения, а какая при сборке. Не переносите compiler в implementation. Если Sync не проходит, сначала проверьте написание alias и доступ к репозиторию Google Maven.\n\n### Контроль шага\nИмпорты Room доступны, а Gradle Sync завершается без ошибки."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 7. Создайте Entity",
      "body": "**Где:** Новый файл `TransactionEntity.kt` в основном пакете FinanceApp.\n\n**Сделайте:** Объявите модель таблицы `transactions`: идентификатор, сумму, тип операции и описание. Отметьте класс аннотацией Entity.\n\n```kotlin\npackage com.example.financeapp\n\nimport androidx.room.Entity\nimport androidx.room.PrimaryKey\n\n@Entity(tableName = \"transactions\")\ninternal data class TransactionEntity(\n    @PrimaryKey(autoGenerate = true) val id: Long = 0,\n    val amount: Int,\n    val type: TransactionType,\n    val description: String,\n) {\n    fun toTransaction(): Transaction =\n        Transaction(amount = amount, type = type, description = description)\n\n    companion object {\n        fun fromTransaction(transaction: Transaction): TransactionEntity =\n            TransactionEntity(\n                amount = transaction.amount,\n                type = transaction.type,\n                description = transaction.description,\n            )\n    }\n}\n```\n\n**Зачем:** Entity описывает одну строку базы, а существующий `Transaction` остаётся моделью экрана и логики.\n\n**Проверьте:** У Entity есть те же данные операции и отдельный идентификатор для порядка записей.",
      "theory": "### Что объяснить студентам\nОбъясните различие между объектом для экрана и строкой базы. Room нужна схема хранения, включая первичный ключ. Существующий Transaction не обязан знать, как именно данные лежат на диске. Это позволяет не переписывать reducer из лекции 7.\n\n### Контроль шага\nУ Entity есть те же данные операции и отдельный идентификатор для порядка записей."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 8. Выберите первичный ключ",
      "body": "**Где:** Поле идентификатора в `TransactionEntity`.\n\n**Сделайте:** Проверьте уже добавленный первичный ключ в TransactionEntity. Не вставляйте эту строку второй раз.\n\n```kotlin\n// Проверьте строку в уже созданной TransactionEntity:\n@PrimaryKey(autoGenerate = true) val id: Long = 0,\n```\n\n**Зачем:** Два расхода могут иметь одинаковые сумму и описание; только отдельный ID надёжно различает записи.\n\n**Проверьте:** При добавлении операции приложение не просит пользователя вводить ID.",
      "theory": "### Что объяснить студентам\nПокажите пример двух одинаковых покупок кофе. Их нельзя склеивать в одну строку. Автоматический ключ нужен также для устойчивой сортировки истории: более поздняя запись получает больший ID.\n\n### Контроль шага\nПри добавлении операции приложение не просит пользователя вводить ID."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 9. Преобразуйте тип операции",
      "body": "**Где:** Новый файл `TransactionTypeConverter.kt`.\n\n**Сделайте:** Создайте два направления преобразования между `TransactionType` и строкой базы. Пометьте методы как TypeConverter.\n\n```kotlin\npackage com.example.financeapp\n\nimport androidx.room.TypeConverter\n\ninternal class TransactionTypeConverter {\n    @TypeConverter\n    fun fromStoredValue(value: String): TransactionType =\n        TransactionType.valueOf(value)\n\n    @TypeConverter\n    fun toStoredValue(type: TransactionType): String = type.name\n}\n```\n\n**Зачем:** SQLite хранит простые значения; Room должна знать, как сохранить enum и восстановить его при чтении.\n\n**Проверьте:** Мысленно проследите: `INCOME` записывается строкой и после чтения снова становится `TransactionType`.",
      "theory": "### Что объяснить студентам\nНе заменяйте enum строкой во всём приложении. Конвертер находится на границе хранения. Обратите внимание студентов на симметрию: запись и чтение должны использовать согласованные значения. Если переименовать enum без миграции, старые строки перестанут читаться.\n\n### Контроль шага\nМысленно проследите: `INCOME` записывается строкой и после чтения снова становится `TransactionType`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 10. Опишите чтение в DAO",
      "body": "**Где:** Новый интерфейс `TransactionDao.kt`.\n\n**Сделайте:** Пометьте интерфейс как DAO и опишите метод чтения всех операций через Query. Задайте сортировку по ID от меньшего к большему.\n\n```kotlin\npackage com.example.financeapp\n\nimport androidx.room.Dao\nimport androidx.room.Insert\nimport androidx.room.Query\n\n@Dao\ninternal interface TransactionDao {\n    @Query(\"SELECT * FROM transactions ORDER BY id ASC\")\n    fun readAll(): List<TransactionEntity>\n}\n```\n\n**Зачем:** DAO отделяет SQL-запрос от ViewModel. Сортировка нужна, чтобы история и расчёт баланса были воспроизводимыми.\n\n**Проверьте:** Метод возвращает список Entity; запрос обращается к таблице `transactions`.",
      "theory": "### Что объяснить студентам\nПокажите, что порядок строк без явной сортировки не гарантирован. Экран лекции 7 показывает список в обратном порядке, поэтому DAO читает старые операции первыми, а UI разворачивает их для показа новых сверху.\n\n### Контроль шага\nМетод возвращает список Entity; запрос обращается к таблице `transactions`."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 11. Опишите запись в DAO",
      "body": "**Где:** Тот же `TransactionDao.kt`.\n\n**Сделайте:** Добавьте метод вставки одной Entity с аннотацией Insert.\n\n```kotlin\n// Добавьте внутри TransactionDao, перед закрывающей скобкой:\n@Insert\nfun insert(transaction: TransactionEntity)\n```\n\n**Зачем:** Room сама создаст команду записи по описанию Entity; ручная сборка SQL для вставки не нужна.\n\n**Проверьте:** DAO содержит отдельные операции чтения и вставки, а ViewModel не видит SQL.",
      "theory": "### Что объяснить студентам\nОбъясните, что аннотация не сохраняет данные сама по себе. Реализацию создаст KSP при сборке. Именно поэтому важно было подключить compiler и плагин до работы с DAO.\n\n### Контроль шага\nDAO содержит отдельные операции чтения и вставки, а ViewModel не видит SQL."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 12. Объявите базу Room",
      "body": "**Где:** Новый файл `TransactionDatabase.kt`.\n\n**Сделайте:** Создайте абстрактный класс от RoomDatabase. Укажите Entity, версию схемы 1 и конвертер. Предоставьте метод получения DAO.\n\n```kotlin\npackage com.example.financeapp\n\nimport android.content.Context\nimport androidx.room.Database\nimport androidx.room.Room\nimport androidx.room.RoomDatabase\nimport androidx.room.TypeConverters\n\nprivate const val DATABASE_NAME = \"finance.db\"\n\n@Database(entities = [TransactionEntity::class], version = 1,\n    exportSchema = false)\n@TypeConverters(TransactionTypeConverter::class)\ninternal abstract class TransactionDatabase : RoomDatabase() {\n    abstract fun transactionDao(): TransactionDao\n}\n```\n\n**Зачем:** Database связывает таблицу, преобразования типов и операции чтения и записи в одну схему.\n\n**Проверьте:** Аннотации ссылаются на созданные классы; IDE больше не показывает неразрешённых имён.",
      "theory": "### Что объяснить студентам\nНа этом шаге полезно нарисовать три связи: Database знает Entity и TypeConverter, а метод Database отдаёт DAO. Версия схемы равна 1, поскольку это первая база проекта после лекции 7. Не включайте удаление старых данных при обновлении версии.\n\n### Контроль шага\nАннотации ссылаются на созданные классы; IDE больше не показывает неразрешённых имён."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 13. Создайте экземпляр базы",
      "body": "**Где:** Тот же `TransactionDatabase.kt`, место создания базы.\n\n**Сделайте:** Используйте application context и имя файла базы. Получите базу через Room builder; не разрешайте запросы на главном потоке.\n\n```kotlin\n// Добавьте внутри TransactionDatabase:\ncompanion object {\n    fun open(context: Context, name: String = DATABASE_NAME):\n        TransactionDatabase = Room.databaseBuilder(\n            context.applicationContext,\n            TransactionDatabase::class.java,\n            name,\n        ).build()\n}\n```\n\n**Зачем:** Контекст Activity может исчезнуть после поворота экрана, а база живёт дольше. Операции с диском могут задержать интерфейс.\n\n**Проверьте:** Создание базы не меняет экран; приложение продолжает собираться.",
      "theory": "### Что объяснить студентам\nПокажите разницу между объявлением абстрактной схемы и получением рабочего экземпляра. Room создаёт реализацию при сборке, builder открывает её во время работы. Application context снижает риск удержания Activity в памяти.\n\n### Контроль шага\nСоздание базы не меняет экран; приложение продолжает собираться."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 14. Проверьте слой Room отдельно",
      "body": "**Где:** Entity, Converter, DAO и Database; затем сборка проекта.\n\n**Сделайте:** Соберите debug-версию до изменения ViewModel. Исправьте ошибки аннотаций, типов и зависимостей на этом этапе.\n\n```shell\n.\\gradlew.bat assembleDebug\n```\n\n**Зачем:** Маленькая проверка локализует проблему: если сборка ломается сейчас, виноват слой базы, а не экран.\n\n**Проверьте:** KSP завершился; у Room нет ошибок про первичный ключ, конвертер или запрос DAO.",
      "theory": "### Что объяснить студентам\nОбъясните студентам типичные сообщения: Room не знает тип поля, Query ссылается на неверное имя таблицы, Entity не имеет первичного ключа. После исправления повторите сборку, прежде чем идти дальше.\n\n### Контроль шага\nKSP завершился; у Room нет ошибок про первичный ключ, конвертер или запрос DAO."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 15. Добавьте репозиторий",
      "body": "**Где:** Новый файл `TransactionRepository.kt`.\n\n**Сделайте:** Передайте репозиторию контекст приложения. Внутри получите базу и DAO; предусмотрите методы загрузки, сохранения и закрытия ресурсов.\n\n```kotlin\npackage com.example.financeapp\n\nimport android.content.Context\nimport android.database.sqlite.SQLiteException\nimport android.os.Handler\nimport android.os.Looper\nimport android.util.Log\nimport java.util.concurrent.Executors\n\nprivate const val DATABASE_LOG_TAG = \"TransactionDatabase\"\n\ninternal class TransactionRepository(context: Context) {\n    private val database = TransactionDatabase.open(context)\n    private val dao = database.transactionDao()\n    private val executor = Executors.newSingleThreadExecutor()\n    private val mainHandler = Handler(Looper.getMainLooper())\n}\n```\n\n**Зачем:** Репозиторий прячет детали Room от ViewModel, поэтому старые методы проверки ввода и расчёта баланса почти не меняются.\n\n**Проверьте:** ViewModel сможет обращаться к репозиторию без прямого вызова DAO.",
      "theory": "### Что объяснить студентам\nПодчеркните учебную цель: на лекции 7 reducer уже работает. Мы не переписываем его ради хранения данных. Новый файл берёт на себя подключение к Room и работу с потоками, оставляя ViewModel координатором экрана.\n\n### Контроль шага\nViewModel сможет обращаться к репозиторию без прямого вызова DAO."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 16. Вынесите чтение из главного потока",
      "body": "**Где:** Метод загрузки в `TransactionRepository`.\n\n**Сделайте:** Запускайте чтение DAO в отдельном потоке, преобразуйте Entity в обычные Transaction и передайте результат обратно в главный поток.\n\n```kotlin\n// Добавьте внутри TransactionRepository:\nfun load(onResult: (List<Transaction>?) -> Unit) {\n    executor.execute {\n        val transactions = try {\n            dao.readAll().map(TransactionEntity::toTransaction)\n        } catch (error: SQLiteException) {\n            Log.e(DATABASE_LOG_TAG, \"Could not load transactions\", error)\n            null\n        } catch (error: IllegalStateException) {\n            Log.e(DATABASE_LOG_TAG, \"Could not load transactions\", error)\n            null\n        }\n        mainHandler.post { onResult(transactions) }\n    }\n}\n```\n\n**Зачем:** Работа с диском не должна останавливать ввод и отрисовку. Compose-состояние меняйте в главном потоке.\n\n**Проверьте:** Метод возвращает список операций, а не объекты Entity; приложение не зависает при чтении.",
      "theory": "### Что объяснить студентам\nПошагово проследите поток: фоновый исполнитель → DAO → список Entity → преобразование → callback на главном потоке. Укажите, что Room по умолчанию запрещает синхронный запрос DAO на главном потоке. На этой практике используется один последовательный исполнитель, а корутины будут позже в курсе.\n\n### Контроль шага\nМетод возвращает список операций, а не объекты Entity; приложение не зависает при чтении."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 17. Вынесите запись из главного потока",
      "body": "**Где:** Метод сохранения в `TransactionRepository`.\n\n**Сделайте:** Преобразуйте Transaction в Entity, вставьте её через DAO в том же фоновом исполнителе и сообщите результат в главный поток.\n\n```kotlin\n// Добавьте внутри TransactionRepository:\nfun save(transaction: Transaction, onResult: (Boolean) -> Unit) {\n    executor.execute {\n        val saved = try {\n            dao.insert(TransactionEntity.fromTransaction(transaction))\n            true\n        } catch (error: SQLiteException) {\n            Log.e(DATABASE_LOG_TAG, \"Could not save transaction\", error)\n            false\n        } catch (error: IllegalStateException) {\n            Log.e(DATABASE_LOG_TAG, \"Could not save transaction\", error)\n            false\n        }\n        mainHandler.post { onResult(saved) }\n    }\n}\n```\n\n**Зачем:** Экран должен считать операцию добавленной только после успешной записи в базу.\n\n**Проверьте:** Метод сообщает успех или ошибку; он не меняет `MainUiState` самостоятельно.",
      "theory": "### Что объяснить студентам\nСравните два порядка действий. Если сначала изменить UI, а запись не удастся, экран покажет несуществующую в базе операцию. Поэтому callback об успехе приходит после вставки. Отдельный поток также сохраняет порядок нескольких запросов.\n\n### Контроль шага\nМетод сообщает успех или ошибку; он не меняет `MainUiState` самостоятельно."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 18. Обработайте ошибку и закрытие",
      "body": "**Где:** `TransactionRepository`, загрузка, сохранение и завершение работы.\n\n**Сделайте:** При ошибке чтения или записи верните неуспех, запишите причину в Logcat. При очистке ViewModel закройте базу после завершения уже поставленных задач.\n\n```kotlin\n// Добавьте внутри TransactionRepository:\nfun close() {\n    executor.execute(database::close)\n    executor.shutdown()\n}\n```\n\n**Зачем:** Сбой диска не должен завершать приложение и не должен стирать введённую пользователем форму.\n\n**Проверьте:** При ошибке экран может показать сообщение; после неудачной записи описание и сумма остаются на месте.",
      "theory": "### Что объяснить студентам\nНе скрывайте исключение молча: в Logcat должна остаться причина. Не закрывайте базу раньше фоновой записи. Исполнитель позволяет выполнить уже поставленные задачи по порядку, затем закрыть базу.\n\n### Контроль шага\nПри ошибке экран может показать сообщение; после неудачной записи описание и сумма остаются на месте."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 19. Добавьте состояния загрузки",
      "body": "**Где:** `MainUiState.kt`.\n\n**Сделайте:** Добавьте признаки загрузки, сохранения и готовности базы; расширьте тип ошибки вариантом ошибки базы.\n\n```kotlin\n// MainUiState: добавьте поля в существующий data class\nval isLoading: Boolean = true,\nval isSaving: Boolean = false,\nval isDatabaseReady: Boolean = false,\n\n// TransactionError: добавьте ещё один вариант\nDATABASE_ERROR\n```\n\n**Зачем:** Экрану нужно знать, когда разрешать ввод и когда показывать проблему. Эти признаки относятся к UI, а не к строке таблицы.\n\n**Проверьте:** До завершения первого чтения форма недоступна; ошибка базы может быть отображена отдельно от ошибки суммы.",
      "theory": "### Что объяснить студентам\nОбсудите значения по умолчанию. До ответа базы загрузка идёт, сохранение не идёт, готовности нет. Признаки остаются в MainUiState, потому что Compose уже читает один снимок состояния. Данные формы и список операций при этом сохраняют прежние типы.\n\n### Контроль шага\nДо завершения первого чтения форма недоступна; ошибка базы может быть отображена отдельно от ошибки суммы."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 20. Подключите репозиторий к ViewModel",
      "body": "**Где:** Начало `TransactionViewModel.kt`.\n\n**Сделайте:** Дайте ViewModel доступ к application context, создайте репозиторий и запустите загрузку при создании ViewModel.\n\n```kotlin\n// TransactionViewModel.kt: замените объявление класса\nimport android.app.Application\nimport androidx.lifecycle.AndroidViewModel\n\ninternal class TransactionViewModel(application: Application) :\n    AndroidViewModel(application) {\n    private val repository = TransactionRepository(application)\n\n    var uiState by mutableStateOf(MainUiState())\n        private set\n\n    // addTransaction и reduce оставьте из лекции 7\n}\n```\n\n**Зачем:** При запуске экрана нужно вернуть сохранённую историю. Контекст берётся у приложения, а не у composable-функции.\n\n**Проверьте:** После загрузки ViewModel получает список Transaction; `addTransaction` ещё не переписан.",
      "theory": "### Что объяснить студентам\nСравните старое объявление ViewModel с новым. Изменение конструктора нужно только для доступа к application context. Поля формы, проверка ввода и reducer остаются знакомыми студентам. Не переносите работу с базой в Activity или TransactionScreen.\n\n### Контроль шага\nПосле загрузки ViewModel получает список Transaction; `addTransaction` ещё не переписан."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 21. Восстановите состояние через reducer",
      "body": "**Где:** Обработчик результата загрузки в `TransactionViewModel.kt`.\n\n**Сделайте:** Последовательно примените к пустому состоянию сохранённые операции как события добавления. После чтения отметьте базу готовой.\n\n```kotlin\n// Добавьте внутри TransactionViewModel:\ninit {\n    repository.load { transactions ->\n        uiState = if (transactions == null) {\n            uiState.copy(\n                isLoading = false,\n                error = TransactionError.DATABASE_ERROR,\n            )\n        } else {\n            transactions.fold(\n                MainUiState(isLoading = false, isDatabaseReady = true),\n            ) { state, transaction ->\n                reduce(state, MainUiEvent.AddTransaction(transaction))\n            }\n        }\n    }\n}\n```\n\n**Зачем:** Так баланс и число операций считаются тем же правилом, которое уже работало в лекции 7; отдельную формулу поддерживать не нужно.\n\n**Проверьте:** После перезапуска история, баланс и счётчик совпадают с состоянием до закрытия процесса.",
      "theory": "### Что объяснить студентам\nРаскройте идею свёртки списка: первая операция меняет нулевое состояние, вторая меняет результат первой и так далее. Reducer из лекции 7 повторно используется без переписывания. Если чтение не удалось, состояние загрузки завершается и показывается ошибка вместо пустой истории как будто данных не было.\n\n### Контроль шага\nПосле перезапуска история, баланс и счётчик совпадают с состоянием до закрытия процесса."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 22. Сохраняйте событие AddTransaction",
      "body": "**Где:** Метод `onEvent` в `TransactionViewModel.kt`.\n\n**Сделайте:** Для события добавления сначала получите следующее состояние через старый reducer. Если операция допустима, передайте её репозиторию и примените новое состояние только после успешной записи.\n\n```kotlin\n// Замените только onEvent; addTransaction и reduce не меняйте:\nfun onEvent(event: MainUiEvent) {\n    if (!uiState.isDatabaseReady || uiState.isSaving) return\n    if (event is MainUiEvent.AddTransaction) {\n        val nextState = reduce(uiState, event)\n        if (nextState.error != null) {\n            uiState = nextState\n            return\n        }\n        uiState = uiState.copy(isSaving = true)\n        repository.save(event.transaction) { saved ->\n            uiState = if (saved) nextState else uiState.copy(\n                isSaving = false,\n                error = TransactionError.DATABASE_ERROR,\n            )\n        }\n    } else {\n        uiState = reduce(uiState, event)\n    }\n}\n```\n\n**Зачем:** Проверка суммы и баланса остаётся прежней; база не получает операцию, которую reducer отверг.\n\n**Проверьте:** `addTransaction` и тело `reduce` почти не меняются; запись вызывается только для допустимой операции.",
      "theory": "### Что объяснить студентам\nПройдите два пути: неверный ввод сразу даёт прежнюю ошибку; верный ввод сначала проходит reducer, затем сохранение. Это точка, где логика лекции 7 соединяется с Room. Проследите, что быстрые повторные нажатия запрещены на время записи.\n\n### Контроль шага\n`addTransaction` и тело `reduce` почти не меняются; запись вызывается только для допустимой операции."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 23. Сохраните форму при неудачной записи",
      "body": "**Где:** Callback сохранения в `TransactionViewModel.kt`.\n\n**Сделайте:** Проверьте обработку результата в onEvent; этот фрагмент уже был в шаге 22. Добавьте только onCleared.\n\n```kotlin\n// Проверьте ветку результата в уже обновлённом onEvent:\nuiState = if (saved) nextState else uiState.copy(\n    isSaving = false,\n    error = TransactionError.DATABASE_ERROR,\n)\n\n// Добавьте завершение жизненного цикла ViewModel:\noverride fun onCleared() {\n    repository.close()\n    super.onCleared()\n}\n```\n\n**Зачем:** Пользователь сможет повторить действие, не набирая данные заново; история не покажет запись, которой нет в базе.\n\n**Проверьте:** Смоделируйте оба исхода словами и назовите поля, которые меняются в каждом случае.",
      "theory": "### Что объяснить студентам\nПопросите студентов ответить: почему нельзя очищать форму до ответа репозитория? После неудачной вставки в базе нет строки. Если очистить форму и увеличить баланс заранее, экран и база разойдутся.\n\n### Контроль шага\nСмоделируйте оба исхода словами и назовите поля, которые меняются в каждом случае."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 24. Обновите экран",
      "body": "**Где:** `TransactionScreen.kt`.\n\n**Сделайте:** Покажите состояние загрузки и запретите редактирование формы, выбор типа и кнопку во время загрузки или сохранения. Добавьте отображение ошибки базы.\n\n```kotlin\n// TransactionScreen: после заголовка и баланса\nif (state.isLoading) {\n    Text(stringResource(R.string.transaction_loading))\n}\n\n// У двух OutlinedTextField, двух FilterChip и Button:\nenabled = state.isDatabaseReady && !state.isSaving,\n\n// В существующий when для state.error:\nTransactionError.DATABASE_ERROR ->\n    R.string.transaction_database_error\n```\n\n**Зачем:** Студент видит, что приложение занято, и не может отправить одинаковую операцию дважды.\n\n**Проверьте:** Во время ожидания элементы недоступны; после успешной загрузки они снова работают.",
      "theory": "### Что объяснить студентам\nЭто единственное нужное изменение Compose-экрана. История уже отображает список из MainUiState, поэтому отдельный экран базы не нужен. При ошибке загрузки форма остаётся недоступной, поскольку приложение не знает текущее содержимое базы.\n\n### Контроль шага\nВо время ожидания элементы недоступны; после успешной загрузки они снова работают."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 25. Добавьте строки интерфейса",
      "body": "**Где:** `app/src/main/res/values/strings.xml`.\n\n**Сделайте:** Добавьте короткий текст загрузки и понятное сообщение об ошибке чтения или сохранения операций.\n\n```xml\n<!-- strings.xml: добавьте внутрь resources -->\n<string name=\"transaction_loading\">Загрузка операций…</string>\n<string name=\"transaction_database_error\">\n    Не удалось прочитать или сохранить операции\n</string>\n```\n\n**Зачем:** Тексты интерфейса хранятся в ресурсах, как остальные подписи FinanceApp; экран выбирает их по состоянию.\n\n**Проверьте:** Новый текст виден при загрузке или ошибке, существующие подписи не изменились.",
      "theory": "### Что объяснить студентам\nОтделите техническую запись для Logcat от сообщения пользователю. Пользователю не нужно видеть название исключения или путь к файлу базы. Ему важно знать, что операция не была сохранена, и что форму можно повторно отправить.\n\n### Контроль шага\nНовый текст виден при загрузке или ошибке, существующие подписи не изменились."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 26. Проверьте сохранение руками",
      "body": "**Где:** Запущенный FinanceApp в эмуляторе Android Studio.\n\n**Сделайте:** Добавьте доход 500 ₽ и расход 120 ₽. Откройте настройки эмулятора, найдите FinanceApp в списке приложений и нажмите «Остановить». Затем запустите приложение снова с иконки.\n\n**Зачем:** Остановка процесса проверяет сохранение на диске; простое закрытие экрана не доказывает, что база работает.\n\n**Проверьте:** После нового запуска в истории две операции, баланс 380 ₽, счётчик равен двум.",
      "theory": "Проводите проверку через интерфейс эмулятора, без терминала и adb. Путь в настройках может немного отличаться по версии Android: откройте сведения о приложении FinanceApp и используйте действие «Остановить». После повторного запуска дождитесь чтения базы. Поворот экрана или уход на домашний экран может сохранить процесс и не проверяет постоянное хранение."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 27. Посмотрите таблицу в инспекторе",
      "body": "**Где:** Android Studio → App Inspection → Database Inspector; эмулятор с API 26 или выше.\n\n**Сделайте:** Выберите запущенный процесс FinanceApp, откройте файл базы и таблицу `transactions`. Сравните две строки с историей экрана.\n\n**Зачем:** Инспектор показывает физические данные и помогает отделить ошибку записи от ошибки отображения.\n\n**Проверьте:** В таблице две строки с разными ID; тип, сумма и описание совпадают с действиями на экране.",
      "theory": "### Что объяснить студентам\nПокажите, что ID не вводился пользователем. Если таблица заполнена, а экран пуст, ищите проблему в чтении и состоянии UI. Если таблица пуста, ищите проблему в сохранении. Инспектор полезен как независимый источник фактов о базе.\n\n### Контроль шага\nВ таблице две строки с разными ID; тип, сумма и описание совпадают с действиями на экране.\n\nDatabase Inspector работает с работающим приложением на эмуляторе API 26+. Если таблица не обновилась, используйте обновление данных в инспекторе.\n\nИсточник: https://developer.android.com/studio/inspect/database"
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 28. Проверьте проект перед отправкой",
      "body": "**Где:** Терминал в корне FinanceApp.\n\n**Сделайте:** Запустите проверки из README проекта и исправьте найденные ошибки.\n\n```shell\n.\\gradlew.bat detekt testDebugUnitTest lintDebug assembleDebug\n```\n\n**Зачем:** GitHub выполнит те же проверки в PR. Ошибки удобнее исправить до отправки ветки.\n\n**Проверьте:** Все задачи завершились успешно; приложение работает в эмуляторе после перезапуска.",
      "theory": "Назовите назначение каждой задачи: Detekt проверяет стиль и потенциальные проблемы, unit-тесты проверяют логику, Lint проверяет Android-проект, assembleDebug собирает APK. Если проверка упала, исправляйте первую содержательную ошибку в журнале, а не повторяйте команду вслепую."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 29. Отправьте ветку в GitHub",
      "body": "**Где:** Терминал в корне FinanceApp.\n\n**Сделайте:** Проверьте список изменённых файлов, создайте коммит и отправьте учебную ветку.\n\n```shell\ngit status\ngit add build.gradle.kts app/build.gradle.kts gradle/libs.versions.toml app/src/main\ngit commit -m \"Практика 8: сохранение операций через Room\"\ngit push -u origin lecture-08\n```\n\n**Зачем:** PR создаётся из отправленной ветки; прямой push в `master` запрещён.\n\n**Проверьте:** GitHub показывает ветку `lecture-08` и новый коммит.",
      "theory": "Перед git add попросите студентов просмотреть git status: в коммите должны быть только файлы этой практики. Команда перечисляет Gradle-файлы и основной код приложения. Если студент менял другие файлы по заданию, добавьте их осознанно. Detekt может повторно запуститься локальным pre-push hook. Не выполняйте push в master."
    },
    {
      "type": "content",
      "layout": "code-focus",
      "badge": "Практика",
      "title": "Шаг 30. Откройте Pull Request",
      "body": "**Где:** Репозиторий FinanceApp на GitHub, вкладка **Pull requests**.\n\n**Сделайте:** Нажмите **New pull request** или **Compare & pull request**. Выберите `base: master` и `compare: lecture-08`. Просмотрите **Files changed**, добавьте название и описание проверки, назначьте `kolxz2` в **Reviewers**, затем нажмите **Create pull request**.\n\n**Зачем:** преподаватель видит только изменения практики 8, а GitHub запускает автоматические проверки.\n\n**Проверьте:** PR открыт; в нём нет повторных изменений практики 7, проверки запущены.",
      "theory": "Попросите студентов перед нажатием Create pull request проверить base и compare, список коммитов и Files changed. Если в PR попала практика 7, остановитесь и сначала разберите историю веток; не отправляйте смешанный PR. В описании достаточно написать: что добавлено через Room, как проверено в эмуляторе и что видно в Database Inspector. Назначение reviewer возможно после предоставления преподавателю доступа к репозиторию. После замечаний исправляйте ту же ветку и обычным push обновляйте существующий PR.\n\nИсточник: https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request"
    },
    {
      "type": "content",
      "title": "Частые ошибки при повторении",
      "body": "**Room не собирается:** проверьте KSP, compiler и первичный ключ Entity.\n\n**Главный поток:** запрос DAO должен выполняться в репозитории, а обновление `uiState` — после возврата в главный поток.\n\n**История пустая:** проверьте имя базы, сортировку DAO и загрузку при создании ViewModel.\n\n**Баланс меняется до записи:** перенесите обновление состояния на успешный результат репозитория.",
      "theory": "Разберите ошибки по этапам. Gradle Sync проверяет зависимости, сборка проверяет аннотации Room, ручной сценарий проверяет связь слоёв, Database Inspector показывает фактические строки. Не советуйте удалять приложение при первой ошибке: это уничтожит данные и скроет причину."
    },
    {
      "type": "content",
      "title": "Готовность практики 8",
      "body": "Операции остаются после остановки приложения в эмуляторе. Баланс и счётчик восстанавливаются из Room. Database Inspector показывает сохранённые строки. Проверки проекта прошли.\n\n**Сдача:** ветка отправлена, PR из `lecture-08` в `master` открыт, преподаватель `kolxz2` назначен reviewer.",
      "theory": "Завершите занятие проверкой результата в эмуляторе и открытого PR. Если GitHub сообщает об ошибке проверки, студент исправляет код в той же ветке и отправляет новый коммит; новый PR создавать не нужно. Практика считается представленной на проверку после открытия PR, а не после локального коммита."
    }
  ]
};
