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
        
        let userInfo = [
            '```',
            'USER INFORMATION',
            '═══════════════════════════════════════════════',
            '',
            'Account Details',
            '─────────────────────────────',
            `Username: ${user.tag}`,
            `ID: ${user.id}`,
            `Account Created: ${accountCreated}`,
            `Bot Account: ${user.bot ? 'Yes' : 'No'}`,
        ];
        
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
            
            userInfo.push('');
            userInfo.push('Server Member Details');
            userInfo.push('─────────────────────────────');
            userInfo.push(`Joined Server: ${joinedDate}`);
            userInfo.push(`Nickname: ${member.nickname || 'None'}`);
            userInfo.push(`Roles: ${roles}`);
        }
        
        userInfo.push('');
        userInfo.push('═══════════════════════════════════════════════');
        userInfo.push('```');
        
        await message.reply(userInfo.join('\n'));
    }
};
