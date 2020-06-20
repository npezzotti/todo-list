const winston = require('winston');
const path = require('path');
const appRoot = require('app-root-path');
const fs = require('fs');

// create path to log directory 
const logDirectory = path.resolve(`${appRoot}`, "logs");
// check if log firectory exists and create if needed
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: path.resolve(logDirectory, 'task-app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    colorize: true,
    level: 'debug',
    handleExceptions: true,
    json: false,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') logger.add(new winston.transports.Console(options.console));

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;