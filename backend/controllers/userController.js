const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");


// 🔐 Generate JWT Token
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};


// 📝 Register User
const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // 1. Validate input
    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "Please fill all fields",
      });
    }

    // 2. Check if user already exists
    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {

      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // 3. Hash password
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // 4. Create user
    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    // 5. Send response
    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,

      isAdmin:
        user.isAdmin,

      token:
        generateToken(
          user._id
        ),
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};


// 🔑 Login User
const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // 1. Check if user exists
    const user =
      await User.findOne({
        email,
      });

    // 2. Compare password
    if (
      user &&
      (
        await bcrypt.compare(
          password,
          user.password
        )
      )
    ) {

      res.json({

        _id: user._id,

        name: user.name,

        email: user.email,

        isAdmin:
          user.isAdmin,

        token:
          generateToken(
            user._id
          ),
      });

    } else {

      res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
};