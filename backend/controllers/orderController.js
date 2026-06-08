const Order = require("../models/Order");

const Product = require("../models/Product");

const User = require("../models/User");

const Cart = require("../models/Cart");

const {
  sendEmail,
} = require(
  "../services/emailService"
);

const orderConfirmationTemplate =
  require(
    "../templates/orderConfirmationTemplate"
  );

const addOrderItems = async (
  req,
  res
) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body;

    const order =
      new Order({
        orderItems,

        user:
          req.user._id,

        shippingAddress,

        totalPrice,

        isPaid: true,

        paidAt:
          Date.now(),
      });

    const createdOrder =
      await order.save();

    // 🔥 Clear User Cart After Successful Order
    await Cart.deleteMany({
      user: req.user._id,
    });

    // 🔥 UPDATE PRODUCT POPULARITY
    for (const item of orderItems) {
      const product =
        await Product.findById(
          item.product ||
            item._id
        );

      if (product) {
        product.popularityScore +=
          item.qty;

        await product.save();
      }
    }

    let emailSent = false;

    // 📧 SEND ORDER CONFIRMATION EMAIL
    try {
      const user =
        await User.findById(
          req.user._id
        );

      if (user) {
        await sendEmail({
          to: user.email,

          subject:
            `Order Confirmed #${createdOrder._id}`,

          html:
            orderConfirmationTemplate(
              {
                name:
                  user.name,

                orderId:
                  createdOrder._id,

                totalPrice,

                orderItems,
              }
            ),
        });

        emailSent = true;

        console.log(
          "✅ Order confirmation email sent"
        );
      }
    } catch (
      emailError
    ) {
      console.error(
        "❌ Email Error:",
        emailError.message
      );

      // Order should still succeed
    }

    res.status(201).json({
      order:
        createdOrder,

      emailSent,

      message:
        emailSent
          ? "Order placed successfully. A confirmation email has been sent to your registered email address."
          : "Order placed successfully, but confirmation email could not be sent.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to create order",
    });
  }
};

const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        user:
          req.user._id,
      });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch orders",
    });
  }
};

module.exports = {
  addOrderItems,

  getMyOrders,
};