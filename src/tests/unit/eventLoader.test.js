const fs = require('fs');
const path = require('path');

// Simple test framework
function test(description, testFn) {
	try {
		testFn();
		console.log(`✅ ${description}`);
		return true;
	}
	catch (error) {
		console.error(`❌ ${description}`);
		console.error(`   Error: ${error.message}`);
		return false;
	}
}


console.log('\n=== Event Loader Tests ===');

test('Event loader should be able to load events directory', () => {
	const eventsPath = path.join(__dirname, '../../events');

	// Check if events directory exists
	if (!fs.existsSync(eventsPath)) {
		throw new Error('Events directory does not exist');
	}

	// Check if there are .js files in events directory
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	if (eventFiles.length === 0) {
		throw new Error('No event files found in events directory');
	}

	console.log(`   Found ${eventFiles.length} event files: ${eventFiles.join(', ')}`);
});

test('Event files should have proper structure', () => {
	const eventsPath = path.join(__dirname, '../../events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const eventPath = path.join(eventsPath, file);
		const event = require(eventPath);

		if (!event.name) {
			throw new Error(`Event file ${file} missing 'name' property`);
		}

		if (!event.execute || typeof event.execute !== 'function') {
			throw new Error(`Event file ${file} missing 'execute' function`);
		}

		console.log(`   ${file}: name="${event.name}", once=${!!event.once}`);
	}
});

console.log('');
