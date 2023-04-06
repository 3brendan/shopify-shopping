const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
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

client.on('ready', () => {
    console.log(`${client.user.username} is now ready.`);
});
  

client.on('interactionCreate', async (interaction) => {

    var items = [];
    var itemsEmbed = [];
    var itemSingleImage = [];
    var itemFHVar = [];
    var itemSHVar = [];

    if (!interaction.isCommand() || interaction.commandName !== 'search') {
        return;
    }

    await interaction.deferReply();

    const keywords = [
        interaction.options.getString('keyword1').toLowerCase(),
        interaction.options.getString('keyword2')?.toLowerCase(),
        interaction.options.getString('keyword3')?.toLowerCase(),
    ].filter(Boolean);
    
    for (let i = 0; i < data.websites.length; i++) {

        const perWeb = data.websites[i].website;
    
        let settings = { method: "Get" };
        let url = `${perWeb}/products.json`;
    
        try {

            const res = await fetch(url, settings);
            const json = await res.json();
    
            for (let k = 0; k < json.products.length; k++) {

                const title = json.products[k].title.toLowerCase();

                if (keywords.some(keyword => keyword === '' || title.includes(keyword))) {

                    items.push(json.products[k].title);
                    itemsEmbed.push("[" + json.products[k].title + "](" + perWeb + "/products/" + json.products[k].handle + ")");
                                        
                    if (json.products[k].images.length > 0 && json.products[k].images[0].src) {
                        itemSingleImage.push(json.products[k].images[0].src);
                    } else {
                        itemSingleImage.push(null);
                        console.log('no image to push');
                    }

                    for (let i = 0; i < json.products[k].variants.length; i++) {

                        const variant = json.products[k].variants[i];
                        const formattedVariant = `[Size ${variant.title}](${perWeb}/cart/${variant.id}:1)`;
            
                        if (i < Math.ceil(json.products[k].variants.length / 2)) {
                            itemFHVar.push(formattedVariant);
                        } else {
                            itemSHVar.push(formattedVariant);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(`error parsing ` + perWeb);
        }
    }
    if (items.length === 0) {
        interaction.editReply("No items were found. \uD83D\uDE22");
    } 
    else if (items.length === 1)
    {
        const embed = new EmbedBuilder()
        .setTitle('Here is your item!')
        .setDescription(itemsEmbed.join('\n'))
        .addFields(
            { name: "Add to Cart (Permalink)", value: itemFHVar.join("\n") || "No sizes available", inline: true },
            { name: '\u200B', value: itemSHVar.join("\n") || "No sizes available", inline: true }
        )
        .setColor('#313338');
        if (itemSingleImage[0] !== null) {
            embed.setThumbnail(itemSingleImage[0]);
        }
        interaction.editReply({ embeds: [embed] });
    }
    else if (items.length < 16)
    {
        const embed = new EmbedBuilder()
        .setTitle('Here are your items!')
        .setDescription(itemsEmbed.join('\n'))
        .setColor('#313338')
        interaction.editReply({ embeds: [embed] });
    } 
    else {
        fs.writeFileSync("data.txt", items.join("\n"));
        interaction.editReply({ 
            files: ['./data.txt']
        });
    }
});

client.login(process.env.TOKEN);