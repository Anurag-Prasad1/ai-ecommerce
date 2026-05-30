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
        originalMessage.toLowerCase();

      let products = [];

      // 🔥 Mobiles
      if (
        message.includes("mobile") ||
        message.includes("phone")
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
        message.includes(
          "fashion"
        )
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
        message.includes(
          "laptop"
        ) ||
        message.includes(
          "laptops"
        )
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
        message.includes("shoe") ||
        message.includes("shoes")
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
        message.includes("cheap") ||
        message.includes(
          "budget"
        )
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
        message.includes(
          "premium"
        ) ||
        message.includes(
          "expensive"
        )
      ) {
        products =
          await Product.find({})
            .sort({
              price: -1,
            })
            .limit(4);
      }

      // 🔥 Dynamic Search
      else {
        products =
          await Product.find({
            $or: [
              {
                name: {
                  $regex: message,
                  $options: "i",
                },
              },
              {
                brand: {
                  $regex: message,
                  $options: "i",
                },
              },
              {
                category: {
                  $regex: message,
                  $options: "i",
                },
              },
            ],
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

      const reply =
        await generateResponse(
          prompt
        );

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