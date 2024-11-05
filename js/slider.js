// Variables and setup
const carouselTrack = document.querySelector(".carousel-track");
const originalSlides = Array.from(document.querySelectorAll(".carousel-slide"));
let displaySlides = [];
let currentIndex = 0;
let isPaginating = false;

// Initialize the carousel by setting up initial slides
function initializeDisplaySlides() {
	displaySlides = [];
	const totalSlides = originalSlides.length;

	// Add the center and surrounding slides
	for (let i = -2; i <= 2; i++) {
		const index = (currentIndex + i + totalSlides) % totalSlides;
		const slideCopy = originalSlides[index].cloneNode(true);
		displaySlides.push(slideCopy);
	}
	renderCarousel(false); // Initial rendering without animation
	updateIndicator(); // Set initial indicator as active
}

// Render the display slides into the track
function renderCarousel(applyAnimation = true) {
	if (!applyAnimation) {
		carouselTrack.style.transition = "none";
	} else {
		carouselTrack.style.transition = "transform 0.5s ease-in-out";
	}

	carouselTrack.innerHTML = ""; // Clear and re-render slides
	displaySlides.forEach(slide => carouselTrack.appendChild(slide));

	// Center the carousel on the main slide
	centerCarousel();

	if (!applyAnimation) {
		// Restore transition after initial setup
		setTimeout(() => {
			carouselTrack.style.transition = "transform 0.5s ease-in-out";
		}, 50);
	}
}

// Center the carousel track on the active slide
function centerCarousel() {
	const slideWidth = displaySlides[2].clientWidth;
	const gap = 50; // Adjust according to your CSS gap
	const offset = (carouselTrack.clientWidth - slideWidth) / 2;
	const translateX = -((slideWidth + gap) * 2 - offset);
	carouselTrack.style.transform = `translateX(${translateX}px)`;
}

// Function to move slides with animation
function moveSlide(direction) {
	if (isPaginating) return;

	const totalSlides = originalSlides.length;

	if (direction === "next") {
		currentIndex = (currentIndex + 1) % totalSlides;
		displaySlides.shift();
		const newSlideIndex = (currentIndex + 2) % totalSlides;
		const newSlide = originalSlides[newSlideIndex].cloneNode(true);
		displaySlides.push(newSlide);
	} else if (direction === "prev") {
		currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
		displaySlides.pop();
		const newSlideIndex = (currentIndex - 2 + totalSlides) % totalSlides;
		const newSlide = originalSlides[newSlideIndex].cloneNode(true);
		displaySlides.unshift(newSlide);
	}

	renderCarousel(true);
	updateIndicator(); // Update the active indicator
}

// Pagination to go to a specific slide
function goToSlide(targetIndex) {
	isPaginating = true;
	const totalSlides = originalSlides.length;
	currentIndex = targetIndex;

	displaySlides = [];
	for (let i = -2; i <= 2; i++) {
		const index = (currentIndex + i + totalSlides) % totalSlides;
		const slideCopy = originalSlides[index].cloneNode(true);
		displaySlides.push(slideCopy);
	}

	renderCarousel(true);
	updateIndicator(); // Update the active indicator
	isPaginating = false;
}

// Update the active indicator
function updateIndicator() {
	document.querySelectorAll(".indicator").forEach((indicator, index) => {
		indicator.classList.toggle("active", index === currentIndex);
	});
}

// Event listeners
document.querySelector("#next-btn").addEventListener("click", () => moveSlide("next"));
document.querySelector("#prev-btn").addEventListener("click", () => moveSlide("prev"));

document.querySelectorAll(".indicator").forEach((indicator, index) => {
	indicator.addEventListener("click", () => goToSlide(index));
});

// Initialize
initializeDisplaySlides();
