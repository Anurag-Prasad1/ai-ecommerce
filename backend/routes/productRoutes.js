const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");


// Public Route
router.get("/", getProducts);

// Protected Route
router.post("/", protect, createProduct);

module.exports = router;