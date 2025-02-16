const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  logging: false, // Disable Sequelize logging
});

const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected!");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error);
    throw error; // Do not exit; let the caller handle it
  }
};

module.exports = { sequelize, connectMySQL };
