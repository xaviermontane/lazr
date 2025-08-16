const { Client, GatewayIntentBits } = require('discord.js');

describe('Discord Client Initialization', () => {
	test('should create a client with required intents', () => {
		const client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.DirectMessages,
			],
		});

		expect(client).toBeDefined();
		expect(client.options.intents.has(GatewayIntentBits.Guilds)).toBe(true);
		expect(client.options.intents.has(GatewayIntentBits.GuildMessages)).toBe(true);
	});
});