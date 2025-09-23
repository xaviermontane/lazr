const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { purgeMessages } = require('../../services/moderation/purgeMessages');

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
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
		// Check if bot has manage messages permission
		if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
			return await interaction.reply({
				content: '❌ Bot lacks permission to manage messages.',
				flags: 64,
			});
		}

		// Check if user has manage messages permission
		if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
			return await interaction.reply({
				content: '❌ You don\'t have permission to manage messages.',
				flags: 64,
			});
		}

		const amount = interaction.options.getInteger('amount');
		const user = interaction.options.getUser('user');

		try {
			// Defer reply since this might take a moment
			await interaction.deferReply({ flags: 64 });

			// Use the purge service
			const result = await purgeMessages(interaction.channel, amount, user, interaction.user);

			// Success response
			const response = result.user
				? `✅ Deleted ${result.deletedCount} messages from ${result.user.tag}.`
				: `✅ Deleted ${result.deletedCount} messages.`;

			await interaction.editReply({ content: response });

		}
		catch (error) {
			console.error('[ERROR] Failed to purge messages:', error);
			await interaction.editReply({
				content: `❌ ${error.message || 'Failed to purge messages. Please check bot permissions.'}`,
			});
		}
	},
};