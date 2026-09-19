const md = (...lines) => lines.join("\n");

const testBlock = (tests) => md(
  "**Тестовые данные для проверки:**",
  ...tests.map((test, index) => (index + 1) + ". Вход: `" + test.input + "` → Выход: `" + test.output + "`")
);

const lectureTasks = [
  {
    name: "Приветствие без null",
    body: md(
      "Напишите функцию `greeting(name: String?): String`. Она возвращает приветствие с именем в верхнем регистре. Если имя равно `null`, вместо него используется `Гость`. Не применяйте `!!`.",
      "",
      "Примеры: `greeting(\"Маша\")` → `Привет, МАША`; `greeting(null)` → `Привет, Гость`.",
      "",
      testBlock([
        { input: `greeting("Маша")`, output: `Привет, МАША` },
        { input: `greeting(null)`, output: `Привет, Гость` },
        { input: `greeting("иван")`, output: `Привет, ИВАН` },
        { input: `greeting("")`, output: `Привет, ` },
        { input: `greeting("Анна Петрова")`, output: `Привет, АННА ПЕТРОВА` }
      ])
    ),
    hint: "Сначала вызовите `uppercase()` через `?.`, затем задайте запасное значение оператором `?:`.",
    solution: md(
      "```kotlin",
      "fun greeting(name: String?): String {",
      "    val displayName = name?.uppercase() ?: \"Гость\"",
      "    return \"Привет, $displayName\"",
      "}",
      "```"
    )
  },
  {
    name: "FizzBuzz",
    body: md(
      "Напишите функцию `fizzBuzz(): List<String>`, которая для чисел от 1 до 20 возвращает `FizzBuzz`, если число делится на 3 и 5, `Fizz` — только на 3, `Buzz` — только на 5, иначе строку с самим числом.",
      "",
      "Примеры: для 9 — `Fizz`, для 10 — `Buzz`, для 15 — `FizzBuzz`.",
      "",
      testBlock([
        { input: `3`, output: `Fizz` },
        { input: `5`, output: `Buzz` },
        { input: `15`, output: `FizzBuzz` },
        { input: `7`, output: `7` },
        { input: `20`, output: `Buzz` }
      ])
    ),
    hint: "В `when` сначала проверяйте делимость на 15. Если начать с 3, число 15 попадёт не в ту ветку.",
    solution: md(
      "```kotlin",
      "fun fizzBuzz(): List<String> {",
      "    val result = mutableListOf<String>()",
      "    for (number in 1..20) {",
      "        result.add(when {",
      "            number % 15 == 0 -> \"FizzBuzz\"",
      "            number % 3 == 0 -> \"Fizz\"",
      "            number % 5 == 0 -> \"Buzz\"",
      "            else -> number.toString()",
      "        })",
      "    }",
      "    return result",
      "}",
      "```"
    )
  },
  {
    name: "Список оценок",
    body: md(
      "Создайте список оценок `5, 4, 3, 5`. Напишите функцию `printGrades(grades: List<Int>)`, которая печатает количество оценок, первую оценку и затем каждую оценку с новой строки. Для пустого списка вместо первой оценки напечатайте `Нет оценок`.",
      "",
      "Для списка из условия первые две строки вывода: `4` и `5`.",
      "",
      testBlock([
        { input: `listOf(5, 4, 3, 5)`, output: `4; 5; 5, 4, 3, 5` },
        { input: `listOf(2)`, output: `1; 2; 2` },
        { input: `emptyList<Int>()`, output: `0; Нет оценок; пустой цикл` },
        { input: `listOf(3, 3, 4)`, output: `3; 3; 3, 3, 4` },
        { input: `listOf(1, 2, 3, 4, 5)`, output: `5; 1; 1, 2, 3, 4, 5` }
      ])
    ),
    hint: "Используйте `size`, `firstOrNull()` и обычный цикл `for`. Пустой список обработайте через `?:`.",
    solution: md(
      "```kotlin",
      "fun printGrades(grades: List<Int>) {",
      "    println(grades.size)",
      "    println(grades.firstOrNull() ?: \"Нет оценок\")",
      "    for (grade in grades) println(grade)",
      "}",
      "",
      "printGrades(listOf(5, 4, 3, 5))",
      "```"
    )
  },
  {
    name: "Обработка оценок",
    body: md(
      "Напишите функцию `passedGrades(grades: List<Int>): List<String>`. Оставьте оценки не ниже 3, отсортируйте их по убыванию и превратите каждую в строку вида `Оценка: 5`.",
      "",
      "Пример: `[5, 2, 4, 3, 5]` → `[Оценка: 5, Оценка: 5, Оценка: 4, Оценка: 3]`.",
      "",
      testBlock([
        { input: `[5, 2, 4, 3, 5]`, output: `[Оценка: 5, Оценка: 5, Оценка: 4, Оценка: 3]` },
        { input: `[2, 1]`, output: `[]` },
        { input: `[3]`, output: `[Оценка: 3]` },
        { input: `[4, 5, 2]`, output: `[Оценка: 5, Оценка: 4]` },
        { input: `[]`, output: `[]` }
      ])
    ),
    hint: "Соберите цепочку из `filter`, `sortedDescending` и `map`. Исходный список менять не нужно.",
    solution: md(
      "```kotlin",
      "fun passedGrades(grades: List<Int>): List<String> = grades",
      "    .filter { it >= 3 }",
      "    .sortedDescending()",
      "    .map { \"Оценка: $it\" }",
      "```"
    )
  }
];

