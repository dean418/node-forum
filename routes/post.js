const {Router} = require('express');
const router = Router();

const post = require('../controllers/postController');
const auth = require('../controllers/authController');

router.get('/all', post.getAll);
router.get('/image/:imageID', post.getImage);
router.get('/:postID', post.getFullPost);
router.get('/delete/:postID', auth.isLoggedIn, post.delete)

router.post('/create', auth.isLoggedIn, post.create);
router.post('/:postID', auth.isLoggedIn, post.comment);
router.post('/:postID/:commentID', auth.isLoggedIn, post.comment);
module.exports = router;