const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/register", register);
router.post("/login", login);

// Role-Based Access Control Routes
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/teacher", authMiddleware, roleMiddleware(["admin", "teacher"]), (req, res) => {
  res.json({ message: "Welcome Teacher" });
});

router.get("/student", authMiddleware, roleMiddleware(["admin", "teacher", "student"]), (req, res) => {
  res.json({ message: "Welcome Student" });
});

module.exports = router;
