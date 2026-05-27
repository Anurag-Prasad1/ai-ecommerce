const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    // 🔥 BRAND SUPPORT
    brand: {
      type: String,
      default: "",
    },

    countInStock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
    },

    // 🔥 AI ANALYTICS FIELD
    popularityScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);