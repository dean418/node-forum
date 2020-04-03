const bcrypt = require('bcrypt');

const UserModel = require('../models/user');

exports.getSignup = (req, res) => {
	res.status(200).render('signup');
}

exports.create = async (req, res) => {
	let { userName, email, password } = req.body;

	let existingUser = await UserModel.findByLogin(userName);

	if (existingUser) {
		res.render('signup', { error: `the provided credentials already exist` });
		return;
	}

	let hash = await bcrypt.hash(password, 12);

	let user = new UserModel({
		userName: userName,
		email: email,
		password: hash,
		createdOn: Date.now(),
		upVotes: 0
	});

	user.save();

	req.session.userName = userName;
	req.session.save();
	res.statusCode = 201;
	res.redirect('/');
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

	req.session.login = login;
	req.session.save();

	res.status(200).redirect('/');
}

exports.getProfile = (req, res) => {
	res.status(200).render('profile');
}