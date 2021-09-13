(() => {
	document.querySelectorAll('.dropdown').forEach((dropdown) => {
		// console.log(dropdown);
		dropdown.addEventListener('click', function () {
			// console.log(this);
			toggleCSS(this.querySelector('.dropdown-menu'), 'display', [
				'none',
				'initial',
			]);
		});
	});
})();

/**
 * @param {HTMLElement} elem
 * @param {String} property
 * @param {Array} values
 */
function toggleCSS(elem, property, values) {
	if (values.length !== 2) {
		throw new Error('Provide only two properties to toggle between');
	}
	if (elem.style[property] != values[1]) {
		elem.style[property] = values[1];
	} else {
		elem.style[property] = values[0];
	}
}
