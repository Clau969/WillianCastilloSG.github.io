// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navLeft = document.querySelector('.nav-left');
const navRight = document.querySelector('.nav-right');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
});

// ===================================
// CLOSE MENU WHEN CLICKING ON A LINK
// ===================================
const navItems = document.querySelectorAll('.nav-left a, .nav-right a');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLeft.classList.remove('active');
        navRight.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        menuToggle.classList.remove('active');
        navLeft.classList.remove('active');
        navRight.classList.remove('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Pequeño delay para que el menú se cierre primero
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    });
});

// ===================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animar tarjetas de servicios
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animar características
const features = document.querySelectorAll('.feature');
features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(30px)';
    feature.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(feature);
});

// Animar tarjetas de contacto
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// ===================================
// PARALLAX EFFECT EN HERO
// ===================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===================================
// HOVER EFFECT EN SERVICE CARDS
// ===================================
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// ANIMATED NUMBERS (STATS)
// ===================================
const animateNumber = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

// Si tienes elementos con números para animar, descomenta esto:
// const statsObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const number = parseInt(entry.target.getAttribute('data-number'));
//             animateNumber(entry.target, number);
//             statsObserver.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.5 });

// document.querySelectorAll('.stat-number').forEach(stat => {
//     statsObserver.observe(stat);
// });

// ===================================
// ACTIVE LINK HIGHLIGHT (SI AÑADES NAVBAR)
// ===================================
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// RESPONSIVE MENU (SI AÑADES NAVBAR MÓVIL)
// ===================================
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    nav.appendChild(menuToggle);
};

// Ejecutar al cargar
// createMobileMenu();

// ===================================
// CONSOLE BRANDING
// ===================================
console.log(
    '%c🔧 WILLIAN CASTILLO',
    'font-size: 24px; font-weight: bold; color: #e0a32e; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);'
);

console.log(
    '%cServicios Generales & Reformas Integrales',
    'font-size: 14px; color: #cccccc;'
);

console.log(
    '%c📞 +34 641 03 7148 | +34 624 37 9837',
    'font-size: 12px; color: #888888;'
);
