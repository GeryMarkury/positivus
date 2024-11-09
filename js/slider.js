const carouselTrack = document.querySelector(".carousel-track");
const originalSlides = Array.from(document.querySelectorAll(".carousel-slide"));
let displaySlides = [];
let currentIndex = 0;
let isPaginating = false;

function initializeDisplaySlides() {
	displaySlides = [];
	const totalSlides = originalSlides.length;

	for (let i = -2; i <= 2; i++) {
		const index = (currentIndex + i + totalSlides) % totalSlides;
		const slideCopy = originalSlides[index].cloneNode(true);
		displaySlides.push(slideCopy);
	}
	renderCarousel(false); // Initial rendering without animation
	updateIndicator(); // Set initial indicator as active
}

function renderCarousel(applyAnimation = true) {
	console.log("Applying animation:", applyAnimation);
	if (!applyAnimation) {
		carouselTrack.style.transition = "none";
		console.log("Transition set to none");
	} else {
		carouselTrack.style.transition = "transform 0.5s ease-in-out";
		console.log("Transition set to transform 0.5s ease-in-out");
	}

	carouselTrack.innerHTML = "";
	displaySlides.forEach(slide => carouselTrack.appendChild(slide));

	if (!applyAnimation) {
		// Restore transition after initial setup
		setTimeout(() => {
			carouselTrack.style.transition = "transform 0.5s ease-in-out";
			console.log("Transition restored to transform 0.5s ease-in-out");
		}, 50);
	}
}

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
	updateIndicator();
}

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
	updateIndicator();
	isPaginating = false;
}

function updateIndicator() {
	document.querySelectorAll(".indicator").forEach((indicator, index) => {
		indicator.classList.toggle("active", index === currentIndex);
	});
}

document.querySelector("#next-btn").addEventListener("click", () => moveSlide("next"));
document.querySelector("#prev-btn").addEventListener("click", () => moveSlide("prev"));

document.querySelectorAll(".indicator").forEach((indicator, index) => {
	indicator.addEventListener("click", () => goToSlide(index));
});

initializeDisplaySlides();