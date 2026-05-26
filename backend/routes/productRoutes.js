const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  getRecommendedProducts,
  getSearchSuggestions,
  updateProduct,
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
// Keep this ABOVE "/:id" route
router.get(
  "/search/suggestions",
  getSearchSuggestions
);


// IMPORTANT:
// Keep this ABOVE "/:id" route
router.get(
  "/:id/recommendations",
  getRecommendedProducts
);


// IMPORTANT:
// Keep this BELOW recommendation route
router.get("/:id", getProductById);


// Protected Admin Routes
router.post(
  "/",
  protect,
  admin,
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);


module.exports = router;