const { EmbedBuilder } = require('discord.js');

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
        
        const description = 
            `**General**\n` +
            `Name: ${guild.name}\n` +
            `ID: ${guild.id}\n` +
            `Owner: ${owner.user.tag}\n` +
            `Created: ${createdDate}\n\n` +
            `**Statistics**\n` +
            `Members: ${guild.memberCount}\n` +
            `Channels: ${guild.channels.cache.size}\n` +
            `Roles: ${guild.roles.cache.size}\n` +
            `Boost Level: ${guild.premiumTier}\n` +
            `Boosts: ${guild.premiumSubscriptionCount || 0}`;
        
        const embed = new EmbedBuilder()
            .setTitle('Server Information')
            .setDescription(description)
            .setThumbnail(guild.iconURL())
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setColor(0x5865F2)
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    }
};
