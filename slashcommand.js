const fetch = require('node-fetch');

const bot_token = "";
const bot_client_id = "";
const guild_id = "";

const createSlashCommand = async () => {
    const commandData = {
        name: "search",
        description: "Search for items",
        options: [
            {
                name: "keyword1",
                description: "First Keyword (required)",
                type: 3, 
                required: true,
            },
            {
                name: "keyword2",
                description: "Second Keyword (optional)",
                type: 3,
                required: false,
            },
            {
                name: "keyword3",
                description: "Third Keyword (optional)",
                type: 3, 
                required: false,
            },
        ],
    };
    
    const response = await fetch(
        `https://discord.com/api/v8/applications/${bot_client_id}/guilds/${guild_id}/commands`,
        {
            method: "POST",
            headers: {
                Authorization: `Bot ${bot_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commandData),
        }
    );

    if (!response.ok) {
        console.error("failed:", await response.text());
    } else {
        console.log("created:", await response.json());
    }
};

createSlashCommand();