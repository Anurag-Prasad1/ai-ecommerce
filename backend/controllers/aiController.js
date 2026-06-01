const {
  generateStructuredResponse,
} = require(
  "../services/geminiService"
);

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

Provide:

1. Features Comparison

2. Pros & Cons

3. Final Recommendation
`;

      const response =
        await generateStructuredResponse(
          prompt
        );

      res.json({
        result: response,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Comparison failed",
      });
    }
  };

module.exports = {
  generateProductDescription,
  compareProducts,
};