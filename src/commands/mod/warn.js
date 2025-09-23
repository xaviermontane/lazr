const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const warnUser = require('../../services/moderation/warnUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a user')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to warn')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for the warning')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason') || 'No reason provided';

		try {
			await warnUser(interaction, user, reason);
		}
		catch (error) {
			console.error('[ERROR] Failed to warn user:', error);
			await interaction.reply({ content: 'Failed to warn user.', flags: 64 });
		}
	},
};