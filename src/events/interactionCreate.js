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
User @${interaction.user.tag} tried /${interaction.commandName} in #${interaction.channel.name}

[${new Date().toLocaleTimeString()}] Executed on ${interaction.guild.name}#${interaction.guild.id}
			`);
			return;
		}

		try {
			await command.execute(interaction);
			console.log(`
✦ Command completed successfully! ✦
User @${interaction.user.tag} used /${interaction.commandName} in #${interaction.channel.name}

[${new Date().toLocaleTimeString()}] Executed on ${interaction.guild.name}#${interaction.guild.id}
			`);
			console.log('[METADATA]', JSON.stringify(meta, null, 2));
		}
		catch (error) {
			console.error(`
✦ Command failed! ✦
User @${interaction.user.tag} used /${interaction.commandName} in #${interaction.channel.name}

[${new Date().toLocaleTimeString()}] Executed on ${interaction.guild.name}#${interaction.guild.id}
Error: ${error.message}
			`);
			console.error('[METADATA]', JSON.stringify({
				...meta,
				error: {
					message: error.message,
					stack: error.stack,
					name: error.name,
				},
			}, null, 2));
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			}
			else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};