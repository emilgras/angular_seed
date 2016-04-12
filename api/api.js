var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js');
var createSendToken = require('./services/jwt.js');
var localStrategy = require('./services/localStrategy.js');
var jobs = require('./services/jobs.js');
var emailVerification = require('./services/emailVerification.js');
var config = require('./services/config.js');
var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id); // Pass in null for the error
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);


/* ======== REGISTER ROUTE ========*/
app.post('/register', passport.authenticate('local-register'), function (req, res) {
    emailVerification.send(req.user.email);
    createSendToken(req.user, res);
});

/* ======== LOGIN ROUTE ========*/
app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});

/* ======== EMAIL VERIFICATION ROUTE ========*/
app.get('/auth/verifyEmail', emailVerification.handler);


/* ======== FACEBOOK ROUTE ========*/
app.post('/auth/facebook', facebookAuth);

/* ======== GOOGLE ROUTE ========*/
app.post('/auth/google', googleAuth);

/* ======== JOBS ROUTE ========*/
app.get('/jobs', jobs);




mongoose.connect('mongodb://localhost/angularseeddemo');
//mongoose.connect('mongodb://localhost/maildemo3');


app.listen(3000, function () {
    console.log('api listening on 3000');
});
