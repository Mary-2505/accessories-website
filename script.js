// ================== MOBILE NAVIGATION ==================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = navMenu.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ================== SMOOTH SCROLL BEHAVIOR ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================== INTERSECTION OBSERVER FOR ANIMATIONS ==================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards for fade-in animation
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// ================== PRODUCT CARD HOVER EFFECTS ==================
document.querySelectorAll('.product-card').forEach(card => {
    const image = card.querySelector('.product-image');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// ================== NEWSLETTER FORM ==================
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (isValidEmail(email)) {
        // Show success message
        const button = newsletterForm.querySelector('.newsletter-button');
        const originalText = button.textContent;
        button.textContent = '✓ Subscribed';
        button.style.background = 'rgba(212, 175, 55, 0.8)';
        button.disabled = true;
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.disabled = false;
            emailInput.value = '';
        }, 3000);
    } else {
        emailInput.style.borderColor = '#ff6b6b';
        setTimeout(() => {
            emailInput.style.borderColor = '';
        }, 2000);
    }
});

// ================== EMAIL VALIDATION ==================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ================== NAVBAR SCROLL EFFECT ==================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ================== BUTTON INTERACTIONS ==================
document.querySelectorAll('.shop-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get product name for feedback
        const productName = btn.closest('.product-card')
            .querySelector('.product-name').textContent;
        
        // Create visual feedback
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(212, 175, 55, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
        
        btn.parentElement.style.position = 'relative';
        btn.parentElement.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show notification
        showNotification(`${productName} added to cart`);
    });
});

// ================== NOTIFICATION SYSTEM ==================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(42, 42, 42, 0.95);
        color: #f5f1e8;
        padding: 1rem 2rem;
        border-left: 3px solid #d4af37;
        border-radius: 4px;
        font-size: 0.9rem;
        font-family: 'Montserrat', sans-serif;
        z-index: 2000;
        animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => notification.remove(), 400);
    }, 2500);
}

// ================== CTA BUTTON INTERACTION ==================
const ctaButton = document.querySelector('.cta-button');

ctaButton.addEventListener('click', () => {
    // Scroll to jewelry section
    const jewelrySection = document.getElementById('jewelry');
    const offset = 80;
    const targetPosition = jewelrySection.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

// ================== SEARCH BUTTON ==================
document.querySelectorAll('.icon-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0) {
            // Search button
            showNotification('Search feature coming soon');
        } else if (index === 1) {
            // Cart button
            showNotification('Cart is empty');
        }
    });
});

// ================== ADD ANIMATIONS TO CSS ==================
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ================== LAZY LOAD IMAGES ==================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target.querySelector('svg');
                if (svg) {
                    svg.style.opacity = '1';
                }
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.product-image').forEach(image => {
        imageObserver.observe(image);
    });
}

// ================== PERFORMANCE OPTIMIZATION ==================
// Reduce animation on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });
}

// ================== ACCESSIBILITY ENHANCEMENTS ==================
// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ================== PREVENT MULTIPLE SUBMISSIONS ==================
const newsLetterInput = document.querySelector('.newsletter-input');
let isSubmitting = false;

newsletterForm.addEventListener('submit', (e) => {
    if (isSubmitting) return;
    isSubmitting = true;
    
    setTimeout(() => {
        isSubmitting = false;
    }, 3000);
});

// ================== SCROLL TO TOP SMOOTH ==================
window.addEventListener('wheel', (e) => {
    // Optional: Add custom scroll behavior enhancements
}, { passive: true });

// ================== ACTIVE NAV LINK ON SCROLL ==================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active-link {
        color: #d4af37;
    }
    .nav-link.active-link::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// ================== INITIALIZE ==================
console.log('LUXE - Luxury Accessories Website loaded successfully');
