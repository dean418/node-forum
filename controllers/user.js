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

    user.save().catch((err) => {
        let field = Object.keys(err.keyValue)[0];
        let error = '';

        if (field == 'userName') {
            error = 'user-name'
        } else {
            error = 'email'
        }

        res.render('signup', {error : `the provided ${error} already exists!`})
        return;
    });
    res.redirect('/');
}

