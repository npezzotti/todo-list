const User = require('../models/user.model');

exports.getUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.status(400).json({error: err})
        }
        res.json(users)
    }).select("name email created")
};

exports.getUserById = (req, res) => {
    res.send("hi")
};

exports.createUser = (req, res) => {
    res.send("hi")

};

exports.updateUser = (req, res) => {
    res.send("hi")

};

exports.deleteUser = (req, res) => {
    res.send("hi")

};