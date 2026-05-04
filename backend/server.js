require("dotenv").config(); // Load environment variables

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// 🔥 Middleware (VERY IMPORTANT)
app.use(express.json());


// 🔥 ROUTES

// Home route
app.get("/", (req, res) => {
  console.log("👉 Request received at /");
  res.send("API running with MongoDB + MVC 🚀");
});


// Products route (optional - keep for testing)
app.get("/products", (req, res) => {
  console.log("👉 Request received at /products");
  res.json(["Product 1", "Product 2"]);
});


// 🔥 User Routes (DAY 4)
app.use("/api/users", require("./routes/userRoutes"));


// 🔥 Product Routes (DAY 7 - NEW ADDITION)
app.use("/api/products", require("./routes/productRoutes"));


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