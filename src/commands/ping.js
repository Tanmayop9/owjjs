module.exports = {
    data: {
        name: 'ping',
        description: 'Check the bot latency and response time'
    },
    async execute(message, args) {
        const sent = await message.reply('Calculating ping...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);
        
        // Clean text-based response without embeds or emojis
        const response = [
            '```',
            'PING STATUS',
            '─────────────────────────────',
            `Bot Latency: ${latency}ms`,
            `API Latency: ${apiLatency}ms`,
            `Status: ${apiLatency < 200 ? 'Excellent' : apiLatency < 500 ? 'Good' : 'Poor'}`,
            '```'
        ].join('\n');
        
        await sent.edit(response);
    }
};
