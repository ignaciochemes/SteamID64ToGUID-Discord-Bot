const express = require('express');
const path = require('path');
const { guidController, uidController } = require('../controllers/api.controller')

const router = express.Router();
//const passport = require('../passport');
//const { auth } = require('../auth');

router.get("/", async (req, res) => {
    res.render('partials/dashboard');
});

// router.get("/login", passport.authenticate("discord"), (req, res) => {
//     res.redirect("/dash");
// });

router.use("/", require('./dash-routes'));

module.exports = router;


router.get('/', async (req, res) => {
    res.render('partials/dashboard');
});
router.get('/api', (req, res) => {
    res.render('partials/api')
});

router.get('/api/guid', async(req, res) => {
    return await guidController(req, res);
});

router.get('/api/uid', async (req, res) => {
    return await uidController(req, res);
});


module.exports = router;