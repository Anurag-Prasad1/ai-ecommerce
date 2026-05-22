const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");


// Public Routes
router.get("/", getProducts);

// IMPORTANT:
// Keep this BELOW "/" route
router.get("/:id", getProductById);


// Protected Admin Routes
router.post(
  "/",
  protect,
  admin,
  createProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);


module.exports = router;