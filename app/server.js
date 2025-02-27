// Import required modules
const express = require("express");
const { newConnection } = require("./config/connection");
require('dotenv').config();
const cors = require('cors')

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const { UserRoutes } = require("./routes/user.route");
app.use("/api", UserRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to Express App" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    newConnection();
});