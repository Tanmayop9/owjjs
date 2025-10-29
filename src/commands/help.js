module.exports = {
    data: {
        name: 'help',
        description: 'Display all available commands and their descriptions'
    },
    async execute(message, args) {
        const commands = message.client.commands;
        
        // Build clean text-based help message
        const commandList = [];
        commandList.push('```');
        commandList.push('AVAILABLE COMMANDS');
        commandList.push('═══════════════════════════════════════════════');
        commandList.push('');
        
        commands.forEach((command) => {
            const name = command.data.name;
            const description = command.data.description || 'No description available';
            commandList.push(`!${name}`);
            commandList.push(`  ${description}`);
            commandList.push('');
        });
        
        commandList.push('═══════════════════════════════════════════════');
        commandList.push('Use !<command> to execute a command');
        commandList.push('```');
        
        await message.reply(commandList.join('\n'));
    }
};
