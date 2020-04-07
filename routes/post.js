const {Router} = require('express');
const router = Router();

const post = require('../controllers/postController');

router.get('/all', post.getAll);

router.post('/create', post.create);

module.exports = router;