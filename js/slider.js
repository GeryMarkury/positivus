const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const carouselTrack = document.querySelector(".carousel-track");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const indList = document.querySelector(".carousel-indicator");

let activeSlideIndex = 1; // Start at 1 to account for the added clone
let isTransitioning = false; // To control quick jump during wrap-around

// Clone the first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.classList.add("clone");
lastClone.classList.add("clone");

carouselTrack.appendChild(firstClone);
carouselTrack.insertBefore(lastClone, slides[0]);

const updateInd = () => {
	const indicators = document.querySelectorAll(".indicator");
	indicators.forEach((el, idx) => {
		el.classList.remove("active");
		if (idx === (activeSlideIndex - 1) % slides.length) {
			el.classList.add("active");
		}
	});
};

const centerSlide = () => {
	const slideWidth = slides[0].clientWidth;
	const gap = 50; // The gap between slides
	const offset = (carouselTrack.clientWidth - slideWidth) / 2;
	const translateX = -((slideWidth + gap) * activeSlideIndex - offset);
	carouselTrack.style.transform = `translateX(${translateX}px)`;
	updateInd();
};

const moveSlide = dir => {
	if (isTransitioning) return; // Prevent transitions during quick jump

	if (dir === "prev") {
		activeSlideIndex--;
	} else if (dir === "next") {
		activeSlideIndex++;
	}
	carouselTrack.style.transition = "transform 500ms ease-out";
	centerSlide();

	isTransitioning = true;
	// Wrap around effect
	carouselTrack.addEventListener("transitionend", () => {
		isTransitioning = false;
		if (activeSlideIndex === slides.length + 1) {
			activeSlideIndex = 1;
			carouselTrack.style.transition = "none"; // Disable transition for instant jump
			centerSlide();
		} else if (activeSlideIndex === 0) {
			activeSlideIndex = slides.length;
			carouselTrack.style.transition = "none";
			centerSlide();
		}
	});
};

nextBtn.addEventListener("click", () => moveSlide("next"));
prevBtn.addEventListener("click", () => moveSlide("prev"));

indList.addEventListener("click", e => {
	const target = e.target;
	console.log(target);
	if (target.classList.contains("indicator")) {
		activeSlideIndex = parseInt(target.dataset.index, 10) + 1;
		carouselTrack.style.transition = "transform 500ms ease-out";
		centerSlide();
	} else if (target.closest(".indicator")) {
		activeSlideIndex = parseInt(target.closest(".indicator").dataset.index, 10) + 1;
		carouselTrack.style.transition = "transform 500ms ease-out";
		centerSlide();
	}
});

// Initialize center position on page load with first real slide
centerSlide();
