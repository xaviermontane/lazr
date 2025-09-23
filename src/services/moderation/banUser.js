module.exports = async function banUser(interaction, user, reason) {
	try {
		// Permission check
		if (!interaction.member.permissions.has('BanMembers')) {
			return interaction.reply({ content: 'You don\'t have permission to ban members.', ephemeral: true });
		}

		const member = await interaction.guild.members.fetch(user.id);

		// Ban the member
		await member.ban({ reason: `${reason} | Banned by ${interaction.user.tag}` });

		// Reply confirmation
		await interaction.reply({
			content: `✅ ${user.tag} has been banned. Reason: ${reason}`,
			flags: 64,
		});

		console.log(`[MODERATION] ${user.tag} was banned by ${interaction.user.tag} for: ${reason}`);

	}
	catch (err) {
		console.error('[MODERATION] Ban error:', err);
		throw err;
	}
};