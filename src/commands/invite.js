module.exports = {
    data: {
        name: 'invite',
        description: 'Get the bot invite link and support server information'
    },
    async execute(message, args) {
        const clientId = message.client.user.id;
        const permissions = '8'; // Administrator permission
        const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot`;
        
        // Clean text-based invite info
        const inviteInfo = [
            '```',
            'BOT INVITE INFORMATION',
            '═══════════════════════════════════════════════',
            '',
            'Invite Link',
            '─────────────────────────────',
            `Bot ID: ${clientId}`,
            `Click the link below to add this bot to your server`,
            '',
            '═══════════════════════════════════════════════',
            '```',
            `\n**Add Bot to Server:**\n${inviteLink}`
        ].join('\n');
        
        await message.reply(inviteInfo);
    }
};
