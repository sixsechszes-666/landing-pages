/* WEBLAB — interactions */
(() => {
  'use strict';

  // scroll reveal
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // counters
  const fmt = (n) => n.toLocaleString('ru-RU');
  const cio = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suf = el.dataset.suffix || '';
      const dur = 1400, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased)) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

  // nav hide/show + progress
  const nav = document.getElementById('nav');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 24);
      if (y > lastY && y > 300) nav.classList.add('hidden'); else nav.classList.remove('hidden');
    }
    const p = document.getElementById('prog');
    if (p) { const h = document.documentElement.scrollHeight - innerHeight; p.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'; }
    lastY = y;
  }, { passive: true });

  // parallax blobs
  const blobs = document.querySelectorAll('.blob');
  let tick = false;
  addEventListener('scroll', () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      blobs.forEach((b) => { const s = parseFloat(b.dataset.speed) || 0.1; b.style.transform = `translate3d(0,${y * s}px,0)`; });
      tick = false;
    });
  }, { passive: true });

  // mobile menu
  const burger = document.getElementById('burger'), menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    const t = () => { const o = burger.classList.toggle('open'); menu.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : ''; };
    burger.addEventListener('click', t);
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { burger.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = ''; }));
  }
})();
