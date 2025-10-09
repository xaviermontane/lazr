const { SlashCommandBuilder } = require('discord.js');
const { parseTime } = require('../../services/timeResolver');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remind')
		.setDescription('Sets a reminder for a specified time.')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('The time after which to send the reminder (e.g., 10m, 2h, 1d)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The reminder message')
				.setRequired(true)),
	async execute(interaction) {
		const timeInput = interaction.options.getString('time');
		const message = interaction.options.getString('message');

		const duration = parseTime(timeInput);
		if (duration === null || duration <= 0) {
			return interaction.reply({ content: 'Please provide a valid time duration (e.g., 10m, 2h, 1d)', flags: 64 });
		}

		await interaction.reply(`Reminder set! I will remind you in ${timeInput}`);

		setTimeout(async () => {
			try {
				await interaction.user.send(`[Reminder] ${message}`);
			}
			catch (error) {
				console.error('Failed to send reminder DM:', error);
			}
		}, duration);
	},
};