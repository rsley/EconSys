/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DATABASE                                                        │
  │ v1.0.0                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const mongoose = require("mongoose");
const logger = require("../core/logger");

//-- Database --\\
mongoose.connect(process.env.MONGO);

//-- Database Events --\\
mongoose.connection.on("connected", () => {
  logger("Success", "Database", "Connected to MongoDB");
});
mongoose.connection.on("error", (e) => {
  logger("Error", "Database", `Error connecting to MongoDB: ${e}`);
});
mongoose.connection.on("disconnected", () => {
  logger("Info", "Database", "Disconnected from MongoDB");
});

//-- Database Wrapper --\\
module.exports = mongoose;
