module.exports = {
	/**
	 *
	 * @param {Request} req
	 * @param {*} res
	 * @param {*} next
	 * @returns
	 */
	validateLogin: (req, res, next) => {
		if (!req.isAuthenticated()) {
			return res.redirect('/auth');
		}
		return next();
	},
};
