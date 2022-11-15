var express = require('express');
var router = express.Router();

var validateAdmin = require("./validateAdmin");

router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Express',
        session: req.session,
    });
});

router.get('/admin', validateAdmin, function(req, res, next) {
    res.render('admin', { title: 'Admin' });
});

module.exports = router;
