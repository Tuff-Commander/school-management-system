const { ObjectId } = require("mongodb");

class Fee {
  constructor(db) {
    this.collection = db.collection("fees");
  }

  // Create a new fee record
  async createFee(fee) {
    const result = await this.collection.insertOne(fee);
    return result.insertedId;
  }

  // Get all fee records
  async getFees() {
    return await this.collection.find().toArray();
  }

  // Get fees for a specific student
  async getFeesByStudentId(studentId) {
    return await this.collection.find({ studentId: new ObjectId(studentId) }).toArray();
  }

  // Update a fee record
  async updateFee(id, updates) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return result.modifiedCount;
  }

  // Delete a fee record
  async deleteFee(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
}

module.exports = Fee;