const express = require('express');
const path = require('path');
const { ApiController } = require('../controllers/api.controller')

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

router.get('/', async (req, res) => {
    res.render('partials/dashboard');
});

router.get('/api', (req, res) => {
    res.render('partials/api')
});

router.get('/api/guid', async(req, res) => {
    let respuesta = await ApiController.guidController(req, res);
    return res.send(respuesta);
});

router.get('/api/uid', async (req, res) => {
    let respuesta = await ApiController.uidController(req, res);
    return res.send(respuesta);
});


module.exports = router;