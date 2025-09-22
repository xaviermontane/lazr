const fs = require('fs');
const path = require('path');

const getTimestamp = () => new Date().toISOString();

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir, { recursive: true });
}

// Log file paths
const logFile = path.join(logsDir, 'bot.log');
const errorFile = path.join(logsDir, 'error.log');

// Helper function to write to file
function writeToFile(filename, message) {
	try {
		fs.appendFileSync(filename, message + '\n');
	}
	catch (error) {
		console.error('Failed to write to log file:', error.message);
	}
}

// Format log message
function formatMessage(level, msg, meta = {}) {
	const timestamp = getTimestamp();
	const metaStr = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
	return `[${timestamp}] ${level}: ${msg}${metaStr}`;
}

module.exports = {
	info: (msg, meta = {}) => {
		const formatted = formatMessage('INFO', msg, meta);
		writeToFile(logFile, formatted);
	},

	error: (msg, meta = {}) => {
		const formatted = formatMessage('ERROR', msg, meta);
		writeToFile(logFile, formatted);
		writeToFile(errorFile, formatted);
	},

	debug: (msg, meta = {}) => {
		if (process.env.LOG_LEVEL === 'debug') {
			const formatted = formatMessage('DEBUG', msg, meta);
			writeToFile(logFile, formatted);
		}
	},

	warn: (msg, meta = {}) => {
		const formatted = formatMessage('WARN', msg, meta);
		writeToFile(logFile, formatted);
	},
};