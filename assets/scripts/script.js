document.addEventListener("DOMContentLoaded", function () {
    
    /* -------------------------- MENU BURGER -------------------------- */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }

    /* -------------------------- FIXED NAVBAR -------------------------- */
    const navbar = document.querySelector("nav");
    function handleScroll() {
        if (window.scrollY > 125) {
            navbar?.classList.add("fixed");
        } else {
            navbar?.classList.remove("fixed");
        }
    }
    window.addEventListener("scroll", handleScroll);

    /* -------------------------- CARROUSEL (Manuel) -------------------------- */
    const container = document.querySelector(".projet-container");
    const items = document.querySelectorAll(".projet");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (container && items.length > 0 && prevButton && nextButton) {
        let index = Math.floor(items.length / 2); // Élément central
        const totalItems = items.length;
        const itemWidth = items[0].offsetWidth;
        const gap = 30; // Espace entre les éléments

        function updateCarousel() {
            const offset = -(index * (itemWidth + gap)) + container.clientWidth / 2 - itemWidth / 2;
            container.style.transform = `translateX(${offset}px)`;
        }

        nextButton.addEventListener("click", () => {
            index = (index + 1) % totalItems;
            updateCarousel();
        });

        prevButton.addEventListener("click", () => {
            index = (index - 1 + totalItems) % totalItems;
            updateCarousel();
        });

        // Swipe mobile
        let startX = 0;
        container.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        container.addEventListener("touchend", (e) => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                nextButton.click();
            } else if (endX - startX > 50) {
                prevButton.click();
            }
        });

        // Appliquer les styles de transition
        container.style.display = "flex";
        container.style.transition = "transform 0.5s ease-in-out";
        updateCarousel();
    }

 /* -------------------------- CARROUSEL (Automatique) -------------------------- */

    const sliderContainer = document.querySelector('#reassurance');
    const slider = sliderContainer.querySelector('.slider');
    const cards = slider.querySelectorAll('.card');
    const totalCards = cards.length;

    // Dupliquer les cartes pour donner l'illusion d'infinité
    for (let i = 0; i < totalCards; i++) {
    const clone = cards[i].cloneNode(true);
    slider.appendChild(clone);
    }

    let offset = 0;
    let paused = false;

    // Gestion du survol sur le conteneur pour mettre l'animation en pause
    sliderContainer.addEventListener('mouseenter', () => {
    paused = true;
    });
    sliderContainer.addEventListener('mouseleave', () => {
    paused = false;
    });

    // Animation via requestAnimationFrame pour une synchronisation avec le rafraîchissement de l'écran
    function animate() {
    if (!paused) {
        offset -= 1; // Déplacer d'un pixel à chaque frame
        slider.style.transform = `translateX(${offset}px)`;

        // Si la première série de cartes est entièrement sortie de la vue, réinitialiser l'offset
        if (Math.abs(offset) >= (cards[0].offsetWidth + 20) * totalCards) {
        offset = 0;
        slider.style.transition = "none"; // Désactiver la transition pour éviter un saut visuel
        slider.style.transform = `translateX(${offset}px)`;

        // Réactiver la transition après un court délai
        setTimeout(() => {
            slider.style.transition = "transform 0.3s ease";
        }, 50);
        }
    }
    requestAnimationFrame(animate);
    }
    animate();

    /* -------------------------- Scroll-top -------------------------- */
    const scrollTopButton = document.querySelector(".scroll-top");
    if (scrollTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > window.innerHeight) {
                scrollTopButton.classList.add("visible");
            } else {
                scrollTopButton.classList.remove("visible");
            }
        });

        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

