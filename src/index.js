const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Configuration with validation
const config = {
    token: process.env.BOT_TOKEN,
    prefix: process.env.BOT_PREFIX || '/'
};

if (!config.token) {
    console.error('[FATAL] BOT_TOKEN environment variable is required');
    process.exit(1);
}

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

// Initialize bot with error handling
async function initializeBot() {
    try {
        console.log('[INFO] Starting bot initialization...');
        
        // Load components
        loadCommands(client);
        loadEvents(client);
        
        // Login with timeout
        console.log('[INFO] Attempting to login...');
        await client.login(config.token);
        
    } catch (error) {
        console.error('[FATAL] Failed to initialize bot:', error.message);
        process.exit(1);
    }
}

// Start the bot
initializeBot();