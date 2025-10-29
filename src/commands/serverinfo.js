module.exports = {
    data: {
        name: 'serverinfo',
        description: 'Display information about the current server'
    },
    async execute(message, args) {
        if (!message.guild) {
            return message.reply('This command can only be used in a server.');
        }
        
        const guild = message.guild;
        const owner = await guild.fetchOwner();
        
        const createdDate = guild.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Clean text-based server info
        const serverInfo = [
            '```',
            'SERVER INFORMATION',
            '═══════════════════════════════════════════════',
            '',
            'General',
            '─────────────────────────────',
            `Name: ${guild.name}`,
            `ID: ${guild.id}`,
            `Owner: ${owner.user.tag}`,
            `Created: ${createdDate}`,
            '',
            'Statistics',
            '─────────────────────────────',
            `Members: ${guild.memberCount}`,
            `Channels: ${guild.channels.cache.size}`,
            `Roles: ${guild.roles.cache.size}`,
            `Boost Level: ${guild.premiumTier}`,
            `Boosts: ${guild.premiumSubscriptionCount || 0}`,
            '',
            '═══════════════════════════════════════════════',
            '```'
        ].join('\n');
        
        await message.reply(serverInfo);
    }
};
