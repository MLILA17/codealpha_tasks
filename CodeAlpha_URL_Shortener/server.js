const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// 🔥 
app.use(express.static(path.join(__dirname, "public")));

// Routes
const urlRoutes = require("./src/routes/urlRoutes");
app.use("/api", urlRoutes);

// Test API
app.get("/test", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
