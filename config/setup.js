const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const debug = require('debug')('app:setup');

module.exports = (app) => {
	if (app.get('env') !== 'production') {
		require('dotenv').config();
		app.use(require('morgan')('dev'));
	}
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Views and statics
	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, '..', 'views'));
	app.use(express.static(path.join(__dirname, '..', 'public')));

	// Arch config
	app.use(
		session({
			secret: process.env.SECRET,
			resave: false,
			saveUninitialized: false,
			store: mongoStore.create({ mongoUrl: process.env.MONGO_URL }),
		})
	);
	app.use(cookieParser());

	(async () => {
		try {
			const connection = await mongoose.connect(process.env.MONGO_URL, {
				useUnifiedTopology: true,
			});
			debug(
				`MongoDB running on ${connection.connection.host}:${connection.connection.port}`
			);
		} catch (error) {
			debug(error);
		}
	})();

	require('./passport')(passport);
	app.use(passport.initialize());
	app.use(passport.session());
};
