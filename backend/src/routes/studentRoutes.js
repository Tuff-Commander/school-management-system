const express = require("express");
const router = express.Router();
const { connect } = require("../config/db");
const { ObjectId } = require("mongodb");

// Get all students
router.get("/", async (req, res) => {
  try {
    const db = await connect();
    const students = await db.collection("students").find().toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new student
router.post("/", async (req, res) => {
  const { name, email, className } = req.body;

  try {
    const db = await connect();
    const result = await db.collection("students").insertOne({
      name,
      email,
      className,
    });
    res.status(201).json({ message: "Student added successfully", result });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a student
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, className } = req.body;

  try {
    const db = await connect();
    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, className } }
    );
    res.json({ message: "Student updated successfully", result });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connect();
    const result = await db.collection("students").deleteOne({
      _id: new ObjectId(id),
    });
    res.json({ message: "Student deleted successfully", result });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;