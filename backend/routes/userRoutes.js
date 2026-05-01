const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userController");

router.post("/register", registerUser);

// ❌ REMOVE this line (for now)
// router.post("/login", loginUser);

module.exports = router;