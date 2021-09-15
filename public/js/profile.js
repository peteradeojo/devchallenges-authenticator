(() => {
	document.querySelectorAll('input.previewable').forEach((input) => {
		input.addEventListener('change', function () {
			/**
			 * @type {HTMLInputElement}
			 * @name preview
			 */
			const preview = document.querySelector(this.getAttribute('data-preview'));
			/**
			 * @type {File}
			 * @name file
			 */

			const file = this.files[0];
			let reader = new FileReader();
			reader.onload = (e) => {
				preview.style.backgroundImage = `url("${e.target.result}")`;
			};
			reader.readAsDataURL(file);
		});
	});
})();
