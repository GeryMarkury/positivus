const carouselTrack = document.querySelector(".carousel-track");
const originalSlides = Array.from(document.querySelectorAll(".carousel-slide"));
let displaySlides = [];
let currentIndex = 0;
const slideWidth = 656; // 606px width + 50px gap
let isAnimating = false;

function initializeDisplaySlides() {
    displaySlides = [];
    const totalSlides = originalSlides.length;

    for (let i = -2; i <= 2; i++) {
        const index = (currentIndex + i + totalSlides) % totalSlides;
        const slideCopy = originalSlides[index].cloneNode(true);
        displaySlides.push(slideCopy);
    }

    renderCarousel(false);
    updateIndicator();
}

function renderCarousel(applyAnimation = true, translateX = 0) {
    console.log("Rendering carousel...");
    if (!applyAnimation) carouselTrack.style.transition = "none";
    else carouselTrack.style.transition = "transform 0.5s ease-in-out";

    carouselTrack.innerHTML = ""; // Clear the track
    displaySlides.forEach(slide => carouselTrack.appendChild(slide));

    // Apply transform
    carouselTrack.style.transform = `translateX(${translateX}px)`;
}

function resetCarousel() {
    carouselTrack.style.transition = "none";
    carouselTrack.style.transform = "translateX(0)";
}

function moveSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const totalSlides = originalSlides.length;

    // Calculate the translation direction
    const translateX = direction === "next" ? -slideWidth : slideWidth;

    // Animate the movement
    renderCarousel(true, translateX);

    setTimeout(() => {
        // Update displaySlides after animation
        if (direction === "next") {
            currentIndex = (currentIndex + 1) % totalSlides;
            displaySlides.shift(); // Remove the leftmost slide
            const newSlideIndex = (currentIndex + 2) % totalSlides;
            const newSlide = originalSlides[newSlideIndex].cloneNode(true);
            displaySlides.push(newSlide); // Add the rightmost slide
        } else if (direction === "prev") {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            displaySlides.pop(); // Remove the rightmost slide
            const newSlideIndex = (currentIndex - 2 + totalSlides) % totalSlides;
            const newSlide = originalSlides[newSlideIndex].cloneNode(true);
            displaySlides.unshift(newSlide); // Add the leftmost slide
        }

        resetCarousel(); // Reset transform
        renderCarousel(false); // Update DOM without animation
        updateIndicator();
        isAnimating = false;
    }, 500); // Match the animation duration
}

function goToSlide(targetIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const totalSlides = originalSlides.length;
    const indexDifference = targetIndex - currentIndex;

    // Calculate the total translation
    const translateX = -indexDifference * slideWidth;

    // Animate the movement
    renderCarousel(true, translateX);

    setTimeout(() => {
        // Build the displaySlides array dynamically
        displaySlides = [];
        for (let i = targetIndex - 2; i <= targetIndex + 2; i++) {
            const index = (i + totalSlides) % totalSlides;
            const slideCopy = originalSlides[index].cloneNode(true);
            displaySlides.push(slideCopy);
        }

        currentIndex = targetIndex;

        resetCarousel(); // Reset transform
        renderCarousel(false); // Update DOM without animation
        updateIndicator();
        isAnimating = false;
    }, 500); // Match the animation duration
}

function updateIndicator() {
    document.querySelectorAll(".indicator").forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentIndex);
    });
}

// Event Listeners
document.querySelector("#next-btn").addEventListener("click", () => moveSlide("next"));
document.querySelector("#prev-btn").addEventListener("click", () => moveSlide("prev"));

document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
});

// Initialize
initializeDisplaySlides();