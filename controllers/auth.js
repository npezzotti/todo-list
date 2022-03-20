const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { sendEmail } = require("../helpers");
const _ = require("lodash");
require('dotenv').config();

exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});
    if(userExists) return res.status(403).json({
        error: "Email is taken!"
    })
    const user = await new User(req.body)
    await user.save()
    res.status(201).json({ message: 'User successully created' })
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist."
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Invalid password!"
            })
        }
        const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET);
        res.cookie("t", token, { exp: new Date() + 99999 } );
        const { _id, name, email } = user;
        return res.json({ token, user: {_id, email, name} })
    })
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Sign out successful!" })
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
})

exports.forgotPassword = (req, res) => {
    if (!req.body.email) return res.status(400).json({ message: "Please enter email." })
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "User with that email does not exist."})
        }
        const token = jwt.sign(
            {_id: user.id, issuer: "MY TODO LIST"},
            process.env.JWT_SECRET
        )
        const emailData = {
            to: email,
            subject: "My Todo List Password Reset Instructions",
            html: `<p>Please use the following link to reset your password:</p> <a href=${process.env.CLIENT_URL}/reset-password/${token}>${process.env.CLIENT_URL}/reset-password/${token}</a>`
        }
        return User.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: err })
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Email has been sent to ${email}. Please follow the instructions to reset your password.`
                })
            }
        });
    });
};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "Invalid Link"
            })
        }
        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ""
        };

        user = _.extend(user, updatedFields)

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Great! Now you can login with your new password.`
            });
        });
    })
}