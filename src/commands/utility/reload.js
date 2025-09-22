const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

		// Find the command file by searching through command folders
		const commandsPath = path.join(__dirname, '..');
		let commandFile = null;

		try {
			const folders = fs.readdirSync(commandsPath, { withFileTypes: true })
				.filter(dirent => dirent.isDirectory())
				.map(dirent => dirent.name);

			for (const folder of folders) {
				const folderPath = path.join(commandsPath, folder);
				const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

				for (const file of files) {
					const filePath = path.join(folderPath, file);
					const cmd = require(filePath);
					if (cmd.data && cmd.data.name === commandName) {
						commandFile = filePath;
						break;
					}
				}
				if (commandFile) break;
			}

			if (!commandFile) {
				return interaction.reply(`Could not find file for command \`${commandName}\`!`);
			}

			// Clear the require cache and reload
			delete require.cache[require.resolve(commandFile)];
			const newCommand = require(commandFile);

			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		}
		catch (error) {
			console.error(error);
			await interaction.reply(`There was an error while reloading command \`${commandName}\`:\n\`${error.message}\``);
		}
	},
};