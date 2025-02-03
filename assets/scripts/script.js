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
        const gap = 20; // Espace entre les éléments

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

    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length;

    // Dupliquer les cartes pour donner l'illusion d'infinité
    for (let i = 0; i < totalCards; i++) {
        const clone = cards[i].cloneNode(true);
        slider.appendChild(clone);
    }

    // Faire défiler de manière infinie
    let offset = 0;

    setInterval(function () {
        offset -= 1; // On déplace d'un pixel à chaque intervalle
        slider.style.transform = `translateX(${offset}px)`;

        // Si la première carte est totalement sortie, on la réinitialise à la fin
        if (Math.abs(offset) >= (cards[0].offsetWidth + 20) * totalCards) {
            offset = 0;
            slider.style.transition = "none"; // Désactiver la transition pendant la réinitialisation
            slider.style.transform = `translateX(${offset}px)`;

            setTimeout(function () {
                slider.style.transition = "transform 0.3s ease"; // Réactiver la transition après réinitialisation
            }, 50);
        }
    }, 20); // Ajuste la vitesse ici (20ms pour plus de fluidité)
});

