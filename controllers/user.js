const UserModel = require('../models/user');

exports.getSignup = (req, res) => {
    res.render('signup');
}

exports.create = async(req, res) => {
    let {userName, email, password} = req.body;

    let user = new UserModel({
        userName: userName,
        email: email,
        password: password,
        createdOn: Date.now(),
        upVotes: 0
    });

    let error = '';

    let success = await user.save().catch(async (err) => {
        let field = Object.keys(err.keyValue)[0];

        if (field == 'userName') {
            error = 'user-name'
        } else {
            error = 'email'
        }
        return false;
    });

    if (!success) {
        res.render('signup', {error : `the provided ${error} already exists!`});
        return;
    }

    req.session.userName = userName;
    req.session.save();

    res.redirect('/');
}

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.postLogin = async(req, res) => {
    let {login, password} = req.body;
    let user = await UserModel.findByLogin(login);

    if (!user) {
        res.render('login', {error: 'A user wasn\'t found with that username or email'});
        return;
    }

    if (user.password !== password) {
        res.render('login', {error: 'The entered password is incorrect'});
        return;
    }

    req.session.userName = userName;
    req.session.save();

    res.redirect('/');
}