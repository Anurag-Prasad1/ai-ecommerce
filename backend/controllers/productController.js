const Product = require("../models/Product");


// @desc    Create Product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    countInStock,
    category,
  } = req.body;

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

  // Search by keyword
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // Filter by category (case-insensitive)
  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: "i",
        },
      }
    : {};

  // Filter by price range
  const priceFilter =
    req.query.minPrice && req.query.maxPrice
      ? {
          price: {
            $gte: Number(req.query.minPrice),
            $lte: Number(req.query.maxPrice),
          },
        }
      : {};

  // Sorting
  const sort = req.query.sort
    ? req.query.sort
    : "-createdAt";

  // Fetch products
  const products = await Product.find({
    ...keyword,
    ...category,
    ...priceFilter,
  }).sort(sort);

  res.json(products);
};


// @desc    Get Single Product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProductById,
};