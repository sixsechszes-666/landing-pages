/* ============================================================
   ИНФОСФЕРА — Курс «Алгоритмы и структуры данных»
   Полностью функциональная вкладка: 10 модулей теории + тесты,
   подсчёт баллов, отметки прохождения, сохранение прогресса.
   ============================================================ */
(() => {
  'use strict';

  const STORE_KEY = 'infosfera_algo_progress_v1';

  /* ---------- Контент курса ---------- */
  const MODULES = [
    {
      title: 'Введение. Что такое алгоритм',
      eyebrow: 'Модуль 01 · Основы',
      theory: `
        <span class="eyebrow">Модуль 01 · Основы</span>
        <h2>Что такое алгоритм</h2>
        <p><b>Алгоритм</b> — это конечная последовательность точно определённых действий, которая по исходным данным за конечное число шагов приводит к нужному результату. Алгоритмы — фундамент всей информатики: от поиска в Google до маршрута в навигаторе.</p>
        <h3>Свойства алгоритма</h3>
        <ul>
          <li><b>Дискретность</b> — алгоритм разбит на отдельные шаги, выполняемые по очереди.</li>
          <li><b>Детерминированность</b> — каждый шаг определён однозначно, нет двусмысленности.</li>
          <li><b>Конечность</b> — алгоритм завершается за конечное число шагов.</li>
          <li><b>Массовость</b> — применим к целому классу однотипных задач, а не к одной.</li>
          <li><b>Результативность</b> — даёт конкретный результат (или сообщает, что решения нет).</li>
        </ul>
        <h3>Способы записи</h3>
        <div class="two">
          <div class="infobox"><h4>Словесный</h4><p>Описание шагов на естественном языке. Понятно человеку, но неточно.</p></div>
          <div class="infobox"><h4>Блок-схема</h4><p>Графическое представление: блоки действий, условий и циклов.</p></div>
          <div class="infobox"><h4>Псевдокод</h4><p>Полуформальная запись, близкая к коду, но без привязки к языку.</p></div>
          <div class="infobox"><h4>Язык программирования</h4><p>Точная исполняемая запись для компьютера.</p></div>
        </div>
        <div class="callout"><span class="tag">Запомни</span><p>Структура данных — это способ организации данных в памяти (массив, список, дерево). Алгоритм работает <b>над</b> структурой данных. Их выбирают вместе.</p></div>
      `,
      quiz: [
        { q: 'Какое свойство означает, что алгоритм завершается за конечное число шагов?',
          opts: ['Массовость', 'Конечность', 'Дискретность', 'Детерминированность'],
          correct: 1,
          explain: 'Конечность — гарантия того, что алгоритм не зациклится навсегда и завершится за конечное число шагов.' },
        { q: 'Что описывает свойство «массовость»?',
          opts: ['Алгоритм решает только одну задачу', 'Алгоритм применим к классу однотипных задач', 'Алгоритм использует много памяти', 'Шаги выполняются параллельно'],
          correct: 1,
          explain: 'Массовость — это пригодность алгоритма для решения целого класса задач с разными входными данными.' },
        { q: 'Что из перечисленного — структура данных, а не алгоритм?',
          opts: ['Сортировка слиянием', 'Бинарный поиск', 'Связный список', 'Обход в глубину'],
          correct: 2,
          explain: 'Связный список — способ организации данных в памяти. Остальное — алгоритмы, работающие над данными.' }
      ]
    },
    {
      title: 'Анализ сложности · Big-O',
      eyebrow: 'Модуль 02 · Анализ',
      theory: `
        <span class="eyebrow">Модуль 02 · Анализ</span>
        <h2>Сложность алгоритмов · O-большое</h2>
        <p>Чтобы сравнивать алгоритмы независимо от железа, оценивают, как растёт число операций при увеличении размера входа <b>n</b>. Для этого используют асимптотическую нотацию <b>O(...)</b> — «O-большое».</p>
        <h3>Основные классы сложности</h3>
        <div class="bigO">
          <div class="o good"><b>O(1)</b><small>константа</small></div>
          <div class="o good"><b>O(log n)</b><small>логарифм</small></div>
          <div class="o mid"><b>O(n)</b><small>линейный</small></div>
          <div class="o mid"><b>O(n log n)</b><small>квазилинейный</small></div>
          <div class="o bad"><b>O(n²)</b><small>квадрат</small></div>
          <div class="o bad"><b>O(2ⁿ)</b><small>экспонента</small></div>
        </div>
        <h3>Правила оценки</h3>
        <ul>
          <li>Отбрасываем константы: O(2n) → <b>O(n)</b>.</li>
          <li>Оставляем старший член: O(n² + n) → <b>O(n²)</b>.</li>
          <li>Оцениваем <b>худший случай</b> — верхнюю границу времени работы.</li>
        </ul>
        <div class="callout"><span class="tag">Пример</span><p>Один цикл по массиву — O(n). Вложенный цикл в цикле — O(n²). Деление задачи пополам на каждом шаге — O(log n).</p></div>
      `,
      quiz: [
        { q: 'Чему равна сложность O(2n + 5) после упрощения?',
          opts: ['O(2n)', 'O(n)', 'O(n + 5)', 'O(5)'],
          correct: 1,
          explain: 'Константы и множители отбрасываются: O(2n + 5) = O(n).' },
        { q: 'Какая сложность у двух вложенных циклов по n элементов?',
          opts: ['O(n)', 'O(log n)', 'O(n²)', 'O(2n)'],
          correct: 2,
          explain: 'Вложенный цикл выполняет n × n = n² операций — это O(n²).' },
        { q: 'Какой класс сложности самый быстрый при росте n?',
          opts: ['O(n²)', 'O(n log n)', 'O(1)', 'O(n)'],
          correct: 2,
          explain: 'O(1) — константное время, не зависит от размера входа. Это идеал.' }
      ]
    },
    {
      title: 'Сортировки: пузырёк, слияние',
      eyebrow: 'Модуль 03 · Сортировки',
      theory: `
        <span class="eyebrow">Модуль 03 · Сортировки</span>
        <h2>Алгоритмы сортировки</h2>
        <p>Сортировка — упорядочивание элементов. Это одна из самых частых операций, и от выбранного алгоритма напрямую зависит скорость программы.</p>
        <h3>Пузырьковая сортировка — O(n²)</h3>
        <p>Простая, но медленная: соседние элементы сравниваются и меняются местами, пока массив не упорядочится. Подходит только для обучения и крошечных массивов.</p>
        <h3>Сортировка слиянием (Merge Sort) — O(n log n)</h3>
        <p>Приём «разделяй и властвуй»: массив рекурсивно делится пополам, а затем отсортированные половины сливаются. Гарантированная сложность <b>O(n log n)</b> в любом случае.</p>
        <div class="code">
          <div class="code__bar"><i></i><i></i><i></i><span>merge_sort.py</span></div>
<pre><span class="k">def</span> <span class="f">merge_sort</span>(arr):
    <span class="k">if</span> len(arr) &lt;= <span class="n">1</span>:
        <span class="k">return</span> arr
    mid = len(arr) <span class="k">//</span> <span class="n">2</span>
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    <span class="k">return</span> <span class="f">merge</span>(left, right)

<span class="k">def</span> <span class="f">merge</span>(a, b):
    res, i, j = [], <span class="n">0</span>, <span class="n">0</span>
    <span class="k">while</span> i &lt; len(a) <span class="k">and</span> j &lt; len(b):
        <span class="k">if</span> a[i] &lt;= b[j]: res.append(a[i]); i += <span class="n">1</span>
        <span class="k">else</span>:          res.append(b[j]); j += <span class="n">1</span>
    <span class="k">return</span> res + a[i:] + b[j:]</pre>
        </div>
        <div class="callout"><span class="tag">Сравнение</span><p>На массиве из 1 000 000 элементов пузырёк сделает ~10¹² операций, а merge sort ~2×10⁷. Разница — в десятки тысяч раз.</p></div>
      `,
      quiz: [
        { q: 'Какова сложность сортировки слиянием в худшем случае?',
          opts: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
          correct: 1,
          explain: 'Merge sort всегда работает за O(n log n) — деление даёт log n уровней, слияние на каждом уровне — O(n).' },
        { q: 'Какой приём лежит в основе сортировки слиянием?',
          opts: ['Жадный алгоритм', 'Разделяй и властвуй', 'Полный перебор', 'Динамическое программирование'],
          correct: 1,
          explain: 'Merge sort делит массив пополам (разделяй) и сливает отсортированные части (властвуй).' },
        { q: 'Почему пузырьковую сортировку не применяют на практике?',
          opts: ['Она даёт неверный результат', 'Её сложность O(n²) — слишком медленно', 'Она требует много памяти', 'Она работает только с числами'],
          correct: 1,
          explain: 'Пузырёк корректен, но его квадратичная сложность делает его непригодным для больших данных.' }
      ]
    },
    {
      title: 'Поиск: линейный и бинарный',
      eyebrow: 'Модуль 04 · Поиск',
      theory: `
        <span class="eyebrow">Модуль 04 · Поиск</span>
        <h2>Алгоритмы поиска</h2>
        <p>Поиск элемента в коллекции — базовая операция. Скорость зависит от того, отсортированы ли данные.</p>
        <h3>Линейный поиск — O(n)</h3>
        <p>Перебираем элементы по очереди, пока не найдём нужный. Работает на любых данных, но медленный на больших массивах.</p>
        <h3>Бинарный поиск — O(log n)</h3>
        <p>Работает только на <b>отсортированном</b> массиве. На каждом шаге сравниваем элемент с серединой и отбрасываем половину диапазона.</p>
        <div class="code">
          <div class="code__bar"><i></i><i></i><i></i><span>binary_search.py</span></div>
<pre><span class="k">def</span> <span class="f">binary_search</span>(arr, target):
    lo, hi = <span class="n">0</span>, len(arr) - <span class="n">1</span>
    <span class="k">while</span> lo &lt;= hi:
        mid = (lo + hi) <span class="k">//</span> <span class="n">2</span>
        <span class="k">if</span> arr[mid] == target: <span class="k">return</span> mid
        <span class="k">elif</span> arr[mid] &lt; target: lo = mid + <span class="n">1</span>
        <span class="k">else</span>:                  hi = mid - <span class="n">1</span>
    <span class="k">return</span> -<span class="n">1</span>   <span class="c"># не найдено</span></pre>
        </div>
        <div class="callout"><span class="tag">Запомни</span><p>На массиве в 1 000 000 элементов линейный поиск сделает до 1 000 000 шагов, а бинарный — всего ~20 (log₂ 1 000 000 ≈ 20).</p></div>
      `,
      quiz: [
        { q: 'Какова временная сложность бинарного поиска?',
          opts: ['O(n) — линейная', 'O(log n) — логарифмическая', 'O(n²) — квадратичная', 'O(1) — константная'],
          correct: 1,
          explain: 'Бинарный поиск отбрасывает половину диапазона на каждом шаге — отсюда O(log n).' },
        { q: 'Какое обязательное условие нужно для бинарного поиска?',
          opts: ['Массив должен быть отсортирован', 'Массив должен содержать только числа', 'Массив должен быть пустым', 'Никаких условий нет'],
          correct: 0,
          explain: 'Бинарный поиск работает только на отсортированном массиве — иначе нельзя корректно отбрасывать половины.' },
        { q: 'Сколько шагов сделает бинарный поиск на массиве из ~1 000 000 элементов?',
          opts: ['Около 1 000 000', 'Около 1000', 'Около 20', 'Около 100 000'],
          correct: 2,
          explain: 'log₂(1 000 000) ≈ 20 — это число делений диапазона пополам.' }
      ]
    },
    {
      title: 'Связные списки',
      eyebrow: 'Модуль 05 · Структуры',
      theory: `
        <span class="eyebrow">Модуль 05 · Структуры данных</span>
        <h2>Связные списки</h2>
        <p><b>Связный список</b> — это последовательность узлов, где каждый узел хранит значение и ссылку (указатель) на следующий узел. В отличие от массива, элементы не лежат подряд в памяти.</p>
        <h3>Виды списков</h3>
        <ul>
          <li><b>Односвязный</b> — каждый узел ссылается только на следующий.</li>
          <li><b>Двусвязный</b> — узел ссылается и на следующий, и на предыдущий.</li>
          <li><b>Кольцевой</b> — последний узел ссылается на первый.</li>
        </ul>
        <h3>Массив vs связный список</h3>
        <div class="two">
          <div class="infobox"><h4>Массив</h4><p>Доступ по индексу за O(1). Вставка/удаление в начало — O(n) (сдвиг элементов).</p></div>
          <div class="infobox"><h4>Связный список</h4><p>Доступ по индексу за O(n). Вставка/удаление при известном узле — O(1).</p></div>
        </div>
        <div class="callout"><span class="tag">Когда применять</span><p>Связный список выгоден, когда часто вставляешь и удаляешь элементы и не нужен быстрый доступ по индексу.</p></div>
      `,
      quiz: [
        { q: 'Что хранит узел односвязного списка?',
          opts: ['Только значение', 'Значение и ссылку на следующий узел', 'Значение и индекс', 'Ссылки на все узлы'],
          correct: 1,
          explain: 'Узел односвязного списка хранит данные и указатель на следующий узел.' },
        { q: 'Какова сложность доступа к элементу по индексу в связном списке?',
          opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correct: 2,
          explain: 'Чтобы дойти до i-го элемента, нужно пройти по ссылкам от начала — это O(n).' },
        { q: 'В чём преимущество связного списка перед массивом?',
          opts: ['Быстрый доступ по индексу', 'Вставка/удаление при известном узле за O(1)', 'Меньше занимает памяти', 'Данные лежат подряд'],
          correct: 1,
          explain: 'Вставка и удаление узла — это лишь переустановка ссылок, O(1), без сдвига элементов.' }
      ]
    },
    {
      title: 'Стек, очередь, дек',
      eyebrow: 'Модуль 06 · Структуры',
      theory: `
        <span class="eyebrow">Модуль 06 · Структуры данных</span>
        <h2>Стек, очередь и дек</h2>
        <p>Это абстрактные структуры данных, которые ограничивают, с какого конца можно добавлять и извлекать элементы. Все основные операции у них — O(1).</p>
        <div class="two">
          <div class="infobox"><h4>Стек (Stack) — LIFO</h4><p>«Last In, First Out». Последний пришёл — первый ушёл. Как стопка тарелок: берём верхнюю.</p></div>
          <div class="infobox"><h4>Очередь (Queue) — FIFO</h4><p>«First In, First Out». Первый пришёл — первый ушёл. Как очередь в магазине.</p></div>
        </div>
        <h3>Дек (Deque)</h3>
        <p><b>Двусторонняя очередь</b> — можно добавлять и извлекать элементы с обоих концов. Универсальная структура, объединяющая стек и очередь.</p>
        <h3>Где применяются</h3>
        <ul>
          <li><b>Стек:</b> вызовы функций (call stack), отмена действий (Ctrl+Z), проверка скобок.</li>
          <li><b>Очередь:</b> обход в ширину (BFS), очереди задач, буферизация.</li>
        </ul>
        <div class="callout"><span class="tag">Запомни</span><p>Push/pop у стека и enqueue/dequeue у очереди выполняются за <b>O(1)</b> — это их главное преимущество.</p></div>
      `,
      quiz: [
        { q: 'По какому принципу работает стек?',
          opts: ['FIFO — первый пришёл, первый ушёл', 'LIFO — последний пришёл, первый ушёл', 'Случайный доступ', 'По возрастанию значений'],
          correct: 1,
          explain: 'Стек работает по принципу LIFO: извлекается тот элемент, что был добавлен последним.' },
        { q: 'Какая структура данных используется для обхода в ширину (BFS)?',
          opts: ['Стек', 'Очередь', 'Двоичное дерево', 'Хеш-таблица'],
          correct: 1,
          explain: 'BFS использует очередь (FIFO), чтобы обрабатывать вершины по уровням.' },
        { q: 'Чем дек отличается от обычной очереди?',
          opts: ['Дек хранит только числа', 'В дек можно добавлять/извлекать с обоих концов', 'Дек медленнее', 'Дек не хранит порядок'],
          correct: 1,
          explain: 'Дек (двусторонняя очередь) позволяет операции с обоих концов.' }
      ]
    },
    {
      title: 'Деревья и обходы',
      eyebrow: 'Модуль 07 · Структуры',
      theory: `
        <span class="eyebrow">Модуль 07 · Структуры данных</span>
        <h2>Деревья и их обходы</h2>
        <p><b>Дерево</b> — иерархическая структура из узлов: один корень, у каждого узла есть потомки. Узлы без потомков называют листьями.</p>
        <h3>Двоичное дерево поиска (BST)</h3>
        <p>У каждого узла не более двух потомков. Слева — меньшие значения, справа — большие. Это даёт поиск, вставку и удаление за <b>O(log n)</b> в сбалансированном дереве.</p>
        <h3>Способы обхода</h3>
        <ul>
          <li><b>In-order</b> (левый → корень → правый) — для BST даёт отсортированный порядок.</li>
          <li><b>Pre-order</b> (корень → левый → правый) — для копирования структуры дерева.</li>
          <li><b>Post-order</b> (левый → правый → корень) — для удаления дерева.</li>
          <li><b>Level-order</b> (по уровням, через очередь) — обход в ширину.</li>
        </ul>
        <div class="callout"><span class="tag">Важно</span><p>Если дерево вырождается в «цепочку» (несбалансированное), поиск деградирует до O(n). Для гарантий используют сбалансированные деревья: AVL, красно-чёрные.</p></div>
      `,
      quiz: [
        { q: 'Как в двоичном дереве поиска расположены значения?',
          opts: ['Случайно', 'Слева меньшие, справа большие', 'Слева большие, справа меньшие', 'Все одинаковые'],
          correct: 1,
          explain: 'В BST левое поддерево содержит меньшие значения, правое — большие. Это и даёт быстрый поиск.' },
        { q: 'Какой обход BST даёт элементы в отсортированном порядке?',
          opts: ['Pre-order', 'Post-order', 'In-order', 'Level-order'],
          correct: 2,
          explain: 'In-order (левый → корень → правый) для BST возвращает значения по возрастанию.' },
        { q: 'Что произойдёт с поиском в полностью несбалансированном дереве?',
          opts: ['Останется O(log n)', 'Деградирует до O(n)', 'Станет O(1)', 'Поиск перестанет работать'],
          correct: 1,
          explain: 'Вырожденное дерево превращается в список, и поиск становится линейным — O(n).' }
      ]
    },
    {
      title: 'Хеш-таблицы',
      eyebrow: 'Модуль 08 · Структуры',
      theory: `
        <span class="eyebrow">Модуль 08 · Структуры данных</span>
        <h2>Хеш-таблицы</h2>
        <p><b>Хеш-таблица</b> хранит пары «ключ → значение» и обеспечивает доступ в среднем за <b>O(1)</b>. Это структура за словарями (dict в Python, Map в JS, HashMap в Java).</p>
        <h3>Как это работает</h3>
        <p><b>Хеш-функция</b> превращает ключ в число — индекс в массиве, куда кладётся значение. Хорошая хеш-функция распределяет ключи равномерно.</p>
        <h3>Коллизии</h3>
        <p><b>Коллизия</b> — когда два разных ключа дают один индекс. Способы разрешения:</p>
        <ul>
          <li><b>Метод цепочек</b> — в каждой ячейке хранится связный список элементов с одинаковым хешем.</li>
          <li><b>Открытая адресация</b> — при коллизии ищется следующая свободная ячейка.</li>
        </ul>
        <div class="callout"><span class="tag">Запомни</span><p>Средняя сложность операций — O(1), но в худшем случае (много коллизий) — O(n). Качество хеш-функции критично.</p></div>
      `,
      quiz: [
        { q: 'Какова средняя сложность доступа в хеш-таблице?',
          opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correct: 0,
          explain: 'При хорошей хеш-функции доступ к элементу выполняется в среднем за константное время O(1).' },
        { q: 'Что такое коллизия в хеш-таблице?',
          opts: ['Ошибка переполнения', 'Два разных ключа дают одинаковый индекс', 'Удаление несуществующего ключа', 'Пустая ячейка'],
          correct: 1,
          explain: 'Коллизия — ситуация, когда хеш-функция возвращает один индекс для разных ключей.' },
        { q: 'Какой метод разрешения коллизий использует связные списки в ячейках?',
          opts: ['Открытая адресация', 'Метод цепочек', 'Линейное пробирование', 'Двойное хеширование'],
          correct: 1,
          explain: 'Метод цепочек хранит в каждой ячейке список всех элементов с этим хешем.' }
      ]
    },
    {
      title: 'Графы и BFS / DFS',
      eyebrow: 'Модуль 09 · Графы',
      theory: `
        <span class="eyebrow">Модуль 09 · Графы</span>
        <h2>Графы и алгоритмы обхода</h2>
        <p><b>Граф</b> — набор вершин, соединённых рёбрами. Графами моделируют соцсети, карты дорог, зависимости задач. Графы бывают ориентированные/неориентированные и взвешенные/невзвешенные.</p>
        <h3>Способы представления</h3>
        <div class="two">
          <div class="infobox"><h4>Матрица смежности</h4><p>Таблица n×n: на пересечении 1, если ребро есть. Память O(n²).</p></div>
          <div class="infobox"><h4>Список смежности</h4><p>Для каждой вершины — список соседей. Память O(V + E). Экономнее для разреженных графов.</p></div>
        </div>
        <h3>Обход в ширину (BFS)</h3>
        <p>Использует <b>очередь</b>. Обходит вершины по уровням от старта. Находит <b>кратчайший путь</b> в невзвешенном графе.</p>
        <h3>Обход в глубину (DFS)</h3>
        <p>Использует <b>стек</b> (или рекурсию). Идёт вглубь по одной ветви до конца, затем возвращается. Применяется для поиска циклов, топологической сортировки, компонент связности.</p>
        <div class="callout"><span class="tag">Запомни</span><p>BFS → очередь → кратчайший путь по числу рёбер. DFS → стек/рекурсия → углубление в ветви.</p></div>
      `,
      quiz: [
        { q: 'Какая структура данных используется в обходе в ширину (BFS)?',
          opts: ['Стек', 'Очередь', 'Хеш-таблица', 'Дерево'],
          correct: 1,
          explain: 'BFS использует очередь (FIFO), обрабатывая вершины по уровням.' },
        { q: 'Какой алгоритм находит кратчайший путь в невзвешенном графе?',
          opts: ['DFS', 'BFS', 'Сортировка слиянием', 'Бинарный поиск'],
          correct: 1,
          explain: 'BFS обходит граф по уровням, поэтому первым достигает цели по минимальному числу рёбер.' },
        { q: 'Что использует обход в глубину (DFS)?',
          opts: ['Очередь', 'Стек или рекурсию', 'Хеш-функцию', 'Матрицу O(n²) обязательно'],
          correct: 1,
          explain: 'DFS углубляется по ветви с помощью стека или рекурсивных вызовов.' }
      ]
    },
    {
      title: 'Динамическое программирование',
      eyebrow: 'Модуль 10 · Продвинутое',
      theory: `
        <span class="eyebrow">Модуль 10 · Продвинутое</span>
        <h2>Динамическое программирование</h2>
        <p><b>Динамическое программирование (ДП)</b> — приём, при котором сложная задача разбивается на подзадачи, а их решения сохраняются, чтобы не вычислять повторно.</p>
        <h3>Когда применимо ДП</h3>
        <ul>
          <li><b>Оптимальная подструктура</b> — решение задачи строится из решений подзадач.</li>
          <li><b>Перекрывающиеся подзадачи</b> — одни и те же подзадачи встречаются многократно.</li>
        </ul>
        <h3>Два подхода</h3>
        <div class="two">
          <div class="infobox"><h4>Мемоизация (сверху вниз)</h4><p>Рекурсия + кэш уже вычисленных результатов.</p></div>
          <div class="infobox"><h4>Табуляция (снизу вверх)</h4><p>Итеративно заполняем таблицу от простых подзадач к сложным.</p></div>
        </div>
        <div class="code">
          <div class="code__bar"><i></i><i></i><i></i><span>fib_dp.py</span></div>
<pre><span class="c"># Наивная рекурсия — O(2ⁿ), очень медленно</span>
<span class="c"># С мемоизацией — O(n)</span>
<span class="k">def</span> <span class="f">fib</span>(n, memo={}):
    <span class="k">if</span> n &lt;= <span class="n">1</span>: <span class="k">return</span> n
    <span class="k">if</span> n <span class="k">in</span> memo: <span class="k">return</span> memo[n]
    memo[n] = fib(n-<span class="n">1</span>, memo) + fib(n-<span class="n">2</span>, memo)
    <span class="k">return</span> memo[n]</pre>
        </div>
        <div class="callout"><span class="tag">Классика ДП</span><p>Числа Фибоначчи, задача о рюкзаке, наибольшая общая подпоследовательность, размен монет — типичные задачи, которые ДП решает за полиномиальное время.</p></div>
      `,
      quiz: [
        { q: 'Какие два условия нужны, чтобы применить ДП?',
          opts: ['Сортировка и поиск', 'Оптимальная подструктура и перекрывающиеся подзадачи', 'Рекурсия и массив', 'Стек и очередь'],
          correct: 1,
          explain: 'ДП применимо при оптимальной подструктуре и наличии перекрывающихся подзадач.' },
        { q: 'Что такое мемоизация?',
          opts: ['Сортировка результатов', 'Сохранение результатов подзадач в кэш', 'Удаление лишних данных', 'Перебор всех вариантов'],
          correct: 1,
          explain: 'Мемоизация — кэширование уже вычисленных результатов, чтобы не пересчитывать их.' },
        { q: 'Как ДП ускоряет вычисление чисел Фибоначчи?',
          opts: ['С O(2ⁿ) до O(n)', 'С O(n) до O(n²)', 'С O(log n) до O(1)', 'Никак не ускоряет'],
          correct: 0,
          explain: 'Наивная рекурсия — O(2ⁿ). Сохраняя промежуточные значения, ДП снижает сложность до O(n).' }
      ]
    }
  ];

  /* ---------- Прогресс (localStorage) ---------- */
  const TOTAL = MODULES.length;
  let done = new Set();
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) done = new Set(JSON.parse(raw));
  } catch (e) { /* приватный режим — работаем без сохранения */ }
  const persist = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify([...done])); } catch (e) {} };

  let current = 0;

  /* ---------- DOM-ссылки ---------- */
  const $syllabus = document.getElementById('syllabus');
  const $lesson   = document.getElementById('lessonRoot');
  const $progBar  = document.getElementById('progBar');
  const $progPct  = document.getElementById('progPct');
  const $progCnt  = document.getElementById('progCount');
  const $totalQ   = document.getElementById('totalQ');
  if ($totalQ) $totalQ.textContent = MODULES.reduce((s, m) => s + m.quiz.length, 0);

  /* ---------- Публичный API для авто-демо ---------- */
  const Course = (window.InfosferaCourse = {});
  Course.selectModule = (i) => selectModule(i);
  Course.modButton = (i) => $syllabus.children[i + 1]; // children[0] — заголовок h4
  Course.finished = false;
  Course.correctOpt = null;
  Course.qnextBtn = null;

  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ---------- Прогресс-бар ---------- */
  function updateProgress() {
    const pct = Math.round((done.size / TOTAL) * 100);
    if ($progBar) $progBar.style.width = pct + '%';
    if ($progPct) $progPct.textContent = pct + '%';
    if ($progCnt) $progCnt.textContent = done.size + ' / ' + TOTAL;
  }

  /* ---------- Боковое меню (программа) ---------- */
  function renderSyllabus() {
    $syllabus.innerHTML = '<h4>Программа курса</h4>';
    MODULES.forEach((m, i) => {
      const btn = document.createElement('button');
      btn.className = 'mod' + (i === current ? ' active' : '') + (done.has(i) ? ' done' : '');
      btn.innerHTML = '<span class="dot">' + (done.has(i) ? '✓' : (i + 1)) + '</span>' +
                      '<span class="mtitle">' + m.title + '</span>';
      btn.addEventListener('click', () => selectModule(i));
      $syllabus.appendChild(btn);
    });
  }

  /* ---------- Выбор модуля ---------- */
  function selectModule(i, scroll = true) {
    current = Math.max(0, Math.min(TOTAL - 1, i));
    renderSyllabus();
    renderLesson(current);
    if (scroll) {
      const top = $lesson.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  /* ---------- Рендер урока ---------- */
  function renderLesson(i) {
    const m = MODULES[i];
    const inner = document.createElement('div');
    inner.className = 'lesson__inner';
    inner.innerHTML = m.theory;

    // Квиз-контейнер
    const quiz = document.createElement('div');
    quiz.className = 'quiz';
    inner.appendChild(quiz);
    buildQuiz(m, i, quiz);

    // Навигация по урокам
    const nav = document.createElement('div');
    nav.className = 'lesson-nav';
    nav.innerHTML =
      '<button class="btn btn--ghost' + (i === 0 ? ' disabled' : '') + '" data-prev>← Предыдущий</button>' +
      '<button class="btn btn--primary" data-next>' +
        (i === TOTAL - 1 ? 'К началу курса' : 'Следующий модуль') +
        ' <span class="pip">↗</span></button>';
    inner.appendChild(nav);
    nav.querySelector('[data-prev]').addEventListener('click', () => { if (i > 0) selectModule(i - 1); });
    nav.querySelector('[data-next]').addEventListener('click', () => selectModule(i === TOTAL - 1 ? 0 : i + 1));

    $lesson.innerHTML = '';
    $lesson.appendChild(inner);
  }

  /* ---------- Движок теста ---------- */
  function buildQuiz(module, modIndex, root) {
    const questions = module.quiz;
    let qi = 0;        // текущий вопрос
    let score = 0;     // верных ответов
    let answered = false;
    Course.finished = false;

    function render() {
      const q = questions[qi];
      root.innerHTML = '';

      // шапка
      const head = document.createElement('div');
      head.className = 'quiz__head';
      let dots = '';
      for (let d = 0; d < questions.length; d++)
        dots += '<i class="' + (d < qi ? 'on' : '') + (d === qi ? ' cur' : '') + '"></i>';
      head.innerHTML = '<h3>Проверь себя</h3>' +
        '<span class="qcounter">Вопрос ' + (qi + 1) + ' / ' + questions.length +
        ' <span class="qdots">' + dots + '</span></span>';
      root.appendChild(head);

      // вопрос
      const qEl = document.createElement('div');
      qEl.className = 'q';
      qEl.textContent = q.q;
      root.appendChild(qEl);

      const sub = document.createElement('div');
      sub.className = 'qsub';
      sub.textContent = 'Выбери один вариант — проверка мгновенная.';
      root.appendChild(sub);

      // варианты
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const optEls = [];
      q.opts.forEach((text, idx) => {
        const b = document.createElement('button');
        b.className = 'opt';
        b.innerHTML = '<span class="mk">' + letters[idx] + '</span><span>' + text + '</span>';
        b.addEventListener('click', () => choose(idx, optEls, q));
        root.appendChild(b);
        optEls.push(b);
      });

      Course.correctOpt = optEls[q.correct]; // подсказка для авто-демо

      // результат
      const res = document.createElement('div');
      res.className = 'quiz-result';
      res.id = 'qres';
      root.appendChild(res);

      // действия
      const act = document.createElement('div');
      act.className = 'qactions';
      act.innerHTML = '<button class="btn btn--primary" data-qnext style="display:none">' +
        (qi === questions.length - 1 ? 'Завершить тест' : 'Следующий вопрос') +
        ' <span class="pip">↗</span></button>';
      root.appendChild(act);
      act.querySelector('[data-qnext]').addEventListener('click', next);
      Course.qnextBtn = act.querySelector('[data-qnext]');

      answered = false;
    }

    function choose(idx, optEls, q) {
      if (answered) return;
      answered = true;
      const correct = idx === q.correct;
      if (correct) score++;
      optEls.forEach((el, k) => {
        el.disabled = true;
        if (k === q.correct) el.classList.add('correct');
      });
      if (!correct) optEls[idx].classList.add('wrong');

      const res = root.querySelector('#qres');
      res.className = 'quiz-result show ' + (correct ? 'ok' : 'no');
      res.innerHTML = (correct ? '✓ <b>Верно!</b> ' : '✕ <b>Неверно.</b> ') + q.explain;

      root.querySelector('[data-qnext]').style.display = 'inline-flex';
    }

    function next() {
      if (qi < questions.length - 1) { qi++; render(); }
      else finish();
    }

    function finish() {
      Course.finished = true;
      Course.correctOpt = null;
      Course.qnextBtn = null;
      const passed = score >= Math.ceil(questions.length * 0.6);
      if (passed) { done.add(modIndex); persist(); updateProgress(); renderSyllabus(); }

      const pct = Math.round((score / questions.length) * 100);
      const ringColor = passed ? 'var(--lime)' : '#ff7a6e';
      root.innerHTML =
        '<div class="quiz__head"><h3>Результат теста</h3></div>' +
        '<div class="qscore">' +
          '<div class="ring" style="background:conic-gradient(' + ringColor + ' ' + pct + '%, rgba(255,255,255,.08) 0);">' +
            '<div style="position:absolute;inset:8px;border-radius:50%;background:var(--bg-2);"></div>' +
            '<span>' + score + '/' + questions.length + '</span>' +
          '</div>' +
          (passed ? '<div class="badge-done">✓ Модуль пройден</div>' : '') +
          '<h3>' + (passed ? 'Отлично!' : 'Почти получилось') + '</h3>' +
          '<p>' + (passed
            ? 'Вы ответили верно на ' + score + ' из ' + questions.length + '. Модуль засчитан, прогресс обновлён.'
            : 'Правильных ответов: ' + score + ' из ' + questions.length + '. Для зачёта нужно не менее ' + Math.ceil(questions.length * 0.6) + '. Повторите теорию и попробуйте снова.') + '</p>' +
          '<button class="btn btn--ghost" data-retry style="margin-inline:auto">Пройти тест заново</button>' +
        '</div>';
      root.querySelector('[data-retry]').addEventListener('click', () => { qi = 0; score = 0; render(); });
    }

    render();
  }

  /* ---------- Запуск ---------- */
  // Открываем первый непройденный модуль (или первый)
  let startIndex = 0;
  for (let i = 0; i < TOTAL; i++) { if (!done.has(i)) { startIndex = i; break; } }
  current = startIndex;
  renderSyllabus();
  renderLesson(current);
  updateProgress();
})();
