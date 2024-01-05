/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS LOGGER                                                          │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael Soley                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const fs = require("fs");
const colors = require("colors");
const moment = require("moment-timezone");

//-- Constants --\\
const logFolderPath = `${__dirname}/logs`;
const maxLogFileSize = 1024 * 1024 * 500; // 500 MB

//-- Functions --\\
function removeANSIEscapeCodes(logLine) {
  return logLine.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');
}

function clearLogsFolder() {
  try {
    fs.rmdirSync(logFolderPath, { recursive: true });
  } catch (err) {
    console.error(`Error clearing logs folder: ${err}`);
  }
}

function logToConsole(type, logText) {
  switch (type) {
    case "Info":
      console.info(colors.blue(logText));
      break;
    case "Success":
      console.logg(colors.green(logText));
      break;
    case "Error":
      console.error(colors.red(logText));
      break;
    case "Debug":
      console.debug(colors.gray(logText));
      break;
    default:
      break;
  }
}

function logToFile(logText) {
  const currentDate = getCurrentTimestamp('YYYY-MM-DD');
  logText = removeANSIEscapeCodes(logText);
  let logFileCounter = 0;

  const getLogFilePath = () => {
    return `${logFolderPath}/${currentDate}${logFileCounter > 0 ? `-${logFileCounter}` : ''}.log`;
  };

  const logFilePath = getLogFilePath();

  // Check if the log file exists
  if (!fs.existsSync(logFilePath)) {
    // Create the log file if it doesn't exist
    fs.writeFileSync(logFilePath, '');
  }

  // Check log file size before writing
  fs.stat(logFilePath, (err, stats) => {
    if (err) {
      console.error(`Error checking log file stats: ${err}`);
      return;
    }

    // Rotate log if it exceeds the maximum size
    if (stats.size > maxLogFileSize) {
      rotateLog(logFilePath, currentDate);
    }

    // Write to log file
    fs.appendFile(logFilePath, logText, (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
      }
    });
  });
}

function rotateLog(logFilePath, currentDate) {
  let rotatedLogFilePath = `${logFolderPath}/${currentDate}-1.log`;

  // Check for existing rotated logs
  while (fs.existsSync(rotatedLogFilePath)) {
    logFileCounter += 1;
    rotatedLogFilePath = `${logFolderPath}/${currentDate}-${logFileCounter}.log`;
  }

  // Rename current log file to a rotated file with timestamp
  fs.rename(logFilePath, rotatedLogFilePath, (err) => {
    if (err) {
      console.error(`Error rotating log file: ${err}`);
    }
  });
}

function getCurrentTime() {
  return moment().tz("America/Chicago").format("YYYY-MM-DD HH:mm:ss");
}

function getCurrentTimestamp(format) {
  return moment().tz("America/Chicago").format(format);
}

function deleteLogFileForToday() {
      const currentDate = getCurrentTimestamp('YYYY-MM-DD');
      const logFilePath = `${logFolderPath}/${currentDate}.log`;
  
      // Check if the log file exists before attempting to delete
      if (fs.existsSync(logFilePath)) {
        try {
          fs.unlinkSync(logFilePath);
          console.log(`Log file for ${currentDate} deleted.`);
        } catch (err) {
          console.error(`Error deleting log file: ${err}`);
        }
      } else {
        console.log(`Log file for ${currentDate} does not exist. Skipping deletion.`);
      }
  }

function log(type, module, text) {
  const logText = `[${getCurrentTime()}] [${type.toUpperCase()}] [${module}] : ${text}\n`;
  module = module.toUpperCase();

  if (process.env.BASE !== "DEVELOPMENT") {
    if (module === "SQLIZE") return
  }

  // Log to console with colors
  logToConsole(type, logText);

  // Log to file
  logToFile(logText);
}

//-- Exports --\\
module.exports = log;
module.exports.clearLogsFolder = clearLogsFolder;
module.exports.logToConsole = logToConsole;
module.exports.logToFile = logToFile;
module.exports.rotateLog = rotateLog;
module.exports.getCurrentTime = getCurrentTime;
module.exports.getCurrentTimestamp = getCurrentTimestamp;
module.exports.deleteLogFileForToday = deleteLogFileForToday;