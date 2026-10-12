/* 3D "code" scene: a floating editor window that types real code, and a metallic </> glyph.
   Exposes window.initSculpture(canvas, opts). Name kept so main.js does not change. */
(function () {
  'use strict';

  var CODE = [
    '// beyondev.js',
    'const developer = {',
    '  name: "Saad Sultan",',
    '  role: "Web developer",',
    '  stack: ["PHP", "MySQL", "JS"],',
    '  motion: ["GSAP", "Three.js"],',
    '  openToWork: true,',
    '};',
    '',
    'function build(idea) {',
    '  return design(idea)',
    '    .withDatabase()',
    '    .launch();',
    '}'
  ];
  var COL = { bg: '#0b2a23', bar: '#0f362d', gut: '#5f8a79', cream: '#f2e8d0', gold: '#e4c780', mint: '#9ad9b6', mute: '#6f9a88', dots: ['#e4c780', '#f2e8d0', '#9ad9b6'] };

  function tokenize(s) {
    var out = [], re = /(\/\/.*$)|("[^"]*")|\b(const|function|return)\b|\b(true|false)\b|([A-Za-z_]\w*)(?=\()|(\.[A-Za-z_]\w*)|(\s+)|(.)/g, m;
    while ((m = re.exec(s))) {
      var c = COL.cream;
      if (m[1]) c = COL.mute; else if (m[2]) c = COL.mint; else if (m[3]) c = COL.gold; else if (m[4]) c = COL.gold;
      else if (m[5]) c = COL.gold; else if (m[6]) c = COL.mint;
      out.push({ t: m[0], c: c });
    }
    return out;
  }
  var TOKENS = CODE.map(tokenize);
  var TOTAL = CODE.reduce(function (a, l) { return a + l.length + 1; }, 0);

  window.initSculpture = function (canvas, opts) {
    opts = opts || {};
    var T = window.THREE; if (!T || !canvas) return null;
    var renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, preserveDrawingBuffer: !!opts.preserve }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(32, 1, 0.1, 60); cam.position.set(0, 0.1, 9.2);

    /* ---- studio environment for metal reflections ---- */
    var envScene = new T.Scene();
    envScene.add(new T.Mesh(new T.SphereGeometry(10, 32, 16), new T.ShaderMaterial({
      side: T.BackSide,
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vP; void main(){ float h = vP.y*0.5+0.5; vec3 top = vec3(0.70,0.62,0.46); vec3 mid = vec3(0.17,0.14,0.09); vec3 bot = vec3(0.015,0.05,0.04); vec3 c = mix(bot, mid, smoothstep(0.0,0.5,h)); c = mix(c, top, smoothstep(0.5,1.0,h)); gl_FragColor = vec4(c,1.0); }'
    })));
    function panel(w, h, x, y, z, i) {
      var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(i, i * 0.96, i * 0.88), side: T.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m);
    }
    panel(5, 2.6, -6, 3.2, 4, 14); panel(2.4, 7, 6.5, 0.5, 2, 10); panel(9, 1.6, 0, 7.5, -1, 12); panel(1.6, 9, -3.5, 0, -7, 8); panel(4, 1.2, 2, -3, 6, 5);
    scene.environment = new T.PMREMGenerator(renderer).fromScene(envScene, 0.02).texture;

    var green = new T.MeshPhysicalMaterial({ color: 0x2a8062, metalness: 0.9, roughness: 0.14, clearcoat: 0.9, clearcoatRoughness: 0.08, envMapIntensity: 2.0 });
    var gold = new T.MeshPhysicalMaterial({ color: 0xe3ae52, metalness: 1, roughness: 0.14, clearcoat: 0.3, envMapIntensity: 2.0 });

    function roundedRect(w, h, r) {
      var s = new T.Shape(), x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
    }
    function slab(shape, depth, bevel, mat) {
      var g = new T.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5, curveSegments: 14 });
      g.translate(0, 0, -depth / 2); return new T.Mesh(g, mat);
    }

    /* ---- editor window ---- */
    var WW = 4.7, WH = 3.45;
    var win = new T.Group();
    win.add(slab(roundedRect(WW + 0.16, WH + 0.16, 0.22), 0.16, 0.035, gold));
    var cv = document.createElement('canvas'); cv.width = 1128; cv.height = 828;
    var cx = cv.getContext('2d');
    var tex = new T.CanvasTexture(cv); tex.encoding = T.sRGBEncoding; tex.anisotropy = 8;
    var screen = new T.Mesh(new T.PlaneGeometry(WW, WH), new T.MeshBasicMaterial({ map: tex, toneMapped: false }));
    screen.position.z = 0.125; win.add(screen);
    win.position.set(0.75, 0.3, -0.5); win.rotation.set(0.05, -0.3, 0.015);

    var MONO = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';
    function drawScreen(n, blink) {
      var W = cv.width, H = cv.height;
      cx.clearRect(0, 0, W, H);
      cx.fillStyle = COL.bg; cx.fillRect(0, 0, W, H);
      cx.fillStyle = COL.bar; cx.fillRect(0, 0, W, 70);
      for (var d = 0; d < 3; d++) { cx.fillStyle = COL.dots[d]; cx.beginPath(); cx.arc(46 + d * 34, 35, 9, 0, 6.2832); cx.fill(); }
      cx.textBaseline = 'middle'; cx.font = '500 24px ' + MONO;
      cx.fillStyle = COL.mute; cx.textAlign = 'center'; cx.fillText('beyondev.js', W / 2, 36); cx.textAlign = 'left';
      var fs = 33, lh = 49, x0 = 118, y0 = 128;
      cx.font = '400 ' + fs + 'px ' + MONO; var cw = cx.measureText('M').width;
      var left = n, curLine = 0, curCol = 0, placed = false;
      for (var i = 0; i < TOKENS.length; i++) {
        var y = y0 + i * lh, lineLen = CODE[i].length, shown = Math.max(0, Math.min(lineLen, left));
        cx.fillStyle = COL.gut; cx.textAlign = 'right'; cx.fillText(String(i + 1), 84, y); cx.textAlign = 'left';
        if (left > 0 || (left === 0 && lineLen === 0)) {
          var col = 0;
          TOKENS[i].forEach(function (tk) {
            var show = Math.max(0, Math.min(tk.t.length, shown - col));
            if (show > 0) { cx.fillStyle = tk.c; cx.fillText(tk.t.slice(0, show), x0 + col * cw, y); }
            col += tk.t.length;
          });
        }
        if (!placed && left <= lineLen) { curLine = i; curCol = Math.max(0, shown); placed = true; }
        left -= lineLen + 1;
      }
      if (n >= TOTAL) { curLine = CODE.length - 1; curCol = CODE[curLine].length; }
      if (blink) { cx.fillStyle = COL.gold; cx.fillRect(x0 + curCol * cw + 2, y0 + curLine * lh - 20, 4, 40); }
      tex.needsUpdate = true;
    }

    /* ---- </> glyph ---- */
    function chevron(dir) {
      var p = [[0.55, 0.86], [0.55, 0.5], [-0.05, 0], [0.55, -0.5], [0.55, -0.86], [-0.56, 0]];
      var s = new T.Shape(); p.forEach(function (q, i) { var x = q[0] * dir; if (i) s.lineTo(x, q[1]); else s.moveTo(x, q[1]); }); s.closePath(); return s;
    }
    var glyph = new T.Group();
    var lt = slab(chevron(1), 0.34, 0.07, green); lt.position.x = -1.3;
    var gt = slab(chevron(-1), 0.34, 0.07, green); gt.position.x = 1.3;
    var sl = slab(roundedRect(0.2, 1.95, 0.08), 0.34, 0.07, gold); sl.rotation.z = -0.24;
    glyph.add(lt, sl, gt); glyph.position.set(-2.0, -1.2, 1.1); glyph.scale.setScalar(0.62); glyph.rotation.set(-0.05, 0.38, 0);

    var group = new T.Group(); group.add(win, glyph); group.scale.setScalar(0.92); group.position.x = 0.05; scene.add(group);

    scene.add(new T.AmbientLight(0xfff2d8, 0.3));
    var key = new T.DirectionalLight(0xfff0d0, 2.0); key.position.set(-4, 5, 6); scene.add(key);
    var rim = new T.DirectionalLight(0x9be8c3, 0.9); rim.position.set(5, 1, -3); scene.add(rim);

    function size() {
      var r = canvas.parentElement.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
      renderer.setSize(w, h, false); cam.aspect = w / h;
      var fit = Math.min(1.15, Math.max(0.62, (w / h) / 1.15)); cam.position.z = 11.8 / fit;
      cam.updateProjectionMatrix();
    }
    size(); window.addEventListener('resize', size);

    var mx = 0, my = 0, tx = 0, ty = 0, sp = 0, running = false, t0 = 0;
    window.addEventListener('pointermove', function (e) { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; }, { passive: true });
    function pose(time) {
      group.rotation.y = tx * 0.55 + sp * 0.5;
      group.rotation.x = ty * 0.28 - sp * 0.15;
      win.position.y = 0.3 + Math.sin(time * 0.0009) * 0.06;
      glyph.position.y = -1.2 + Math.sin(time * 0.0011 + 1.4) * 0.07;
      glyph.rotation.y = 0.38 + Math.sin(time * 0.0007) * 0.12;
    }
    var lastN = -1, lastB = -1, CYCLE = TOTAL * 38 + 3800;
    function frame(now) {
      if (!running) return;
      tx += (mx - tx) * 0.05; ty += (my - ty) * 0.05;
      pose(now);
      var n = Math.min(TOTAL, Math.floor(((now - t0) % CYCLE) / 38)), b = Math.floor(now / 520) % 2;
      if (n !== lastN || (n >= TOTAL && b !== lastB)) { drawScreen(n, n < TOTAL || b === 0); lastN = n; lastB = b; }
      renderer.render(scene, cam); requestAnimationFrame(frame);
    }
    var api = {
      renderOnce: function () { pose(0); renderer.render(scene, cam); },
      setScroll: function (p) { sp = p; if (!running) { pose(0); renderer.render(scene, cam); } },
      start: function () { if (!running) { running = true; t0 = performance.now(); lastN = -1; requestAnimationFrame(frame); } },
      stop: function () { running = false; }
    };
    function ready() { drawScreen(TOTAL, false); pose(0); renderer.render(scene, cam); }
    ready();
    if (document.fonts && document.fonts.load) {
      document.fonts.load('500 24px "JetBrains Mono"').then(function () { return document.fonts.load('400 33px "JetBrains Mono"'); }).then(ready, ready);
    }
    if (!opts.still && window.IntersectionObserver) {
      new IntersectionObserver(function (es) { if (es[0].isIntersecting) api.start(); else api.stop(); }, { threshold: 0 }).observe(canvas);
    }
    return api;
  };
})();
