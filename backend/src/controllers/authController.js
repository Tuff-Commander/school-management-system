const { connect } = require("../config/db");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function register(req, res) {
  // Check for validation errors
  const errors = validationResult(req);
  const hashedPassword = await bcrypt.hash(password, 10);
await userModel.createUser({ email, password: hashedPassword });
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const db = await connect();
    const userModel = new User(db);

    // Check if the user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    await userModel.createUser({ email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  // Check for validation  errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const db = await connect();
    const userModel = new User(db);

    // Find user by email
    const user = await userModel.findUserByEmail(email);

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { register, login };