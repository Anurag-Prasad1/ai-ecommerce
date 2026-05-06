const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");


// Public Routes
router.get("/", getProducts);

// IMPORTANT:
// Keep this BELOW "/" route
router.get("/:id", getProductById);


// Protected Routes
router.post("/", protect, createProduct);


module.exports = router;