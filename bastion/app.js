/* BASTION — interactions */
(() => {
  'use strict';

  // reveal
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // counters
  const cio = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suf = el.dataset.suffix || '';
      const dur = 1200, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

  // nav hide + progress
  const nav = document.getElementById('nav');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (nav) { if (y > lastY && y > 240) nav.classList.add('hidden'); else nav.classList.remove('hidden'); }
    const p = document.getElementById('prog');
    if (p) { const h = document.documentElement.scrollHeight - innerHeight; p.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'; }
    lastY = y;
  }, { passive: true });

  // clock telemetry
  const clk = document.getElementById('clock');
  if (clk) {
    const t = () => { const d = new Date(); clk.textContent = d.toTimeString().slice(0, 8) + ' UTC' + (d.getTimezoneOffset() <= 0 ? '+' : '-') + Math.abs(d.getTimezoneOffset() / 60); };
    t(); setInterval(t, 1000);
  }

  // mobile
  const burger = document.getElementById('burger'), mob = document.getElementById('mobile');
  if (burger && mob) {
    const tg = () => { const o = burger.classList.toggle('open'); mob.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : ''; };
    burger.addEventListener('click', tg);
    mob.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { burger.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow = ''; }));
  }
})();
