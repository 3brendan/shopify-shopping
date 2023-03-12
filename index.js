const { Client, IntentsBitField, messageLink, EmbedBuilder, Attachment } = require('discord.js');
const fetch = require('node-fetch')
const fs = require('fs');
const { channel } = require('diagnostics_channel');
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

client.on('messageCreate', (message) => {

    var items = [];

    if (message.author.bot)
    {
        return;
    }

    const prefix = "!add ";
    const args = message.content.slice(prefix.length).trim().split(/ + /g);
    const command = args.shift().toLowerCase();
    let findThis = command;
    if (message.content.startsWith(prefix + `${findThis}`)) {

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
                    if((json.products[k].title).toLowerCase().includes(findThis))
                    {
                        //foundItems.push("[" + (json.products[k].title) + "](" + (`${perWeb}/products/`) + (json.products[k].handle) + ")"); embed form
                        items.push(json.products[k].title)
                    }
                }
                fs.writeFile('data.txt', '', function(){console.log('done')})
                fs.writeFileSync("data.txt", items.join("\n"));
            }).catch(() => console.log(`error parsing ` + perWeb));
            
        };
    }
    if (message.content == "post")
    {        
        message.channel.send({ 
            files: ['./data.txt']
        });
    }
});

client.login(process.env.TOKEN);