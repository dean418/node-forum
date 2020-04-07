const PostModel = require('../models/postModel');

exports.getAll = async (req, res) => {
	let posts = await PostModel.find({});

	res.render('/', posts);
}

exports.create = (req, res) => {
	let { title, content, tags, image, userID } = req.body;

	let post = new PostModel({
		title: title,
		content: content,
		tags: [tags],
		image: image,
		userID: userID,
		createdOn: Date.now(),
		upVotes: 0
	});

	post.save();
	res.render('/');
}