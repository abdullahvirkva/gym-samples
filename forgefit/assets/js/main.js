/* ============================================================
   FORGEFIT — interactive behaviour
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Navbar shrink + back-to-top ---------- */
  var nav = document.getElementById('mainNav');
  var toTop = document.getElementById('toTop');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });

    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); io2.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { io2.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    counters.forEach(animateCount);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Class schedule day filter ---------- */
  document.querySelectorAll('[data-sched-day]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-sched-day]').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var day = btn.getAttribute('data-sched-day');
      document.querySelectorAll('.sched tbody tr').forEach(function (row) {
        row.style.display = (day === 'all' || row.getAttribute('data-days').indexOf(day) !== -1) ? '' : 'none';
      });
    });
  });

  /* ---------- Trainer filter ---------- */
  document.querySelectorAll('[data-trainer-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-trainer-filter]').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-trainer-filter');
      document.querySelectorAll('[data-trainer-cat]').forEach(function (card) {
        card.style.display = (f === 'all' || card.getAttribute('data-trainer-cat').indexOf(f) !== -1) ? '' : 'none';
      });
    });
  });

  /* ---------- BMI calculator ---------- */
  var bmiForm = document.getElementById('bmiForm');
  if (bmiForm) {
    bmiForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var h = parseFloat(document.getElementById('bmiHeight').value);
      var w = parseFloat(document.getElementById('bmiWeight').value);
      var out = document.getElementById('bmiOut');
      if (!h || !w || h <= 0 || w <= 0) {
        out.innerHTML = '<p class="text-danger mb-0">Please enter a valid height and weight.</p>';
        return;
      }
      var bmi = w / Math.pow(h / 100, 2);
      var label, advice;
      if (bmi < 18.5)      { label = 'Underweight';  advice = 'Time to build. Our Forge Strength program plus a coached nutrition plan will add lean mass safely.'; }
      else if (bmi < 25)   { label = 'Healthy range'; advice = 'Solid base. Ignite HIIT and Engine Room sessions will sharpen your conditioning and keep you there.'; }
      else if (bmi < 30)   { label = 'Overweight';   advice = 'Very trainable. A mix of strength work and metabolic conditioning, three sessions a week, moves this fast.'; }
      else                 { label = 'Obese range';   advice = 'Start smart with coached sessions. Our trainers build low-impact plans that progress every single week.'; }
      var pct = Math.min(Math.max((bmi - 12) / (42 - 12), 0), 1) * 100;
      out.innerHTML =
        '<div class="bmi-result">' + bmi.toFixed(1) + '</div>' +
        '<p class="mb-1"><strong>' + label + '</strong></p>' +
        '<div class="bmi-scale"><div class="bmi-marker" style="margin-left:' + pct.toFixed(1) + '%"></div></div>' +
        '<p class="mb-0" style="color:var(--muted)">' + advice + '</p>';
    });
  }

  /* ---------- Forms: validate + demo success ---------- */
  document.querySelectorAll('form.needs-validate').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      if (!form.checkValidity()) {
        ev.preventDefault(); ev.stopPropagation();
      } else {
        ev.preventDefault();
        var done = document.getElementById(form.getAttribute('data-success'));
        if (done) {
          form.style.display = 'none';
          done.style.display = 'block';
          done.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      form.classList.add('was-validated');
    }, false);
  });

  /* ---------- Testimonial rotator (home) ---------- */
  var rot = document.getElementById('testiRotator');
  if (rot) {
    var slides = rot.querySelectorAll('.testi-slide');
    var idx = 0;
    function show(i) {
      slides.forEach(function (s, k) { s.style.display = k === i ? 'block' : 'none'; });
      var dots = rot.parentElement.querySelectorAll('.testi-dot');
      dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
    }
    rot.parentElement.querySelectorAll('.testi-dot').forEach(function (d, k) {
      d.addEventListener('click', function () { idx = k; show(idx); });
    });
    show(0);
    setInterval(function () { idx = (idx + 1) % slides.length; show(idx); }, 7000);
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
