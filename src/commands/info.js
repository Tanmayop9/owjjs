module.exports = {
    data: {
        name: 'info',
        description: 'Display bot information and statistics'
    },
    async execute(message, args) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const totalMemory = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        
        // Clean text-based info display
        const info = [
            '```',
            'BOT INFORMATION',
            '═══════════════════════════════════════════════',
            '',
            'System Status',
            '─────────────────────────────',
            `Uptime: ${hours}h ${minutes}m ${seconds}s`,
            `Memory Usage: ${usedMemory}MB / ${totalMemory}MB`,
            `Node Version: ${process.version}`,
            '',
            'Bot Details',
            '─────────────────────────────',
            `Bot Name: ${message.client.user.username}`,
            `Bot ID: ${message.client.user.id}`,
            `Server Count: ${message.client.guilds.cache.size}`,
            `Total Users: ${message.client.users.cache.size}`,
            '',
            '═══════════════════════════════════════════════',
            '```'
        ].join('\n');
        
        await message.reply(info);
    }
};
