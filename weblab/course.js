/* ============================================================
   WEBLAB — Курс «Основы веб-разработки»
   10 модулей теории + интерактивные тесты, прогресс, сохранение.
   ============================================================ */
(() => {
  'use strict';
  const KEY = 'weblab_web_progress_v1';

  const MODULES = [
    {
      title: 'Как работает веб',
      theory: `
        <span class="eyebrow">Модуль 01 · Основы</span>
        <h2>Как устроен интернет и веб</h2>
        <p>Когда вы открываете сайт, ваш <b>браузер</b> (клиент) отправляет запрос на <b>сервер</b>, где хранятся файлы сайта, а сервер присылает ответ — HTML-страницу. Этот диалог идёт по протоколу <b>HTTP/HTTPS</b>.</p>
        <h3>Ключевые понятия</h3>
        <div class="two">
          <div class="box"><h4>Клиент</h4><p>Браузер пользователя: запрашивает и отображает страницы.</p></div>
          <div class="box"><h4>Сервер</h4><p>Компьютер, который хранит сайт и отвечает на запросы.</p></div>
          <div class="box"><h4>HTTP/HTTPS</h4><p>Протокол обмена. HTTPS — то же, но с шифрованием.</p></div>
          <div class="box"><h4>URL</h4><p>Адрес ресурса: протокол, домен, путь к странице.</p></div>
        </div>
        <h3>Три языка фронтенда</h3>
        <ul>
          <li><b>HTML</b> — структура и содержание страницы.</li>
          <li><b>CSS</b> — внешний вид: цвета, шрифты, расположение.</li>
          <li><b>JavaScript</b> — поведение и интерактивность.</li>
        </ul>
        <div class="note"><span class="t">Аналогия</span><p>HTML — это скелет страницы, CSS — её одежда и стиль, а JavaScript — мышцы, которые двигают всё это.</p></div>
      `,
      quiz: [
        { q: 'Что отправляет запрос на сервер, когда вы открываете сайт?', opts: ['Сервер', 'Браузер (клиент)', 'Домен', 'CSS-файл'], correct: 1, explain: 'Браузер выступает клиентом: он запрашивает страницу у сервера и отображает ответ.' },
        { q: 'За что отвечает CSS?', opts: ['За структуру страницы', 'За внешний вид: цвета, шрифты, расположение', 'За запросы к серверу', 'За хранение данных'], correct: 1, explain: 'CSS описывает оформление: цвета, шрифты, отступы и расположение элементов.' },
        { q: 'Чем HTTPS отличается от HTTP?', opts: ['Работает быстрее в 10 раз', 'Это протокол с шифрованием', 'Не требует сервера', 'Используется только для картинок'], correct: 1, explain: 'HTTPS — это HTTP с шифрованием (TLS), данные между клиентом и сервером защищены.' }
      ]
    },
    {
      title: 'HTML — структура страницы',
      theory: `
        <span class="eyebrow">Модуль 02 · HTML</span>
        <h2>Структура HTML-документа</h2>
        <p>HTML состоит из <b>тегов</b>. Большинство тегов парные: открывающий и закрывающий. Содержимое вкладывается одно в другое, образуя дерево.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>index.html</span></div>
<pre><span class="tg">&lt;!DOCTYPE html&gt;</span>
<span class="tg">&lt;html</span> <span class="at">lang</span>=<span class="st">"ru"</span><span class="tg">&gt;</span>
  <span class="tg">&lt;head&gt;</span>
    <span class="tg">&lt;meta</span> <span class="at">charset</span>=<span class="st">"UTF-8"</span><span class="tg">&gt;</span>
    <span class="tg">&lt;title&gt;</span>Моя страница<span class="tg">&lt;/title&gt;</span>
  <span class="tg">&lt;/head&gt;</span>
  <span class="tg">&lt;body&gt;</span>
    <span class="tg">&lt;h1&gt;</span>Привет, мир!<span class="tg">&lt;/h1&gt;</span>
  <span class="tg">&lt;/body&gt;</span>
<span class="tg">&lt;/html&gt;</span></pre></div>
        <h3>Из чего состоит документ</h3>
        <ul>
          <li><b>&lt;!DOCTYPE html&gt;</b> — объявление типа документа (HTML5).</li>
          <li><b>&lt;head&gt;</b> — служебная информация: кодировка, заголовок вкладки, подключение CSS.</li>
          <li><b>&lt;body&gt;</b> — всё видимое содержимое страницы.</li>
        </ul>
        <div class="note"><span class="t">Запомни</span><p>Тег <b>&lt;head&gt;</b> не отображается на странице — он для браузера и поисковиков. Видимое содержимое идёт только в <b>&lt;body&gt;</b>.</p></div>
      `,
      quiz: [
        { q: 'Где размещается всё видимое содержимое страницы?', opts: ['В <head>', 'В <body>', 'В <title>', 'В <meta>'], correct: 1, explain: 'Видимый контент находится внутри <body>. <head> содержит служебную информацию.' },
        { q: 'Что объявляет <!DOCTYPE html>?', opts: ['Кодировку страницы', 'Тип документа (HTML5)', 'Заголовок вкладки', 'Подключение стилей'], correct: 1, explain: '<!DOCTYPE html> сообщает браузеру, что документ написан на HTML5.' },
        { q: 'Что обычно содержит тег <head>?', opts: ['Заголовки h1', 'Кодировку, title и подключение CSS', 'Кнопки и ссылки', 'Картинки'], correct: 1, explain: '<head> хранит метаданные: charset, title, подключение стилей и скриптов.' }
      ]
    },
    {
      title: 'HTML — текст, ссылки, картинки',
      theory: `
        <span class="eyebrow">Модуль 03 · HTML</span>
        <h2>Контент страницы</h2>
        <p>Базовые теги для наполнения страницы текстом, ссылками, изображениями и списками.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>content.html</span></div>
<pre><span class="tg">&lt;h1&gt;</span>Заголовок<span class="tg">&lt;/h1&gt;</span>
<span class="tg">&lt;p&gt;</span>Абзац текста.<span class="tg">&lt;/p&gt;</span>
<span class="tg">&lt;a</span> <span class="at">href</span>=<span class="st">"https://site.ru"</span><span class="tg">&gt;</span>Ссылка<span class="tg">&lt;/a&gt;</span>
<span class="tg">&lt;img</span> <span class="at">src</span>=<span class="st">"cat.jpg"</span> <span class="at">alt</span>=<span class="st">"Кот"</span><span class="tg">&gt;</span>
<span class="tg">&lt;ul&gt;</span>
  <span class="tg">&lt;li&gt;</span>Пункт списка<span class="tg">&lt;/li&gt;</span>
<span class="tg">&lt;/ul&gt;</span></pre></div>
        <h3>Важные атрибуты</h3>
        <ul>
          <li><b>href</b> у &lt;a&gt; — адрес, куда ведёт ссылка.</li>
          <li><b>src</b> у &lt;img&gt; — путь к изображению.</li>
          <li><b>alt</b> у &lt;img&gt; — текст, если картинка не загрузилась (и для доступности).</li>
        </ul>
        <div class="note"><span class="t">Семантика</span><p>Используйте теги по смыслу: заголовки — &lt;h1&gt;–&lt;h6&gt;, абзацы — &lt;p&gt;. Это важно для SEO и доступности.</p></div>
      `,
      quiz: [
        { q: 'Какой атрибут задаёт адрес ссылки в теге <a>?', opts: ['src', 'href', 'alt', 'link'], correct: 1, explain: 'Атрибут href указывает URL, на который ведёт ссылка <a>.' },
        { q: 'Зачем нужен атрибут alt у <img>?', opts: ['Задаёт размер картинки', 'Текст при не загрузке и для доступности', 'Делает картинку ссылкой', 'Меняет формат файла'], correct: 1, explain: 'alt — альтернативный текст: показывается, если картинка не загрузилась, и читается скринридерами.' },
        { q: 'Каким тегом создаётся маркированный список?', opts: ['<ol>', '<ul>', '<li>', '<list>'], correct: 1, explain: '<ul> — маркированный (unordered) список, внутри которого пункты <li>.' }
      ]
    },
    {
      title: 'CSS — селекторы и свойства',
      theory: `
        <span class="eyebrow">Модуль 04 · CSS</span>
        <h2>Подключение и селекторы CSS</h2>
        <p>CSS задаёт правила оформления. Правило состоит из <b>селектора</b> (что стилизуем) и <b>блока свойств</b> (как).</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>style.css</span></div>
<pre><span class="cm">/* по тегу */</span>
<span class="kw">h1</span> { <span class="fn">color</span>: <span class="nm">navy</span>; <span class="fn">font-size</span>: <span class="nm">32px</span>; }

<span class="cm">/* по классу */</span>
<span class="nm">.card</span> { <span class="fn">background</span>: <span class="nm">#fff</span>; <span class="fn">padding</span>: <span class="nm">16px</span>; }

<span class="cm">/* по id */</span>
<span class="nm">#header</span> { <span class="fn">position</span>: <span class="nm">sticky</span>; }</pre></div>
        <h3>Виды селекторов</h3>
        <ul>
          <li><b>Тег:</b> <code>p</code> — все абзацы.</li>
          <li><b>Класс:</b> <code>.btn</code> — элементы с class="btn".</li>
          <li><b>Id:</b> <code>#nav</code> — элемент с id="nav" (на странице один).</li>
        </ul>
        <div class="note"><span class="t">Каскад</span><p>Если правил несколько, побеждает более <b>специфичный</b> селектор: id важнее класса, класс важнее тега.</p></div>
      `,
      quiz: [
        { q: 'Как в CSS обратиться к элементам с class="btn"?', opts: ['#btn', '.btn', 'btn', '*btn'], correct: 1, explain: 'Класс выбирается через точку: .btn выберет все элементы с этим классом.' },
        { q: 'Какой селектор самый специфичный?', opts: ['по тегу', 'по классу', 'по id', 'все одинаковы'], correct: 2, explain: 'Специфичность: id > класс > тег. Поэтому правило с id переопределит остальные.' },
        { q: 'Из чего состоит CSS-правило?', opts: ['Только из свойств', 'Из селектора и блока свойств', 'Из тега и атрибута', 'Из функции'], correct: 1, explain: 'Правило = селектор (что стилизуем) + { свойства: значения }.' }
      ]
    },
    {
      title: 'CSS — Flexbox',
      theory: `
        <span class="eyebrow">Модуль 05 · CSS</span>
        <h2>Flexbox — гибкие блоки</h2>
        <p><b>Flexbox</b> — система раскладки в одном направлении (строка или столбец). Делает контейнер «гибким» и удобно выравнивает элементы.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>flex.css</span></div>
<pre><span class="nm">.row</span> {
  <span class="fn">display</span>: <span class="nm">flex</span>;
  <span class="fn">justify-content</span>: <span class="nm">space-between</span>; <span class="cm">/* по гл. оси */</span>
  <span class="fn">align-items</span>: <span class="nm">center</span>;        <span class="cm">/* по поперечной */</span>
  <span class="fn">gap</span>: <span class="nm">16px</span>;
}</pre></div>
        <h3>Главные свойства</h3>
        <ul>
          <li><b>display: flex</b> — включает флекс на контейнере.</li>
          <li><b>justify-content</b> — выравнивание по главной оси.</li>
          <li><b>align-items</b> — выравнивание по поперечной оси.</li>
          <li><b>gap</b> — расстояние между элементами.</li>
        </ul>
        <div class="note"><span class="t">Запомни</span><p>Flexbox удобен для <b>одномерных</b> раскладок: меню, ряд карточек, шапка сайта. Для двумерных — есть Grid.</p></div>
      `,
      quiz: [
        { q: 'Какое свойство включает Flexbox на контейнере?', opts: ['display: grid', 'display: flex', 'position: flex', 'float: left'], correct: 1, explain: 'display: flex превращает элемент во флекс-контейнер.' },
        { q: 'Что выравнивает justify-content?', opts: ['По поперечной оси', 'По главной оси', 'Размер шрифта', 'Цвет фона'], correct: 1, explain: 'justify-content управляет распределением элементов вдоль главной оси.' },
        { q: 'Для каких раскладок Flexbox подходит лучше всего?', opts: ['Двумерных сеток', 'Одномерных (ряд или столбец)', 'Только для текста', 'Только для картинок'], correct: 1, explain: 'Flexbox — для одномерных раскладок. Для строк И столбцов одновременно лучше Grid.' }
      ]
    },
    {
      title: 'CSS — Grid',
      theory: `
        <span class="eyebrow">Модуль 06 · CSS</span>
        <h2>CSS Grid — сетки</h2>
        <p><b>Grid</b> — мощная система для <b>двумерных</b> раскладок: одновременно колонки и строки. Идеален для макетов страниц и галерей.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>grid.css</span></div>
<pre><span class="nm">.gallery</span> {
  <span class="fn">display</span>: <span class="nm">grid</span>;
  <span class="fn">grid-template-columns</span>: <span class="nm">repeat(3, 1fr)</span>;
  <span class="fn">gap</span>: <span class="nm">20px</span>;
}</pre></div>
        <h3>Ключевые свойства</h3>
        <ul>
          <li><b>display: grid</b> — включает сетку.</li>
          <li><b>grid-template-columns</b> — задаёт колонки. <code>1fr</code> — доля свободного места.</li>
          <li><b>repeat(3, 1fr)</b> — три равные колонки.</li>
          <li><b>gap</b> — промежутки между ячейками.</li>
        </ul>
        <div class="note"><span class="t">Flex или Grid?</span><p>Один ряд элементов — <b>Flexbox</b>. Полноценная сетка из строк и колонок — <b>Grid</b>.</p></div>
      `,
      quiz: [
        { q: 'Для чего лучше всего подходит CSS Grid?', opts: ['Для одномерных рядов', 'Для двумерных сеток (строки + колонки)', 'Для анимаций', 'Для шрифтов'], correct: 1, explain: 'Grid создан для двумерных раскладок: колонки и строки одновременно.' },
        { q: 'Что означает запись repeat(3, 1fr)?', opts: ['3 строки по 1 пикселю', '3 равные колонки', '1 колонка шириной 3fr', 'Повторить картинку 3 раза'], correct: 1, explain: 'repeat(3, 1fr) создаёт три колонки равной ширины (по одной доле каждая).' },
        { q: 'Что задаёт единица fr в Grid?', opts: ['Фиксированный размер в px', 'Долю свободного пространства', 'Размер шрифта', 'Радиус скругления'], correct: 1, explain: 'fr (fraction) — доля доступного свободного места в контейнере.' }
      ]
    },
    {
      title: 'Адаптивная вёрстка',
      theory: `
        <span class="eyebrow">Модуль 07 · CSS</span>
        <h2>Адаптивность и медиазапросы</h2>
        <p><b>Адаптивная вёрстка</b> — сайт хорошо выглядит на любом экране: от телефона до монитора. Главный инструмент — <b>медиазапросы</b>.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>responsive.css</span></div>
<pre><span class="cm">/* по умолчанию — мобильные */</span>
<span class="nm">.menu</span> { <span class="fn">flex-direction</span>: <span class="nm">column</span>; }

<span class="cm">/* экраны шире 768px */</span>
<span class="kw">@media</span> (<span class="fn">min-width</span>: <span class="nm">768px</span>) {
  <span class="nm">.menu</span> { <span class="fn">flex-direction</span>: <span class="nm">row</span>; }
}</pre></div>
        <h3>Принципы</h3>
        <ul>
          <li><b>Mobile-first</b> — сначала стили для телефона, потом расширяем.</li>
          <li><b>Относительные единицы</b> — %, em, rem вместо жёстких px.</li>
          <li><b>Медиазапрос</b> — применяет стили при условии (ширина экрана).</li>
        </ul>
        <div class="note"><span class="t">Зачем</span><p>Более половины пользователей заходят с телефонов — адаптивность сегодня обязательна.</p></div>
      `,
      quiz: [
        { q: 'Какой инструмент применяет стили в зависимости от ширины экрана?', opts: ['@import', '@media', '@font-face', '@keyframes'], correct: 1, explain: 'Медиазапрос @media применяет стили при выполнении условия, например min-width.' },
        { q: 'Что означает подход mobile-first?', opts: ['Сначала стили для ПК', 'Сначала стили для мобильных, потом шире', 'Только мобильная версия', 'Запрет десктопа'], correct: 1, explain: 'Mobile-first: базовые стили — под телефон, а медиазапросами расширяем под большие экраны.' },
        { q: 'Какие единицы предпочтительнее для адаптивности?', opts: ['Только px', 'Относительные: %, em, rem', 'Только pt', 'Градусы'], correct: 1, explain: 'Относительные единицы (%, em, rem) масштабируются под экран, в отличие от жёстких px.' }
      ]
    },
    {
      title: 'JavaScript — основы',
      theory: `
        <span class="eyebrow">Модуль 08 · JavaScript</span>
        <h2>Основы JavaScript</h2>
        <p><b>JavaScript</b> добавляет странице поведение. Начнём с переменных, типов и функций.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>script.js</span></div>
<pre><span class="kw">let</span> name = <span class="st">"Анна"</span>;   <span class="cm">// строка</span>
<span class="kw">const</span> age = <span class="nm">21</span>;        <span class="cm">// число (не изменить)</span>
<span class="kw">let</span> isStudent = <span class="nm">true</span>; <span class="cm">// логический тип</span>

<span class="kw">function</span> <span class="fn">greet</span>(user) {
  <span class="kw">return</span> <span class="st">"Привет, "</span> + user + <span class="st">"!"</span>;
}
<span class="fn">console</span>.log( <span class="fn">greet</span>(name) ); <span class="cm">// Привет, Анна!</span></pre></div>
        <h3>Главное</h3>
        <ul>
          <li><b>let</b> — переменная, которую можно менять.</li>
          <li><b>const</b> — константа, значение зафиксировано.</li>
          <li><b>Типы:</b> строка, число, логический (true/false).</li>
          <li><b>Функция</b> — переиспользуемый блок кода.</li>
        </ul>
        <div class="note"><span class="t">Совет</span><p>По умолчанию используйте <b>const</b>, и только если значение будет меняться — <b>let</b>. От <code>var</code> в современном коде отказываются.</p></div>
      `,
      quiz: [
        { q: 'Чем const отличается от let?', opts: ['const быстрее', 'Значение const нельзя переприсвоить', 'const только для чисел', 'Разницы нет'], correct: 1, explain: 'const создаёт константу — её значение нельзя переприсвоить. let можно менять.' },
        { q: 'Что вернёт функция greet("мир") из примера?', opts: ['"мир"', '"Привет, мир!"', 'undefined', 'Ошибку'], correct: 1, explain: 'Функция склеивает строки и вернёт "Привет, мир!".' },
        { q: 'Какой тип данных у значения true?', opts: ['Строка', 'Число', 'Логический (boolean)', 'Функция'], correct: 2, explain: 'true и false — логический (boolean) тип данных.' }
      ]
    },
    {
      title: 'DOM и события',
      theory: `
        <span class="eyebrow">Модуль 09 · JavaScript</span>
        <h2>DOM и обработка событий</h2>
        <p><b>DOM</b> (Document Object Model) — представление страницы в виде дерева объектов. Через JavaScript можно находить элементы и менять их, а также реагировать на действия пользователя.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>dom.js</span></div>
<pre><span class="cm">// находим кнопку</span>
<span class="kw">const</span> btn = <span class="fn">document</span>.<span class="fn">querySelector</span>(<span class="st">".btn"</span>);

<span class="cm">// реагируем на клик</span>
btn.<span class="fn">addEventListener</span>(<span class="st">"click"</span>, () =&gt; {
  <span class="fn">alert</span>(<span class="st">"Кнопку нажали!"</span>);
});</pre></div>
        <h3>Главные методы</h3>
        <ul>
          <li><b>querySelector(selector)</b> — находит первый элемент по CSS-селектору.</li>
          <li><b>addEventListener(событие, функция)</b> — вешает обработчик.</li>
          <li>Частые события: <b>click</b>, <b>input</b>, <b>submit</b>, <b>mouseover</b>.</li>
        </ul>
        <div class="note"><span class="t">Идея</span><p>Сначала <b>находим</b> элемент, затем <b>подписываемся</b> на событие и описываем, что произойдёт.</p></div>
      `,
      quiz: [
        { q: 'Что такое DOM?', opts: ['Язык программирования', 'Представление страницы в виде дерева объектов', 'CSS-фреймворк', 'Тип сервера'], correct: 1, explain: 'DOM — объектная модель документа: страница в виде дерева, доступного из JavaScript.' },
        { q: 'Какой метод находит элемент по CSS-селектору?', opts: ['getColor()', 'querySelector()', 'addStyle()', 'createTag()'], correct: 1, explain: 'document.querySelector(selector) возвращает первый подходящий элемент.' },
        { q: 'Чем вешают обработчик события на элемент?', opts: ['addEventListener', 'querySelector', 'console.log', 'getElementByColor'], correct: 0, explain: 'element.addEventListener("click", fn) подписывает функцию на событие.' }
      ]
    },
    {
      title: 'Git и публикация сайта',
      theory: `
        <span class="eyebrow">Модуль 10 · Инструменты</span>
        <h2>Git и публикация в интернете</h2>
        <p><b>Git</b> — система контроля версий: сохраняет историю изменений кода. <b>GitHub</b> — сервис для хранения репозиториев онлайн и публикации сайтов.</p>
        <div class="code-b"><div class="bar"><i></i><i></i><i></i><span>terminal</span></div>
<pre><span class="cm"># сохранить изменения</span>
<span class="fn">git</span> add .
<span class="fn">git</span> commit -m <span class="st">"Первый сайт"</span>

<span class="cm"># отправить на GitHub</span>
<span class="fn">git</span> push</pre></div>
        <h3>Базовые понятия</h3>
        <ul>
          <li><b>commit</b> — сохранённый снимок изменений с подписью.</li>
          <li><b>push</b> — отправка коммитов на удалённый репозиторий.</li>
          <li><b>Хостинг</b> — где «живёт» сайт (GitHub Pages, Cloudflare Pages, Netlify).</li>
        </ul>
        <div class="note"><span class="t">Финал</span><p>Сверстал страницу → закоммитил в Git → запушил на GitHub → подключил хостинг. Сайт в интернете!</p></div>
      `,
      quiz: [
        { q: 'Что такое commit в Git?', opts: ['Удаление файлов', 'Сохранённый снимок изменений', 'Запуск сервера', 'CSS-свойство'], correct: 1, explain: 'Commit фиксирует изменения как именованный снимок в истории проекта.' },
        { q: 'Что делает команда git push?', opts: ['Удаляет репозиторий', 'Отправляет коммиты на удалённый репозиторий', 'Создаёт новый файл', 'Меняет стиль'], correct: 1, explain: 'git push отправляет локальные коммиты на удалённый сервер (например, GitHub).' },
        { q: 'Что из перечисленного — сервис для публикации сайтов?', opts: ['Photoshop', 'Cloudflare Pages', 'Microsoft Word', 'WinRAR'], correct: 1, explain: 'Cloudflare Pages (как и GitHub Pages, Netlify) — хостинг для публикации сайтов.' }
      ]
    }
  ];

  const TOTAL = MODULES.length;
  let done = new Set();
  try { const r = localStorage.getItem(KEY); if (r) done = new Set(JSON.parse(r)); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch (e) {} };
  let current = 0;

  const $tabs = document.getElementById('modtabs');
  const $lesson = document.getElementById('lessonRoot');
  const $bar = document.getElementById('pbar');
  const $pct = document.getElementById('ppct');
  const $cnt = document.getElementById('pcount');
  const $tq = document.getElementById('totalQ');
  if ($tq) $tq.textContent = MODULES.reduce((s, m) => s + m.quiz.length, 0);

  // API для авто-демо
  const Course = (window.WeblabCourse = {});
  Course.selectModule = (i) => select(i);
  Course.modButton = (i) => $tabs.children[i];
  Course.finished = false; Course.correctOpt = null; Course.qnextBtn = null;

  function progress() {
    const p = Math.round((done.size / TOTAL) * 100);
    if ($bar) $bar.style.width = p + '%';
    if ($pct) $pct.textContent = p + '%';
    if ($cnt) $cnt.textContent = done.size + ' / ' + TOTAL;
  }

  function tabsbar() {
    $tabs.innerHTML = '';
    MODULES.forEach((m, i) => {
      const b = document.createElement('button');
      b.className = 'tab' + (i === current ? ' active' : '') + (done.has(i) ? ' done' : '');
      const idxLabel = done.has(i) ? '✓' : String(i + 1).padStart(2, '0');
      b.innerHTML = '<span class="ti">' + idxLabel + '</span><span>' + m.title + '</span>';
      b.addEventListener('click', () => select(i));
      $tabs.appendChild(b);
    });
    const act = $tabs.querySelector('.tab.active');
    if (act) act.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  function select(i, scroll = true) {
    current = Math.max(0, Math.min(TOTAL - 1, i));
    tabsbar(); lesson(current);
    if (scroll) window.scrollTo({ top: $lesson.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' });
  }

  function lesson(i) {
    const m = MODULES[i];
    const el = document.createElement('div');
    el.className = 'lesson';
    el.innerHTML = m.theory;
    const quiz = document.createElement('div'); quiz.className = 'quiz'; el.appendChild(quiz);
    buildQuiz(m, i, quiz);
    const nav = document.createElement('div'); nav.className = 'lnav';
    nav.innerHTML = '<button class="btn btn--ghost' + (i === 0 ? ' dis' : '') + '" data-prev>← Предыдущий</button>' +
      '<button class="btn btn--primary" data-next>' + (i === TOTAL - 1 ? 'К началу курса' : 'Следующий модуль') + ' <span class="pip">↗</span></button>';
    el.appendChild(nav);
    nav.querySelector('[data-prev]').addEventListener('click', () => { if (i > 0) select(i - 1); });
    nav.querySelector('[data-next]').addEventListener('click', () => select(i === TOTAL - 1 ? 0 : i + 1));
    $lesson.innerHTML = ''; $lesson.appendChild(el);
  }

  function buildQuiz(module, idx, root) {
    const qs = module.quiz; let qi = 0, score = 0, answered = false;
    Course.finished = false;
    function render() {
      const q = qs[qi]; root.innerHTML = '';
      const head = document.createElement('div'); head.className = 'qh';
      head.innerHTML = '<h3>Проверка знаний</h3><span class="qc">Вопрос ' + (qi + 1) + ' из ' + qs.length + '</span>';
      root.appendChild(head);
      const bar = document.createElement('div'); bar.className = 'qbar';
      bar.innerHTML = '<i style="width:' + Math.round((qi / qs.length) * 100) + '%"></i>'; root.appendChild(bar);
      const qe = document.createElement('div'); qe.className = 'q'; qe.textContent = q.q; root.appendChild(qe);
      const su = document.createElement('div'); su.className = 'qs'; su.textContent = 'Выбери один вариант — проверка мгновенная.'; root.appendChild(su);
      const wrap = document.createElement('div'); wrap.className = 'opts'; root.appendChild(wrap);
      const L = ['A', 'B', 'C', 'D', 'E']; const opts = [];
      q.opts.forEach((t, k) => {
        const b = document.createElement('button'); b.className = 'opt';
        b.innerHTML = '<span class="mk">' + L[k] + '</span><span>' + t + '</span>';
        b.addEventListener('click', () => choose(k, opts, q)); wrap.appendChild(b); opts.push(b);
      });
      Course.correctOpt = opts[q.correct];
      const res = document.createElement('div'); res.className = 'qr'; res.id = 'qr'; root.appendChild(res);
      const act = document.createElement('div'); act.className = 'qa';
      act.innerHTML = '<button class="btn btn--primary" data-qn style="display:none">' + (qi === qs.length - 1 ? 'Завершить тест' : 'Следующий вопрос') + ' <span class="pip">↗</span></button>';
      root.appendChild(act); act.querySelector('[data-qn]').addEventListener('click', next);
      Course.qnextBtn = act.querySelector('[data-qn]');
      answered = false;
    }
    function choose(k, opts, q) {
      if (answered) return; answered = true;
      const ok = k === q.correct; if (ok) score++;
      opts.forEach((e, j) => { e.disabled = true; if (j === q.correct) e.classList.add('correct'); });
      if (!ok) opts[k].classList.add('wrong');
      const r = root.querySelector('#qr'); r.className = 'qr show ' + (ok ? 'ok' : 'no');
      r.innerHTML = (ok ? '✓ <b>Верно!</b> ' : '✕ <b>Неверно.</b> ') + q.explain;
      root.querySelector('[data-qn]').style.display = 'inline-flex';
    }
    function next() { if (qi < qs.length - 1) { qi++; render(); } else finish(); }
    function finish() {
      Course.finished = true; Course.correctOpt = null; Course.qnextBtn = null;
      const passed = score >= Math.ceil(qs.length * 0.6);
      if (passed) { done.add(idx); save(); progress(); tabsbar(); }
      const pct = Math.round((score / qs.length) * 100);
      const fill = passed ? 'var(--grad)' : '#ef4444';
      root.innerHTML = '<div class="qh"><h3>Результат</h3></div>' +
        '<div class="scorewrap">' +
          (passed ? '<div class="badge">✓ Модуль пройден</div>' : '') +
          '<div class="big grad-text">' + score + ' / ' + qs.length + '</div>' +
          '<div class="scorebar"><i style="width:' + pct + '%;background:' + fill + '"></i></div>' +
          '<h3 style="margin:4px 0 8px">' + (passed ? 'Отлично!' : 'Почти получилось') + '</h3>' +
          '<p style="color:var(--ink-soft);max-width:46ch;margin:0 auto 22px">' + (passed ? 'Верных ответов: ' + score + ' из ' + qs.length + '. Модуль засчитан, прогресс сохранён.' : 'Верных: ' + score + ' из ' + qs.length + '. Нужно минимум ' + Math.ceil(qs.length * 0.6) + '. Повтори теорию и попробуй снова.') + '</p>' +
          '<button class="btn btn--ghost" data-retry style="margin-inline:auto">Пройти заново</button>' +
        '</div>';
      root.querySelector('[data-retry]').addEventListener('click', () => { qi = 0; score = 0; render(); });
    }
    render();
  }

  let start = 0; for (let i = 0; i < TOTAL; i++) { if (!done.has(i)) { start = i; break; } }
  current = start; tabsbar(); lesson(current); progress();
})();
