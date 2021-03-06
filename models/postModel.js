const { Schema, model, ObjectId } = require('mongoose');
const CommentModel = require('./commentModel');

const post = new Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
	image: {type: String, required: false},
	imageLocation: {type: String, required: false},
	tags: {type: Array, required: false},
	userID: {type: String, required: true},
	userName: {type: String, required: true},
	createdOn: {type: String, required: true},
	upVotes: {type: Number, required: true},
}, {
	toObject: {virtuals: true}
});

post.pre('deleteOne', async function(next) {
	await CommentModel.deleteMany({postID: this.getFilter()._id});
	next();
});

post.statics.getPosts = async function () {
	let postObject = await this.aggregate([
		{
			$lookup: {
			from: 'comments',
			localField: '_id',
			foreignField: 'postID',
			as: 'commentCount'
		}},
		{
			$addFields: {'commentCount': {
				$size: '$commentCount'
			}}
		}
	]);
	return postObject;
}

module.exports = model('posts', post);