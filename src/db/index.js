/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DATABASE  R                                                     │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const { Sequelize } = require("sequelize");

//-- Database --\\
const sequelize = new Sequelize({
  dialect: "mysql", // Specify the dialect, in this case, MySQL
  host: process.env.DB_HOST, // Replace with your MySQL host
  port: process.env.DB_PORT, // Replace with your MySQL port
  username: process.env.DB_USERNAME, // Replace with your MySQL username
  password: process.env.DB_PASSWORD, // Replace with your MySQL password
  database: process.env.DB_NAME, // Replace with your MySQL database name
  define: {
    timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
  },
  logging: (msg) => logger("Info", "SQLIZE", msg),
});

//-- Database Events --\\
sequelize
  .authenticate()
  .then(() => {
    logger("Success", "Database", "Connected to MySQL.");
  })
  .catch((error) => {
    logger("Error", "Database", `Error connecting to MySQL: ${error}`);
  });

//-- Test Connection --\\
async function testConnection() {
  try {
    await sequelize.authenticate();
    logger("Success", "Database", "Connected to MySQL.");
  } catch (error) {
    logger("Error", "Database", `Error connecting to MySQL: ${error}`);
  }
}

//-- Export --\\
module.exports = { sequelize };
