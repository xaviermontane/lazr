const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Shows available roles'),

  async execute(interaction) {
    const colorEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('COLORS')
      .setDescription('@red\n@blue\n\nᴿᵉᵃᶜᵗ ᵗᵒ ᵍᶦᵛᵉ ʸᵒᵘʳˢᵉˡᶠ ᵃ ᶜᵒˡᵒʳ');
    const ageEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('AGE')
      .setDescription('@18-\n@18+\n\nᴿᵉᵃᶜᵗ ᵗᵒ ᵍᶦᵛᵉ ʸᵒᵘʳˢᵉˡᶠ ᵃ ʳᵒˡᵉ');
    const serverEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('SERVER')
      .setDescription('@announcements\n@chat revive\n\nᴿᵉᵃᶜᵗ ᵗᵒ ᵍᶦᵛᵉ ʸᵒᵘʳˢᵉˡᶠ ᵃ ʳᵒˡᵉ');

    await interaction.reply({ embeds: [colorEmbed, ageEmbed, serverEmbed] });
  }
};