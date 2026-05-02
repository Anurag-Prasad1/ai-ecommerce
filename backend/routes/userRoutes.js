const express = require("express");
const router = express.Router();

// Controllers
const { registerUser, loginUser } = require("../controllers/userController");

// Middleware
const { protect } = require("../middleware/authMiddleware");


// =======================
// 🔓 PUBLIC ROUTES
// =======================

// Register user
// POST /api/users/register
router.post("/register", registerUser);

// Login user
// POST /api/users/login
router.post("/login", loginUser);


// =======================
// 🔐 PROTECTED ROUTES
// =======================

// Get user profile
// GET /api/users/profile
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Dashboard route (Mini Task)
// GET /api/users/dashboard
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "Welcome to dashboard" });
});


module.exports = router;