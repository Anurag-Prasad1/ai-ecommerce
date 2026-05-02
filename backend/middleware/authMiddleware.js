const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check if Authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2️⃣ Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ Get user from DB (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      // 5️⃣ Move to next middleware/controller
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  // 6️⃣ If no token found
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = { protect };