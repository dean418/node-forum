const {nanoid} = require('nanoid');
const {formatDate} = require('../lib/formatDate');
const {nestObject} = require('../lib/nestObject')
const PostModel = require('../models/postModel');
const CommentModel = require('../models/commentModel');

exports.getAll = async (req, res) => {
	let posts = await PostModel.getPosts()
	res.render('index', {posts});
}

exports.getImage = (req, res) => {
	let uplaodsPath = __dirname.substring(0, __dirname.lastIndexOf('/')) + '/uploads/';
	res.sendFile(uplaodsPath + req.params.imageID);
}

exports.create = (req, res) => {
	let {title, content, tags} = req.body;
	let imageID = nanoid();

	req.files.image.mv(`./uploads/${imageID}`);

	tags = tags.split(',');
	tags = tags.map(tag => tag.trim());

	let post = new PostModel({
		title: title,
		content: content,
		tags: tags,
		image: imageID,
		userID: req.session.userID,
		userName: req.session.userName,
		createdOn: formatDate(),
		upVotes: 0
	});

	post.save();
	res.redirect('/');
}

exports.getFullPost = async (req, res) => {
	let postData = await PostModel.findOne({_id: req.params.postID});
	let comments = await CommentModel.find({postID: req.params.postID});

	let commentArr = comments.map(comment => comment.toObject());

	let nestedComments = nestObject(commentArr);

	res.locals.fullPost = 'true';
	res.render('fullPost', {comments: nestedComments, posts: {postData: postData.toObject()}});
}

exports.comment = (req, res) => {
	let comment = new CommentModel({
		postID: req.params.postID,
		parentID: req.params.commentID,
		postedOn: formatDate(),
		author: req.session.userName,
		comment: req.body.comment
	});

	comment.save();

	res.redirect(`/post/${req.params.postID}`);
}

exports.delete = async (req, res) => {
	let post = await PostModel.findOne({userID: req.session.userID, _id: req.params.postID});

	if (post) {
		await PostModel.deleteOne({_id: post._id});
	}

	if (req.headers.referer.includes('post')) {
		res.redirect('/');
		return;
	}
	res.redirect(req.headers.referer);
}