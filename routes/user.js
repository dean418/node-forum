const {Router} = require('express');
const router = Router();

const user = require('../controllers/user');

router.get('/signup', user.getSignup);
router.post('/signup', user.create);
router.get('/login', user.getLogin);
router.post('/login', user.postLogin);

module.exports = router;