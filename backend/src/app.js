const express = require("express");
    const cors = require("cors");
    const authRoutes = require("./routes/authRoutes");
    const studentRoutes = require("./routes/studentRoutes");

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/students", studentRoutes);
    
    app.get("/", (req, res) => {
        res.send("Welcome to the School Management System API!");
    });

    module.exports = app;