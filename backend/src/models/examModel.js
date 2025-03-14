const { ObjectId } = require("mongodb");

class Exam {
  constructor(db) {
    this.collection = db.collection("exams"); // Ensure `db` is passed correctly
  }

  // Create a new exam record
  async createExam(exam) {
    const result = await this.collection.insertOne(exam);
    return result.insertedId;
  }

  // Get all exam records
  async getAllExams() {
    return await this.collection.find().toArray(); // Fetch all exams
  }

  async getExamsByStudentId(studentId) {
    // Validate the studentId
    if (!ObjectId.isValid(studentId)) {
      throw new Error("Invalid student ID");
    }

    // Convert the studentId to an ObjectId
    const objectId = new ObjectId(studentId);

    // Query the database
    return await this.collection.find({ studentId: objectId }).toArray();
  }
  
  // Update an exam record
  async updateExam(id, updates) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return result.modifiedCount;
  }

  // Delete an exam record
  async deleteExam(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
}

module.exports = Exam;