const { Schema, model } = require('mongoose');

const user = Schema({
	userName: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: false },
	createdOn: { type: Date, required: true, unique: false },
	upVotes: { type: Number, required: true, unique: false }
}, {
	toObject: {virtuals: true}
});

user.statics.findByLogin = async function (login) {
	let user = await this.findOne({ userName: login });

	if (!user) {
		user = await this.findOne({ email: login });
	}

	return user;
}

user.statics.userExists = async function(userName, email) {
	let user = await this.findOne({ userName });

	if (!user) {
		user = await this.findOne({ email });
	}

	return user;
}

module.exports = model('users', user);