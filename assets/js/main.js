/**
 * Portfolio - JavaScript principal
 * Gère : menu mobile, retour en haut, AOS, filtres portfolio, formulaire WhatsApp
 */

// ---- Configuration WhatsApp ----
const WHATSAPP_NUMBER = '242065537163'; // Format international sans le "+"
const WHATSAPP_MESSAGE_PREFIX = 'Bonjour Japhet, je viens de votre portfolio.\n\n';

// ---- Initialisation AOS ----
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out',
});

// ---- Menu mobile ----
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const siteHeader = document.getElementById('site-header');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !isOpen);
      icon.classList.toggle('fa-times', isOpen);
    }
  });
}

if (siteHeader) {
  const handleHeaderScroll = () => {
    siteHeader.classList.toggle('site-header-scrolled', window.scrollY > 12);
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();
}

// ---- Retour en haut ----
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Filtres portfolio (uniquement sur portfolio.html) ----
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20', 'border-primary/30');
        b.classList.add('bg-white/5', 'text-gray', 'border-white/10');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20', 'border-primary/30');
      btn.classList.remove('bg-white/5', 'text-gray', 'border-white/10');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter || 'all';

      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').toLowerCase();
        const matches = filter === 'all' || categories.split(/\s+/).includes(filter);
        card.style.display = matches ? '' : 'none';
      });
    });
  });
}

// ---- Formulaire WhatsApp ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const fullMessage = `${WHATSAPP_MESSAGE_PREFIX}Nom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\nMessage :\n${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  });
}

// ---- Navigation active (surlignement du lien courant) ----
function setActiveNavLink() {
  const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header .nav-link:not(.cta-nav)');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    const isActive = linkHref === currentLocation;

    link.classList.toggle('bg-white/10', isActive);
    link.classList.toggle('text-white', isActive);
    link.classList.toggle('shadow-sm', isActive);
    link.classList.toggle('ring-1', isActive);
    link.classList.toggle('ring-white/10', isActive);
    link.classList.toggle('text-gray', !isActive);
    link.classList.toggle('bg-transparent', !isActive);
    link.classList.toggle('shadow-none', !isActive);
    link.classList.toggle('ring-0', !isActive);
  });
}
document.addEventListener('DOMContentLoaded', setActiveNavLink);