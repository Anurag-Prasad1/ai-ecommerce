const cors = require("cors");

require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const app = express();

app.use(cors());

// 🔥 Middleware
app.use(express.json());

// 🔥 ROUTES

// Home route
app.get("/", (req, res) => {
  console.log("👉 Request received at /");

  res.send(
    "API + MongoDB + MVC + Orders 🚀"
  );
});

// Products route (optional - keep for testing)
app.get("/products", (req, res) => {
  console.log(
    "👉 Request received at /products"
  );

  res.json([
    "Product 1",
    "Product 2",
  ]);
});

// 🔥 User Routes
app.use(
  "/api/users",
  require("./routes/userRoutes")
);

// 🔥 Product Routes
app.use(
  "/api/products",
  require("./routes/productRoutes")
);

// 🔥 Payment Routes
app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

// 🔥 Order Routes (DAY 22 - NEW ADDITION)
app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

// 🔥 Start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log(
        "🚀 Server running on port 5000"
      );
    });
  } catch (error) {
    console.error(
      "❌ Server failed to start",
      error
    );
  }
};

startServer();