const leetCodeTasks = [
  {
    name: "Накопленная сумма · LeetCode 1480",
    url: "https://leetcode.com/problems/running-sum-of-1d-array/",
    body: md(
      "Дан массив целых чисел `nums`. Верните новый массив, в котором элемент с индексом `i` равен сумме всех элементов исходного массива от индекса 0 до `i` включительно.",
      "",
      "Пример: `[1, 2, 3, 4]` → `[1, 3, 6, 10]`.",
      "",
      "Сигнатура: `fun runningSum(nums: IntArray): IntArray`.",
      "",
      testBlock([
        { input: `[1, 2, 3, 4]`, output: `[1, 3, 6, 10]` },
        { input: `[1, 1, 1, 1, 1]`, output: `[1, 2, 3, 4, 5]` },
        { input: `[3, 1, 2, 10, 1]`, output: `[3, 4, 6, 16, 17]` },
        { input: `[-1, 2, -3]`, output: `[-1, 1, -2]` },
        { input: `[5]`, output: `[5]` }
      ])
    ),
    hint: "Храните текущую сумму в одной переменной. Проходите массив слева направо и записывайте сумму в ответ.",
    solution: md(
      "```kotlin",
      "class Solution {",
      "  fun runningSum(nums: IntArray): IntArray {",
      "    val result = IntArray(nums.size)",
      "    var sum = 0",
      "    for (i in nums.indices) {",
      "        sum += nums[i]",
      "        result[i] = sum",
      "    }",
      "    return result",
      "  }",
      "}",
      "```"
    )
  },
  {
    name: "Сумма двух чисел · LeetCode 1",
    url: "https://leetcode.com/problems/two-sum/",
    body: md(
      "Дан массив целых чисел `nums` и число `target`. Верните индексы двух разных элементов, сумма которых равна `target`. Гарантируется, что решение ровно одно. Порядок индексов не важен.",
      "",
      "Пример: `nums = [2, 7, 11, 15]`, `target = 9` → `[0, 1]`.",
      "",
      "Сигнатура: `fun twoSum(nums: IntArray, target: Int): IntArray`.",
      "",
      testBlock([
        { input: `nums=[2,7,11,15], target=9`, output: `[0, 1]` },
        { input: `nums=[3,2,4], target=6`, output: `[1, 2]` },
        { input: `nums=[3,3], target=6`, output: `[0, 1]` },
        { input: `nums=[-1,-2,-3,-4,-5], target=-8`, output: `[2, 4]` },
        { input: `nums=[0,4,3,0], target=0`, output: `[0, 3]` }
      ])
    ),
    hint: "Для текущего числа ищите дополнение `target - число` среди ранее встреченных. В `Map` храните число и его индекс.",
    solution: md(
      "```kotlin",
      "class Solution {",
      "  fun twoSum(nums: IntArray, target: Int): IntArray {",
      "    val indexByNumber = mutableMapOf<Int, Int>()",
      "    for (i in nums.indices) {",
      "        val previous = indexByNumber[target - nums[i]]",
      "        if (previous != null) return intArrayOf(previous, i)",
      "        indexByNumber[nums[i]] = i",
      "    }",
      "    error(\"По условию пара существует\")",
      "  }",
      "}",
      "```"
    )
  },
  {
    name: "Анаграмма · LeetCode 242",
    url: "https://leetcode.com/problems/valid-anagram/",
    body: md(
      "Даны две строки из строчных английских букв. Верните `true`, если вторую можно получить перестановкой букв первой, используя каждую букву столько же раз; иначе верните `false`.",
      "",
      "Примеры: `anagram` и `nagaram` → `true`; `rat` и `car` → `false`.",
      "",
      "Сигнатура: `fun isAnagram(s: String, t: String): Boolean`.",
      "",
      testBlock([
        { input: `s="anagram", t="nagaram"`, output: `true` },
        { input: `s="rat", t="car"`, output: `false` },
        { input: `s="listen", t="silent"`, output: `true` },
        { input: `s="aacc", t="ccac"`, output: `false` },
        { input: `s="", t=""`, output: `true` }
      ])
    ),
    hint: "Проверьте длины. Затем в `MutableMap<Char, Int>` посчитайте буквы первой строки и вычтите буквы второй.",
    solution: md(
      "```kotlin",
      "class Solution {",
      "  fun isAnagram(s: String, t: String): Boolean {",
      "    if (s.length != t.length) return false",
      "    val counts = mutableMapOf<Char, Int>()",
      "    for (char in s) counts[char] = counts.getOrDefault(char, 0) + 1",
      "    for (char in t) {",
      "        val count = counts[char] ?: return false",
      "        if (count == 1) counts.remove(char)",
      "        else counts[char] = count - 1",
      "    }",
      "    return counts.isEmpty()",
      "  }",
      "}",
      "```"
    )
  },
  {
    name: "Пересечение массивов II · LeetCode 350",
    url: "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
    body: md(
      "Даны два массива целых чисел. Верните массив общих чисел: каждое число должно встретиться в ответе столько раз, сколько оно встречается в обоих массивах одновременно. Порядок ответа не важен.",
      "",
      "Пример: `[1, 2, 2, 1]` и `[2, 2]` → `[2, 2]`.",
      "",
      "Сигнатура: `fun intersect(nums1: IntArray, nums2: IntArray): IntArray`.",
      "",
      testBlock([
        { input: `nums1=[1,2,2,1], nums2=[2,2]`, output: `[2,2]` },
        { input: `nums1=[4,9,5], nums2=[9,4,9,8,4]`, output: "[4,9] или [9,4]" },
        { input: `nums1=[1,2,2,1], nums2=[2]`, output: `[2]` },
        { input: `nums1=[1,3,3], nums2=[2,4]`, output: `[]` },
        { input: `nums1=[5,5,5], nums2=[5,5,5,5]`, output: `[5,5,5]` }
      ])
    ),
    hint: "Посчитайте частоты первого массива в `Map`. При проходе второго добавляйте число в ответ только если его счётчик положителен, после чего уменьшайте счётчик.",
    solution: md(
      "```kotlin",
      "class Solution {",
      "  fun intersect(nums1: IntArray, nums2: IntArray): IntArray {",
      "    val counts = mutableMapOf<Int, Int>()",
      "    for (number in nums1) counts[number] = counts.getOrDefault(number, 0) + 1",
      "    val result = mutableListOf<Int>()",
      "    for (number in nums2) {",
      "        val count = counts[number] ?: 0",
      "        if (count > 0) {",
      "            result.add(number)",
      "            counts[number] = count - 1",
      "        }",
      "    }",
      "    return result.toIntArray()",
      "  }",
      "}",
      "```"
    )
  }
];

