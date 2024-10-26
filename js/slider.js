// const slides = document.querySelectorAll(".slide");
// const dots = document.querySelectorAll(".dot");
// const prevBtn = document.querySelector(".slider__btn--prev");
// const nextBtn = document.querySelector(".slider__btn--next");
// let currentSlide = 0;

// function showSlide(index) {
// 	slides.forEach((slide, i) => {
// 		slide.classList.toggle("active", i === index);
// 		dots[i].classList.toggle("active", i === index);
// 	});
// }

// nextBtn.addEventListener("click", () => {
// 	currentSlide = (currentSlide + 1) % slides.length;
// 	showSlide(currentSlide);
// });

// prevBtn.addEventListener("click", () => {
// 	currentSlide = (currentSlide - 1 + slides.length) % slides.length;
// 	showSlide(currentSlide);
// });

// dots.forEach((dot, index) => {
// 	dot.addEventListener("click", () => {
// 		currentSlide = index;
// 		showSlide(currentSlide);
// 	});
// });

// showSlide(currentSlide);
