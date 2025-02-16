const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectMongoDB = require("./config/db");
const { connectMySQL } = require("./config/sqldb");

const authRoutes = require("./routes/authRoutes"); // Import authentication routes

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes); // Use authentication routes

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to LMS Backend API" });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectMongoDB();
    console.log("✅ MongoDB Connected!");

    await connectMySQL();
    console.log("✅ MySQL Connected!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
