const express = require("express");

const router = express.Router();

const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  addOrderItems
);

router.get(
  "/myorders",
  protect,
  getMyOrders
);

router.get(
  "/:id",
  protect,
  getOrderById
);

/*
  Future Admin Route
  Used for:
  Processing → Shipped
  Shipped → Delivered
  Delivered → Completed
*/
router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);

module.exports = router;