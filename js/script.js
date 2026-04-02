/* ==========================================================
   KATHI HARSHITH REDDY – Cybersecurity Portfolio
   script.js
   ========================================================== */

'use strict';

/* ---------- Navbar: scroll class + active link ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Sticky shadow
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach((sec) => {
    const offset = sec.offsetTop - 90;
    if (window.scrollY >= offset) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run on page load

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinksContainer.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close on link click
navLinksContainer.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Matrix / Rain Canvas ---------- */
(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let drops = [];
  const fontSize = 14;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00d4ff';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    });
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Pause when page not visible to save resources
  let rafId;
  function loop() { draw(); rafId = requestAnimationFrame(loop); }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      loop();
    }
  });

  loop();
}());

/* ---------- Intersection Observer: fade-in + skill bars ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Fade-in elements
      if (entry.target.classList.contains('fade-in')) {
        entry.target.classList.add('visible');
      }

      // Animate skill bars
      if (entry.target.classList.contains('skill-card')) {
        const bar = entry.target.querySelector('.skill-bar');
        if (bar) {
          const level = bar.dataset.level || '0';
          bar.style.width = `${level}%`;
        }
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

// Observe fade-in elements
document.querySelectorAll('.section, .project-card, .info-card, .stack-category').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Observe skill cards (fade-in + bar animation)
document.querySelectorAll('.skill-card').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ---------- Contact Form ---------- */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = ['name', 'email', 'subject', 'message'];
    let valid = true;

    fields.forEach((id) => {
      const el = document.getElementById(id);
      el.classList.remove('error');
      if (!el.value.trim()) {
        el.classList.add('error');
        valid = false;
      }
    });

    // Basic email check
    const emailEl = document.getElementById('email');
    if (emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      emailEl.classList.add('error');
      valid = false;
    }

    if (!valid) {
      setStatus('Please fill in all fields correctly.', 'error');
      return;
    }

    // Simulate sending (replace with your back-end / Formspree endpoint)
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      setStatus('✓ Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1200);
  });

  // Remove error highlight on input
  form.querySelectorAll('input, textarea').forEach((el) => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
}

function setStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }, 5000);
}

/* ---------- Download CV placeholder ---------- */
function showCVNotice(e) {
  e.preventDefault();
  alert('CV/Resume coming soon! Check back later or reach out via email.');
}

const cvBtn = document.getElementById('downloadCV');
if (cvBtn) cvBtn.addEventListener('click', showCVNotice);

const cvBtnAbout = document.getElementById('downloadCVAbout');
if (cvBtnAbout) cvBtnAbout.addEventListener('click', showCVNotice);

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
