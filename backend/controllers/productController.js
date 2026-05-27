const Product = require("../models/Product");

// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (
  req,
  res
) => {

  const product =
    await Product.create({

      name: "Sample Product",

      price: 0,

      description:
        "Sample Description",

      image:
        "https://via.placeholder.com/300",

      brand: "Sample Brand",

      countInStock: 0,

      category:
        "Sample Category",

      popularityScore: 0,
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

  // Default sorting
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

  // Smart intelligent search query
  let productsQuery =
    Product.find(filter)
      .select(
        "name price image category countInStock popularityScore"
      );

  // Intelligent ranking for search
  if (req.query.keyword) {

    productsQuery =
      productsQuery.sort({
        name: 1,
      });

  } else {

    productsQuery =
      productsQuery.sort(sort);
  }

  // Final paginated products
  const products =
    await productsQuery
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


// @desc    Get Recommended Products
// @route   GET /api/products/:id/recommendations
// @access  Public
const getRecommendedProducts =
  async (req, res) => {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      res.status(404);

      throw new Error(
        "Product not found"
      );
    }

    const recommendations =
      await Product.find({

        // Exclude current product
        _id: {
          $ne: product._id,
        },

        // Same category
        category:
          product.category,

        // Similar price range
        price: {
          $gte:
            product.price - 20000,

          $lte:
            product.price + 20000,
        },
      }).limit(4);

    res.json(recommendations);
  };


// @desc    Smart Search Suggestions
// @route   GET /api/products/search/suggestions
// @access  Public
const getSearchSuggestions =
  async (req, res) => {

    const keyword =
      req.query.keyword;

    // Prevent empty search requests
    if (!keyword) {
      return res.json([]);
    }

    // Find matching product names
    const products =
      await Product.find({
        name: {
          $regex: keyword,
          $options: "i",
        },
      })
        .select("name")
        .limit(5);

    // Extract only names
    const suggestions =
      products.map(
        (product) => product.name
      );

    res.json(suggestions);
  };


// @desc    Get Trending Products
// @route   GET /api/products/trending/products
// @access  Public
const getTrendingProducts =
  async (req, res) => {

    const trendingProducts =
      await Product.find({})
        .sort({
          popularityScore: -1,
        })
        .limit(6);

    res.json(trendingProducts);
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

    product.brand =
      req.body.brand ||
      product.brand;

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

  getRecommendedProducts,

  getSearchSuggestions,

  getTrendingProducts,

  updateProduct,

  deleteProduct,
};