const slides = document.querySelectorAll(".carousel-slide");

const carouselTrack = document.querySelector(".carousel-track");

const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");

const indList = document.querySelector(".carousel-indicator");

let activeSlideIndex = 0;

const updateInd = () => {
	let indicators = document.querySelectorAll(".indicator");
	indicators.forEach((el, idx) => {
		el.classList.remove("active");
		if (idx === activeSlideIndex) {
			el.classList.add("active");
		}
	});
};

const moveSlide = dir => {
	let imgWidth = slides[activeSlideIndex].clientWidth;
	if (dir === "prev") {
		if (activeSlideIndex > 0) {
			activeSlideIndex--;
		} else {
			activeSlideIndex = slides.length - 1;
		}
	} else if (dir === "next") {
		if (activeSlideIndex < slides.length - 1) {
			activeSlideIndex++;
		} else {
			activeSlideIndex = 0;
		}
	}
	carouselTrack.style.transform = `translateX(-${activeSlideIndex * imgWidth}px)`;
	updateInd();
};

const moveSlides = idx => {
	let diff = idx - activeSlideIndex;
	if (diff >= 0) {
		for (let i = 0; i < diff; i++) {
			moveSlide("next");
		}
	} else {
		diff *= -1;
		for (let i = 0; i < diff; i++) {
			moveSlide("prev");
		}
	}
};

// const generateInd = () => {
// 	for (let i = 0; i < slides.length; i++) {
// 		let newItem = document.createElement("li");
// 		newItem.classList.add("indicator");
// 		newItem.setAttribute("data-index", i);
// 		indList.appendChild(newItem);
// 	}
// 	updateInd();
// };

indList.addEventListener("click", e => {
	let target = e.target;
	console.log(target);
	if (target.classList.contains("indicator")) {
		console.log(target.dataset.index);
		moveSlides(target.dataset.index);
	} else if (target.closest(".indicator")) {
		moveSlides(target.closest(".indicator").dataset.index);
	}
});

nextBtn.addEventListener("click", () => {
	moveSlide("next");
});
prevBtn.addEventListener("click", () => {
	moveSlide("prev");
});

window.addEventListener("keyup", e => {
	if (e.keyCode === 37) {
		moveSlide("prev");
	} else if (e.keyCode === 39) {
		moveSlide("next");
	}
});

// document.addEventListener("DOMContentLoaded", () => {
// 	generateInd();
// });
