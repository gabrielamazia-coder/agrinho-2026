const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.innerHTML = navLinks.classList.contains('open') ? '&#10005;' : '&#9776;';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.innerHTML = '&#9776;';
  });
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

const numberElements = document.querySelectorAll('.dado-numero[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

numberElements.forEach(el => counterObserver.observe(el));

function animateCounter(element, target) {
  let current = 0;
  const duration = 1500;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

const heroKitty = document.getElementById('heroKitty');

if (heroKitty) {
  heroKitty.addEventListener('mouseenter', () => {
    heroKitty.style.filter = 'drop-shadow(0 8px 25px rgba(123, 198, 126, 0.4))';
  });
  heroKitty.addEventListener('mouseleave', () => {
    heroKitty.style.filter = 'drop-shadow(0 8px 20px rgba(233, 87, 147, 0.2))';
  });
}

const particlesContainer = document.getElementById('floatingHearts');
const particleColors = [
  'rgba(255, 126, 179, 0.4)',
  'rgba(255, 182, 200, 0.35)',
  'rgba(123, 198, 126, 0.3)',
  'rgba(255, 233, 160, 0.35)',
  'rgba(233, 87, 147, 0.3)',
];

function createParticle() {
  const particle = document.createElement('span');
  particle.classList.add('particle');

  const size = 6 + Math.random() * 10;
  const color = particleColors[Math.floor(Math.random() * particleColors.length)];
  const startX = Math.random() * 100;
  const duration = 10 + Math.random() * 12;

  particle.style.left = startX + '%';
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.background = color;
  particle.style.animationDuration = duration + 's';
  particle.style.animationDelay = Math.random() * 5 + 's';

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, (duration + 5) * 1000);
}

setInterval(createParticle, 3000);
for (let i = 0; i < 5; i++) {
  setTimeout(createParticle, i * 800);
}

const kittyTooltip = document.getElementById('kittyTooltip');
const kittyPhrases = [
  'Oi! Sabia que cada atitude conta para um futuro mais verde?',
  'Plantar árvores é como dar um abraço na Terra!',
  'Abelhinhas são super importantes pra nossa comida!',
  'Água é vida! Vamos usar com carinho.',
  'O agro sustentável é o futuro! Bora juntos?',
  'Reciclar, reutilizar, replantar! 3 Rs do amor ao planeta.',
  'Cada sementinha plantada é esperança pro amanhã.',
];

let phraseIndex = 0;
const kittyHelper = document.getElementById('kittyHelper');

if (kittyHelper) {
  kittyHelper.addEventListener('click', () => {
    phraseIndex = (phraseIndex + 1) % kittyPhrases.length;
    kittyTooltip.textContent = kittyPhrases[phraseIndex];

    kittyTooltip.style.opacity = '1';
    kittyTooltip.style.transform = 'translateY(0)';

    setTimeout(() => {
      kittyTooltip.style.opacity = '';
      kittyTooltip.style.transform = '';
    }, 3000);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});