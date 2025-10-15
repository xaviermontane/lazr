const { SlashCommandBuilder, PermissionBitFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Manage roles for users.')
		.setDefaultMemberPermissions(PermissionBitFlags.ManageRoles)
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Add a role to a user.')
				.addUserOption(option =>
					option.setName('user')
						.setDescription('The user to add the role to')
						.setRequired(true))
				.addRoleOption(option =>
					option.setName('role')
						.setDescription('The role to add')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('color')
				.setDescription('Change the color of a role.')
				.addRoleOption(option =>
					option.setName('role')
						.setDescription('The role to change color')
						.setRequired(true))
				.addColorOption(option =>
					option.setName('color')
						.setDescription('The new color for the role')
						.setRequired(true))),
};