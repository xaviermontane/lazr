const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Load configuration
let config = {};
try {
  const configPath = path.resolve(__dirname, '../config.json');
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
    console.error('Error reading config file:', err);
}

// Create a new client instance
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
    const commandsDir = path.join(__dirname, 'commands');
    client.commands = new Collection();

    try {
        const commandFolders = fs.readdirSync(commandsDir);
        for (const folder of commandFolders) {
            const folderPath = path.join(commandsDir, folder);
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
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
    } catch (err) {
        console.error(`Error loading commands: ${err.message}`);
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

loadCommands(client);
loadEvents(client);

// Log in with the bot's token
client.login(config.token);
console.log('API key loaded...');