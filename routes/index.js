const express = require('express');

const router = express.Router();

const { validateLogin } = require('../midware/auth');

module.exports = () => {
	router.get('/', validateLogin, (req, res) => {
		res.render('index', { user: req.user });
	});

	return router;
};
