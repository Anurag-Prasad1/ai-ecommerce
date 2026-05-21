const Order = require("../models/Order");

const addOrderItems = async (
  req,
  res
) => {
  const {
    orderItems,
    shippingAddress,
    totalPrice,
  } = req.body;

  const order = new Order({
    orderItems,

    user: req.user._id,

    shippingAddress,

    totalPrice,

    isPaid: true,

    paidAt: Date.now(),
  });

  const createdOrder =
    await order.save();

  res.status(201).json(createdOrder);
};

const getMyOrders = async (
  req,
  res
) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.json(orders);
};

module.exports = {
  addOrderItems,
  getMyOrders,
};