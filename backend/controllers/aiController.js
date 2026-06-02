const {
  generateStructuredResponse,
} = require(
  "../services/geminiService"
);

const Product =
  require("../models/productModel");

const generateProductDescription =
  async (req, res) => {
    try {
      const {
        name,
        category,
        price,
      } = req.body;

      const prompt = `
Create a professional e-commerce product description.

Product Name:
${name}

Category:
${category}

Price:
₹${price}

Generate:

1. Product Description

2. Key Features

3. Marketing Summary
`;

      const response =
        await generateStructuredResponse(
          prompt
        );

      res.json({
        result: response,
      });
    } catch (error) {
      console.error(
        "AI Product Description Error:",
        error
      );

      if (
        error.status === 429
      ) {
        return res.status(429).json({
          message:
            "AI service is temporarily rate limited. Please try again in a minute.",
        });
      }

      if (
        error.status === 503
      ) {
        return res.status(503).json({
          message:
            "AI service is currently busy. Please try again shortly.",
        });
      }

      res.status(500).json({
        message:
          "AI generation failed",
      });
    }
  };

const compareProducts =
  async (req, res) => {
    try {
      const {
        productA,
        productB,
      } = req.body;

      const prompt = `
Compare these products:

${productA}

VS

${productB}

Requirements:

1. Features Comparison
   - Use a markdown table.

2. Pros & Cons
   - Use bullet points.

3. Final Recommendation
   - Explain which product is better and why.

Return the entire response in properly formatted markdown.
`;

      const response =
        await generateStructuredResponse(
          prompt
        );

      res.json({
        result: response,
      });
    } catch (error) {
      console.error(
        "AI Product Comparison Error:",
        error
      );

      if (
        error.status === 429
      ) {
        return res.status(429).json({
          message:
            "AI service is temporarily rate limited. Please try again in a minute.",
        });
      }

      if (
        error.status === 503
      ) {
        return res.status(503).json({
          message:
            "AI service is currently busy. Please try again shortly.",
        });
      }

      res.status(500).json({
        message:
          "Comparison failed",
      });
    }
  };

const summarizeReviews =
  async (req, res) => {
    try {
      const { reviews } =
        req.body;

      const prompt = `
You are an e-commerce review analyst.

Reviews:

${reviews}

Generate:

1. Overall Summary

2. Main Pros

3. Main Cons

4. Sentiment Score (1-10)
`;

      const response =
        await generateStructuredResponse(
          prompt
        );

      res.json({
        result: response,
      });
    } catch (error) {
      console.error(
        "Review Summary Error:",
        error
      );

      if (
        error.status === 429
      ) {
        return res.status(429).json({
          message:
            "AI service is temporarily rate limited. Please try again in a minute.",
        });
      }

      if (
        error.status === 503
      ) {
        return res.status(503).json({
          message:
            "AI service is currently busy. Please try again shortly.",
        });
      }

      res.status(500).json({
        message:
          "Review summarization failed",
      });
    }
  };

const smartBuyingAssistant =
  async (req, res) => {
    try {
      const { query } =
        req.body;

      const products =
        await Product.find({})
          .select(
            "name category price"
          )
          .limit(20);

      const productContext =
        products
          .map(
            (product) =>
              `${product.name} | ${product.category} | ₹${product.price}`
          )
          .join("\n");

      const prompt = `
You are an expert e-commerce buying assistant.

Available Products:

${productContext}

Customer Query:

${query}

Provide:

1. Best Product Suggestions

2. Reasoning

3. Budget Analysis

4. Final Recommendation
`;

      const response =
        await generateStructuredResponse(
          prompt
        );

      res.json({
        result: response,
      });
    } catch (error) {
      console.error(
        "Buying Assistant Error:",
        error
      );

      if (
        error.status === 429
      ) {
        return res.status(429).json({
          message:
            "AI service is temporarily rate limited. Please try again in a minute.",
        });
      }

      if (
        error.status === 503
      ) {
        return res.status(503).json({
          message:
            "AI service is currently busy. Please try again shortly.",
        });
      }

      res.status(500).json({
        message:
          "Buying assistant failed",
      });
    }
  };

module.exports = {
  generateProductDescription,
  compareProducts,
  summarizeReviews,
  smartBuyingAssistant,
};