const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const debug = require('debug')('app:setup');

module.exports = (app) => {
	if (process.env.NODE_ENV !== 'production') {
		require('dotenv').config();
		app.use(require('morgan')('dev'));
	}

	// Arch config
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(fileUpload({ useTempFiles: true }));
	app.use(
		session({
			secret: process.env.SECRET,
			resave: false,
			saveUninitialized: false,
			store: mongoStore.create({ mongoUrl: process.env.MONGO_URL }),
		})
	);
	app.use(cookieParser());

	// Views and statics
	app.use(express.static(path.join(__dirname, '..', 'public')));
	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, '..', 'views'));

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
