require('dotenv').config() 

var express = require('express');
var session = require('express-session')

var methodOverride = require('method-override');
var helmet = require('helmet');
var hpp = require('hpp');

var fileUpload = require('express-fileupload');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var sqlite = require("better-sqlite3");
var SqliteStore = require("better-sqlite3-session-store")(session)
var sessionsDB = new sqlite("db/sessions.db");

var app = express();

app.use(session({
    proxy: process.env.ENV === 'production',
    store: new SqliteStore({
        client: sessionsDB,
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {},
}));

if (process.env.ENV === "production") app.use(helmet());
app.use(hpp());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
    delimiter: '?',
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use(fileUpload({
    createParentPath: true
}));

app.use('/', indexRouter);
app.use('/', userRouter);

// error handler
app.use(function(err, req, res, next) {
    if (process.env.ENV !== "production") {
        console.log(err);
    }
    return res.render('error');
});

//var db = require('./models');
//db.sequelize.sync({ force: true });

module.exports = app;
