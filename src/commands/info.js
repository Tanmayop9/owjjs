const { EmbedBuilder } = require('discord.js');

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
        
        const description = 
            `**System Status**\n` +
            `Uptime: ${hours}h ${minutes}m ${seconds}s\n` +
            `Memory Usage: ${usedMemory}MB / ${totalMemory}MB\n` +
            `Node Version: ${process.version}\n\n` +
            `**Bot Details**\n` +
            `Bot Name: ${message.client.user.username}\n` +
            `Bot ID: ${message.client.user.id}\n` +
            `Server Count: ${message.client.guilds.cache.size}\n` +
            `Total Users: ${message.client.users.cache.size}`;
        
        const embed = new EmbedBuilder()
            .setTitle('Bot Information')
            .setDescription(description)
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setColor(0x5865F2)
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    }
};
