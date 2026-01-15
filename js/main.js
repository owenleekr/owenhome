// ========================
// Smooth Scroll & Navigation
// ========================

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================
    // Scroll Animations (AOS)
    // ========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
    
    // Observe competency cards
    const competencyCards = document.querySelectorAll('.competency-card');
    competencyCards.forEach(card => observer.observe(card));
    
    // Observe stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => observer.observe(card));
    
    // Observe vision boxes
    const visionBoxes = document.querySelectorAll('.vision-box');
    visionBoxes.forEach(box => observer.observe(box));
    
    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item, .contact-cta');
    contactItems.forEach(item => observer.observe(item));
    
    // ========================
    // Number Counter Animation
    // ========================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString('ko-KR');
                clearInterval(timer);
            } else {
                element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start).toLocaleString('ko-KR');
            }
        }, 16);
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const numberElement = entry.target.querySelector('.stat-number');
                const target = parseFloat(numberElement.getAttribute('data-target'));
                animateCounter(numberElement, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => statsObserver.observe(card));
    
    // ========================
    // Active Nav Link Highlighting
    // ========================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ========================
    // Parallax Effect for Hero Decoration
    // ========================
    
    const decorationCircles = document.querySelectorAll('.decoration-circle');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        decorationCircles.forEach((circle, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // ========================
    // Prevent Animation on Page Load
    // ========================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ========================
    // Add hover effect to cards
    // ========================
    
    const cards = document.querySelectorAll('.philosophy-card, .competency-card, .timeline-content, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ========================
    // Email and Phone Click Tracking (Optional Analytics)
    // ========================
    
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email link clicked:', this.href);
            // Add analytics tracking here if needed
        });
    });
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone link clicked:', this.href);
            // Add analytics tracking here if needed
        });
    });
    
    // ========================
    // Keyboard Navigation
    // ========================
    
    document.addEventListener('keydown', function(e) {
        // Press 'C' to scroll to contact
        if (e.key === 'c' || e.key === 'C') {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // ========================
    // Performance: Lazy Load Images (if any added later)
    // ========================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================
    // Console Welcome Message
    // ========================
    
    console.log('%c👋 안녕하세요!', 'font-size: 20px; font-weight: bold; color: #2563EB;');
    console.log('%c이성현의 포트폴리오에 오신 것을 환영합니다.', 'font-size: 14px; color: #475569;');
    console.log('%c협업 문의: infinagree@gmail.com', 'font-size: 12px; color: #64748B;');
    
});

// ========================
// Utility Functions
// ========================

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================
// Export functions for potential use
// ========================

window.portfolioUtils = {
    debounce,
    isInViewport
};
