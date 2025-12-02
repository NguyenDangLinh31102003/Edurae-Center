const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// Import routes
const articleRoutes = require("./routes/articles");

// API routes
app.use("/api/articles", articleRoutes);

// API test
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// Chạy server
const cd frontend
npm start = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy tại port ${PORT}`));
