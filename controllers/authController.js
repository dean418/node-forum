const SessionModel = require('../models/sessionModel');

exports.isLoggedIn = async (req, res, next) => {
	if (await SessionModel.hasSession(req.sessionID)) {
		return next();
	}
	res.redirect(303, '/user/login');
}

exports.logout = (req, res) => {
	req.session.destroy();
	res.redirect('/');
}