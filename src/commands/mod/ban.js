const { SlashCommandBuilder } = require('discord.js');
const banUser = require('../../services/moderation/banUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the server.')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('User to ban')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for ban')
				.setRequired(false)),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') || 'No reason provided';

		await banUser(interaction, target, reason);
	},
};