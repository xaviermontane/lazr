module.exports = async function assignRole(interaction, user, role) {
	try {
		// Fetch the member from the guild
		const member = await interaction.guild.members.fetch(user.id);
		if (!member) {
			throw new Error('Member not found');
		}

		// Add the role to the member
		await member.roles.add(role);
		await interaction.reply({ content: `✅ Successfully added role ${role.name} to ${user.tag}.`, flags: 64 });
	}
	catch (error) {
		console.error(`[MODERATION] Could not fetch member ${user.tag} in guild ${interaction.guild.name}:`, error.message);
		await interaction.reply({ content: `❌ Could not find user ${user.tag} in this server.`, flags: 64 });
		return;
	}
};