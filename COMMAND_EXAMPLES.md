# Command UI Examples

This document shows examples of the improved command UI without emojis and embed fields.

## Ping Command Output
```
PING STATUS
─────────────────────────────
Bot Latency: 45ms
API Latency: 85ms
Status: Excellent
```

## Help Command Output
```
AVAILABLE COMMANDS
═══════════════════════════════════════════════

!ping
  Check the bot latency and response time

!help
  Display all available commands and their descriptions

!info
  Display bot information and statistics

!serverinfo
  Display information about the current server

!userinfo
  Display information about a user (mention a user or leave empty for yourself)

!clear
  Clear a specified number of messages (admin only)

═══════════════════════════════════════════════
Use !<command> to execute a command
```

## Info Command Output
```
BOT INFORMATION
═══════════════════════════════════════════════

System Status
─────────────────────────────
Uptime: 2h 15m 30s
Memory Usage: 45.67MB / 128.00MB
Node Version: v18.16.0

Bot Details
─────────────────────────────
Bot Name: owjjs
Bot ID: 123456789012345678
Server Count: 5
Total Users: 1234

═══════════════════════════════════════════════
```

## ServerInfo Command Output
```
SERVER INFORMATION
═══════════════════════════════════════════════

General
─────────────────────────────
Name: My Discord Server
ID: 987654321098765432
Owner: Username#1234
Created: January 15, 2023

Statistics
─────────────────────────────
Members: 256
Channels: 42
Roles: 18
Boost Level: 2
Boosts: 7

═══════════════════════════════════════════════
```

## UserInfo Command Output
```
USER INFORMATION
═══════════════════════════════════════════════

Account Details
─────────────────────────────
Username: Username#1234
ID: 123456789012345678
Account Created: March 10, 2020
Bot Account: No

Server Member Details
─────────────────────────────
Joined Server: June 5, 2023
Nickname: None
Roles: Member, Moderator, VIP

═══════════════════════════════════════════════
```

## Clear Command Output
```
MESSAGES CLEARED
─────────────────────────────
Successfully deleted 10 messages
```

## Design Features

- **Clean Text Format**: All responses use code blocks for consistent, readable formatting
- **No Emojis**: Professional appearance without decorative icons
- **No Embed Fields**: Simple text structure instead of complex embeds
- **ASCII Art Separators**: Visual hierarchy using lines and equals signs
- **Structured Sections**: Clear sections with headers and separators
- **Consistent Style**: All commands follow the same design pattern
