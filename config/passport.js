const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const debug = require('debug')('app:passport-config');

const User = require('../models/User');

module.exports = (passport) => {
	passport.use(User.createStrategy());

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const {
						sub: googleId,
						name,
						given_name,
						email,
						picture,
						family_name,
					} = profile._json;

					let user = await User.findOne({ email });
					if (user) {
						return done(null, user);
					}

					user = new User({
						email,
						picture,
						name,
						subId: googleId,
						provider: 'google',
					});

					await user.save();
					done(null, user);
				} catch (error) {
					debug(error);
					done(error, false, { message: error });
				}
			}
		)
	);

	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
};
