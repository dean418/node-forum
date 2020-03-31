exports.home = (req, res) => {
    req.session.save();
    res.render('index');
}