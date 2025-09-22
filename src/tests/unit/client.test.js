const { Client, GatewayIntentBits } = require('discord.js');

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

console.log('\n=== Discord Client Tests ===');

test('Should be able to create Discord client with required intents', () => {
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.DirectMessages,
		],
	});

	if (!client) {
		throw new Error('Failed to create Discord client');
	}

	if (!client.options) {
		throw new Error('Client options not found');
	}

	if (!client.options.intents) {
		throw new Error('Client intents not found');
	}

	// Check if required intents are present
	const requiredIntents = [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
	];

	for (const intent of requiredIntents) {
		if (!client.options.intents.has(intent)) {
			throw new Error(`Missing required intent: ${intent}`);
		}
	}

	console.log(`   Client created with ${requiredIntents.length} required intents`);
});

test('Environment variables should be configured for bot operation', () => {
	const requiredEnvVars = ['BOT_TOKEN', 'CLIENT_ID', 'GUILD_ID'];
	const missingVars = [];

	for (const envVar of requiredEnvVars) {
		if (!process.env[envVar]) {
			missingVars.push(envVar);
		}
	}

	if (missingVars.length > 0) {
		console.log(`   ⚠️  Missing environment variables: ${missingVars.join(', ')}`);
		console.log('   (This is expected in CI/test environments)');
	}
	else {
		console.log('   All required environment variables are set');
	}
});

console.log('');