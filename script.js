document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileBtn.classList.remove('active');
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Carousel Logic
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto play
    let slideTimer = setInterval(nextSlide, slideInterval);

    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Manual Navigation (Dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            resetTimer();
            showSlide(index);
        });
    });

    // Manual Navigation (Arrows)
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            resetTimer();
            prevSlide();
        });

        nextBtn.addEventListener('click', () => {
            resetTimer();
            nextSlide();
        });
    }

    // Load More Services Logic (Desktop)
    const loadMoreBtn = document.getElementById('load-more-services');
    const serviceCards = document.querySelectorAll('.services__grid .service-card');
    const itemsPerLoad = 3;
    let visibleItems = 3;

    // Initial state for desktop
    if (window.innerWidth > 992) {
        serviceCards.forEach((card, index) => {
            if (index >= visibleItems) {
                card.classList.add('hidden-desktop');
            }
        });

        if (visibleItems >= serviceCards.length) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const hiddenCards = document.querySelectorAll('.service-card.hidden-desktop');

            for (let i = 0; i < itemsPerLoad && i < hiddenCards.length; i++) {
                hiddenCards[i].classList.remove('hidden-desktop');
            }

            // Check if any cards are still hidden
            const remainingHidden = document.querySelectorAll('.service-card.hidden-desktop');
            if (remainingHidden.length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    // Handle resize to reset/adjust state if needed (optional but good for UX)
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 992) {
            // On mobile, show all cards (remove the class that hides them)
            serviceCards.forEach(card => card.classList.remove('hidden-desktop'));
        } else {
            // On desktop, re-apply hiding based on current visible count? 
            // Or just leave as is. For simplicity, we'll leave it as is to avoid re-hiding things the user already opened.
            // But we should ensure the initial state is correct if reloading or coming from mobile?
            // For now, let's just ensure the button visibility is correct.
            const remainingHidden = document.querySelectorAll('.service-card.hidden-desktop');
            if (remainingHidden.length === 0 && loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            } else if (loadMoreBtn) {
                loadMoreBtn.style.display = 'inline-flex'; // Restore button if there are hidden items
            }
        }
    });
});
