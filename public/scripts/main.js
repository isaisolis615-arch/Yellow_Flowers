document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScrollAnimations() {
  if (prefersReducedMotion) {
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-slide-up, .animate-fade-in, .animate-scale-in, .animate-rotate-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });
}

function initPhotoClickHandlers() {
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.photo-masonry__item');
    if (item && !e.target.closest('figcaption')) {
      const index = parseInt(item.dataset.index, 10);
      const photoElements = document.querySelectorAll('.photo-masonry__item img');
      const photoList = Array.from(photoElements).map((img, i) => ({
        src: img.src.replace(/-\d+w\.webp$/, '.webp'),
        alt: img.alt
      }));
      if (window.openLightbox) {
        window.openLightbox(index, photoList);
      }
    }
  });
}

function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}

function initParallaxHero() {
  if (prefersReducedMotion) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;
  function updateParallax() {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;
    hero.style.transform = `translateY(${rate}px)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.removeAttribute('loading');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

function initPerformanceObserver() {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log(`🎨 LCP: ${entry.startTime.toFixed(1)}ms`);
          }
          if (entry.entryType === 'first-input') {
            console.log(`👆 FID: ${entry.processingStart - entry.startTime}ms`);
          }
        });
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      observer.observe({ type: 'first-input', buffered: true });
    } catch (e) {
    }
  }
}

function init() {
  initScrollAnimations();
  initSmoothScroll();
  initPhotoClickHandlers();
  initKeyboardNavigation();
  initParallaxHero();
  initLazyImages();
  initPerformanceObserver();

  console.log('🌻 Ramos de Sol cargado correctamente');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}