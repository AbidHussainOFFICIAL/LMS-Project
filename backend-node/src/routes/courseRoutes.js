const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware(["admin", "teacher"]), (req, res) => {
  res.json({ message: "Course Created!" });
});

module.exports = router;
