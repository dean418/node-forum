const {Router} = require('express');
const router = Router();

const post = require('../controllers/postController');

router.get('/', post.getAll);

module.exports = router;