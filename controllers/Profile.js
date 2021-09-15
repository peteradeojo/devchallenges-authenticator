const debug = require('debug')('app:Profile-controller');
const fs = require('fs');
const crypto = require('node:crypto');
const path = require('path');

const User = require('../models/User');

// crypto.pseudoRandomBytes(24)

const validatePicture = (pic) => {
	if (pic) {
		// debug(pic);
		return true;
	} else {
		debug('No picture');
	}
};
// const uploadPath =

const controller = {
	updateProfile: async (req, res) => {
		try {
			const user = await User.findOne({ email: req.user.email });
			if (!user) {
				return res.send('No user info found');
			}

			let dir = path.join(__dirname, '..', 'uploads');

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}

			if (req.files) {
				let { picture } = req.files;
				if (validatePicture(picture)) {
					const ext = path.extname(picture.name);
					user.picture = crypto.randomBytes(20).toString('hex') + ext;
					let uploadPath = path.join(__dirname, '..', 'uploads', user.picture);
					// user.picture = uploadPath;
					user.picture = '/uploads/' + user.picture;
					picture.mv(uploadPath, (error) => {
						if (error) {
							debug(error);
						}
					});
				}
			}

			user.name = req.body.name ? req.body.name : user.name;
			user.bio = req.body.bio ? req.body.bio : user.bio;
			user.phone = req.body.phone ? req.body.phone : user.phone;
			await user.save();

			// res.json({ body: req.body, files: req.files, user });
			res.redirect('/');
		} catch (err) {
			debug(err);
			res.redirect('/profile');
		}
	},
};

module.exports = controller;
