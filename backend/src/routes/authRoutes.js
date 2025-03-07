const express = require("express");
const { register, login } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../../middleware/authValidators");

const router = express.Router();

// Registration route
router.post("/register", registerValidator, register);

// Login route
router.post("/login", loginValidator, login);

module.exports = router;