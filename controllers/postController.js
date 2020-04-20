const {nanoid} = require('nanoid');

const PostModel = require('../models/postModel');

exports.getAll = async (req, res) => {
	let posts = await PostModel.find();
	let modifiedPosts = posts.map(post => post.toObject());

	res.render('index', {posts: modifiedPosts});
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

	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();

	let post = new PostModel({
		title: title,
		content: content,
		tags: tags,
		image: imageID,
		userID: req.session.userID,
		userName: req.session.userName,
		createdOn: day + '/' + month + '/' + year,
		upVotes: 0
	});

	post.save();
	res.redirect('/');
}