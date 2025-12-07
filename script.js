// ===== Selectors =====
const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const typedTarget = document.getElementById('typed');

// ===== Mobile menu toggle =====
menuBtn?.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// ===== Active link on click =====
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    navLinks.forEach(n => n.classList.remove('active'));
    e.currentTarget.classList.add('active');
    // Close mobile menu after click
    if (nav.style.display === 'flex') nav.style.display = 'none';
  });
});

// ===== Scroll-based active section highlighting =====
window.addEventListener('scroll', () => {
  let scrollY = window.scrollY + 150; // Adjust for header offset
  sections.forEach(sec => {
    const secTop = sec.offsetTop;
    const secHeight = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollY >= secTop && scrollY < secTop + secHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.14 });

revealElements.forEach(el => io.observe(el));

// ===== Tiny typewriter for hero subtitle =====
if (typedTarget) {
  const phrases = ["Frontend Developer", "Problem Solver", "Cybersecurity Learner"];
  let pi = 0, ci = 0, del = false;

  function type() {
    const word = phrases[pi];
    typedTarget.textContent = word.slice(0, ci);

    if (!del && ci < word.length) {
      ci++;
    } else if (ci === word.length) {
      del = true;
      setTimeout(type, 1100);
      return;
    } else if (del && ci > 0) {
      ci--;
    } else {
      del = false;
      pi = (pi + 1) % phrases.length;
    }
    setTimeout(type, del ? 40 : 70);
  }

  type();
}
