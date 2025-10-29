# owjjs - Discord Bot

A Discord bot with improved command UI featuring clean, text-based responses without emojis or embed fields.

## Features

- Clean, text-based command responses using code blocks
- No emojis or embed fields for better readability
- Easy-to-use command structure
- Modular command system

## Commands

All commands use the `!` prefix.

### General Commands

- `!ping` - Check bot latency and response time
- `!help` - Display all available commands and their descriptions
- `!info` - Display bot information and statistics
- `!serverinfo` - Display information about the current server
- `!userinfo [@user]` - Display information about a user (mention a user or leave empty for yourself)

### Moderation Commands

- `!clear <amount>` - Clear a specified number of messages (requires Manage Messages permission)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Tanmayop9/owjjs.git
cd owjjs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Discord bot token:
```
DISCORD_TOKEN=your_discord_bot_token_here
```

4. Start the bot:
```bash
npm start
```

## Project Structure

```
owjjs/
├── src/
│   └── commands/        # Command files
│       ├── ping.js
│       ├── help.js
│       ├── info.js
│       ├── serverinfo.js
│       ├── userinfo.js
│       └── clear.js
├── index.js             # Main bot file
├── package.json
└── README.md
```

## Adding New Commands

To add a new command, create a new file in `src/commands/` with the following structure:

```javascript
module.exports = {
    data: {
        name: 'commandname',
        description: 'Command description'
    },
    async execute(message, args) {
        // Command logic here
        // Use clean text-based responses with code blocks
        const response = [
            '```',
            'TITLE',
            '─────────────────────────────',
            'Your content here',
            '```'
        ].join('\n');
        
        await message.reply(response);
    }
};
```

## UI Design Philosophy

This bot uses a clean, text-based UI approach:

- **No emojis**: Keeps the interface professional and consistent
- **No embed fields**: Uses code blocks for structured information
- **ASCII separators**: Creates visual hierarchy without graphics
- **Consistent formatting**: All commands follow the same style guide

## License

ISC