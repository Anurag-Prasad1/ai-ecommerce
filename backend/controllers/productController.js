const Product = require("../models/Product");


// @desc    Create Product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  const { name, price, description, image, countInStock, category } = req.body;

  const product = await Product.create({
    name,
    price,
    description,
    image,
    countInStock,
    category,
  });

  res.status(201).json(product);
};


// @desc    Get All Products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


module.exports = {
  createProduct,
  getProducts,
};