(() => {
  const header = document.getElementById('siteHeader');
  const menuButton = document.getElementById('menuButton');
  const mobileNav = document.getElementById('mobileNav');
  const year = document.getElementById('year');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  const openLightbox = src => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
  };

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', event => {
      event.preventDefault();
      openLightbox(el.dataset.lightbox);
    });
  });

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => {
      const rect = lightboxImage.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) lightbox.close();
    });
  }
})();
