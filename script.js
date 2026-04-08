const root = document.documentElement;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const storedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
root.dataset.theme = initialTheme;

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  const syncToggleLabel = () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  };
  syncToggleLabel();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    syncToggleLabel();
  });
}

const filterButtons = document.querySelectorAll('.filter');
const galleryCards = document.querySelectorAll('.gallery-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    galleryCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
    });
  });
});

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxTitle = lightbox.querySelector('h3');
  const lightboxText = lightbox.querySelector('p');

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      lightboxImage.src = card.dataset.image;
      lightboxImage.alt = card.dataset.title;
      lightboxTitle.textContent = card.dataset.title;
      lightboxText.textContent = card.dataset.description;
      lightbox.showModal();
    });
  });
}

if (!prefersReducedMotion) {
  const nodes = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  nodes.forEach((node) => io.observe(node));

  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 5;
      const ry = (px - 0.5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  if (document.startViewTransition) {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = link.getAttribute('href');
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        document.startViewTransition(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    });
  }
} else {
  document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
}
