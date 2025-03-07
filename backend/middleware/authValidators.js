const { body } = require("express-validator");

    // Validation rules for user registration
    const registerValidator = [
        body("email")
           .isEmail()
           .withMessage("Please enter a valid email address")
           .normalizeEmail(),
        body("password")
           .isLength({ min: 6 })
           .withMessage("password must be at least 6 characters long")
    ];

    // Validation rules for user login
    const loginValidator = [
        body("email").isEmail().withMessage("Please enter a valid email address"),
        body("password").notEmpty().withMessage("Password is required"),
    ];

    module.exports = { registerValidator, loginValidator };