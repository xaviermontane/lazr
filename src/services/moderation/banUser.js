module.exports = async function banUser(interaction, user, reason) {
	try {
		// Permission check
		if (!interaction.member.permissions.has('BanMembers')) {
			return interaction.reply({ content: 'You don\'t have permission to ban members.', ephemeral: true });
		}

		const member = interaction.guild.members.cache.get(user.id);
		if (!member) return interaction.reply({ content: 'User not found in the server.', ephemeral: true });

		// Ban the member
		await member.ban({ reason });

		// Reply confirmation
		await interaction.reply(`${user.tag} has been banned. Reason: ${reason}`);

		// Optional: log the action somewhere
		// logModAction(interaction.guild, `${user.tag} was banned by ${interaction.user.tag} for ${reason}`);

	}
	catch (err) {
		console.error(err);
		await interaction.reply({ content: 'Failed to ban user.', ephemeral: true });
	}
};