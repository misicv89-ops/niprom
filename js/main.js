(function () {
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Intro ekran (CSS animacija traje 1,5s; ovde samo zaključavanje skrola i uklanjanje) */
  var introOn = false;
  var intro = document.getElementById('nip-intro');
  if (intro) {
    if (RM) { intro.parentNode.removeChild(intro); }
    else {
      introOn = true;
      root.style.overflow = 'hidden';
      setTimeout(function () {
        root.style.overflow = '';
        if (intro.parentNode) intro.parentNode.removeChild(intro);
        introOn = false;
      }, 1500);
    }
  }

  /* Pojavljivanje sekcija pri skrolu */
  function reveal() {
    if (!('IntersectionObserver' in window) || RM) return;
    setTimeout(function () {
      var els = [];
      $$('section:not(#vrh):not(#prednosti) > div').forEach(function (wrap) {
        Array.prototype.slice.call(wrap.children).forEach(function (kid) {
          var st = kid.getAttribute('style') || '';
          if (/position:absolute/.test(st)) return;
          var n = kid.children.length;
          if (n > 1 && n < 8 && /display:(grid|flex)/.test(st)) els.push.apply(els, Array.prototype.slice.call(kid.children));
          else els.push(kid);
        });
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.setAttribute('data-rev', '1'); io.unobserve(e.target); }
        });
      }, { threshold: 0.06 });
      els.forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 90 + 'ms';
        el.setAttribute('data-rev', '0');
        io.observe(el);
      });
      setTimeout(function () { els.forEach(function (el) { el.setAttribute('data-rev', '1'); }); }, 5000);
    }, 100);
  }

  /* Brojači */
  function counters() {
    var mob = window.innerWidth < 720;
    var els = $$('[data-count]').filter(function (el) { return mob || !el.hasAttribute('data-mobile'); });
    if (!els.length || !('IntersectionObserver' in window) || RM) return;
    var fmt = function (el, v) {
      var f = el.getAttribute('data-fmt');
      el.textContent = f === 'dot' ? v.toLocaleString('de-DE') : f === '77' ? v + '/' + v : f === 'plus' ? v + '+' : String(v);
    };
    var run = function (el) {
      var end = +el.getAttribute('data-count'), dur = end > 100 ? 1800 : 1100, t0 = performance.now();
      var step = function (t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        fmt(el, Math.round(end * e));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    els.forEach(function (el) { fmt(el, 0); });
    var cio = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) { cio.unobserve(e.target); setTimeout(function () { run(e.target); }, introOn ? 1600 : 250); }
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { cio.observe(el); });
  }

  /* Bočna "cesta" sa autom (mobilni) */
  function sideCar() {
    var car = $('[data-ref="sideCarRef"]'), flip = $('[data-ref="sideFlipRef"]'), fill = document.getElementById('side-fill');
    if (!car) return;
    var lastY = window.scrollY, dir = 1, raf = 0;
    var frame = function () {
      raf = 0;
      if (!car.parentElement || car.parentElement.clientHeight === 0) return;
      var track = car.parentElement.clientHeight - car.offsetHeight;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var y = window.scrollY, p = Math.min(1, Math.max(0, y / max));
      if (y < lastY - 1) dir = -1; else if (y > lastY + 1) dir = 1;
      lastY = y;
      car.style.transform = 'translate3d(0,' + (p * track).toFixed(1) + 'px,0)';
      if (fill) fill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
      if (flip) flip.style.transform = dir < 0 ? 'rotate(180deg)' : 'none';
    };
    var onScroll = function () { if (!raf) raf = requestAnimationFrame(frame); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    setTimeout(frame, 60);
  }

  /* Galerija: video u mreži */
  var VIDEO = 'assets/niprom-video.mp4';
  var tile = $('[data-ref="vidRef"]');
  if (tile) {
    tile.muted = true; tile.defaultMuted = true; tile.volume = 0;
    tile.loop = true; tile.playsInline = true;
    if (window.innerWidth < 720) tile.controls = true;
    tile.addEventListener('volumechange', function () { if (!tile.muted && tile.volume === 0) tile.volume = 1; });
    var playTile = function () { var p = tile.play(); if (p && p.catch) p.catch(function () {}); };
    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) { playTile(); } else if (!tile.paused && !tile.controls) { tile.pause(); } });
      }, { threshold: 0.25 });
      vio.observe(tile);
    } else { playTile(); }
  }

  /* Video lightbox */
  var vidLb = $('[data-if="vidOpen"]'), vidLbEl = $('[data-ref="vidLbRef"]');
  function openVid() {
    if (window.innerWidth < 720 || !vidLb) return;
    vidLb.hidden = false;
    vidLbEl.src = VIDEO; vidLbEl.loop = true; vidLbEl.controls = true; vidLbEl.playsInline = true;
    vidLbEl.addEventListener('loadedmetadata', function () { if (tile) vidLbEl.currentTime = tile.currentTime || 0; }, { once: true });
    vidLbEl.muted = false; vidLbEl.volume = 1;
    var p = vidLbEl.play(); if (p && p.catch) p.catch(function () { vidLbEl.muted = true; vidLbEl.play().catch(function () {}); });
  }
  function closeVid() {
    if (!vidLb || vidLb.hidden) return;
    vidLbEl.pause(); vidLbEl.removeAttribute('src'); vidLbEl.load();
    vidLb.hidden = true;
  }

  /* Foto lightbox */
  var lb = null, N = 5, lbBox = $('[data-if="lbOpen"]'), lbImg = $('[data-ref="lbRef"]');
  function showLb() {
    if (lb == null) { lbBox.hidden = true; return; }
    var img = $('#gal-grid [data-i="' + lb + '"] img');
    if (img) { lbImg.src = img.getAttribute('data-full') || img.currentSrc || img.src; lbImg.alt = img.alt; }
    lbBox.hidden = false;
  }

  /* Klikovi */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-on]');
    if (!t) return;
    var a = t.getAttribute('data-on');
    if (a === 'openLb') { lb = +t.getAttribute('data-i'); showLb(); }
    else if (a === 'openVid') { openVid(); }
    else if (a === 'closeVid') { if (e.target === t || t.tagName === 'BUTTON') closeVid(); }
    else if (a === 'closeLb') { e.stopPropagation(); lb = null; showLb(); }
    else if (a === 'prevLb') { e.stopPropagation(); lb = (lb + N - 1) % N; showLb(); }
    else if (a === 'nextLb') { e.stopPropagation(); lb = (lb + 1) % N; showLb(); }
    else if (a === 'reset') { resetForm(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && vidLb && !vidLb.hidden) { closeVid(); return; }
    if (lb == null) return;
    if (e.key === 'Escape') { lb = null; showLb(); }
    if (e.key === 'ArrowRight') { lb = (lb + 1) % N; showLb(); }
    if (e.key === 'ArrowLeft') { lb = (lb + N - 1) % N; showLb(); }
  });

  /* Forma (formsubmit.co, AJAX) */
  var form = $('form[data-on-submit]');
  var started = Date.now(), busy = false;
  var sentBox = $('[data-if="sent"]'), formBox = $('[data-if="notSent"]'), errBox = $('[data-if="hasError"]');
  var btn = document.getElementById('send-btn'), label = $('[data-ref="submitLabel"]');
  function setError(msg) { errBox.textContent = msg; errBox.hidden = !msg; }
  function setBusy(b) {
    busy = b; btn.disabled = b;
    btn.style.background = b ? '#6C86E8' : '#1441E8';
    btn.style.cursor = b ? 'wait' : 'pointer';
    label.textContent = b ? 'Saljem…' : 'Pošalji prijavu';
  }
  function showSent() { sentBox.hidden = false; formBox.hidden = true; }
  function resetForm() { form.reset(); setError(''); sentBox.hidden = true; formBox.hidden = false; started = Date.now(); }
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var v = function (n) { var f = form.elements[n]; return f ? String(f.value || '') : ''; };
      if (v('_honey')) { showSent(); return; }
      if (Date.now() - started < 3000) { setError('Sačekaj trenutak pa pokušaj ponovo.'); return; }
      var name = v('Ime i prezime').trim(), phone = v('Telefon').trim(), email = v('Email').trim(), msg = v('Poruka').trim();
      if (!name || !phone) { setError('Unesi ime i broj telefona.'); return; }
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError('Proveri email adresu.'); return; }
      setBusy(true); setError('');
      fetch(form.getAttribute('action').replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Nova prijava za upis — ' + name,
          _template: 'table',
          _captcha: 'false',
          _honey: '',
          'Ime i prezime': name,
          'Email': email || '—',
          'Telefon': phone,
          'Kategorija': 'B',
          'Poruka': msg || '—'
        })
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          setBusy(false);
          if (res.ok && (data.success === 'true' || data.success === true)) showSent();
          else setError('Slanje nije uspelo. Pozovi nas na 062 / 527-793.');
        });
      }).catch(function () {
        setBusy(false);
        setError('Nema konekcije. Pokušaj ponovo ili nas pozovi.');
      });
    });
  }

  reveal();
  counters();
  sideCar();
})();
