require("dotenv").config(); // 🔥 Load environment variables

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// 🔥 Start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  } catch (error) {
    console.error("❌ Server failed to start", error);
  }
};

startServer();


// 🔥 ROUTES

// Home route
app.get("/", (req, res) => {
  console.log("👉 Request received at /");   // ✅ Terminal log
  res.send("API running with MongoDB 🚀");   // ✅ Browser response
});

// Products route
app.get("/products", (req, res) => {
  console.log("👉 Request received at /products");   // ✅ Terminal log
  res.json(["Product 1", "Product 2"]);              // ✅ Browser response
});