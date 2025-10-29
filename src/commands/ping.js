const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'ping',
        description: 'Check the bot latency and response time'
    },
    async execute(message, args) {
        const sent = await message.reply('Calculating ping...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);
        
        const status = apiLatency < 200 ? 'Excellent' : apiLatency < 500 ? 'Good' : 'Poor';
        
        const embed = new EmbedBuilder()
            .setTitle('Ping Status')
            .setDescription(
                `**Bot Latency:** ${latency}ms\n` +
                `**API Latency:** ${apiLatency}ms\n` +
                `**Status:** ${status}`
            )
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setColor(apiLatency < 200 ? 0x00FF00 : apiLatency < 500 ? 0xFFFF00 : 0xFF0000)
            .setTimestamp();
        
        await sent.edit({ content: null, embeds: [embed] });
    }
};
