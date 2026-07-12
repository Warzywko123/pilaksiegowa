// ============================================
// Hero slider — automatyczna zmiana zdjęć co 5 s
// ============================================

(function () {
  const slides = document.querySelectorAll('#heroSlides .slide');
  const dotsWrap = document.getElementById('heroDots');
  if (!slides.length || !dotsWrap) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 5000; // 5 sekund

  // Kropki-wskaźniki — po jednej na zdjęcie
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Pokaż zdjęcie ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => {
      goTo(i);
      restart(); // po ręcznym wyborze licz 5 s od nowa
    });
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('button');

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  // Użytkownicy z ustawieniem "ogranicz ruch" nie dostają auto-rotacji,
  // ale mogą przełączać zdjęcia kropkami.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) restart();
})();

// ============================================
// Menu mobilne
// ============================================

(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Zamknij menu po kliknięciu w link (przewinięcie do sekcji)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
