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

// Check if logging is enabled
const isLoggingEnabled = () => {
	return process.env.LOG_LEVEL && process.env.LOG_LEVEL.trim() !== '';
};

// Helper function to write to file
function writeToFile(filename, message) {
	if (!isLoggingEnabled()) return;

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
		if (!isLoggingEnabled()) return;

		const formatted = formatMessage('INFO', msg, meta);
		console.log(`✦ ${formatted} ✦`);
		writeToFile(logFile, formatted);
	},

	error: (msg, meta = {}) => {
		if (!isLoggingEnabled()) return;

		const formatted = formatMessage('ERROR', msg, meta);
		console.error(`✦ ${formatted} ✦`);
		writeToFile(logFile, formatted);
		writeToFile(errorFile, formatted);
	},

	debug: (msg, meta = {}) => {
		if (!isLoggingEnabled() || process.env.LOG_LEVEL !== 'debug') return;

		const formatted = formatMessage('DEBUG', msg, meta);
		console.debug(`✦ ${formatted} ✦`);
		writeToFile(logFile, formatted);
	},

	warn: (msg, meta = {}) => {
		if (!isLoggingEnabled()) return;

		const formatted = formatMessage('WARN', msg, meta);
		console.warn(`✦ ${formatted} ✦`);
		writeToFile(logFile, formatted);
	},
};