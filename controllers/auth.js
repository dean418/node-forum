const SessionModel = require('../models/session');

exports.isLoggedIn = async (req, res, next) => {
    if (await SessionModel.hasSession(req.sessionID)) {
        return next();
    }
    res.redirect('/user/login');
}