const {Router} = require('express');
const router = Router();

const post = require('../controllers/postController');
const auth = require('../controllers/authController');

router.get('/all', post.getAll);
router.get('/image/:imageID', post.getImage);

router.post('/create', auth.isLoggedIn, post.create);

module.exports = router;