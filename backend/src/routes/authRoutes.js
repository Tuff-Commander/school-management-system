const express = require("express");
const router = express.Router();

//Mock user data (we'll replace this with a database later")
const users = [
    {id: 1, email: "admin@example.com", password: "password123" },
];

// Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        res.json({ message: "Login successful", user });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

module.exports = router;