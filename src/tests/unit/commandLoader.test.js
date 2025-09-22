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

console.log('\n=== Command Loader Tests ===');

test('Commands directory should exist and contain command files', () => {
	const commandsPath = path.join(__dirname, '../../commands');

	// Check if commands directory exists
	if (!fs.existsSync(commandsPath)) {
		throw new Error('Commands directory does not exist');
	}

	// Check for command folders
	const commandFolders = fs.readdirSync(commandsPath, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	if (commandFolders.length === 0) {
		throw new Error('No command folders found in commands directory');
	}

	console.log(`   Found ${commandFolders.length} command folders: ${commandFolders.join(', ')}`);
});

test('Command files should have proper structure', () => {
	const commandsPath = path.join(__dirname, '../../commands');
	const commandFolders = fs.readdirSync(commandsPath, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let totalCommands = 0;

	for (const folder of commandFolders) {
		const folderPath = path.join(commandsPath, folder);
		const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			// Skip utility files that aren't commands
			if (file === 'logger.js') {
				console.log(`   Skipping utility file: ${folder}/${file}`);
				continue;
			}

			const commandPath = path.join(folderPath, file);
			const command = require(commandPath);

			if (!command.data) {
				throw new Error(`Command file ${folder}/${file} missing 'data' property`);
			}

			if (!command.execute || typeof command.execute !== 'function') {
				throw new Error(`Command file ${folder}/${file} missing 'execute' function`);
			}

			if (!command.data.name) {
				throw new Error(`Command file ${folder}/${file} data missing 'name' property`);
			}

			console.log(`   ${folder}/${file}: name="${command.data.name}"`);
			totalCommands++;
		}
	}

	if (totalCommands === 0) {
		throw new Error('No valid command files found');
	}

	console.log(`   Total valid commands: ${totalCommands}`);
});

console.log('');
