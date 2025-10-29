const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.WEB_PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Function to get bot name from environment or default
function getBotName() {
    return process.env.BOT_NAME || 'owjjs';
}

// Function to load and categorize commands
function loadCommands() {
    const commandsPath = path.join(__dirname, 'src', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    const categories = {
        'General': [],
        'Information': [],
        'Moderation': [],
        'Utility': []
    };
    
    commandFiles.forEach(file => {
        const filePath = path.join(commandsPath, file);
        delete require.cache[require.resolve(filePath)]; // Clear cache
        const command = require(filePath);
        
        if ('data' in command) {
            const commandInfo = {
                name: command.data.name,
                description: command.data.description || 'No description available',
                file: file
            };
            
            // Categorize commands based on their name/description
            if (['ping', 'help'].includes(command.data.name)) {
                categories['General'].push(commandInfo);
            } else if (['info', 'serverinfo', 'userinfo', 'stats'].includes(command.data.name)) {
                categories['Information'].push(commandInfo);
            } else if (['clear'].includes(command.data.name)) {
                categories['Moderation'].push(commandInfo);
            } else if (['invite'].includes(command.data.name)) {
                categories['Utility'].push(commandInfo);
            } else {
                categories['General'].push(commandInfo);
            }
        }
    });
    
    // Remove empty categories
    Object.keys(categories).forEach(key => {
        if (categories[key].length === 0) {
            delete categories[key];
        }
    });
    
    return categories;
}

// API endpoint to get bot info and commands
app.get('/api/bot-info', (req, res) => {
    const botName = getBotName();
    const commands = loadCommands();
    
    res.json({
        botName: botName,
        categories: commands,
        totalCommands: Object.values(commands).reduce((sum, cat) => sum + cat.length, 0)
    });
});

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Web dashboard running at http://localhost:${PORT}`);
    console.log(`Bot: ${getBotName()}`);
});
