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
// MOBILE MENU TOGGLE - CORREGIDO
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navLeft = document.querySelector('.nav-left');
const navRight = document.querySelector('.nav-right');

// Crear overlay para el menú
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
document.body.appendChild(menuOverlay);

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLeft.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navLeft.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    
    // Solo mostramos nav-left que contendrá todos los enlaces en móvil
    if (window.innerWidth <= 968 && navLeft.classList.contains('active')) {
        const rightLinks = navRight.querySelectorAll('li');
        const leftLinks = navLeft.querySelectorAll('li');
        
        // Si nav-left no tiene todos los enlaces, los copiamos
        if (leftLinks.length < 4) {
            rightLinks.forEach(link => {
                const clonedLink = link.cloneNode(true);
                navLeft.appendChild(clonedLink);
            });
        }
    }
});

// Cerrar menú al hacer clic en el overlay
menuOverlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLeft.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// ===================================
// CLOSE MENU WHEN CLICKING ON A LINK
// ===================================
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-left a') || e.target.matches('.nav-right a')) {
        menuToggle.classList.remove('active');
        navLeft.classList.remove('active');
        navRight.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ===================================
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.nav-left') && navLeft.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLeft.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
// ACTIVE LINK HIGHLIGHT
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
