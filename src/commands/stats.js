const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'stats',
        description: 'Display detailed bot statistics and performance metrics'
    },
    async execute(message, args) {
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const memUsage = process.memoryUsage();
        const totalMemMB = (memUsage.heapTotal / 1024 / 1024).toFixed(2);
        const usedMemMB = (memUsage.heapUsed / 1024 / 1024).toFixed(2);
        const rssMB = (memUsage.rss / 1024 / 1024).toFixed(2);
        const memPercent = ((memUsage.heapUsed / memUsage.heapTotal) * 100).toFixed(1);
        
        const totalUsers = message.client.users.cache.size;
        const totalGuilds = message.client.guilds.cache.size;
        const totalChannels = message.client.channels.cache.size;
        const totalCommands = message.client.commands.size;
        
        const ping = Math.round(message.client.ws.ping);
        
        const description = 
            `**Performance Metrics**\n` +
            `Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s\n` +
            `WebSocket Ping: ${ping}ms\n` +
            `Memory Usage: ${usedMemMB}MB / ${totalMemMB}MB (${memPercent}%)\n` +
            `Total Memory (RSS): ${rssMB}MB\n` +
            `Node Version: ${process.version}\n` +
            `Platform: ${process.platform} ${process.arch}\n\n` +
            `**Bot Statistics**\n` +
            `Total Servers: ${totalGuilds}\n` +
            `Total Users: ${totalUsers}\n` +
            `Total Channels: ${totalChannels}\n` +
            `Loaded Commands: ${totalCommands}\n\n` +
            `**Cache Information**\n` +
            `Guilds Cache: ${message.client.guilds.cache.size}\n` +
            `Users Cache: ${message.client.users.cache.size}\n` +
            `Channels Cache: ${message.client.channels.cache.size}`;
        
        const embed = new EmbedBuilder()
            .setTitle('Bot Statistics')
            .setDescription(description)
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setColor(0x5865F2)
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    }
};
