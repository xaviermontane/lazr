function parseTime(input) {
	if (typeof input !== 'string') throw new Error('Input must be a string');

	const regex = /(\d+)\s*(d|h|m|s)/gi;
	const units = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
	let totalMs = 0;

	let match;
	while ((match = regex.exec(input)) !== null) {
		const value = parseInt(match[1], 10);
		const unit = match[2].toLowerCase();

		if (!units[unit]) throw new Error(`Invalid time unit: ${unit}`);
		totalMs += value * units[unit];
	}

	if (totalMs === 0) throw new Error('No valid time found in input');
	return totalMs;
}

function formatTime(ms) {
	const days = Math.floor(ms / 86400000);
	ms %= 86400000;
	const hours = Math.floor(ms / 3600000);
	ms %= 3600000;
	const minutes = Math.floor(ms / 60000);
	ms %= 60000;
	const seconds = Math.floor(ms / 1000);

	const parts = [];
	if (days) parts.push(`${days}d`);
	if (hours) parts.push(`${hours}h`);
	if (minutes) parts.push(`${minutes}m`);
	if (seconds) parts.push(`${seconds}s`);

	return parts.join(' ') || '0s';
}

// Example usage
try {
	const input = '1d 2h 30m 10s';
	const ms = parseTime(input);
	console.log('Milliseconds:', ms);
	console.log('Formatted:', formatTime(ms));
}
catch (err) {
	console.error('Error:', err.message);
}

// Export functions for bot usage
module.exports = { parseTime, formatTime };