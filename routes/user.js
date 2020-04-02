const {Router} = require('express');
const router = Router();

const user = require('../controllers/user');
const {isLoggedIn, logout} = require('../controllers/auth');

router.get('/signup', user.getSignup);
router.get('/login', user.getLogin);
router.get('/profile', isLoggedIn, user.getProfile);
router.get('/logout', isLoggedIn, logout);

router.post('/signup', user.create);
router.post('/login', user.postLogin);

module.exports = router;