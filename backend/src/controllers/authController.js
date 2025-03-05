const { connect } = require("../config/db");
    const User = require("../models/userModel");

    async function login(req, res) {
        const { email, password } = req.body;

        try {
            const db = await connect();
            const userModel = new User(db);

            const user = await userModel.findUserByEmail(email);

            if (user && user.password === password) {
                res.json({ message: "Login successful", user });
            } else {
                res.status(401).json({ message: "Invalid email or password"});
            }
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    module.exports = { login };