function slidesFor(tasks, offset, label) {
  return tasks.flatMap((task, index) => {
    const number = offset + index + 1;
    const taskId = `task-${number}`;
    const source = task.url ? `\n\n[Открыть оригинал задачи на LeetCode](${task.url})` : "";
    return [
      { type: "practice", title: `${number}. ${task.name}`, badge: label, body: task.body + source, timerTaskId: taskId },
      { type: "content", title: `${number}. Подсказка`, badge: "Через 5 минут", body: "Подсказка откроется через 5 минут после нажатия кнопки «Запустить таймер» на условии этой задачи. Преподаватель может открыть её по паролю.", timedReveal: { taskId, minutes: 5, label: "Подсказка", content: task.hint } },
      { type: "content", title: `${number}. Решение`, badge: "Через 20 минут", body: "Решение откроется через 20 минут после нажатия кнопки «Запустить таймер» на условии этой задачи. Преподаватель может открыть его по паролю.", timedReveal: { taskId, minutes: 20, label: "Решение", content: task.solution } }
    ];
  });
}

window.DECK = {
  course: "Android-разработка",
  lecture: "Практика",
  lectureId: "02",
  slug: "kotlin-02-practice",
  title: "Практика 02. Kotlin: основы и коллекции",
  block: "Язык",
  teacher: "Сучёв Николай Евгеньевич",
  teacherMeta: "Android-разработчик · Т-Банк · команда Вовлечение",
  hub: "../../index.html",
  photo: "../../assets/teacher.jpg",
  slides: [
    {
      type: "title",
      title: "Практика 02",
      subtitle: "Kotlin: основы языка, массивы и Map",
      kicker: "02 / практика",
      body: "Сначала пройдите Kotlin Koans: Introduction и Collections. После этого решайте 8 задач — 4 по материалу лекции и 4 из LeetCode. На условии каждой задачи нажмите «Запустить таймер»: подсказка откроется через 5 минут, решение через 20 минут. Оба можно открыть по паролю преподавателя."
    },
    {
      type: "content",
      title: "Сначала Kotlin Koans",
      badge: "Обязательный первый шаг",
      body: "Пройдите все задания в двух разделах:\n\n1. [Introduction](https://play.kotlinlang.org/koans/Introduction/Hello,%20world!/Task.kt)\n2. [Collections](https://play.kotlinlang.org/koans/Collections/Introduction/Task.kt)\n\nПереходите к следующему заданию только после успешной проверки текущего. Для сдачи приложите два скриншота разделов с зелёными галочками. Затем переходите к задачам ниже."
    },
    {
      type: "section",
      title: "Из лекции 02",
      subtitle: "Условия, функции, null safety и коллекции",
      body: "- Приветствие без null\n- FizzBuzz\n- Список оценок\n- Обработка оценок"
    },
    ...slidesFor(lectureTasks, 0, "Из лекции"),
    {
      type: "section",
      title: "LeetCode · Easy",
      subtitle: "Массивы и Map в Kotlin",
      body: "- Накопленная сумма\n- Сумма двух чисел\n- Анаграмма\n- Пересечение массивов II"
    },
    ...slidesFor(leetCodeTasks, lectureTasks.length, "LeetCode · Easy"),
    {
      type: "homework",
      title: "Итог практики",
      badge: "Проверка",
      body: "- [ ] Introduction и Collections в Kotlin Koans пройдены\n- [ ] Приложены два скриншота с зелёными галочками\n- [ ] Решены задачи из лекции\n- [ ] Решены задачи LeetCode на массивы и Map"
    }
  ]
};
