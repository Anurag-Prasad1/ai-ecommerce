const Product = require("../models/Product");


// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (
  req,
  res
) => {
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
const getProducts = async (
  req,
  res
) => {

  // Dynamic page size
  const pageSize =
    Number(req.query.limit) || 5;

  // Current page number
  const page =
    Number(req.query.pageNumber) || 1;

  // Search by keyword
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // Filter by category
  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: "i",
        },
      }
    : {};

  // Flexible price filtering
  let priceFilter = {};

  if (
    req.query.minPrice ||
    req.query.maxPrice
  ) {
    priceFilter.price = {};

    if (req.query.minPrice) {
      priceFilter.price.$gte =
        Number(req.query.minPrice);
    }

    if (req.query.maxPrice) {
      priceFilter.price.$lte =
        Number(req.query.maxPrice);
    }
  }

  // Sorting
  const sort = req.query.sort
    ? req.query.sort
    : "-createdAt";

  // Combined filters
  const filter = {
    ...keyword,
    ...category,
    ...priceFilter,
  };

  // Count total matching products
  const count =
    await Product.countDocuments(
      filter
    );

  // Fetch paginated products
  const products =
    await Product.find(filter)
      .select(
        "name price image category countInStock"
      )
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

  // Final response
  res.json({
    products,
    page,
    pages: Math.ceil(
      count / pageSize
    ),
    totalProducts: count,
  });
};


// @desc    Get Single Product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (
  req,
  res
) => {

  const product =
    await Product.findById(
      req.params.id
    );

  if (product) {
    res.json(product);
  } else {
    res.status(404);

    throw new Error(
      "Product not found"
    );
  }
};


// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (
  req,
  res
) => {

  const product =
    await Product.findById(
      req.params.id
    );

  if (product) {

    product.name =
      req.body.name ||
      product.name;

    product.price =
      req.body.price ||
      product.price;

    product.description =
      req.body.description ||
      product.description;

    product.image =
      req.body.image ||
      product.image;

    product.countInStock =
      req.body.countInStock ||
      product.countInStock;

    product.category =
      req.body.category ||
      product.category;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);

  } else {

    res.status(404);

    throw new Error(
      "Product not found"
    );
  }
};


// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (
  req,
  res
) => {

  const product =
    await Product.findById(
      req.params.id
    );

  if (product) {

    await product.deleteOne();

    res.json({
      message:
        "Product removed successfully",
    });

  } else {

    res.status(404);

    throw new Error(
      "Product not found"
    );
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};