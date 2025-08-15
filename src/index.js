const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Create client
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildMembers,
	  GatewayIntentBits.DirectMessages,
	],
});

// Function definitions
function loadCommands(client) {
    const commandsDir = path.join(__dirname, 'src', 'commands');
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

function loadEvents(client) {
	const eventsDir = path.join(__dirname, 'src', 'events');
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

// Initialize bot
loadCommands(client);
loadEvents(client);

console.log('API key loaded...');
client.login(config.token);