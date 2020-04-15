const {nanoid} = require('nanoid');

const PostModel = require('../models/postModel');

exports.getAll = async (req, res) => {
	let posts = await PostModel.find({});

	let postArr = [];

	for (const post of posts) {
		postArr.push({
			title: post.title,
			content: post.content,
			image: post.image,
			createdOn: post.createdOn,
			tags: post.tags,
			upVotes: post.upVotes
		});
	}

	res.render('index', {posts: postArr});
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
		createdOn: Date.now(),
		upVotes: 0
	});

	post.save();
	res.redirect('/');
}