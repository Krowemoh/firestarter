var express = require('express');
var router = express.Router();

var db = require("../models");
var bcrypt = require('bcrypt');

router.get('/login', function(req, res, next) {
    res.render("login", {
        title: "Firestarter - Login",
    });
});

router.post('/login', async function(req, res, next) {
    let user = await db.User.findOne({ where: { username: req.body.username } });
    if (!user) {
        return res.send("Invalid username.");
    }

    let valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.send("Invalid password.");
    }

    req.session.username = user.username;
    req.session.admin = user.admin;

    req.session.loggedIn = true;

    res.redirect("/");
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    return res.redirect("/");
});

router.get('/register', function(req, res, next) {
    res.render("register", {
        title: "Firestarter - Register"
    });
});

router.post('/register', async function(req, res, next) {
    let user = await db.User.findOne({ where: { username: req.body.username } });
    if (user) {
        return res.send("User already exists.");
    }

    let hash = await bcrypt.hash(req.body.password, 10);
    await db.User.create({
        username: req.body.username,
        password: hash,
        admin: true,
    });

    res.redirect("/login");
});

module.exports = router;
