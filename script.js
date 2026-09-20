const cards = [...document.querySelectorAll(".card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const photoCount = document.getElementById("photoCount");
const mainContainer = document.getElementById("mainContainer");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxSubtitle = document.getElementById("lightboxSubtitle");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleCards = [];
let currentIndex = 0;
let lastFocusedCard = null;
let filterTimeout = null;

// Apply category filter with subtle exit transition and staggered reveal
function applyFilter(category) {
    clearTimeout(filterTimeout);

    // Cards that will be hidden fade out smoothly
    const toHide = cards.filter(card =>
        category !== "all" && card.dataset.category !== category && !card.classList.contains("hidden")
    );

    toHide.forEach(card => {
        card.classList.add("filtering-out");
        card.setAttribute("tabindex", "-1");
    });

    const delay = toHide.length > 0 ? 150 : 0;

    filterTimeout = setTimeout(() => {
        visibleCards = [];

        cards.forEach(card => {
            const match = category === "all" || card.dataset.category === category;
            card.classList.remove("filtering-out");
            card.classList.toggle("hidden", !match);
            card.setAttribute("tabindex", match ? "0" : "-1");

            if (match) visibleCards.push(card);
        });

        photoCount.textContent = visibleCards.length;

        // Replay subtle reveal animation for visible cards
        visibleCards.forEach((card, index) => {
            card.style.animation = "none";
            void card.offsetWidth;
            card.style.animation = `reveal .45s ease ${index * 0.04}s both`;
        });
    }, delay);
}

// Category filter button listeners
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        applyFilter(button.dataset.filter);
    });
});

// Lightbox controls and accessibility focus management
function openLightbox(card) {
    lastFocusedCard = card;
    currentIndex = visibleCards.indexOf(card);
    if (currentIndex === -1) currentIndex = 0;

    updateLightbox();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Prevent interaction with background page elements
    if (mainContainer) {
        mainContainer.setAttribute("inert", "");
    }

    // Move keyboard focus to close button
    closeBtn.focus();
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Restore background page interactivity
    if (mainContainer) {
        mainContainer.removeAttribute("inert");
    }

    // Return focus to the card that opened the lightbox
    if (lastFocusedCard && typeof lastFocusedCard.focus === "function") {
        lastFocusedCard.focus();
    }
}

function updateLightbox() {
    const card = visibleCards[currentIndex];
    if (!card) return;

    const img = card.querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    lightboxSubtitle.textContent = card.dataset.subtitle;

    lightboxCounter.textContent =
        `${currentIndex + 1} / ${visibleCards.length}`;
}

function showNext() {
    if (!visibleCards.length) return;

    currentIndex = (currentIndex + 1) % visibleCards.length;
    updateLightbox();
}

function showPrevious() {
    if (!visibleCards.length) return;

    currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    updateLightbox();
}

// Gallery cards click and keyboard activation (Enter / Space)
cards.forEach(card => {
    card.addEventListener("click", () => openLightbox(card));

    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(card);
        }
    });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

// Click outside image to close
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Lightbox keyboard shortcuts (Escape, Arrows)
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
    } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
    }
});

// Trap keyboard focus inside lightbox while open
lightbox.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;

    const focusable = [closeBtn, prevBtn, nextBtn];
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
        }
    }
});

// Mobile touch swipe navigation
let touchStartX = 0;

lightbox.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener("touchend", event => {
    const touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 50) return;

    if (distance < 0) showNext();
    else showPrevious();
}, { passive: true });

// Initialize gallery with all photos
applyFilter("all");