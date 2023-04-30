# Shopify Shopping

The Discord Shopping bot is a chatbot designed to help users shop online by automatically fetching items that match their search keywords from different e-commerce websites that are built on Shopify. The bot is integrated within a Discord server and used in a group setting, where users can search for items and share their findings with friends in real-time.

## Deployment

To deploy this project, install the required modules

```
npm i discord.js
npm i node-fetch@2
npm i fs
npm i dotenv
```

Create a **.env** file and replace with your bot token.
```
TOKEN = your_bot_token
```

Open the **slashcommand.js** file, and the fill in the required variables. You only need to run this program once.
```
node slashcommand.js
```

Open the **index.js** file, and edit the "sitelist" variable so it follows your personal directory properly.
Once edited, you may run using the command below.
```
var sitelist = fs.readFileSync('/Users/brendan/path_to_the_file/sites.json');
node index.js
```

The command to search for items is below. Only 1 keyword is required, others are optional.
```
/search keyword1 keyword2 keyword3
```

![App Screenshot](https://cdn.discordapp.com/attachments/1102372755187445860/1102372824326348840/shopping.png)
