const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge messages in a channel')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('Number of messages to delete (1-100)')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(100))
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Filter messages by user')
				.setRequired(false)),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		const user = interaction.options.getUser('user');

		await interaction.reply(`Purging ${amount} messages${user ? ` from ${user.tag}` : ''}...`);
	},
};