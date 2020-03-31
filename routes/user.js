const {Router} = require('express');
const router = Router();

const user = require('../controllers/user');

router.get('/signup', user.getSignup);
router.post('/signup', user.create);

module.exports = router;