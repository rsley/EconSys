/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DATABASE                                                        │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const mongoose = require("mongoose");
const logger = require("../core/logger");

//-- Database --\\
mongoose.set("strictQuery", true);
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
