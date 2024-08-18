const pino = require('pino');
const path = require('path');
const pinoMultiStream = require('pino-multi-stream');

// Log directory
const logDir = path.join(__dirname, '../logs');
if (!require('fs').existsSync(logDir)) {
  require('fs').mkdirSync(logDir);
}

// Streams for different log levels
const streams = [
  {
    level: 'info',
    stream: pino.destination({
      dest: path.join(logDir, 'incoming_requests.log'), // Info logs in JSON format
      mkdir: true,
      append: true,
    }),
  },
  {
    level: 'error',
    stream: pino.destination({
      dest: path.join(logDir, 'error.log'), // Error logs in JSON format
      mkdir: true,
      append: true,
    }),
  },
];

// Create the logger with multi-stream support and readable timestamps
const logger = pino(
  {
    level: 'debug', // Set the minimum log level
    timestamp: pino.stdTimeFunctions.isoTime, // ISO 8601 format for readability
    formatters: {
      level(label) {
        return { level: label };
      },
    },
  },
  pinoMultiStream.multistream(streams)
);

module.exports = logger;