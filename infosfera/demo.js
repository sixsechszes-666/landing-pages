/* ============================================================
   ИНФОСФЕРА — Авто-демонстрация сайта
   Нарисованный курсор + прожектор + подписи + эмуляция кликов.
   Тур: главная → курс → авто-прохождение теста → возврат.
   ============================================================ */
(() => {
  'use strict';

  const STOP = Symbol('stop');
  const isCourse = !!document.getElementById('lessonRoot');
  const Course = window.InfosferaCourse;

  /* ---------- Построение UI демо ---------- */
  const fab = document.createElement('button');
  fab.className = 'demo-fab';
  fab.id = 'demoFab';
  fab.innerHTML = '<span class="tri">▶</span> DEMO';
  document.body.appendChild(fab);

  const cursor = document.createElement('div');
  cursor.className = 'demo-cursor';
  cursor.innerHTML =
    '<span class="ptr"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M4 2 L4 20 L9 15 L12.4 22 L15 20.8 L11.6 14 L18 14 Z" fill="#ffffff" stroke="#06120a" stroke-width="1" stroke-linejoin="round"/>' +
    '</svg></span>';
  document.body.appendChild(cursor);

  const spot = document.createElement('div');
  spot.className = 'demo-spot';
  document.body.appendChild(spot);

  const caption = document.createElement('div');
  caption.className = 'demo-caption';
  caption.innerHTML =
    '<span class="dtag">● Авто-демо</span><p id="demoCap"></p>' +
    '<button class="dstop" id="demoStop">Стоп ✕</button>';
  document.body.appendChild(caption);
  const capText = caption.querySelector('#demoCap');

  /* ---------- Состояние и хелперы ---------- */
  const state = { running: false };
  let curX = window.innerWidth / 2, curY = window.innerHeight / 2;
  let curReject = null;

  // Slow-motion factor: при записи (?rec=1) демо играется в RK раз медленнее,
  // чтобы screencast снял в RK раз больше реальных кадров → после сжатия времени ~120 fps.
  const RK = /[?&]rec=1/.test(location.search) ? 4 : 1;

  function sleep(ms) {
    return new Promise((res, rej) => {
      curReject = rej;
      setTimeout(() => { curReject = null; res(); }, ms * RK);
    });
  }
  function move(x, y, dur = 850) {
    curX = x; curY = y;
    cursor.style.transitionDuration = (dur * RK / 1000) + 's';
    cursor.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    return sleep(dur + 40);
  }
  function animScroll(toY, dur) {
    return new Promise(res => {
      const sy = window.scrollY, dy = toY - sy, t0 = performance.now(), ez = t => 1 - Math.pow(1 - t, 3);
      (function s(now) { const p = Math.min((now - t0) / dur, 1); window.scrollTo(0, sy + dy * ez(p)); p < 1 ? requestAnimationFrame(s) : res(); })(performance.now());
    });
  }
  function centerOf(el) {
    const r = el.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  }
  function moveToEl(el, dur) {
    const [x, y] = centerOf(el);
    return move(x, y, dur);
  }
  function ripple() {
    const d = document.createElement('div');
    d.className = 'demo-ripple';
    d.style.left = curX + 'px';
    d.style.top = curY + 'px';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 640);
  }
  async function clickEl(el, real = true) {
    if (el) await moveToEl(el);
    cursor.classList.add('press');
    ripple();
    await sleep(190);
    cursor.classList.remove('press');
    if (real && el) el.click();
    await sleep(150);
  }
  function say(t) { capText.textContent = t; caption.classList.add('show'); }
  function spotOn(el, pad = 12) {
    const r = el.getBoundingClientRect();
    spot.style.opacity = '1';
    spot.style.top = (r.top - pad) + 'px';
    spot.style.left = (r.left - pad) + 'px';
    spot.style.width = (r.width + pad * 2) + 'px';
    spot.style.height = (r.height + pad * 2) + 'px';
  }
  function spotOff() { spot.style.opacity = '0'; }
  async function scrollToEl(el) {
    spotOff();
    if (RK > 1) {
      const r = el.getBoundingClientRect();
      const toY = Math.max(0, r.top + window.scrollY - (window.innerHeight / 2) + (r.height / 2));
      await animScroll(toY, 700 * RK);
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    await sleep(800);
  }
  async function ensureVisible(el) {
    const r = el.getBoundingClientRect();
    if (r.top < 120 || r.bottom > window.innerHeight - 140) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await sleep(620);
    }
  }
  const $ = (s) => document.querySelector(s);

  /* ---------- Запуск / остановка ---------- */
  function cleanup() {
    state.running = false;
    spotOff();
    caption.classList.remove('show');
    cursor.classList.remove('on');
    fab.classList.remove('hidden');
    document.body.classList.remove('demo-active');
  }
  function stop() {
    if (!state.running) return;
    state.running = false;
    if (curReject) { curReject(STOP); curReject = null; }
    cleanup();
  }
  let recCssDone = false;
  function applyRecCss() {
    if (recCssDone || RK <= 1) return; recCssDone = true;
    const st = document.createElement('style');
    st.textContent =
      `.demo-spot{transition-duration:${0.6 * RK}s!important}` +
      `.demo-caption{transition-duration:${0.5 * RK}s!important}` +
      `.demo-caption .dstop{display:none!important}` +   /* убираем кнопку Стоп в записи */
      `.card{transition-duration:${0.6 * RK}s!important}` +
      `.card .ico{transition-duration:${0.5 * RK}s!important}`;
    document.head.appendChild(st);
  }

  async function start(tour) {
    if (state.running) return;
    state.running = true;
    applyRecCss();
    fab.classList.add('hidden');
    document.body.classList.add('demo-active');
    cursor.classList.add('on');
    await move(window.innerWidth / 2, window.innerHeight * 0.5, 0);
    try { await tour(); }
    catch (e) { if (e !== STOP) console.error('[demo]', e); }
  }

  fab.addEventListener('click', () => start(isCourse ? courseTour : homeTour));
  caption.querySelector('#demoStop').addEventListener('click', stop);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') stop(); });

  /* ============================================================
     СЦЕНАРИЙ: ГЛАВНАЯ
     ============================================================ */
  async function homeTour() {
    say('Добро пожаловать в ИНФОСФЕРУ — запускаю автоматическую экскурсию');
    await move(window.innerWidth / 2, window.innerHeight * 0.42, 700);
    await sleep(1300);

    const h = $('#hero h1');
    if (h) { window.scrollTo({ top: 0, behavior: 'smooth' }); await sleep(600); spotOn(h); say('Цифровой образовательный ресурс по информационным дисциплинам'); await moveToEl(h); await sleep(1900); }

    const cta = $('.nav-cta');
    if (cta) { spotOn(cta, 8); say('Начать обучение можно в один клик'); await clickEl(cta, false); await sleep(1300); }

    const st = $('.stats-grid');
    if (st) { await scrollToEl(st); spotOn(st); say('10 дисциплин, сотни уроков и более тысячи практических задач'); await moveToEl(st); await sleep(2000); }

    const dh = $('#disciplines .sec-head');
    if (dh) { await scrollToEl(dh); spotOn(dh); say('Каталог из десяти ключевых дисциплин направления'); await sleep(1600); }

    const fc = $('.card.feature');
    if (fc) { await scrollToEl(fc); spotOn(fc); say('Каждая дисциплина — это модули, теория, разбор кода и тесты'); await moveToEl(fc); await sleep(2000); }

    const cards = document.querySelectorAll('#bento .card');
    spotOff();
    if (cards[2]) { say('Наводимся на карточки — они оживают'); await moveToEl(cards[2]); await sleep(700); }
    if (cards[4]) { await moveToEl(cards[4]); await sleep(700); }
    if (cards[6]) { await moveToEl(cards[6]); await sleep(700); }

    const path = $('#path .feat-grid');
    if (path) { await scrollToEl(path); spotOn(path); say('Образовательная траектория: теория → практика → сертификат'); await sleep(2000); }

    const why = $('#why .bento');
    if (why) { await scrollToEl(why); spotOn(why); say('Интерактив, видимый прогресс и поддержка любых устройств'); await sleep(1900); }

    const go = $('.cta-banner .btn--primary');
    if (go) { await scrollToEl(go); spotOn(go, 8); say('А теперь откроем демонстрационный курс…'); await clickEl(go, false); await sleep(900); }

    spotOff();
    say('Переходим к курсу «Алгоритмы и структуры данных»…');
    await sleep(1200);
    const rec = /[?&]rec=1/.test(location.search);
    location.href = 'course.html?demo=1' + (rec ? '&rec=1' : '');
  }

  /* ============================================================
     СЦЕНАРИЙ: КУРС (+ авто-прохождение теста)
     ============================================================ */
  async function courseTour() {
    const chained = /demo/.test(location.search);

    say('Курс «Алгоритмы и структуры данных»: 10 модулей и тесты');
    await move(window.innerWidth / 2, window.innerHeight * 0.45, 700);
    await sleep(1400);

    const syl = $('#syllabus');
    if (syl) { await scrollToEl(syl); spotOn(syl); say('Слева — интерактивная программа курса из десяти модулей'); await moveToEl(syl); await sleep(1800); }

    // Открываем модуль 2
    const m2 = Course && Course.modButton ? Course.modButton(1) : null;
    if (m2) {
      spotOn(m2, 6);
      say('Открываем модуль «Анализ сложности · Big-O»');
      await clickEl(m2, false);
      if (Course) Course.selectModule(1);
      await sleep(1000);
    }

    const h2 = $('#lessonRoot h2');
    if (h2) { await scrollToEl(h2); spotOff(); say('Подробная теория, изложенная простым языком'); await sleep(1500); }

    const vis = $('#lessonRoot .bigO') || $('#lessonRoot .code');
    if (vis) { await scrollToEl(vis); spotOn(vis); say('Наглядные визуализации и живые примеры кода'); await sleep(1800); }

    const quiz = $('#lessonRoot .quiz');
    if (quiz) { await scrollToEl(quiz); spotOn(quiz); say('А вот и тест — пройду его автоматически'); await sleep(1600); }

    // Авто-прохождение теста
    let guard = 0;
    while (Course && !Course.finished && guard++ < 14) {
      const opt = Course.correctOpt;
      if (!opt) break;
      spotOff();
      say('Выбираю правильный вариант ответа');
      await ensureVisible(opt);
      await clickEl(opt, true);
      await sleep(1600); // читаем объяснение
      const nb = Course.qnextBtn;
      if (!nb) break;
      say('Перехожу к следующему вопросу');
      await ensureVisible(nb);
      await clickEl(nb, true);
      await sleep(1000);
    }

    const sc = $('#lessonRoot .qscore');
    if (sc) { await scrollToEl(sc); spotOn(sc); say('Тест пройден на отлично — прогресс сохранён автоматически'); await sleep(2200); }
    spotOff();

    const rec = /[?&]rec=1/.test(location.search);
    if (rec) {
      say('Демонстрация завершена ✦ ИНФОСФЕРА');
      await sleep(2200);
      window.__REC_DONE = true;   // сигнал для записи
      return;
    }
    if (chained) {
      say('Экскурсия завершена — возвращаемся на главную ✦');
      await sleep(1800);
      location.href = 'index.html';
    } else {
      say('Демонстрация завершена ✦ Спасибо за внимание!');
      await sleep(2000);
      cleanup();
    }
  }

  /* ---------- Авто-старт на странице курса при переходе из главной ---------- */
  if (isCourse && /demo/.test(location.search)) {
    window.addEventListener('load', () => { setTimeout(() => start(courseTour), 700); });
  }
  // авто-старт записи с главной (?rec=1)
  if (!isCourse && /[?&]rec=1/.test(location.search)) {
    window.addEventListener('load', () => { setTimeout(() => start(homeTour), 500); });
  }
})();
