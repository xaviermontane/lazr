const { SlashCommandBuilder } = require('discord.js');
const { parseTime } = require('../../services/timeResolver');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('afk')
		.setDescription('Sets your AFK (Away From Keyboard) status.')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('The time after which to set AFK status (e.g., 10m, 2h, 1d)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for going AFK')
				.setRequired(false)),
	async execute(interaction) {
		const timeInput = interaction.options.getString('time');
		const reason = interaction.options.getString('reason') || 'No reason provided';

		const duration = parseTime(timeInput);
		if (duration === null || duration <= 0) {
			return interaction.reply({ content: 'Please provide a valid time duration (e.g., 10m, 2h, 1d)', flags: 64 });
		}

		await interaction.reply(`${interaction.user} is AFK for ${timeInput} because of *"${reason}"*`);
	},
};