const Product = require("../models/Product");

const chatbotReply = async (
  req,
  res
) => {
  try {
    const originalMessage =
      req.body.message;

    const message =
      originalMessage.toLowerCase();

    let products = [];

    let reply =
      "Sorry, I couldn't understand.";

    // 🔥 Mobiles
    if (
      message.includes("mobile") ||
      message.includes("phone")
    ) {
      products = await Product.find({
        category: {
          $regex: "mobile",
          $options: "i",
        },
      }).limit(4);

      reply =
        "Here are some popular mobiles.";
    }

    // 🔥 Fashion
    else if (
      message.includes("fashion")
    ) {
      products = await Product.find({
        category: {
          $regex: "fashion",
          $options: "i",
        },
      }).limit(4);

      reply =
        "Here are trending fashion items.";
    }

    // 🔥 Laptops
    else if (
      message.includes("laptop") ||
      message.includes("laptops")
    ) {
      products = await Product.find({
        category: {
          $regex: "laptop",
          $options: "i",
        },
      }).limit(4);

      reply =
        "Here are some powerful laptops.";
    }

    // 🔥 Shoes
    else if (
      message.includes("shoe") ||
      message.includes("shoes")
    ) {
      products = await Product.find({
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

      reply =
        "Here are some stylish shoes.";
    }

    // 🔥 Cheap Products
    else if (
      message.includes("cheap") ||
      message.includes("budget")
    ) {
      products = await Product.find({})
        .sort({
          price: 1,
        })
        .limit(4);

      reply =
        "Here are some budget-friendly products.";
    }

    // 🔥 Expensive Products
    else if (
      message.includes("expensive") ||
      message.includes("premium")
    ) {
      products = await Product.find({})
        .sort({
          price: -1,
        })
        .limit(4);

      reply =
        "Here are premium products.";
    }

    // 🔥 Dynamic Smart Search
    else {
      products = await Product.find({
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

      if (products.length > 0) {
        reply =
          `Here are some results for "${originalMessage}".`;
      }
    }

    // 🔥 Smart No Product Found Response
    if (products.length === 0) {
      reply =
        `No products found for "${originalMessage}".`;
    }

    res.json({
      reply,
      products,
    });
  }

  catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Chatbot server error",
    });
  }
};

module.exports = {
  chatbotReply,
};