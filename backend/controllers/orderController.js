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

        orderStatus:
          "Processing",
      });

    const createdOrder =
      await order.save();

    // Clear Cart
    await Cart.deleteMany({
      user: req.user._id,
    });

    // Update Product Popularity
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
      }).sort({
        createdAt: -1,
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

const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res
        .status(404)
        .json({
          message:
            "Order not found",
        });
    }

    if (
      order.user.toString() !==
      req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({
          message:
            "Not authorized",
        });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch order",
    });
  }
};

const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res
          .status(404)
          .json({
            message:
              "Order not found",
          });
      }

      order.orderStatus =
        req.body.orderStatus;

      if (
        req.body
          .orderStatus ===
        "Delivered"
      ) {
        order.deliveredAt =
          Date.now();
      }

      const updatedOrder =
        await order.save();

      res.json(
        updatedOrder
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update order status",
      });
    }
  };

module.exports = {
  addOrderItems,

  getMyOrders,

  getOrderById,

  updateOrderStatus,
};