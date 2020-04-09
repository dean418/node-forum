const {Router} = require('express');
const router = Router();

const post = require('../controllers/postController');
const auth = require('../controllers/authController');

router.get('/all', post.getAll);

router.post('/create', auth.isLoggedIn, post.create);

module.exports = router;