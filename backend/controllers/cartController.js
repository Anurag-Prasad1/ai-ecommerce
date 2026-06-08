const Cart = require("../models/Cart");

// =======================================
// @desc    Get logged in user's cart
// @route   GET /api/cart
// @access  Private
// =======================================
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================================
// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
// =======================================
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const existingItem =
      await Cart.findOne({
        user: req.user._id,
        product: productId,
      });

    if (existingItem) {
      existingItem.quantity += 1;

      const updatedItem =
        await existingItem.save();

      const populatedItem =
        await Cart.findById(
          updatedItem._id
        ).populate("product");

      return res.json(
        populatedItem
      );
    }

    const cartItem =
      await Cart.create({
        user: req.user._id,
        product: productId,
        quantity: 1,
      });

    const populatedItem =
      await Cart.findById(
        cartItem._id
      ).populate("product");

    res.status(201).json(
      populatedItem
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================================
// @desc    Update quantity
// @route   PUT /api/cart/:id
// @access  Private
// =======================================
const updateCartItem = async (
  req,
  res
) => {
  try {
    const { quantity } = req.body;

    const cartItem =
      await Cart.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!cartItem) {
      return res.status(404).json({
        message:
          "Cart item not found",
      });
    }

    cartItem.quantity = quantity;

    const updatedItem =
      await cartItem.save();

    const populatedItem =
      await Cart.findById(
        updatedItem._id
      ).populate("product");

    res.json(
      populatedItem
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================================
// @desc    Remove item
// @route   DELETE /api/cart/:id
// @access  Private
// =======================================
const removeCartItem =
  async (req, res) => {
    try {
      const cartItem =
        await Cart.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!cartItem) {
        return res.status(404).json({
          message:
            "Cart item not found",
        });
      }

      await cartItem.deleteOne();

      res.json({
        message:
          "Item removed from cart",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};