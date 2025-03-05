const { connect } = require("../config/db");
const app = require("./app");
    const PORT = process.env.PORT || 5000;

    // Connect to MongoDB
    connect();

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });