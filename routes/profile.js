const express = require('express');
const debug = require('debug')('app:profile-route');

const router = express.Router();

const { validateLogin } = require('../midware/auth');
const { updateProfile } = require('../controllers/Profile');

module.exports = () => {
	router.use(validateLogin);
	router.get('/', (req, res) => {
		res.render('profile/index');
	});

	router.post('/', updateProfile);

	return router;
};
