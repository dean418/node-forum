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

    user.save();

    res.redirect('/');
}

