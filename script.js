// ==================== SMOOTH SCROLLING ====================
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

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// ==================== INTERSECTION OBSERVER PARA ANIMACIONES ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar todos los elementos con clase animate-on-scroll
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ==================== MANEJO DEL FORMULARIO ====================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
        mostrarAlerta('Por favor, completa todos los campos.', 'error');
        return;
    }

    // Validar email
    if (!validarEmail(email)) {
        mostrarAlerta('Por favor, ingresa un email válido.', 'error');
        return;
    }

    // Enviar con emailjs
    emailjs.sendForm('service_ct80buo', 'template_ipx8ewm', this)
    .then(function() {
        mostrarAlerta('¡Mensaje enviado con éxito!', 'success');
        document.getElementById('contactForm').reset();
    }, function(error) {
        mostrarAlerta('Error al enviar: ' + JSON.stringify(error), 'error');
    });
});

// ==================== FUNCIONES AUXILIARES ====================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarAlerta(mensaje, tipo) {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
    alerta.style.position = 'fixed';
    alerta.style.top = '20px';
    alerta.style.right = '20px';
    alerta.style.zIndex = '9999';
    alerta.style.maxWidth = '400px';
    
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al DOM
    document.body.appendChild(alerta);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.parentNode.removeChild(alerta);
        }
    }, 5000);
}

// ==================== EFECTO DE ESCRITURA ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== INICIALIZACIÓN ====================
window.addEventListener('load', function() {
    // Efecto de escritura en el hero
    const heroSubtitle = document.querySelector('.hero .lead');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }
    
    // Animación de números en las estadísticas
    animarContadores();
});

// ==================== ANIMACIÓN DE CONTADORES ====================
function animarContadores() {
    const contadores = document.querySelectorAll('.stat-number');
    
    contadores.forEach(contador => {
        const target = contador.textContent;
        
        // Solo animar números
        if (!isNaN(target)) {
            const targetNumber = parseInt(target);
            contador.textContent = '0';
            
            const increment = targetNumber / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    contador.textContent = targetNumber;
                    clearInterval(timer);
                } else {
                    contador.textContent = Math.floor(current);
                }
            }, 20);
        }
    });
}

// ==================== NAVEGACIÓN ACTIVA ====================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== PARTICULAS EN EL HERO (OPCIONAL) ====================
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        hero.appendChild(particle);
    }
}

// CSS para las partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Inicializar partículas
// createParticles(); // Descomenta esta línea si quieres las partículas

// ==================== LAZY LOADING PARA IMÁGENES ====================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ==================== MODO OSCURO (OPCIONAL) ====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Cargar preferencia de modo oscuro
window.addEventListener('load', function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ==================== FUNCIONES DE UTILIDAD ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce al scroll
const debouncedScroll = debounce(function() {
    // Código que se ejecuta en scroll
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        mostrarAlerta('¡Código Konami activado! 🎮', 'success');
        // Agregar algún efecto especial aquí
        document.body.style.animation = 'rainbow 2s ease-in-out';
    }
});

// CSS para el easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);