const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

    class User {
        constructor(db) {
            this.collection = db.collection("users");
        }

        async createUser(user) {
            //Hash the password before saving
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const result = await this.collection.insertOne({
                ...user,
                password: hashedPassword,
            });
            return result.insertedId;
        }

        async findUserByEmail(email) {
            return await this.collection.findOne({ email });
        }
    }

    module.exports = User;