const mongoose = require("mongoose");
require("dotenv").config(); // Ensure .env is loaded

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in the environment variables");
    }

    console.log("🔗 Connecting to MongoDB at:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectMongoDB;
