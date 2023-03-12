const { Client, IntentsBitField, messageLink, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch')
const fs = require('fs');
require('dotenv').config();

var sitelist = fs.readFileSync('/Users/brendan/Desktop/shopify-shopping/sites.json');
const data = JSON.parse(sitelist);

var user_keywords = ['jacques', 'CHUCK','cement'];
var foundItems = [];
const filtered_keywords = user_keywords.map(keyword => keyword.toLowerCase());

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

for(let i = 0; i < data.websites.length; i++)
{
    const perWeb = data.websites[i].website

    let settings = { method: "Get" };
    let url = `${perWeb}/products.json`

    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        for(let k = 0; k < json.products.length; k++)
        {
            for(let j = 0; j < user_keywords.length; j++)
            {
                if((json.products[k].title).toLowerCase().includes(filtered_keywords[j]))
                {
                    //foundItems.push("[" + (json.products[k].title) + "](" + (`${perWeb}/products/`) + (json.products[k].handle) + ")"); embed form
                    if (foundItems.includes(json.products[k].title)) { return; }
                    else { foundItems.push((json.products[k].title)); }
                }
            }
        }
    })
    .catch(() => console.log(`error parsing ` + perWeb));
};
// console.log(user_keywords);
// console.log(foundItems);

client.on('messageCreate', (message) => {
    if (message.author.bot)
    {
        return;
    }        
    if (message.content == "ok")
    {
        message.reply(foundItems.join("\n"));
    }
});

client.login(process.env.TOKEN);