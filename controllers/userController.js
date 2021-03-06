const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');
const PostModel = require('../models/postModel');

exports.getSignup = (req, res) => {
	res.render('signup');
}

exports.create = async (req, res) => {
	let { userName, email, password } = req.body;

	let existingUser = await UserModel.userExists(userName, email);

	if (existingUser) {
		res.render('signup', { error: `the provided credentials already exist` });
		return;
	}

	let hash = await bcrypt.hash(password, 12);

	let user = new UserModel({
		userName: userName,
		email: email.toLowerCase(),
		password: hash,
		createdOn: Date.now(),
		upVotes: 0
	});

	user.save();

	req.session.userID = user._id;
	req.session.userName = user.userName;
	req.session.save();

	res.status(200).redirect('/');
}

exports.getLogin = (req, res) => {
	res.status(200).render('login');
}

exports.postLogin = async (req, res) => {
	let { login, password } = req.body;
	let user = await UserModel.findByLogin(login);

	if (!user) {
		res.render('login', { error: 'A user wasn\'t found with that username or email' });
		return;
	}

	if (!await bcrypt.compare(password, user.password)) {
		res.render('login', { error: 'The entered password is incorrect' });
		return;
	}

	req.session.userID = user._id;
	req.session.userName = user.userName;
	req.session.save();

	res.status(200).redirect('/');
}

exports.getProfile = async (req, res) => {
	let userInfo = await UserModel.getProfile(req.params.userName);
	let allPosts = await PostModel.getPosts();
	let userPosts = allPosts.filter(post => post.userName == req.params.userName)

	res.render('profile', {userPosts, totalPosts: userPosts.length, userInfo: userInfo[0]});
}