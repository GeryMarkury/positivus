document.addEventListener("DOMContentLoaded", () => {
	// Use Intersection Observer to determine if objects are within the viewport
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("in-view");
				return;
			}
			entry.target.classList.remove("in-view");
		});
	});

	// Get all the elements with the .animate class applied
	const allAnimatedElements = document.querySelectorAll(".animate");

	// Add the observer to each of those elements
	allAnimatedElements.forEach(element => observer.observe(element));
});
