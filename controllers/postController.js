const {nanoid} = require('nanoid');

const PostModel = require('../models/postModel');

exports.getAll = async (req, res) => {
	let posts = await PostModel.find({});

	res.render('/', posts);
}

exports.create = (req, res) => {
	let { title, content, tags, userID } = req.body;
	let imageID = nanoid();

	req.files.image.mv(`./uploads/${imageID}`);

	let post = new PostModel({
		title: title,
		content: content,
		tags: [tags],
		image: imageID,
		userID: userID,
		createdOn: Date.now(),
		upVotes: 0
	});

	// post.save();
	res.redirect('/');
}