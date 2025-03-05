const { ObjectId } = require("mongodb");

    class User {
        constructor(db) {
            this.collection = db.collection("users");
        }

        async createUser(user) {
            const result = await this.collection.insertOne(user);
            return result.insertedId;
        }

        async findUserByEmail(emial) {
            returnawait this.collection.findOne( { email });
        }
    }

    module.exports = User;