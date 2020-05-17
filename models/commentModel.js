const {Schema, model, ObjectId} = require('mongoose');

const comment = new Schema({
	postID: {type: ObjectId, required: true},
	parentID: {type: String, required: false},
	postedOn: {type: String, required: true},
	author: {type: ObjectId, required: true},
	comment: {type: String, required: true},
},
{
	toObject: {virtuals: true}
});

module.exports = model('comments', comment);