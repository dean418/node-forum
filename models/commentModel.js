const {Schema, model} = require('mongoose');

const comment = new Schema({
	postID: {type: String, required: true},
	parentID: {type: String, required: true},
	postedOn: {type: Date, required: true},
	author: {type: String, required: true},
	text: {type: String, required: true},
});

module.exports = model(comment, 'comments');