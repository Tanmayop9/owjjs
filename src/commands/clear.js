module.exports = {
    data: {
        name: 'clear',
        description: 'Clear a specified number of messages (admin only)'
    },
    async execute(message, args) {
        // Check if user has permission
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('You do not have permission to use this command. Required: Manage Messages');
        }
        
        // Check if bot has permission
        if (!message.guild.members.me.permissions.has('ManageMessages')) {
            return message.reply('I do not have permission to delete messages.');
        }
        
        const amount = parseInt(args[0]);
        
        if (!amount || amount < 1 || amount > 100) {
            return message.reply('Please provide a number between 1 and 100.');
        }
        
        try {
            const deleted = await message.channel.bulkDelete(amount + 1, true);
            
            const response = [
                '```',
                'MESSAGES CLEARED',
                '─────────────────────────────',
                `Successfully deleted ${deleted.size - 1} messages`,
                '```'
            ].join('\n');
            
            const confirmMessage = await message.channel.send(response);
            
            // Delete confirmation message after 3 seconds
            setTimeout(() => confirmMessage.delete().catch(() => {}), 3000);
        } catch (error) {
            console.error(error);
            message.reply('Failed to delete messages. They might be too old (older than 14 days).');
        }
    }
};
