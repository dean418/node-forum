const {Router} = require('express');
const router = Router();

const user = require('../controllers/userController');
const {isLoggedIn, logout} = require('../controllers/authController');

router.get('/signup', user.getSignup);
router.get('/login', user.getLogin);
router.get('/profile', isLoggedIn, user.getProfile);
router.get('/logout', isLoggedIn, logout);

router.post('/signup', user.create);
router.post('/login', user.postLogin);

module.exports = router;