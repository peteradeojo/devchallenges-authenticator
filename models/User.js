const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: String,
	provider: String,
	profilePic: String,
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	usernameUnique: false,
});

module.exports = mongoose.model('user', userSchema);
