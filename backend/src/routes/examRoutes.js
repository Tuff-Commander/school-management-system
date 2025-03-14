const express = require("express");
const router = express.Router();
const { connect } = require("../config/db");
const Exam = require("../models/examModel");

// Create a new exam record
router.post("/", async (req, res) => {
  const { studentId, subject, score, date } = req.body;

  try {
    const db = await connect(); // Ensure `connect` is called correctly
    const examModel = new Exam(db);

    const exam = { studentId, subject, score, date };
    const result = await examModel.createExam(exam);

    res.status(201).json({ message: "Exam record created successfully", result });
  } catch (err) {
    console.error("Error creating exam record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all exam records
router.get("/", async (req, res) => {
  try {
    const db = await connect(); // Ensure `connect` is called correctly
    const examModel = new Exam(db);

    const exams = await examModel.getAllExams(); // Fetch all exams
    res.json(exams);
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get exams for a specific student
router.get("/student/:studentId", async (req, res) => {
  const { studentId } = req.params;

  console.log("Received studentId:", studentId); // Debugging line

  try {
    const db = await connect(); // Ensure `connect` is called correctly
    const examModel = new Exam(db);

    const exams = await examModel.getExamsByStudentId(studentId);
    res.json(exams);
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an exam record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const db = await connect(); // Ensure `connect` is called correctly
    const examModel = new Exam(db);

    const result = await examModel.updateExam(id, updates);
    res.json({ message: "Exam record updated successfully", result });
  } catch (err) {
    console.error("Error updating exam record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an exam record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connect(); // Ensure `connect` is called correctly
    const examModel = new Exam(db);

    const result = await examModel.deleteExam(id);
    res.json({ message: "Exam record deleted successfully", result });
  } catch (err) {
    console.error("Error deleting exam record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;