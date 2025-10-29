const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: 'invite',
        description: 'Get the bot invite link and support server information'
    },
    async execute(message, args) {
        const clientId = message.client.user.id;
        const permissions = '8'; // Administrator permission
        const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot`;
        
        const description = 
            `**Bot ID:** ${clientId}\n\n` +
            `Click the button below to add this bot to your server with administrator permissions.`;
        
        const embed = new EmbedBuilder()
            .setTitle('Bot Invite Information')
            .setDescription(description)
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setColor(0x5865F2)
            .setTimestamp();
        
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Add Bot to Server')
                    .setURL(inviteLink)
                    .setStyle(ButtonStyle.Link)
            );
        
        await message.reply({ embeds: [embed], components: [row] });
    }
};
