const { Schema, model } = require('mongoose');

const post = new Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
	image: {type: String, required:false},
	tags: {type: Array, required: false},
	userID: {type: String, required: true},
	userName: {type: String, required: true},
	createdOn: {type: Date, required: true},
	upVotes: {type: Number, required: true}
});

module.exports = model('posts', post);