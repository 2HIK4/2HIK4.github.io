(() => {
  'use strict';

  const body = document.body;
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const progress = document.getElementById('scrollProgress');
  const currentYear = document.getElementById('currentYear');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Disable the CV link gracefully until the PDF is added to /assets.
  const cvDownload = document.getElementById('cvDownload');
  if (cvDownload && location.protocol.startsWith('http')) {
    fetch(cvDownload.getAttribute('href'), { method: 'HEAD' })
      .then(response => {
        if (!response.ok) throw new Error('CV not found');
      })
      .catch(() => {
        cvDownload.removeAttribute('download');
        cvDownload.setAttribute('href', '#contact');
        cvDownload.setAttribute('title', 'Add assets/Hussam-Alkhatib-CV.pdf to enable CV download');
        cvDownload.lastChild.textContent = ' CV coming soon';
      });
  }

  function setMenu(open) {
    if (!navToggle || !navMenu) return;
    navToggle.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    body.classList.toggle('menu-open', open);
  }

  navToggle?.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
  navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu?.classList.contains('open')) setMenu(false);
  });

  function updateScrollUI() {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 18);

    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const value = scrollable > 0 ? Math.min(100, Math.max(0, (y / scrollable) * 100)) : 0;
      progress.style.width = `${value}%`;
    }
  }

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Content is intentionally never hidden by JavaScript.
  // This keeps the portfolio reliable across GitHub Pages caches, mobile browsers,
  // tab restores, and browsers where IntersectionObserver behaves differently.

  const counters = [...document.querySelectorAll('[data-count]')];
  function animateCounter(el) {
    const end = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) {
      el.textContent = `${end}${suffix}`;
      return;
    }
    const duration = 1050;
    const start = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(end * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  // Build the lightweight neural-network visual without external libraries.
  const neuralGrid = document.getElementById('neuralGrid');
  if (neuralGrid) {
    const points = [
      [10, 18], [10, 50], [10, 82],
      [36, 10], [36, 32], [36, 56], [36, 80],
      [66, 18], [66, 42], [66, 68], [66, 88],
      [91, 34], [91, 68]
    ];

    points.forEach(([x, y]) => {
      const node = document.createElement('span');
      node.className = 'neural-node';
      node.style.left = `${x}%`;
      node.style.top = `${y}%`;
      neuralGrid.appendChild(node);
    });

    const layerGroups = [[0,1,2], [3,4,5,6], [7,8,9,10], [11,12]];
    for (let layer = 0; layer < layerGroups.length - 1; layer += 1) {
      layerGroups[layer].forEach(aIndex => {
        layerGroups[layer + 1].forEach(bIndex => {
          const [ax, ay] = points[aIndex];
          const [bx, by] = points[bIndex];
          const dx = bx - ax;
          const dy = by - ay;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const line = document.createElement('span');
          line.className = 'neural-line';
          line.style.left = `${ax}%`;
          line.style.top = `${ay}%`;
          line.style.width = `${length}%`;
          line.style.transform = `rotate(${angle}deg)`;
          neuralGrid.prepend(line);
        });
      });
    }
  }

  // Keep missing optional images from showing browser-broken-image icons.
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const parent = img.parentElement;
      img.style.display = 'none';
      if (parent && !parent.querySelector('.asset-fallback')) {
        const fallback = document.createElement('span');
        fallback.className = 'asset-fallback';
        fallback.textContent = 'Add project image';
        Object.assign(fallback.style, {
          position: 'absolute', inset: '0', display: 'grid', placeItems: 'center',
          color: '#668098', fontSize: '.72rem', fontWeight: '700', letterSpacing: '.06em',
          background: 'linear-gradient(145deg, #0b1a2b, #0a1523)'
        });
        parent.appendChild(fallback);
      }
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxButtons = [...document.querySelectorAll('[data-lightbox-src]')];
  let lightboxIndex = -1;
  let lastFocused = null;

  function openLightbox(index) {
    if (!lightbox || !lightboxImage || !lightboxButtons[index]) return;
    lightboxIndex = index;
    const trigger = lightboxButtons[index];
    const source = trigger.dataset.lightboxSrc;
    const innerImage = trigger.querySelector('img');
    lastFocused = document.activeElement;
    lightboxImage.src = source;
    lightboxImage.alt = innerImage?.alt || 'Project image preview';
    lightboxCaption.textContent = innerImage?.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
    lightboxClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');
    lightboxImage?.removeAttribute('src');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  function moveLightbox(direction) {
    if (!lightboxButtons.length) return;
    lightboxIndex = (lightboxIndex + direction + lightboxButtons.length) % lightboxButtons.length;
    const trigger = lightboxButtons[lightboxIndex];
    const innerImage = trigger.querySelector('img');
    lightboxImage.src = trigger.dataset.lightboxSrc;
    lightboxImage.alt = innerImage?.alt || 'Project image preview';
    lightboxCaption.textContent = innerImage?.alt || '';
  }

  lightboxButtons.forEach((button, index) => button.addEventListener('click', () => openLightbox(index)));
  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => moveLightbox(-1));
  lightboxNext?.addEventListener('click', () => moveLightbox(1));
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (!lightbox?.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });

  // Subtle card spotlight on pointer-capable devices.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    const spotlightCards = document.querySelectorAll('.game-card, .system-card, .skill-card, .technical-card, .timeline-content');
    spotlightCards.forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.backgroundImage = `radial-gradient(360px circle at ${event.clientX - rect.left}px ${event.clientY - rect.top}px, rgba(76,201,255,.055), transparent 42%)`;
      });
      card.addEventListener('pointerleave', () => { card.style.backgroundImage = ''; });
    });
  }
})();
