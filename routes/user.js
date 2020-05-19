const {Router} = require('express');
const router = Router();

const user = require('../controllers/userController');
const auth = require('../controllers/authController');

router.get('/signup', user.getSignup);
router.get('/login', user.getLogin);
router.get('/logout', auth.logout);
router.get('/:userName', user.getProfile); //auth.isLoggedIn

router.post('/signup', user.create);
router.post('/login', user.postLogin);

module.exports = router;