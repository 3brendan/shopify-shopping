const { Client, IntentsBitField, messageLink, EmbedBuilder, Attachment } = require('discord.js');
const fetch = require('node-fetch')
const fs = require('fs');
require('dotenv').config();

var sitelist = fs.readFileSync('/Users/brendan/Desktop/shopify-shopping/sites.json');
const data = JSON.parse(sitelist);

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready' , () =>{
    console.log('online');   
});

client.on('interactionCreate', async (interaction) => {
    var items = [];

    if (!interaction.isCommand() || interaction.commandName !== 'search') {
        return;
    }

    await interaction.deferReply();

    const findThis = interaction.options.getString('keyword').toLowerCase();

    for (let i = 0; i < data.websites.length; i++) {
        const perWeb = data.websites[i].website;

        let settings = { method: "Get" };
        let url = `${perWeb}/products.json`;

        try {
            const res = await fetch(url, settings);
            const json = await res.json();

            for (let k = 0; k < json.products.length; k++) {
                if ((json.products[k].title).toLowerCase().includes(findThis)) {
                    items.push(json.products[k].title);
                }
            }
        } catch (error) {
            console.log(`error parsing ` + perWeb);
        }
    }

    if (items.length === 0) {
        interaction.editReply("No items were found.");
    } else {
        fs.writeFileSync("data.txt", items.join("\n"));
        interaction.editReply({ 
            files: ['./data.txt']
        });
    }
});

client.login(process.env.TOKEN);