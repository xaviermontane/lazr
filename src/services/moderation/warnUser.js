module.exports = async function warnUser(interaction, user, reason) {
	try {
		// Try to send DM to the user first
		let dmSent = false;
		try {
			await user.send({
				content: `⚠️ You have been warned in **${interaction.guild.name}** by **${interaction.user.tag}**\n\n**Reason:** ${reason}\n\n*Please review the server rules to avoid further action.*`,
			});
			dmSent = true;
		}
		catch (dmError) {
			console.log(`[MODERATION] Could not DM ${user.tag} - DMs may be disabled:`, dmError.message);
		}

		// Reply confirmation in the channel
		const dmStatus = dmSent ? '✅  User notified via DM' : '⚠️  Could not send DM';
		await interaction.reply({
			content: `⚠️  ${user.tag} has been warned. – Reason: ${reason}\n${dmStatus}`,
			flags: 64,
		});

		// Log the warning action
		console.log(`[MODERATION] ${user.tag} was warned by ${interaction.user.tag} for: ${reason} | DM sent: ${dmSent}`);

		// Here you could add database storage for warnings:
		// await saveWarningToDatabase(user.id, interaction.user.id, reason, interaction.guild.id);

	}
	catch (err) {
		console.error('[MODERATION] Warn error:', err);
		throw err;
	}
};