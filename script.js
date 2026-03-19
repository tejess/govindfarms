// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const toggle = document.querySelector('.nav-toggle');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.pillar, .program-card, .gallery-item, .contact-way');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Re-observe after load to catch any already-visible elements
  fadeEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      contactForm.reset();
      document.getElementById('formSuccess').style.display = 'block';
      btn.textContent = 'Send Message';
      btn.disabled = false;
    } else {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
    }
  });
}

// Add visible class handler
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);
