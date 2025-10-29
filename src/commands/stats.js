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
        
        // Clean text-based stats display
        const stats = [
            '```',
            'BOT STATISTICS',
            '═══════════════════════════════════════════════',
            '',
            'Performance Metrics',
            '─────────────────────────────',
            `Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`,
            `WebSocket Ping: ${ping}ms`,
            `Memory Usage: ${usedMemMB}MB / ${totalMemMB}MB (${memPercent}%)`,
            `Total Memory (RSS): ${rssMB}MB`,
            `Node Version: ${process.version}`,
            `Platform: ${process.platform} ${process.arch}`,
            '',
            'Bot Statistics',
            '─────────────────────────────',
            `Total Servers: ${totalGuilds}`,
            `Total Users: ${totalUsers}`,
            `Total Channels: ${totalChannels}`,
            `Loaded Commands: ${totalCommands}`,
            '',
            'Cache Information',
            '─────────────────────────────',
            `Guilds Cache: ${message.client.guilds.cache.size}`,
            `Users Cache: ${message.client.users.cache.size}`,
            `Channels Cache: ${message.client.channels.cache.size}`,
            '',
            '═══════════════════════════════════════════════',
            '```'
        ].join('\n');
        
        await message.reply(stats);
    }
};
