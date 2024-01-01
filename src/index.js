/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS LOGGER                                                          │
  │ v1.0.0                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Clear Logs Folder --\\
if (process.env.DEP && process.env.DEP.toUpperCase() === "DEVELOPMENT") {
  require("./core/logger").deleteLogFileForToday()
}

//-- Imports --\\
require("dotenv/config");
const logger = require("./core/logger");
const database = require("./db");
const client = require("./core/main");
const config = require("./config");
const api = require("./core/api")
const translator = require("./runner/functions/translate")
const Dashboard = require("./dash")

//-- Global Variables --\\
global.logger = logger;
global.database = database;
global.client = client;
global.dclient = client;
global.config = config;
global.api = api
global.translator = translator
global.Dashboard = Dashboard

//-- Events --\\
require("./runner/dashbot")
  
//-- Start --\\
logger("Info", "Index", "Starting the core...");
client.login(process.env.TOKEN);
logger("Success", "Index", "Initializing DBD...");