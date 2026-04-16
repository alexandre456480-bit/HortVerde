/* ============================================================
   HortVerde Landing Page - JavaScript
   Premium interactions, scroll-locked hero, animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ── Custom Cursor ──
    initCustomCursor();

    // ── Scroll Progress Bar ──
    initScrollProgress();

    // ── Navbar ──
    initNavbar();

    // ── Hero Scroll-Locked Image Sequence ──
    initHeroSequence();

    // ── Scroll Reveal Animations ──
    initScrollReveal();

    // ── Floating Particles ──
    initParticles('heroParticles', 20);
    initParticles('entregaParticles', 12);

    // ── Smooth scroll for nav links ──
    initSmoothScroll();
});

/* ══════════════════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════════════════ */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('cursorDot');

    if (!cursor || !dot) return;

    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        dot.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for outer circle
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Tighter follow for dot
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .tomate-card, .feature-item, .stat-card, .depoimento-card, .cliente-type, .contato-method');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

/* ══════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════════════ */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });
}

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navbar) return;

    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}

/* ══════════════════════════════════════════════
   HERO SCROLL-LOCKED IMAGE SEQUENCE
   ══════════════════════════════════════════════ */
function initHeroSequence() {
    const heroWrapper = document.getElementById('heroWrapper');
    const heroImageFrame = document.getElementById('heroImageFrame');
    const scrollIndicator = document.getElementById('heroScrollIndicator');

    if (!heroWrapper || !heroImageFrame) return;

    const images = heroImageFrame.querySelectorAll('img');
    const totalImages = images.length;

    if (totalImages === 0) return;

    let currentIndex = 0;

    function updateHeroImage() {
        const scrollRange = heroWrapper.offsetHeight - window.innerHeight;
        const heroRect = heroWrapper.getBoundingClientRect();
        const scrolled = -heroRect.top; // How far into the hero wrapper we've scrolled

        let progress = 0;
        if (scrollRange > 0) {
            progress = scrolled / scrollRange;
            progress = Math.max(0, Math.min(progress, 1));
        }

        // Calculate which image to show
        let newIndex = Math.floor(progress * totalImages);
        newIndex = Math.min(newIndex, totalImages - 1);

        if (newIndex !== currentIndex) {
            images[currentIndex].classList.remove('active');
            images[newIndex].classList.add('active');
            currentIndex = newIndex;
        }

        // Hide scroll indicator after first scroll
        if (scrollIndicator && scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else if (scrollIndicator && scrolled <= 100) {
            scrollIndicator.style.opacity = '0.7';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }

    window.addEventListener('scroll', updateHeroImage, { passive: true });
    updateHeroImage(); // Initial call
}

/* ══════════════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
   ══════════════════════════════════════════════ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   FLOATING PARTICLES
   ══════════════════════════════════════════════ */
function initParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.3 + 0.1;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${opacity};
        `;

        container.appendChild(particle);
    }
}

/* ══════════════════════════════════════════════
   SMOOTH SCROLL
   ══════════════════════════════════════════════ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                // If target is the hero, scroll to top
                if (targetId === '#hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
