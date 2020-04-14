const {Router} = require('express');
const router = Router();

const user = require('../controllers/userController');
const auth = require('../controllers/authController');

router.get('/signup', user.getSignup);
router.get('/login', user.getLogin);
router.get('/profile', auth.isLoggedIn, user.getProfile);
router.get('/logout', auth.isLoggedIn, auth.logout);

router.post('/signup', user.create);
router.post('/login', user.postLogin);

module.exports = router;