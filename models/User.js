const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	subId: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: String,
	provider: String,
	picture: String,
	bio: String,
	phone: String,
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	usernameUnique: false,
});

module.exports = mongoose.model('user', userSchema);
