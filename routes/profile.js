const express = require('express');

const router = express.Router();

const { validateLogin } = require('../midware/auth');

module.exports = () => {
	router.use(validateLogin);
	router.get('/', (req, res) => {
		res.render('profile/index');
	});

	return router;
};
