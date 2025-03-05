const { MongoClient } = require("mongodb");

    // This was replaced with my mongoDB connection string
    const uri = "mongodb+srv://dGreat:dGreat_96@cluster0.w2diu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    const client = new MongoClient(uri);

    async function connect() {
        try {
            await client.connect();
            console.log("Connected to MongoDB");
            return client.db("school-management-system");
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
        }
    }

    module.exports = { connect }