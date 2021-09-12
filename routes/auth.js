const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:auth-route');

const router = express.Router();

const User = require('../models/User');

module.exports = () => {
	router
		.route('/')
		.get((req, res) => {
			res.render('auth/signup');
		})
		.post(async (req, res) => {
			const { email, password, name } = req.body;
			try {
				const old = await User.findOne({ email });
				if (old) {
					return res.redirect('/auth/login');
				}
				const newUser = new User({ email, name });
				await newUser.setPassword(password);
				await newUser.save();
				// res.json(user);
				passport.authenticate('local', (err, user, info) => {
					if (err || !user) {
						debug(err);
						return res.redirect('/auth/login');
					}
					req.logIn(user, (err) => {
						if (err) {
							return res.redirect('/auth/login');
						}
						return res.redirect('/');
					});
				})(req, res);
			} catch (error) {
				debug(error);
			}
		});

	router
		.route('/login')
		.get((req, res) => {
			res.render('auth/login');
		})
		.post((req, res) => {
			// res.json(req.body);
			passport.authenticate('local', (err, user, info) => {
				if (err || !user) {
					debug(err);
					return res.redirect('/auth/login');
				}
				req.logIn(user, (err) => {
					if (err) {
						return res.redirect('/auth/login');
					}
					return res.redirect('/');
				});
			})(req, res);
		});

	router.get(
		'/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	router.get(
		'/google/callback',
		passport.authenticate('google', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/');
		}
	);

	router.get('/logout', (req, res) => {
		req.logOut();
		res.redirect('/');
	});

	return router;
};
