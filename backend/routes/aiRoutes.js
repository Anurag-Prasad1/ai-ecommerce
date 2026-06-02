const express =
  require("express");

const router =
  express.Router();

const {
  generateProductDescription,
  compareProducts,
  summarizeReviews,
  smartBuyingAssistant,
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

router.post(
  "/summarize-reviews",
  summarizeReviews
);

router.post(
  "/buying-assistant",
  smartBuyingAssistant
);

module.exports =
  router;