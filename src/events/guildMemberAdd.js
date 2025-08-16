const { Events, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute(member) {
        const channelId = process.env.WELCOME_CHANNEL_ID;
        try {
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Welcome to the server!')
                .setDescription('We are glad to have you here!')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Get Started', value: 'Chat with us in #general!' },
                    { name: 'Rules', value: 'Please make sure to read the #rules channel.' }
                )
                .setTimestamp()
                .setFooter({ text: 'Enjoy your stay!', iconURL: member.guild.iconURL({ dynamic: true }) });

            const channel = member.guild.channels.cache.get(channelId);
            if (channel) {
                channel.send({ embeds: [welcomeEmbed] });
            }
        } catch (error) {
            console.error('Failed to send welcome embed:', error);
        }   
    }
}