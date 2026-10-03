/* ============================================================
   WEBLAB — Авто-демонстрация (курсор + прожектор + подписи)
   ============================================================ */
(() => {
  'use strict';
  const STOP = Symbol('stop');
  const isCourse = !!document.getElementById('lessonRoot');
  const Course = window.WeblabCourse;

  const fab = document.createElement('button');
  fab.className = 'demo-fab'; fab.id = 'demoFab';
  fab.innerHTML = '<span class="tri">▶</span> DEMO';
  document.body.appendChild(fab);

  const cursor = document.createElement('div');
  cursor.className = 'demo-cursor';
  cursor.innerHTML = '<span class="ptr"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 2 L4 20 L9 15 L12.4 22 L15 20.8 L11.6 14 L18 14 Z" fill="#0a1f3a" stroke="#ffffff" stroke-width="1" stroke-linejoin="round"/></svg></span>';
  document.body.appendChild(cursor);

  const spot = document.createElement('div'); spot.className = 'demo-spot'; document.body.appendChild(spot);

  const caption = document.createElement('div');
  caption.className = 'demo-caption';
  caption.innerHTML = '<span class="dtag">● Авто-демо</span><p id="demoCap"></p><button class="dstop" id="demoStop">Стоп ✕</button>';
  document.body.appendChild(caption);
  const capText = caption.querySelector('#demoCap');

  const state = { running: false };
  let curX = innerWidth / 2, curY = innerHeight / 2, curReject = null;
  const RK = /[?&]rec=1/.test(location.search) ? 4 : 1;

  function sleep(ms) { return new Promise((res, rej) => { curReject = rej; setTimeout(() => { curReject = null; res(); }, ms * RK); }); }
  function move(x, y, dur = 850) { curX = x; curY = y; cursor.style.transitionDuration = (dur * RK / 1000) + 's'; cursor.style.transform = 'translate(' + x + 'px,' + y + 'px)'; return sleep(dur + 40); }
  function centerOf(el) { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }
  function moveToEl(el, dur) { const [x, y] = centerOf(el); return move(x, y, dur); }
  function animScroll(toY, dur) { return new Promise(res => { const sy = scrollY, dy = toY - sy, t0 = performance.now(), ez = t => 1 - Math.pow(1 - t, 3); (function s(n) { const p = Math.min((n - t0) / dur, 1); scrollTo(0, sy + dy * ez(p)); p < 1 ? requestAnimationFrame(s) : res(); })(performance.now()); }); }
  function ripple() { const d = document.createElement('div'); d.className = 'demo-ripple'; d.style.left = curX + 'px'; d.style.top = curY + 'px'; document.body.appendChild(d); setTimeout(() => d.remove(), 640); }
  async function clickEl(el, real = true) { if (el) await moveToEl(el); cursor.classList.add('press'); ripple(); await sleep(190); cursor.classList.remove('press'); if (real && el) el.click(); await sleep(150); }
  function say(t) { capText.textContent = t; caption.classList.add('show'); }
  function spotOn(el, pad = 12) { const r = el.getBoundingClientRect(); spot.style.opacity = '1'; spot.style.top = (r.top - pad) + 'px'; spot.style.left = (r.left - pad) + 'px'; spot.style.width = (r.width + pad * 2) + 'px'; spot.style.height = (r.height + pad * 2) + 'px'; }
  function spotOff() { spot.style.opacity = '0'; }
  async function scrollToEl(el) { spotOff(); if (RK > 1) { const r = el.getBoundingClientRect(); await animScroll(Math.max(0, r.top + scrollY - innerHeight / 2 + r.height / 2), 700 * RK); } else { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } await sleep(800); }
  async function ensureVisible(el) { const r = el.getBoundingClientRect(); if (r.top < 140 || r.bottom > innerHeight - 140) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); await sleep(620); } }
  const $ = (s) => document.querySelector(s);

  let recCssDone = false;
  function applyRecCss() {
    if (recCssDone || RK <= 1) return; recCssDone = true;
    const st = document.createElement('style');
    st.textContent = `.demo-spot{transition-duration:${0.6 * RK}s!important}.demo-caption{transition-duration:${0.5 * RK}s!important}.demo-caption .dstop{display:none!important}.tile{transition-duration:${0.5 * RK}s!important}`;
    document.head.appendChild(st);
  }
  function cleanup() { state.running = false; spotOff(); caption.classList.remove('show'); cursor.classList.remove('on'); fab.classList.remove('hidden'); }
  function stop() { if (!state.running) return; state.running = false; if (curReject) { curReject(STOP); curReject = null; } cleanup(); }
  async function start(tour) { if (state.running) return; state.running = true; applyRecCss(); fab.classList.add('hidden'); cursor.classList.add('on'); await move(innerWidth / 2, innerHeight * 0.5, 0); try { await tour(); } catch (e) { if (e !== STOP) console.error('[demo]', e); } }

  fab.addEventListener('click', () => start(isCourse ? courseTour : homeTour));
  caption.querySelector('#demoStop').addEventListener('click', stop);
  addEventListener('keydown', (e) => { if (e.key === 'Escape') stop(); });

  /* ---------- ГЛАВНАЯ ---------- */
  async function homeTour() {
    say('Добро пожаловать в WEBLAB — запускаю автоматическую экскурсию');
    await move(innerWidth / 2, innerHeight * 0.42, 700); await sleep(1300);

    const h = $('.hero h1');
    if (h) { scrollTo({ top: 0, behavior: 'smooth' }); await sleep(600); spotOn(h); say('WEBLAB — платформа для изучения веб-разработки с нуля'); await moveToEl(h); await sleep(1900); }

    const code = $('.hero .browser');
    if (code) { spotOn(code, 10); say('Прямо в герое — первая HTML-страница с подсветкой кода'); await moveToEl(code); await sleep(1800); }

    const cta = $('.nav .btn--primary');
    if (cta) { spotOn(cta, 8); say('Начать обучение можно в один клик'); await clickEl(cta, false); await sleep(1200); }

    const st = $('.stats');
    if (st) { await scrollToEl(st); spotOn(st); say('Десять курсов, сотни уроков и заданий — всё в браузере'); await moveToEl(st); await sleep(1900); }

    const dh = $('#courses .sec-head');
    if (dh) { await scrollToEl(dh); spotOn(dh); say('Программа ведёт от вёрстки до интерактивных приложений'); await sleep(1500); }

    const fc = $('.tile.span2');
    if (fc) { await scrollToEl(fc); spotOn(fc); say('Каждый курс — это модули, теория, код и тесты'); await moveToEl(fc); await sleep(1900); }

    const tiles = document.querySelectorAll('#courses .grid .tile'); spotOff();
    if (tiles[1]) { say('Наводимся на карточки — они оживают'); await moveToEl(tiles[1]); await sleep(650); }
    if (tiles[2]) { await moveToEl(tiles[2]); await sleep(650); }
    if (tiles[4]) { await moveToEl(tiles[4]); await sleep(650); }

    const road = $('#road .road');
    if (road) { await scrollToEl(road); spotOn(road); say('В каждом курсе четыре шага: теория, код, тест, проект'); await sleep(1900); }

    const why = $('#why .grid');
    if (why) { await scrollToEl(why); spotOn(why); say('Всё в браузере, видимый прогресс и актуальный стек'); await sleep(1800); }

    const go = $('.cta .btn--white');
    if (go) { await scrollToEl(go); spotOn(go, 8); say('А теперь откроем демонстрационный курс…'); await clickEl(go, false); await sleep(900); }

    spotOff(); say('Переходим к курсу «Основы веб-разработки»…'); await sleep(1100);
    const rec = /[?&]rec=1/.test(location.search);
    location.href = 'course.html?demo=1' + (rec ? '&rec=1' : '');
  }

  /* ---------- КУРС ---------- */
  async function courseTour() {
    const rec = /[?&]rec=1/.test(location.search);
    say('Курс «Основы веб-разработки»: 10 модулей и тесты');
    await move(innerWidth / 2, innerHeight * 0.45, 700); await sleep(1400);

    const tabs = $('#modtabs');
    if (tabs) { await scrollToEl(tabs); spotOn(tabs, 8); say('Сверху — модули курса в виде вкладок редактора'); await moveToEl(tabs); await sleep(1700); }

    const m2 = Course && Course.modButton ? Course.modButton(1) : null;
    if (m2) { spotOn(m2, 6); say('Открываем модуль «HTML — структура страницы»'); await clickEl(m2, false); if (Course) Course.selectModule(1); await sleep(1000); }

    const h2 = $('#lessonRoot h2');
    if (h2) { await scrollToEl(h2); spotOff(); say('Подробная теория простым языком'); await sleep(1500); }

    const code = $('#lessonRoot .code-b');
    if (code) { await scrollToEl(code); spotOn(code); say('Живые примеры кода прямо в уроке'); await sleep(1800); }

    const quiz = $('#lessonRoot .quiz');
    if (quiz) { await scrollToEl(quiz); spotOn(quiz); say('А вот и тест — пройду его автоматически'); await sleep(1600); }

    let guard = 0;
    while (Course && !Course.finished && guard++ < 14) {
      const opt = Course.correctOpt; if (!opt) break;
      spotOff(); say('Выбираю правильный вариант ответа'); await ensureVisible(opt); await clickEl(opt, true); await sleep(1600);
      const nb = Course.qnextBtn; if (!nb) break;
      say('Перехожу к следующему вопросу'); await ensureVisible(nb); await clickEl(nb, true); await sleep(1000);
    }

    const sc = $('#lessonRoot .scorewrap');
    if (sc) { await scrollToEl(sc); spotOn(sc); say('Тест пройден — прогресс сохранён автоматически'); await sleep(2200); }
    spotOff();

    if (rec) { say('Демонстрация завершена ✦ WEBLAB'); await sleep(2200); window.__REC_DONE = true; return; }
    say('Демонстрация завершена ✦ Спасибо за внимание!'); await sleep(2000); cleanup();
  }

  /* ---------- авто-старт ---------- */
  if (isCourse && /demo/.test(location.search)) { addEventListener('load', () => setTimeout(() => start(courseTour), 700)); }
  if (!isCourse && /[?&]rec=1/.test(location.search)) { addEventListener('load', () => setTimeout(() => start(homeTour), 500)); }
})();
