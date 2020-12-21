const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('partials/index');
});
router.get('/home', async (req, res) => {
    res.redirect('/gb-status');
});


module.exports = router;