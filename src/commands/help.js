const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: 'help',
        description: 'Display all available commands and their descriptions'
    },
    async execute(message, args) {
        const commands = message.client.commands;
        
        let description = '';
        commands.forEach((command) => {
            const name = command.data.name;
            const desc = command.data.description || 'No description available';
            description += `**!${name}**\n${desc}\n\n`;
        });
        
        const embed = new EmbedBuilder()
            .setTitle('Available Commands')
            .setDescription(description)
            .setFooter({ text: `Total Commands: ${commands.size} | Use !<command> to execute` })
            .setColor(0x5865F2)
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    }
};
