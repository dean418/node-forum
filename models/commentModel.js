const {Schema, model} = require('mongoose');

const comment = new Schema({
	postID: {type: String, required: true},
	parentID: {type: String, required: false},
	postedOn: {type: String, required: true},
	author: {type: String, required: true},
	comment: {type: String, required: true},
},
{
	toObject: {virtuals: true}
});

module.exports = model('comments', comment);