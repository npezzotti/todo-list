exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty()
    req.check("email").isEmail().withMessage("Please enter a valid email.")
    req.check("password", "Password is required.").notEmpty();
    req.check('password')
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    const errors = req.validationErrors() 
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
};

exports.passwordResetValidator = (req, res, next) => {
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characers.")
        .matches(/\d/)
        .withMessage("Password must contain at least one number.");
 
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};