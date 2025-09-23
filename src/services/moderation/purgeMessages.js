async function purgeMessages(channel, amount, user = null, moderator) {
	try {
		// Fetch messages
		const messages = await channel.messages.fetch({ limit: 100 });

		let messagesToDelete;
		if (user) {
			// Filter messages by specific user
			const userMessages = messages.filter(msg => msg.author.id === user.id);
			messagesToDelete = Array.from(userMessages.values()).slice(0, amount);
		}
		else {
			// Get the specified amount of messages
			messagesToDelete = Array.from(messages.values()).slice(0, amount);
		}

		// Check if there are messages to delete
		if (messagesToDelete.length === 0) {
			throw new Error(user
				? `No messages found from ${user.tag} in the last 100 messages.`
				: 'No messages found to delete.',
			);
		}

		// Filter out messages older than 14 days (Discord limitation)
		const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
		const validMessages = messagesToDelete.filter(msg => msg.createdTimestamp > twoWeeksAgo);

		if (validMessages.length === 0) {
			throw new Error('Cannot delete messages older than 14 days.');
		}

		// Delete messages
		const deleted = await channel.bulkDelete(validMessages, true);

		// Log the action
		console.log(`[MODERATION] ${moderator.tag} purged ${deleted.size} messages${user ? ` from ${user.tag}` : ''} in #${channel.name}`);

		return {
			deletedCount: deleted.size,
			user: user,
			success: true,
		};

	}
	catch (error) {
		console.error('[MODERATION] Purge error:', error);
		throw error;
	}
}

module.exports = { purgeMessages };