const Product = require("../models/Product");

const chatbotReply = async (
  req,
  res
) => {
  try {
    const message =
      req.body.message.toLowerCase();

    let products = [];

    let reply =
      "Sorry, I couldn't understand.";

    if (message.includes("mobile")) {
      products = await Product.find({
        category: "mobile",
      }).limit(4);

      reply =
        "Here are some popular mobiles.";
    }

    else if (
      message.includes("fashion")
    ) {
      products = await Product.find({
        category: "fashion",
      }).limit(4);

      reply =
        "Here are trending fashion items.";
    }

    else if (
      message.includes("cheap")
    ) {
      products = await Product.find({})
        .sort({
          price: 1,
        })
        .limit(4);

      reply =
        "Here are some budget-friendly products.";
    }

    else if (
      message.includes("expensive")
    ) {
      products = await Product.find({})
        .sort({
          price: -1,
        })
        .limit(4);

      reply =
        "Here are premium products.";
    }

    res.json({
      reply,
      products,
    });
  }

  catch (error) {
    res.status(500).json({
      message:
        "Chatbot server error",
    });
  }
};

module.exports = {
  chatbotReply,
};