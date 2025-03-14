const express = require("express");
const router = express.Router();
const { connect } = require("../config/db");
const Fee = require("../models/feeModels");

// Create a new fee record
router.post("/", async (req, res) => {
  const { studentId, amount, paymentDate, status } = req.body;

  try {
    const db = await connect();
    const feeModel = new Fee(db);

    const fee = { studentId, amount, paymentDate, status };
    const result = await feeModel.createFee(fee);

    res.status(201).json({ message: "Fee record created successfully", result });
  } catch (err) {
    console.error("Error creating fee record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all fee records
router.get("/", async (req, res) => {
  try {
    const db = await connect();
    const feeModel = new Fee(db);

    const fees = await feeModel.getFees(); // Fetch all fees
    res.json(fees);
  } catch (err) {
    console.error("Error fetching fees:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get fees for a specific student
router.get("/student/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const db = await connect();
    const feeModel = new Fee(db);

    const fees = await feeModel.getFeesByStudentId(studentId);
    res.json(fees);
  } catch (err) {
    console.error("Error fetching fees:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a fee record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const db = await connect();
    const feeModel = new Fee(db);

    const result = await feeModel.updateFee(id, updates);
    res.json({ message: "Fee record updated successfully", result });
  } catch (err) {
    console.error("Error updating fee record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a fee record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connect();
    const feeModel = new Fee(db);

    const result = await feeModel.deleteFee(id);
    res.json({ message: "Fee record deleted successfully", result });
  } catch (err) {
    console.error("Error deleting fee record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;