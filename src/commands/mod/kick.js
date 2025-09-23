const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member from the server.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The member to kick')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for kicking')
				.setRequired(false))
		.addBooleanOption(option =>
			option.setName('silent')
				.setDescription('Kick without notifying the user')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
		if (!interaction.member.permissions.has('KickMembers')) {
			return interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
		}

		const user = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason') || 'No reason provided';

		if (!user) {
			return interaction.reply({ content: 'User not found.', ephemeral: true });
		}

		if (!user.kickable) {
			return interaction.reply({ content: 'I cannot kick this user.', ephemeral: true });
		}

		if (user.id === interaction.user.id) {
			return interaction.reply({ content: 'You cannot kick yourself.', ephemeral: true });
		}

		await user.kick(reason);
		await interaction.reply({ content: `Kicked ${user.user.tag}. Reason: ${reason}` });
	},
};