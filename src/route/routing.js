const express = require('express');
const passport = require('../passport');
const { auth } = require('../auth');
const router = express.Router();

router.get("/", async (req, res) => {
    res.render('partials/dashboard');
});

router.get("/login", passport.authenticate("discord"), (req, res) => {
    res.redirect("/dash");
});

router.use("/", require('./dash-routes'));

module.exports = router;