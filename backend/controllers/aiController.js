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