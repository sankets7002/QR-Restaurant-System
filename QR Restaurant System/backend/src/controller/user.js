import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Generate JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      restaurantId: user.restaurantId
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * Register new user & return JWT
 */
export const register = async (req, res) => {
  try {
    const { restaurantId, name, role, password } = req.body;

    if (!restaurantId || !name || !role || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim(), restaurantId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      restaurantId,
      name: name.trim(),
      role,
      passwordHash: hashedPassword
    });

    // Generate JWT
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        restaurantId: newUser.restaurantId
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Login user & return JWT
 */
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and password required" });
    }

    // Find user
    const user = await User.findOne({ name: name.trim() });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        restaurantId: user.restaurantId
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
