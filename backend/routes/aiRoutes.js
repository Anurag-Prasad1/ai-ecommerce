const express =
  require("express");

const router =
  express.Router();

const {
  generateProductDescription,
  compareProducts,
} = require(
  "../controllers/aiController"
);

router.post(
  "/generate-description",
  generateProductDescription
);

router.post(
  "/compare-products",
  compareProducts
);

module.exports =
  router;