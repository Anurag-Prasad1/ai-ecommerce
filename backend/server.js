const cors = require("cors");

require("dotenv").config();

const express = require("express");

const path = require("path");

const connectDB = require("./config/db");

const apiLimiter =
  require("./middleware/rateLimiter");

const app = express();

app.use(cors());

// 🔥 Middleware
app.use(express.json());

// 🔥 Day 30 Production Security
app.use(apiLimiter);

// 🔥 ROUTES

// Home route
app.get("/", (req, res) => {
  console.log("👉 Request received at /");

  res.send(
    "API + MongoDB + MVC + AI Chatbot 🚀"
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

// 🔥 Order Routes
app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

// 🔥 Upload Routes (DAY 25 - NEW ADDITION)
app.use(
  "/api/upload",
  require("./routes/uploadRoutes")
);

// 🔥 Chatbot Routes (DAY 29 - NEW ADDITION)
app.use(
  "/api/chatbot",
  require("./routes/chatbotRoutes")
);

// 🔥 Serve Uploaded Images Publicly
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "/uploads")
  )
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