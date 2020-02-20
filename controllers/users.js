const User = require('../models/user.model');

exports.getUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.status(400).json({error: err})
        }
        res.json(users)
    }).select("name email created")
};

exports.userById = (req, res, next, id) => {
    console.log(id)
    User.findById(id)
        .exec((err, user) => {
            console.log(err)
        if (err || !user) {
            res.status(400).json({
                error: "User not found."
            })
        } else {
            req.profile = user;
            next()
        }
    })
};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
};

exports.updateUser = (req, res) => {
    let user = req.profile;
    if (!user) {
        res.status(404).send("user not found");
    } else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.updated = Date.now()
        user.save()
        .then(user => {
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user)
        })
        .catch(err => {
            res.status(400).json({ error: err })
        });
    }
};

exports.deleteUser = (req, res) => {
    const user = req.profile;
    user.remove((error, user) => {
        if (error) {
            res.status(400).json({ error })
        }
        res.status(200).json({ message: "User successfully deleted"})
    })
};

exports.hasAuthorization = (req, res, next) => {
    const sameUser = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!sameUser) {
        return res.status(403).send({
            error: 'You are not authorized to perform this action.'
        });
    }
    next();
};

