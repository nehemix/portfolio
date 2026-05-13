// System Initialization Script
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized. System ready...');

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // --- Katana Slash Animation ---
    const katanaContainer = document.getElementById('katana-container');
    const titleToCut = document.getElementById('title-to-cut');
    const katanaSound = document.getElementById('katana-sound');
    let isAnimating = false;

    if (katanaContainer && titleToCut && katanaSound) {
        katanaContainer.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            // Reset state if already cut, then slash
            if (titleToCut.classList.contains('is-cut')) {
                titleToCut.classList.remove('is-cut');
                setTimeout(slash, 400); // Faster reset
            } else {
                slash();
            }
        });
    }

    function slash() {
        // Calculate positions for the animation

        // Reset glow opacity from previous cut before starting a new one
        titleToCut.style.removeProperty('--glow-opacity');

        const katanaRect = katanaContainer.getBoundingClientRect();
        const titleRect = titleToCut.getBoundingClientRect();

        // Target the middle of the title
        const targetX = titleRect.left + titleRect.width / 2 - katanaRect.left - katanaRect.width / 2;
        const targetY = titleRect.top + titleRect.height / 2 - katanaRect.top - katanaRect.height / 2;

        // Set CSS variables for the animation
        katanaContainer.style.setProperty('--tx', `${targetX}px`);
        katanaContainer.style.setProperty('--ty', `${targetY}px`);

        // Trigger the animation
        katanaContainer.classList.add('katana-slash-animation');

        // Play the sound slightly before the visual cut (during the wind-up)
        setTimeout(() => {
            katanaSound.currentTime = 0;
            katanaSound.play();
        }, 100);

        // Time the cut effect (40% of 1.0s animation = 400ms)
        setTimeout(() => {
            titleToCut.classList.add('is-cut');
            createParticles(titleToCut);

            // Hide the glow after a short delay
            setTimeout(() => {
                if (titleToCut.classList.contains('is-cut')) {
                    titleToCut.style.setProperty('--glow-opacity', '0');
                }
            }, 150); // Glow visible for 150ms
        }, 400);

        // Listen for animation end to reset
        katanaContainer.addEventListener('animationend', () => {
            katanaContainer.classList.remove('katana-slash-animation');
            isAnimating = false;
        }, { once: true });
    }

    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 25;
        const container = document.body;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('slash-particle');
            container.appendChild(particle);

            const size = Math.random() * 4 + 1;
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + rect.height / 2;

            const angle = (Math.random() - 0.5) * Math.PI * 0.5 + (Math.PI * 1.75); // Flips particles to top-right
            const velocity = Math.random() * 80 + 40;
            const endX = Math.cos(angle) * velocity;
            const endY = Math.sin(angle) * velocity;

            particle.style.cssText = `width:${size}px; height:${size}px; left:${startX}px; top:${startY}px;`;

            const animation = particle.animate([{ transform: 'translate(0, 0) scale(1)', opacity: 1 }, { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }], { duration: Math.random() * 600 + 400, easing: 'cubic-bezier(0.1, 0.7, 0.3, 1)', fill: 'forwards' });
            animation.onfinish = () => particle.remove();
        }
    }
});