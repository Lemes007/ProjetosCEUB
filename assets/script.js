// ==================== NAVIGATION SCROLL EFFECT ====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLL ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and features
document.querySelectorAll('.project-card, .feature, .discipline-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// ==================== COUNTER ANIMATION ====================
const stats = document.querySelectorAll('.stat-number');
const stats_section = document.querySelector('.stats');
let animated = false;

const animateCounters = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent;
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current);
            }
        }, 30);
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateCounters();
            animated = true;
        }
    });
}, { threshold: 0.5 });

if (stats_section) {
    statsObserver.observe(stats_section);
}

// ==================== RESPONSIVE NAVIGATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality (if needed in future)
    const navMenu = document.querySelector('.nav-menu');
    
    // Ensure proper styling on load
    console.log('ProjetosCEUB website loaded successfully!');
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

body.style.opacity = '0';
body.style.transition = 'opacity 0.5s ease';

// ==================== UTILITY FUNCTIONS ====================
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Export for external use
window.scrollToElement = scrollToElement;