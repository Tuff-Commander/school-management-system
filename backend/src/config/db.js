const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection string
const uri = "mongodb+srv://dGreat:dGreat_96@cluster0.w2diu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("school-management-system"); // Ensure this matches your database name
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
}

module.exports = { connect };