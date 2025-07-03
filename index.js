const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new client (bot) instance
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildMembers,
	  GatewayIntentBits.DirectMessages,
	],
});

// Load all commands into client.commands
function loadCommands(client) {
	client.commands = new Collection();
	const commandsDir = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(commandsDir);

	for (const folder of commandFolders) {
		const folderPath = path.join(commandsDir, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(folderPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			} else {
				console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
}

// Load all events and register them with the client
function loadEvents(client) {
	const eventsDir = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsDir, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in with the bot's token
client.login(process.env.TOKEN);
console.log('API key loaded...');

// Log a message when the bot is ready
let verbose = false;

if (verbose) {
	client.on('ready', () => {
		client.channels.cache.get('1184611670971133974').send('Bot is online!');
	});
}