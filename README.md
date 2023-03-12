# Shopify Shopping

Use the commands below to filter through items. A fresh slate of keywords is used every time the !add command is ran. Post to display the items.
```
!add *keyword*  
post
```

## To-do List

- Add multilple keyword recognition
- Add proxy integration to prevent rate limits
- Run more test-cases for error handling
- Rework the text file to include links to items
- If items list is less than a certain amount, send via discord embed
## Deployment

To deploy this project, install the required modules

```bash
  npm i discord.js
  npm i node-fetch
  npm i dotenv
```
Create a .env file and replace with your bot token

```env
TOKEN = your_bot_token
```

![App Screenshot](https://cdn.discordapp.com/attachments/907509097488863293/1084529854663381085/Screenshot_2023-03-12_at_1.33.57_PM.png)