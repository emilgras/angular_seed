var jwt = require('jwt-simple');

var jobs = [
    'Cook',
    'Superhero',
    'Unicorn Whisperer',
    'Toast INspector'
];

module.exports = function (req, res) {
    //console.log(req.headers.authorization);
    //console.log(req.headers.Authorization);
    if (!req.headers.authorization)
        return res.status(401).send({message: "You are not authorized"});

    // Split because we don't need the Bearer
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shhh..");

    // payload.sub is the user _id
    if (!payload.sub)
        return res.status(401).send({message: "Authenticated failed"});

    res.json(jobs);
};