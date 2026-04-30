const User = require("../models/User");

// Register user
const registerUser = async (req, res) => {
  res.send("Register User API");
};

// Login user
const loginUser = async (req, res) => {
  res.send("Login User API");
};

module.exports = { registerUser, loginUser };