// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar clase scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
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
// MODAL FUNCTIONALITY FOR SERVICES
// ===================================
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

// Datos de cada servicio con sus imágenes correspondientes
const serviceData = {
    electricidad: {
        title: 'INSTALACIÓN ELÉCTRICA',
        description: 'Instalaciones eléctricas industriales y domésticas de alta calidad. Montaje profesional de tableros y circuitos eléctricos cumpliendo con todas las normativas de seguridad.',
        images: ['images/proyecto-1.jpeg', 'images/proyecto-8.jpg', 'images/proyecto-14.jpeg']
    },
    fontaneria: {
        title: 'FONTANERÍA PROFESIONAL',
        description: 'Servicios completos de fontanería. Reparación e instalación de sistemas de agua potable y desagüe. Trabajos garantizados con materiales de primera calidad.',
        images: ['images/proyecto-3.jpg']
    },
    pladur: {
        title: 'TRABAJOS EN PLADUR',
        description: 'Especialistas en drywall y pladur. Divisiones de espacios, techos falsos y acabados de primera calidad. Resultados perfectos y duraderos.',
        images: ['images/proyecto-4.jpeg']
    },
    reformas: {
        title: 'REFORMA INTEGRAL',
        description: 'Reformas completas de viviendas y locales comerciales. Transformamos tus espacios con diseños modernos y acabados impecables. Gestión integral del proyecto.',
        images: ['images/proyecto-2.jpeg', 'images/proyecto-10.jpeg', 'images/proyecto-11.jpeg']
    },
    pintura: {
        title: 'PINTURA PROFESIONAL',
        description: 'Servicios de pintura interior y exterior. Acabados perfectos y duraderos. Utilizamos pinturas de alta calidad para garantizar los mejores resultados.',
        images: ['images/proyecto-5.jpeg', 'images/proyecto-1.jpeg']
    },
    soldadura: {
        title: 'SOLDADURA ESPECIALIZADA',
        description: 'Trabajos profesionales de soldadura en general. Especialistas en acero inoxidable y estructuras metálicas. Calidad y precisión garantizadas.',
        images: ['images/proyecto-6.jpeg', 'images/proyecto-9.jpeg', 'images/proyecto-13.jpeg']
    },
    alicatado: {
        title: 'ALICATADO PREMIUM',
        description: 'Colocación profesional de azulejos y racholas. Baños y cocinas con acabados impecables. Atención al detalle en cada proyecto.',
        images: ['images/proyecto-7.jpeg']
    },
    tableros: {
        title: 'TABLEROS ELÉCTRICOS',
        description: 'Diseño y montaje de tableros eléctricos industriales. Instalación completa de sistemas de pozo a tierra. Cumplimiento de normativas vigentes.',
        images: ['images/proyecto-8.jpg', 'images/proyecto-12.jpeg', 'images/proyecto-14.jpeg']
    }
};

// Agregar evento click a cada tarjeta de servicio
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        const data = serviceData[service];
        
        if (data) {
            // Establecer el título y descripción
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            
            // Establecer la primera imagen del servicio
            modalImage.src = data.images[0];
            modalImage.alt = data.title;
            
            // Mostrar el modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Cerrar modal al hacer click en la X
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
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
