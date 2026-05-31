const Product =
  require("../models/Product");

const {
  generateResponse,
} = require(
  "../services/geminiService"
);

const chatbotReply =
  async (req, res) => {
    try {
      const originalMessage =
        req.body.message;

      const message =
        originalMessage
          .toLowerCase()
          .trim();

      let products = [];

      // 🔥 Mobiles
      if (
        message === "mobile" ||
        message === "mobiles" ||
        message === "phone" ||
        message === "phones"
      ) {
        products =
          await Product.find({
            category: {
              $regex: "mobile",
              $options: "i",
            },
          }).limit(4);
      }

      // 🔥 Fashion
      else if (
        message === "fashion"
      ) {
        products =
          await Product.find({
            category: {
              $regex: "fashion",
              $options: "i",
            },
          }).limit(4);
      }

      // 🔥 Laptops
      else if (
        message === "laptop" ||
        message === "laptops"
      ) {
        products =
          await Product.find({
            category: {
              $regex: "laptop",
              $options: "i",
            },
          }).limit(4);
      }

      // 🔥 Shoes
      else if (
        message === "shoe" ||
        message === "shoes"
      ) {
        products =
          await Product.find({
            $or: [
              {
                name: {
                  $regex: "shoe",
                  $options: "i",
                },
              },
              {
                category: {
                  $regex: "fashion",
                  $options: "i",
                },
              },
            ],
          }).limit(4);
      }

      // 🔥 Cheap Products
      else if (
        message === "cheap" ||
        message === "budget"
      ) {
        products =
          await Product.find({})
            .sort({
              price: 1,
            })
            .limit(4);
      }

      // 🔥 Premium Products
      else if (
        message === "premium" ||
        message === "expensive"
      ) {
        products =
          await Product.find({})
            .sort({
              price: -1,
            })
            .limit(4);
      }

      // 🔥 Smart Multi-Keyword Search
      else {
        const keywords =
          message
            .split(/\s+/)
            .map(
              (word) =>
                word.endsWith("s")
                  ? word.slice(
                      0,
                      -1
                    )
                  : word
            )
            .filter(
              (word) =>
                word.length > 2
            );

        const searchConditions =
          keywords.flatMap(
            (keyword) => [
              {
                name: {
                  $regex: keyword,
                  $options: "i",
                },
              },
              {
                brand: {
                  $regex: keyword,
                  $options: "i",
                },
              },
              {
                category: {
                  $regex: keyword,
                  $options: "i",
                },
              },
              {
                description: {
                  $regex: keyword,
                  $options: "i",
                },
              },
            ]
          );

        products =
          await Product.find({
            $or:
              searchConditions,
          }).limit(4);
      }

      const productContext =
        products
          .map(
            (product) =>
              `
Name: ${product.name}
Category: ${product.category}
Price: ₹${product.price}
Description: ${
                product.description ||
                ""
              }
`
          )
          .join("\n");

      const prompt = `
You are NovaCart AI Assistant.

Available Products:

${productContext}

User Question:
${originalMessage}

Instructions:

- Recommend products if available.
- Use only provided products.
- Never invent products.
- Use markdown formatting when appropriate.
- Highlight product names using bold formatting.
- Use headings and bullet points when useful.
- Keep responses under 100 words.
- Be professional and friendly.
- If no products match, politely explain that nothing matched.
`;

      let reply = "";

      try {
        reply =
          await generateResponse(
            prompt
          );
      } catch (geminiError) {
        console.error(
          "Gemini Fallback Triggered:",
          geminiError.message
        );

        if (
          products.length > 0
        ) {
          reply = `
⚠️ AI service is temporarily unavailable.

Here are matching products from our catalog:

${products
  .map(
    (product) =>
      `• ${product.name}
  Price: ₹${product.price}
  Category: ${product.category}`
  )
  .join("\n\n")}
`;
        } else {
          reply = `
⚠️ AI service is temporarily unavailable.

No matching products were found for your search.
Please try another product name or category.
`;
        }
      }

      res.json({
        reply,
        products,
      });
    }

    catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Chatbot server error",
      });
    }
  };

module.exports = {
  chatbotReply,
};