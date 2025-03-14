const express = require("express");
    const cors = require("cors");
    const authRoutes = require("./routes/authRoutes");
    const studentRoutes = require("./routes/studentRoutes");
    const feeRoutes = require("./routes/feeRoutes");
    const examRoutes = require("./routes/examRoutes");

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/students", studentRoutes);
    app.use("/api/fees", feeRoutes);
    app.use("/api/exams", examRoutes);
    
    app.get("/", (req, res) => {
        res.send("Welcome to the School Management System API!");
    });

    module.exports = app;