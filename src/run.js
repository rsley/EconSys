/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS INDEX GLOBAL                                                    │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Clear Logs Folder --\\
(async () => {
  console.log(`
    \x1b[31md\x1b[0m88888b  \x1b[31m.o88b.\x1b[0m  \x1b[31m.d88b.\x1b[0m  d8b   db \x1b[31m.d8888.\x1b[0m db    db \x1b[31m.d8888.\x1b[0m
    \x1b[33m88'\x1b[0m     \x1b[33md8P  Y8\x1b[0m \x1b[33m.8P  Y8.\x1b[0m  \x1b[33m888o  88\x1b[0m \x1b[33m88'  YP\x1b[0m \x1b[33m\`8b  d8'\x1b[0m \x1b[33m88'  YP\x1b[0m
    \x1b[32m88ooooo\x1b[0m \x1b[32m8P      \x1b[32m88    88\x1b[0m \x1b[32m88V8o 88\x1b[0m \x1b[32m\`8bo\\.\x1b[0m    \x1b[32m\`8bd8'\x1b[0m  \x1b[32m\`8bo.\x1b[0m
    \x1b[34m88~~~~~\x1b[0m \x1b[34m8b      \x1b[34m88    88\x1b[0m \x1b[34m88 V8o88\x1b[0m   \x1b[34m\`Y8b.\x1b[0m    \x1b[34m88\x1b[0m      \x1b[34m\`Y8b.\x1b[0m
    \x1b[35m88.\x1b[0m     \x1b[35mY8b  d8\x1b[0m \x1b[35m\`8b  d8'\x1b[0m \x1b[35m88  V888\x1b[0m \x1b[35mdb   8D\x1b[0m    \x1b[35m88\x1b[0m    \x1b[35mdb   8D\x1b[0m
    \x1b[36mY88888P\x1b[0m  \x1b[36m\`Y88P'\x1b[0m  \x1b[36m\`Y88P'\x1b[0m  \x1b[36mVP   V8P\x1b[0m \x1b[36m\`8888Y'\x1b[0m    \x1b[36mYP\x1b[0m    \x1b[36m\`8888Y'\x1b[0m
  
      Copyright (c) Rafael S.R.
      Version v.1.0.0
    `);

  if (process.env.DEP && process.env.DEP.toUpperCase() === "DEVELOPMENT") {
    require("./core/logger").deleteLogFileForToday();
  }

  global.console.logg = console.log;
  global.console.log = (...args) => {
    logger("Debug", "Console", args.join(" "));
  };
})();

//-- Imports --\\
require("dotenv/config");
const logger = require("./core/logger");
const client = require("./client/main");
const config = require("./config");
const api = require("./core/api");
const translate = require("./core/functions/translate");
const Dashboard = require("./dashboard");
const database = require("./db");
const mongodb = require("./db/mongo");

//-- Global Variables --\\
global.logger = logger;
global.database = database;
global.client = client;
global.dclient = client; // double instance
global.config = config;
global.api = api;
global.translate = translate;
global.Handler = Dashboard.Handler;

//-- Events --\\
require("./dashboard/dashbot");

//-- Start --\\
logger("Info", "Index", "Starting the core...");
client.login(process.env.TOKEN);
logger("Success", "Index", "Initializing DBD...");
