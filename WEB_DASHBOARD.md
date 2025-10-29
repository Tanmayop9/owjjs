# Web Dashboard Setup Guide

This guide explains how to set up and run the web dashboard for the Discord bot.

## Overview

The web dashboard displays:
- Bot name
- All commands organized by categories
- Command descriptions
- Total command count

The dashboard is inspired by modern Discord bot websites like atommusic.tech.

## Installation

1. Install dependencies:
```bash
npm install
```

This will install:
- `discord.js` - For the Discord bot
- `express` - For the web server
- `concurrently` - To run both bot and web server simultaneously

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and configure:
```env
DISCORD_TOKEN=your_discord_bot_token_here
BOT_NAME=owjjs
WEB_PORT=3000
```

## Running the Services

### Option 1: Run Bot and Web Server Together (Recommended)
```bash
npm run start:all
```

This starts both the Discord bot and web dashboard simultaneously.

### Option 2: Run Separately

**Run only the Discord bot:**
```bash
npm start
```

**Run only the web dashboard:**
```bash
npm run web
```

## Accessing the Dashboard

Once the web server is running, open your browser and navigate to:
```
http://localhost:3000
```

Or if you deployed it:
```
http://your-domain.com:3000
```

## Features

### Home Page
- Displays bot name from environment variable
- Shows total command count
- Shows number of categories
- Beautiful gradient design with glass-morphism effects

### Command Display
Commands are automatically organized into categories:
- **General**: Basic commands like ping, help
- **Information**: Commands like info, serverinfo, userinfo, stats
- **Moderation**: Commands like clear (admin only)
- **Utility**: Commands like invite

### Auto-refresh
The dashboard automatically refreshes command data every 30 seconds.

## API Endpoints

### GET /api/bot-info
Returns JSON with bot information and all commands:

```json
{
  "botName": "owjjs",
  "categories": {
    "General": [
      {
        "name": "ping",
        "description": "Check the bot latency and response time",
        "file": "ping.js"
      }
    ],
    "Information": [...]
  },
  "totalCommands": 8
}
```

## Adding New Commands

When you add a new command to `./src/commands/`, it will automatically appear on the dashboard. The categorization is automatic based on command names:

- `ping`, `help` → General
- `info`, `serverinfo`, `userinfo`, `stats` → Information
- `clear` → Moderation
- `invite` → Utility

To change categorization, edit the `loadCommands()` function in `web.js`.

## Customization

### Changing Colors
Edit the CSS in `public/index.html`:
- Background gradient: `.body` background property
- Card colors: `.category`, `.command` background properties
- Text colors: Various color properties

### Changing Port
Set the `WEB_PORT` environment variable in your `.env` file.

### Changing Bot Name Display
Set the `BOT_NAME` environment variable in your `.env` file.

## Deployment

For production deployment:

1. Set environment variables on your hosting platform
2. Ensure port 3000 (or your custom port) is accessible
3. Use a process manager like PM2:
```bash
pm2 start npm --name "discord-bot" -- start
pm2 start npm --name "web-dashboard" -- run web
```

Or use the combined command:
```bash
pm2 start npm --name "bot-services" -- run start:all
```

## Troubleshooting

### Port Already in Use
Change the `WEB_PORT` in your `.env` file to a different port.

### Commands Not Showing
Ensure your command files in `./src/commands/` have the correct structure with `data.name` and `data.description` properties.

### Cannot Find Module 'express'
Run `npm install` to install all dependencies.

## File Structure

```
owjjs/
├── web.js              # Express web server
├── public/
│   └── index.html      # Dashboard frontend
├── src/
│   └── commands/       # Bot commands (auto-loaded)
├── .env                # Configuration (create from .env.example)
└── package.json        # Dependencies and scripts
```

## Credits

Inspired by modern Discord bot dashboards like atommusic.tech.
