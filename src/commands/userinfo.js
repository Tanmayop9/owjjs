const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'userinfo',
        description: 'Display information about a user (mention a user or leave empty for yourself)'
    },
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild ? await message.guild.members.fetch(user.id) : null;
        
        const accountCreated = user.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let description = 
            `**Account Details**\n` +
            `Username: ${user.tag}\n` +
            `ID: ${user.id}\n` +
            `Account Created: ${accountCreated}\n` +
            `Bot Account: ${user.bot ? 'Yes' : 'No'}`;
        
        if (member) {
            const joinedDate = member.joinedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const roles = member.roles.cache
                .filter(role => role.id !== message.guild.id)
                .map(role => role.name)
                .join(', ') || 'None';
            
            description += `\n\n**Server Member Details**\n` +
                `Joined Server: ${joinedDate}\n` +
                `Nickname: ${member.nickname || 'None'}\n` +
                `Roles: ${roles}`;
        }
        
        const embed = new EmbedBuilder()
            .setTitle('User Information')
            .setDescription(description)
            .setThumbnail(user.displayAvatarURL())
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setColor(0x5865F2)
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    }
};
