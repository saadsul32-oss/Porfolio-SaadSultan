(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var EMAIL = 'saadsul32@gmail.com', GH = 'saadsul32-oss';
  var LINKEDIN = 'https://linkedin.com/in/saad-sultan-29b80340b';
  /* Optional extra contact details. Fill these in and they appear in the Contact section. */
  var CONTACT_EXTRA = { phone: '', whatsapp: '' }; // e.g. phone: '+92 300 0000000', whatsapp: '923000000000'
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var hasG = !!(window.gsap && window.ScrollTrigger);
  var root = document.documentElement, body = document.body;
  var lenis = null;
  var animate = hasG && !reduce;

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  function showAll() { root.classList.add('no-anim'); }
  function finalCounters() { $$('[data-count]').forEach(function (n) { n.textContent = n.dataset.count; }); }
  function plateNode(id) {
    var im = new Image(); im.src = 'assets/images/projects/' + id + '.jpg'; im.decoding = 'async';
    im.alt = (P[id] ? P[id].name : 'Project') + ' website preview'; im.width = 1600; im.height = 1000; return im;
  }
  function goTo(sel) {
    var t = $(sel); if (!t) return;
    if (lenis) lenis.scrollTo(sel === '#top' ? 0 : t, { offset: sel === '#top' ? 0 : -60, duration: 1.4 });
    else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ---------- Project data ---------- */
  var ORDER = ['trade', 'export', 'fur', 'fan', 'zivora', 'paarees', 'aurora'];
  var P = {
    trade: { name: 'TradeSphere AI', kind: 'Platform. PHP, MySQL.',
      summary: 'A global trade intelligence SaaS built around the problems Pakistani small exporters face. It began in a hackathon context and grew from a static prototype into a full platform.',
      built: ['Started as an HTML, CSS, and JavaScript frontend prototype, then rebuilt as a PHP/MySQL SaaS with 36+ files.', 'Authentication, user dashboard, admin panel, and a database schema.', 'A cinematic redesign of every public page, the dashboard, and the admin panel, with a Three.js globe and GSAP motion.', 'A security and functionality audit: password hashing, CSRF protection, session handling, and missing pages.'],
      stack: 'PHP, MySQL, Three.js, GSAP', links: [['Source on GitHub', 'https://github.com/' + GH]] },
    export: { name: 'ExportEase', kind: 'Platform. PHP, MySQL.',
      summary: 'An export guidance platform for Pakistani small businesses that want to sell abroad but do not know where to start.',
      built: ['A PHP/MySQL platform with a full admin panel.', 'Several theme iterations, settled on a calm teal theme that keeps complex information readable.', 'A 10-slide PowerPoint and an early pitch deck for a professor presentation.', 'Built alongside TradeSphere AI from the same exporter research.'],
      stack: 'PHP, MySQL, admin panel', links: [['Source on GitHub', 'https://github.com/' + GH]] },
    fur: { name: 'FurShield', kind: 'Platform. PHP 8, PDO.',
      summary: 'A pet care platform with separate flows for pet owners, veterinarians, shelters, and admins. Built for the Aptech TechWiz Pet Care brief.',
      built: ['Role-based access across four user types.', 'Multi-pet health records, appointments, and adoption enquiries.', 'A product catalog with a cart (no payment), care content, and scheduled reminders.', 'Plain PHP 8 with PDO and MySQL, no framework, on a Bootstrap 5 frontend.'],
      stack: 'PHP 8, PDO, MySQL, Bootstrap 5', links: [['Source on GitHub', 'https://github.com/' + GH]] },
    fan: { name: 'Fan Hub Plus', kind: 'Community portal. PHP, Tailwind.',
      summary: 'A fandom universe covering anime, gaming, movies, TV, K-Pop, comics, manga, and cosplay. Built for the TechWiz7 Aptech brief.',
      built: ['A 3D drag-rotate card carousel and a kinetic text loader.', 'Smooth scroll and scroll-driven animation throughout.', 'A 27-issue usability audit on the live site, with fixes applied to the code.'],
      stack: 'PHP, Tailwind, JavaScript', links: [['Live site', 'https://fanhubplus.site.je'], ['Source on GitHub', 'https://github.com/' + GH + '/Fan_Hub_Plus']] },
    zivora: { name: 'ZIVORA', kind: 'Brand site. Vite, Three.js.',
      summary: 'A luxury perfume brand site in black, burgundy, and champagne gold, run as a single-page app.',
      built: ['A Three.js bottle reveal, where fabric lifts away to unveil the bottle, then the logo, headline, and calls to action in order.', 'A scroll-driven story: product collection, fragrance notes pyramid, and campaign sections.', 'Lenis smooth scroll, a custom cursor, and a preloader.', 'Responsive from 1440px down to 375px.'],
      stack: 'Vite, Three.js, GSAP, Lenis', links: [['Source on GitHub', 'https://github.com/' + GH]] },
    paarees: { name: 'Paarees Luxury Scents', kind: 'Brand storefront. HTML, CSS, JS.',
      summary: 'A premium storefront for a fragrance brand, designed around mood and clear product presentation.',
      built: ['A polished layout with micro-interactions.', 'Responsive on every screen size.', 'Built as an Aptech E-Project.'],
      stack: 'HTML, CSS, JavaScript', links: [['Live site', 'https://paarees-luxury-scents.netlify.app/'], ['Source on GitHub', 'https://github.com/' + GH + '/PAAREES-PERFUME']] },
    aurora: { name: 'AuroraSphere', kind: '3D data experience. Three.js.',
      summary: 'A digital cosmos app that shows auroral activity through an interactive 3D visualization.',
      built: ['An interactive 3D scene built with Three.js.', 'A dashboard of solar wind and geomagnetic indices.', 'A holographic interface style over live-feeling data.'],
      stack: 'Three.js, JavaScript, data visualization', links: [['Live site', 'https://aurorasphere.netlify.app/'], ['Source on GitHub', 'https://github.com/' + GH]] }
  };

  /* ---------- Plates ---------- */

  /* ---------- Clock (Pakistan time) ---------- */
  var fmt; try { fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false }); } catch (e) { fmt = null; }
  function tick() { var s = fmt ? fmt.format(new Date()) : '--:--'; $('#clock').textContent = s; $('#clock2').textContent = s; }
  tick(); setInterval(tick, 20000);

  /* ---------- Mobile menu ---------- */
  var nav = $('#nav'), menu = $('#menu'), mpanel = $('#m-panel');
  function setMenu(open) { mpanel.classList.toggle('open', open); menu.setAttribute('aria-expanded', open ? 'true' : 'false'); menu.textContent = open ? 'Close' : 'Menu'; if (lenis) { if (open) lenis.stop(); else lenis.start(); } body.style.overflow = open ? 'hidden' : ''; }
  menu.addEventListener('click', function () { setMenu(!mpanel.classList.contains('open')); });
  $$('a', mpanel).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  var links = $$('.nav-links a'), navLinks = $('#nav-links'), ind = $('#nav-ind');
  function moveInd(a) {
    if (!a) { ind.style.opacity = 0; return; }
    ind.style.opacity = 1; ind.style.width = a.offsetWidth + 'px'; ind.style.transform = 'translateX(' + a.offsetLeft + 'px)';
  }
  function activeLink() { return $('.nav-links a.on'); }
  links.forEach(function (a) {
    a.addEventListener('mouseenter', function () { moveInd(a); });
    a.addEventListener('focus', function () { moveInd(a); });
  });
  navLinks.addEventListener('mouseleave', function () { moveInd(activeLink()); });
  window.addEventListener('resize', function () { moveInd(activeLink()); });
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var on = false;
      links.forEach(function (a) { var m = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('on', m); if (m) on = true; });
      moveInd(on ? activeLink() : null);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(function (s) { spy.observe(s); });

  /* ---------- Case study (full screen) ---------- */
  var caseDlg = $('#case'), caseIn = $('#case-in'), lastFocus = null, busy = false, curCase = null;
  function pad2(n) { return ('0' + n).slice(-2); }
  function buildCase(id) {
    var d = P[id], i = ORDER.indexOf(id), next = ORDER[(i + 1) % ORDER.length];
    curCase = id; caseIn.textContent = '';
    var top = el('div', 'case-top');
    var close = el('button', 'btn btn-ghost', 'Close'); close.type = 'button'; close.addEventListener('click', closeCase);
    top.appendChild(close); top.appendChild(el('span', 'count num', pad2(i + 1) + ' / ' + pad2(ORDER.length)));
    caseIn.appendChild(top);
    var b = el('div', 'case-body');
    b.appendChild(el('p', 'case-kind', d.kind));
    var h = el('h2', 'case-title', d.name); h.id = 'case-title'; b.appendChild(h);
    var pl = el('div', 'case-plate'); pl.appendChild(plateNode(id)); b.appendChild(pl);
    var cols = el('div', 'case-cols');
    cols.appendChild(el('p', 'case-sum', d.summary));
    var side = el('div', 'case-side');
    var s1 = el('section'); s1.appendChild(el('h3', '', 'What I built'));
    var ul = el('ul', 'case-built'); d.built.forEach(function (x) { ul.appendChild(el('li', '', x)); }); s1.appendChild(ul); side.appendChild(s1);
    var s2 = el('section'); s2.appendChild(el('h3', '', 'Stack')); s2.appendChild(el('p', 'case-stack', d.stack)); side.appendChild(s2);
    var s3 = el('section', 'case-acts');
    d.links.forEach(function (l, k) { var a = el('a', 'btn ' + (k === 0 ? 'btn-solid' : 'btn-ghost'), l[0]); a.href = l[1]; a.target = '_blank'; a.rel = 'noopener'; s3.appendChild(a); });
    side.appendChild(s3); cols.appendChild(side); b.appendChild(cols); caseIn.appendChild(b);
    var nx = el('button', 'case-next'); nx.type = 'button';
    var tx = el('span'); tx.appendChild(el('small', '', 'Next project')); tx.appendChild(el('b', '', P[next].name)); nx.appendChild(tx);
    nx.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>');
    nx.addEventListener('click', function () { switchCase(next); });
    caseIn.appendChild(nx);
    caseDlg.setAttribute('aria-labelledby', 'case-title');
  }
  function openCase(id) {
    if (!P[id] || busy) return false;
    lastFocus = document.activeElement; buildCase(id); caseIn.scrollTop = 0;
    if (!caseDlg.open) caseDlg.showModal();
    if (lenis) lenis.stop();
    if (animate) {
      busy = true;
      gsap.fromTo(caseDlg, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .95, ease: 'power4.inOut', onComplete: function () { caseDlg.style.clipPath = ''; busy = false; } });
      gsap.from('.case-kind, .case-title, .case-plate', { y: 70, opacity: 0, duration: 1.1, ease: 'power4.out', stagger: .1, delay: .35 });
    }
    return true;
  }
  function switchCase(id) {
    if (!animate) { buildCase(id); caseIn.scrollTop = 0; return; }
    gsap.to(caseIn, { opacity: 0, duration: .25, onComplete: function () {
      buildCase(id); caseIn.scrollTop = 0;
      gsap.to(caseIn, { opacity: 1, duration: .4 });
      gsap.from('.case-title, .case-plate', { y: 50, opacity: 0, duration: .9, ease: 'power4.out', stagger: .08 });
    } });
  }
  function closeCase() {
    if (!caseDlg.open || busy) return;
    function done() { caseDlg.close(); caseDlg.style.clipPath = ''; busy = false; if (lenis) lenis.start(); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    if (animate) { busy = true; gsap.to(caseDlg, { clipPath: 'inset(0% 0% 100% 0%)', duration: .75, ease: 'power4.inOut', onComplete: done }); }
    else done();
  }
  caseDlg.addEventListener('cancel', function (e) { e.preventDefault(); closeCase(); });
  $$('[data-open]').forEach(function (b) { b.addEventListener('click', function () { openCase(b.dataset.open); }); });

  /* ---------- Command menu (Ctrl/Cmd + K) ---------- */
  var cmd = $('#cmdk'), cmdIn = $('#cmd-in'), cmdList = $('#cmd-list'), cmdItems = [], cmdSel = 0;
  function copyEmail() {
    function ok() { var n = $('#form-note'); if (n) { n.className = 'form-note'; n.textContent = 'Email address copied.'; } }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(EMAIL).then(ok, function () {});
    else { var t = el('textarea'); t.value = EMAIL; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) {} t.remove(); }
  }
  var ALL = [
    { g: 'Navigate', t: 'Work', s: 'Section', run: function () { goTo('#work'); } },
    { g: 'Navigate', t: 'Services', s: 'Section', run: function () { goTo('#services'); } },
    { g: 'Navigate', t: 'Process', s: 'Section', run: function () { goTo('#process'); } },
    { g: 'Navigate', t: 'Find me online', s: 'GitHub and LinkedIn', run: function () { goTo('#online'); } },
    { g: 'Navigate', t: 'About', s: 'Section', run: function () { goTo('#about'); } },
    { g: 'Navigate', t: 'Contact', s: 'Section', run: function () { goTo('#contact'); } }
  ].concat(ORDER.map(function (id) { return { g: 'Projects', t: P[id].name, s: 'Case study', run: function () { openCase(id); } }; })).concat([
    { g: 'Actions', t: 'Copy email address', s: EMAIL, run: copyEmail },
    { g: 'Actions', t: 'Write an email', s: 'Mail app', run: function () { window.location.href = 'mailto:' + EMAIL; } },
    { g: 'Actions', t: 'Open GitHub profile', s: 'New tab', run: function () { window.open('https://github.com/' + GH, '_blank', 'noopener'); } },
    { g: 'Actions', t: 'Open LinkedIn profile', s: 'New tab', run: function () { window.open(LINKEDIN, '_blank', 'noopener'); } },
    { g: 'Actions', t: 'Download CV', s: 'PDF', run: function () { window.location.href = 'assets/docs/cv-placeholder.pdf'; } }
  ]);
  function renderCmd() {
    var q = cmdIn.value.trim().toLowerCase(), last = '';
    cmdList.textContent = ''; cmdItems = [];
    var list = ALL.filter(function (x) { return !q || (x.t + ' ' + x.s + ' ' + x.g).toLowerCase().indexOf(q) > -1; });
    if (!list.length) { cmdList.appendChild(el('li', 'none', 'No results for "' + cmdIn.value + '".')); return; }
    list.forEach(function (x) {
      if (x.g !== last) { var g = el('li', 'grp', x.g); g.setAttribute('role', 'presentation'); cmdList.appendChild(g); last = x.g; }
      var li = el('li'); li.setAttribute('role', 'option'); li.id = 'cmd-' + cmdItems.length;
      li.appendChild(el('span', '', x.t)); li.appendChild(el('small', '', x.s));
      var idx = cmdItems.length; cmdItems.push({ li: li, x: x });
      li.addEventListener('mousemove', function () { selectCmd(idx); });
      li.addEventListener('click', function () { runCmd(idx); });
      cmdList.appendChild(li);
    });
    selectCmd(0);
  }
  function selectCmd(i) {
    if (!cmdItems.length) return;
    cmdSel = (i + cmdItems.length) % cmdItems.length;
    cmdItems.forEach(function (c, k) { c.li.setAttribute('aria-selected', k === cmdSel ? 'true' : 'false'); });
    var li = cmdItems[cmdSel].li; cmdIn.setAttribute('aria-activedescendant', li.id);
    if (li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
  }
  function runCmd(i) { var c = cmdItems[i]; if (!c) return; cmd.close(); setTimeout(c.x.run, 60); }
  function openCmd() { if (cmd.open) return; cmdIn.value = ''; renderCmd(); cmd.showModal(); cmdIn.focus(); }
  cmdIn.addEventListener('input', renderCmd);
  cmdIn.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); selectCmd(cmdSel + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selectCmd(cmdSel - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); runCmd(cmdSel); }
  });
  cmd.addEventListener('click', function (e) { if (e.target === cmd) cmd.close(); });
  $('#cmd-open').addEventListener('click', openCmd);
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (cmd.open) cmd.close(); else openCmd(); }
  });

  /* =========================================================
     Contact form
  ========================================================= */
  var f = $('#form'), note = $('#form-note');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('#f-name'), m = $('#f-email'), g = $('#f-msg'), ok = true;
    [[n, !n.value.trim()], [m, !/^\S+@\S+\.\S+$/.test(m.value.trim())], [g, !g.value.trim()]].forEach(function (x) {
      x[0].setAttribute('aria-invalid', x[1] ? 'true' : 'false'); if (x[1]) ok = false;
    });
    if (!ok) { note.className = 'form-note err'; note.textContent = 'Add your name, a valid email, and a short message.'; return; }
    note.className = 'form-note'; note.textContent = 'Opening your email app with this message.';
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Project enquiry from ' + n.value.trim()) + '&body=' + encodeURIComponent(g.value.trim() + '\n\n' + n.value.trim() + '\n' + m.value.trim());
  });

  /* ---------- Contact details: extras + copy ---------- */
  (function () {
    var d = $('#details'); if (!d) return;
    function row(label, node) { var r = el('div'), dt = el('dt', '', label), dd = el('dd'); dd.appendChild(node); r.appendChild(dt); r.appendChild(dd); d.appendChild(r); }
    if (CONTACT_EXTRA.phone) { var a = el('a', '', CONTACT_EXTRA.phone); a.href = 'tel:' + CONTACT_EXTRA.phone.replace(/[^+\d]/g, ''); row('Phone', a); }
    if (CONTACT_EXTRA.whatsapp) { var w = el('a', '', 'Message on WhatsApp'); w.href = 'https://wa.me/' + CONTACT_EXTRA.whatsapp.replace(/\D/g, ''); w.target = '_blank'; w.rel = 'noopener'; row('WhatsApp', w); }
    var cb = $('#copy-mail'); if (!cb) return;
    cb.addEventListener('click', function () { copyEmail(); cb.textContent = 'Copied'; setTimeout(function () { cb.textContent = 'Copy'; }, 1600); });
  })();

  /* =========================================================
     Cursor + project preview (fine pointers only)
  ========================================================= */
  function initPointerFx() {
    if (!fine || !animate) return;
    var cur = $('#cursor'), label = $('#cursor-t');
    cur.classList.add('on'); root.classList.add('has-cursor');
    var qx = gsap.quickTo(cur, 'x', { duration: .35, ease: 'power3' }), qy = gsap.quickTo(cur, 'y', { duration: .35, ease: 'power3' });
    window.addEventListener('pointermove', function (e) {
      if (!cur.classList.contains('live')) { gsap.set(cur, { x: e.clientX, y: e.clientY }); cur.classList.add('live'); }
      qx(e.clientX); qy(e.clientY);
    }, { passive: true });
    document.addEventListener('pointerover', function (e) {
      var t = e.target.closest ? e.target : null; if (!t) return;
      var view = t.closest('[data-cursor="view"]'), link = t.closest('a,button,summary,input,textarea,label,[data-cursor="link"]');
      cur.classList.toggle('view', !!view); cur.classList.toggle('link', !view && !!link);
      label.textContent = view ? 'Open' : '';
    });

    if (window.matchMedia('(min-width: 901px)').matches) {
      var pv = $('#pv'), idx = $('#idx'), shown = null;
      var px = gsap.quickTo(pv, 'x', { duration: .7, ease: 'power3' }), py = gsap.quickTo(pv, 'y', { duration: .7, ease: 'power3' });
      gsap.set(pv, { scale: .88, rotation: -3 });
      idx.addEventListener('pointermove', function (e) { px(e.clientX + 48); py(e.clientY - 130); });
      $$('.idx-row').forEach(function (row) {
        row.addEventListener('pointerenter', function (e) {
          var id = row.dataset.id;
          if (shown === null) gsap.set(pv, { x: e.clientX + 48, y: e.clientY - 130 });
          if (shown !== id) { pv.textContent = ''; pv.appendChild(plateNode(id)); shown = id; }
          gsap.to(pv, { opacity: 1, scale: 1, rotation: 0, duration: .55, ease: 'power3.out', overwrite: 'auto' });
        });
      });
      idx.addEventListener('pointerleave', function () { shown = null; gsap.to(pv, { opacity: 0, scale: .9, rotation: -3, duration: .35, ease: 'power2.in', overwrite: 'auto' }); });
    }
  }

  /* =========================================================
     Motion (Lenis + GSAP ScrollTrigger)
  ========================================================= */
  function splitTo(rootEl, cls, mask) {
    var walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      if (!n.textContent.trim()) return;
      var frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
        if (mask) { var w = el('span', 'w'); w.appendChild(el('span', 'wi', part)); frag.appendChild(w); }
        else frag.appendChild(el('span', cls, part));
      });
      n.parentNode.replaceChild(frag, n);
    });
    return $$(mask ? '.wi' : '.' + cls, rootEl);
  }

  function initMotion() {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduce && window.Lenis) {
      lenis = new Lenis({ duration: 1.25, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href'); if (id === '#') return;
        if (!$(id)) return; e.preventDefault(); goTo(id);
      });
    });

    gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0 } });
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) {
      var y = s.scroll(); nav.classList.toggle('solid', y > 40);
      nav.classList.toggle('hide', s.direction === 1 && y > 480 && !mpanel.classList.contains('open'));
    } });

    /* hero start state */
    gsap.set('.hni', { yPercent: 115 });
    gsap.set('[data-hero]', { opacity: 0, y: 22 });
    gsap.set('#sculpt', { clipPath: 'inset(100% 0% 0% 0% round 32px)' });
    gsap.set('.svc3', { opacity: 0, y: 60 });
    gsap.set('.hero-strip', { opacity: 0 });
    gsap.to('#sculpt', { yPercent: -5, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
    if (window.__sculpt) ScrollTrigger.create({ trigger: '#top', start: 'top top', end: 'bottom top', scrub: true, onUpdate: function (s) { window.__sculpt.setScroll(s.progress); } });

    /* headings: masked word reveal */
    $$('.rv').forEach(function (h) {
      var words = splitTo(h, '', true); gsap.set(words, { yPercent: 115 });
      ScrollTrigger.create({ trigger: h, start: 'top 88%', once: true, onEnter: function () { gsap.to(words, { yPercent: 0, duration: 1.3, ease: 'power4.out', stagger: .07 }); } });
    });

    /* intro: scrubbed word reveal, pills grow */
    var it = $('#intro-text'), sw = splitTo(it, 'sw', false);
    gsap.fromTo(sw, { opacity: .18 }, { opacity: 1, ease: 'none', stagger: .12, scrollTrigger: { trigger: it, start: 'top 82%', end: 'bottom 55%', scrub: true } });
    $$('.pill').forEach(function (p) {
      gsap.fromTo(p, { width: '0em', marginLeft: 0, marginRight: 0 }, { width: '1.9em', marginLeft: '.06em', marginRight: '.06em', ease: 'none', scrollTrigger: { trigger: p, start: 'top 85%', end: 'top 55%', scrub: true } });
    });
    $$('[data-count]').forEach(function (n) {
      var to = parseInt(n.dataset.count, 10), o = { v: 0 };
      ScrollTrigger.create({ trigger: n, start: 'top 92%', once: true, onEnter: function () { gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: function () { n.textContent = Math.round(o.v); } }); } });
    });

    /* work rows */
    $$('.idx-row').forEach(function (r) {
      gsap.from(r, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 94%', once: true } });
    });
    /* disciplines + process + about + contact */
    $$('.disc-list li').forEach(function (li) { gsap.from(li, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: li, start: 'top 92%', once: true } }); });
    /* process: sticky counter follows the active step */
    var pSteps = $$('.pstep'), pCur = 0, pNum = $('#pc-big'), pTitle = $('#pc-title'), pCnt = $('#pc-cur'), pBar = $('#pc-bar'), pNav = $$('.proc-nav button');
    function setStep(i) {
      if (i === pCur) return; var dir = i > pCur ? 1 : -1; pCur = i;
      pSteps.forEach(function (s, k) { s.classList.toggle('on', k === i - 1); });
      pNav.forEach(function (b, k) { b.classList.toggle('on', k === i - 1); });
      var t = pSteps[i - 1].dataset.title, n = '0' + i;
      pCnt.textContent = n;
      [[pNum, n], [pTitle, t]].forEach(function (p) {
        gsap.to(p[0], { yPercent: -110 * dir, duration: .28, ease: 'power2.in', onComplete: function () {
          p[0].textContent = p[1]; gsap.fromTo(p[0], { yPercent: 110 * dir }, { yPercent: 0, duration: .7, ease: 'power4.out' });
        } });
      });
      gsap.to(pBar, { scaleX: i / pSteps.length, duration: .8, ease: 'power3.out' });
    }
    pSteps.forEach(function (s, i) {
      ScrollTrigger.create({ trigger: s, start: 'top 58%', end: 'bottom 58%', onToggle: function (self) { if (self.isActive) { setStep(i + 1); s.classList.add('drawn'); } } });
      ScrollTrigger.create({ trigger: s, start: 'top 85%', once: true, onEnter: function () { s.classList.add('drawn'); } });
    });
    pNav.forEach(function (b) { b.addEventListener('click', function () { var s = pSteps[parseInt(b.dataset.go, 10) - 1]; if (lenis) lenis.scrollTo(s, { offset: -140, duration: 1.4 }); else s.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }); });
    gsap.from('.soc', { y: 70, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: .12, scrollTrigger: { trigger: '.social', start: 'top 88%', once: true } });
    gsap.from('.details > div', { y: 24, opacity: 0, duration: .9, ease: 'power3.out', stagger: .06, scrollTrigger: { trigger: '.details', start: 'top 92%', once: true } });
    gsap.from('.about-r > *', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: '.about-r', start: 'top 85%', once: true } });
    gsap.from('.mail', { y: 60, opacity: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: '.mail', start: 'top 92%', once: true } });
    gsap.from('.contact-grid > *', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: .12, scrollTrigger: { trigger: '.contact-grid', start: 'top 88%', once: true } });

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

  function heroIntro() {
    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hni', { yPercent: 0, duration: 1.5, stagger: .14 }, 0)
      .to('#sculpt', { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.6, ease: 'power4.inOut' }, .1)
      .to('[data-hero]', { opacity: 1, y: 0, duration: 1.1, stagger: .09 }, .45)
      .to('.svc3', { opacity: 1, y: 0, duration: 1.2, stagger: .12 }, .8)
      .to('.hero-strip', { opacity: 1, duration: 1 }, 1.3)
      .to('#nav', { opacity: 1, duration: .9 }, .7);
  }

  /* =========================================================
     Boot
  ========================================================= */
  var pre = $('#pre');
  function finishPre() { if (pre && pre.parentNode) pre.parentNode.removeChild(pre); body.classList.remove('is-loading'); }

  if (!animate) { showAll(); finalCounters(); finishPre(); return; }
  setTimeout(function () { if (pre && pre.parentNode) { showAll(); finalCounters(); finishPre(); } }, 7000); // failsafe

  if (window.initSculpture) { window.__sculpt = window.initSculpture($('#sculpt-c'), { start: 0.5 }); if (window.__sculpt) $('#sculpt').classList.add('live'); }
  initMotion();
  initPointerFx();
  body.classList.add('is-loading');
  var ready = false, minDone = false, bar = $('#pre-i');
  function go() {
    if (!(ready && minDone)) return;
    gsap.to(pre, { yPercent: -100, duration: 1, ease: 'power4.inOut', onComplete: finishPre });
    setTimeout(heroIntro, 450);
    setTimeout(function () { ScrollTrigger.refresh(); }, 1600);
  }
  gsap.to(bar, { scaleX: 1, duration: 1.2, ease: 'power2.inOut', onComplete: function () { minDone = true; go(); } });
  var fonts = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise(function (r) { setTimeout(r, 2500); })]).then(function () { ready = true; go(); });
})();
