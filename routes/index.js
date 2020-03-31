const {Router} = require('express');
const router = Router();

const index = require('../controllers/index');

router.get('/', index.home);

module.exports = router;