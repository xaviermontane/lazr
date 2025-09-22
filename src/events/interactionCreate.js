const logger = require('../utils/logger');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const meta = {
			user: {
				id: interaction.user?.id,
				tag: interaction.user?.tag,
			},
			guild: {
				id: interaction.guild?.id,
				name: interaction.guild?.name,
			},
			command: interaction?.commandName,
			options: interaction?.options?.data,
			timestamp: new Date().toISOString(),
		};

		// Log the incoming command
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`
✦ Command not found! ✦
User @${interaction.user.tag} tried /${interaction.commandName} at ${new Date().toLocaleTimeString()}

➤ Executed on ${interaction.guild.name}#${interaction.channel.name}
			`);
			return;
		}

		try {
			await command.execute(interaction);
			console.log(`
✦ Command completed successfully! ✦
User @${interaction.user.tag} used /${interaction.commandName} at ${new Date().toLocaleTimeString()}

➤ Executed on ${interaction.guild.name}#${interaction.channel.name}
			`);
			// Save metadata to log file only (not console)
			logger.info(`Command executed: ${interaction.commandName}`, meta);
		}
		catch (error) {
			console.error(`
✦ Command failed! ✦
User @${interaction.user.tag} used /${interaction.commandName} at ${new Date().toLocaleTimeString()}

➤ Executed on ${interaction.guild.name}#${interaction.guild.id}
Error: ${error.message}
			`);
			// Save detailed error metadata to log file only (not console)
			logger.error(`Command failed: ${interaction.commandName}`, {
				...meta,
				error: {
					message: error.message,
					stack: error.stack,
					name: error.name,
				},
			});
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			}
			else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};