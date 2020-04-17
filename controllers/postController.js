const {nanoid} = require('nanoid');

const PostModel = require('../models/postModel');

exports.getAll = async (req, res) => {
	let posts = await PostModel.find();
	let postArr = [];

	for (const post of posts) {
		let date = post.createdOn.getDate();
		let month = post.createdOn.getMonth()+1;
		let year = post.createdOn.getFullYear();

		postArr.push({
			title: post.title,
			content: post.content,
			image: post.image,
			userName: post.userName,
			createdOn: date + '/' + month + '/' + year,
			tags: post.tags,
			upVotes: post.upVotes
		});
	}

	res.render('index', {posts: postArr});
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
		createdOn: Date.now(),
		upVotes: 0
	});

	post.save();
	res.redirect('/');
}