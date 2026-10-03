/* ============================================================
   ИНФОСФЕРА — interactions & motion
   ============================================================ */
(() => {
  'use strict';

  /* ---------- Hero entrance ---------- */
  const hero = document.getElementById('hero');
  if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('in')));

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .feat').forEach((el) => io.observe(el));

  /* ---------- Animated counters ---------- */
  const fmt = (n) => n.toLocaleString('ru-RU');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const dur = 1500, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

  /* ---------- Nav: hide on scroll down, show on up + shadow ---------- */
  const nav = document.getElementById('nav');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 30);
      if (y > lastY && y > 320) nav.classList.add('hidden');
      else nav.classList.remove('hidden');
    }
    // progress bar
    const prog = document.getElementById('scrollProg');
    if (prog) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Parallax orbs (rAF-throttled) ---------- */
  const orbs = document.querySelectorAll('.orb');
  let ticking = false;
  const parallax = () => {
    const y = window.scrollY;
    orbs.forEach((o) => {
      const s = parseFloat(o.dataset.speed) || 0.1;
      o.style.transform = `translate3d(0, ${y * s}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
  }, { passive: true });

  /* ---------- Card glow follows cursor ---------- */
  document.querySelectorAll('.card').forEach((card) => {
    const glow = card.querySelector('[data-glow]');
    if (!glow) return;
    card.addEventListener('pointermove', (ev) => {
      const r = card.getBoundingClientRect();
      glow.style.left = (ev.clientX - r.left) + 'px';
      glow.style.top  = (ev.clientY - r.top)  + 'px';
    });
  });

  /* ---------- Magnetic buttons ---------- */
  const magnets = document.querySelectorAll('.btn--primary, .nav-cta');
  magnets.forEach((m) => {
    m.addEventListener('pointermove', (ev) => {
      const r = m.getBoundingClientRect();
      const mx = ev.clientX - r.left - r.width / 2;
      const my = ev.clientY - r.top - r.height / 2;
      m.style.transform = `translate(${mx * 0.18}px, ${my * 0.28}px)`;
    });
    m.addEventListener('pointerleave', () => { m.style.transform = ''; });
  });

  /* ---------- Mobile menu morph ---------- */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    const toggle = () => {
      const open = burger.classList.toggle('open');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', toggle);
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      burger.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = '';
    }));
  }
})();
