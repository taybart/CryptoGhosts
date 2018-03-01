const winston = require('winston');
const config = require('./config.json');

// Winston log customizations
const custom = {
  levels: {
    trace: 0,
    input: 1,
    verbose: 2,
    prompt: 3,
    debug: 4,
    info: 5,
    data: 6,
    help: 7,
    warn: 8,
    error: 9,
  },
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red',
  },
  consoleOpts: {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
  },
  fileOpts: {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
  },
};

// Node system log
const syslog = new winston.Logger({
  level: config.loglevel,
  levels: custom.levels,
  transports: [
    new (winston.transports.Console)(custom.consoleOpts),
  ],
});

module.exports = syslog;
