var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    displayName: String,
    active: Boolean
});

// This is a custom method so that when we send back the user on status 200, we will not send back the password
UserSchema.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;
    return user;
};


UserSchema.methods.comparePasswords = function(password, callback) {
    bcrypt.compare(password, this.password, callback);
};


UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('User', UserSchema);


