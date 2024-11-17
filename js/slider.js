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
    console.log(`Current Index: ${currentIndex}, Target Index: ${targetIndex}`);
    console.log(`Index Difference: ${indexDifference}`);

    // Determine direction
    const direction = indexDifference > 0 ? "forward" : "backward";
    console.log(`Direction: ${direction}`);

    // Step 1: Build the pre-animation `displaySlides` array
    displaySlides = [];
    if (direction === "forward") {
        // Moving forward: Add slides with extra on the right
        for (let i = targetIndex - 2; i <= targetIndex + 2 + Math.abs(indexDifference); i++) {
            const index = (i + totalSlides) % totalSlides; // Ensure valid index
            const slideCopy = originalSlides[index].cloneNode(true);
            displaySlides.push(slideCopy);
        }
    } else {
        // Moving backward: Add slides with extra on the left
        for (let i = targetIndex - 2 - Math.abs(indexDifference); i <= targetIndex + 2; i++) {
            const index = (i + totalSlides) % totalSlides; // Ensure valid index
            const slideCopy = originalSlides[index].cloneNode(true);
            displaySlides.push(slideCopy);
        }
    }

    console.log("Pre-animation displaySlides:", displaySlides.map(slide => slide.textContent.trim()));

    // Step 2: Render the updated slides (without animation)
    renderCarousel(false);
    console.log("Rendered updated slides before animation.");

    // Step 3: Wait for rendering to complete, then start the animation
    setTimeout(() => {
        const translateX = -indexDifference * slideWidth;
        console.log(`Starting animation with translateX: ${translateX}px`);
        renderCarousel(true, translateX);

        // Step 4: After animation, clean up the `displaySlides` array
        setTimeout(() => {
            console.log("Animation complete. Cleaning up slides...");

            displaySlides = [];
            for (let i = targetIndex - 2; i <= targetIndex + 2; i++) {
                const index = (i + totalSlides) % totalSlides; // Ensure valid index
                const slideCopy = originalSlides[index].cloneNode(true);
                displaySlides.push(slideCopy);
            }

            console.log("Final displaySlides:", displaySlides.map(slide => slide.textContent.trim()));

            // Step 5: Update state and reset
            currentIndex = targetIndex;
            console.log(`Updated Current Index: ${currentIndex}`);

            resetCarousel(); // Reset transform
            console.log("Carousel transform reset.");

            renderCarousel(false); // Update DOM without animation
            console.log("Re-rendered carousel without animation.");

            updateIndicator(); // Update the indicator
            console.log("Updated indicator.");

            isAnimating = false;
            console.log("Animation flag reset. Ready for next interaction.");
        }, 1500); // Match the animation duration
    }, 500); // Small delay to allow DOM updates before animation
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