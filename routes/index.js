const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    console.log(req.session);

    res.render('index');
});

module.exports = router;