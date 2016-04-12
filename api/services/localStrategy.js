var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');

var strategyOptions = {
    usernameField: 'email'
};

// Login
exports.login = new LocalStrategy(strategyOptions, function (email, password, done) {
    console.log("INSIDE LOGIN STRATEGY:::::::::::");
    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function (err, user) {
        if (err) {
            //return done(err);
            return done(null, false, {message: "Bum"}); // error=null, user=false, message=obj
            console.log("ERROR THROWN....")
        }

        if (!user) {
            console.log("LOGIIIIIIN: no user found");
            return done(null, false, {message: "No user with this email"}); // error=null, user=false, message=obj
        }

        user.comparePasswords(password, function (err, isMatch) {
            if (err) {
                console.log("Error in compare-------");
                return done(err);
            }

            if (!isMatch)
                return done(null, false, {message: "Password does not match the email"}); // error=null, user=false, message=obj

            return done(null, user);
        });
    });
});

// Register
exports.register = new LocalStrategy(strategyOptions, function (email, password, done) {
    console.log("INSIDE REGISTER STRATEGY:::::::::::");
    // Check if user with same email already excists
    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function (err, user) {
        if (err)
            return done(err);
        if (user)
            return done(null, false, {message: "A user with this email already excists"}); // error=null, user=false, message=obj

        // Ready to create new user
        var newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function (err) {
            if (err) return done(null, false, {message: "Not able to create user"}); // error=null, user=false, message=obj

            done(null, newUser);
        });
    });
});