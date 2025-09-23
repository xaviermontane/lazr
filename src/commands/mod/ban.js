const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const banUser = require('../../services/moderation/banUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the server.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User to ban')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for ban')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason') || 'No reason provided';

		try {
			await banUser(interaction, user, reason);
		}
		catch (error) {
			console.error('[ERROR] Failed to ban user:', error);
			await interaction.reply({ content: 'Failed to ban user.', flags: 64 });
		}
	},
};