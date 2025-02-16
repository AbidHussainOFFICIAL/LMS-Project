const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserMongo = require("../models/UserMongo");
const UserSQL = require("../models/UserSQL");
require("dotenv").config();

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists (MongoDB)
    let user = await UserMongo.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User in MongoDB
    user = await UserMongo.create({ name, email, password: hashedPassword, role });

    // Create User in MySQL
    await UserSQL.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in MongoDB
    const user = await UserMongo.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { register, login };
