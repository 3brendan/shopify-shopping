const fetch = require('node-fetch')
const fs = require('fs');

var sitelist = fs.readFileSync('/Users/brendan/Desktop/shopify-shopping/sites.json');
const data = JSON.parse(sitelist);

var user_keywords = [''];
const filtered_keywords = user_keywords.map(keyword => keyword.toLowerCase());

for(let i = 0; i < data.websites.length; i++)
{
    //console.log(data.websites[i].website)
    //     let url = `${perWeb}/products.json`

    const perWeb = data.websites[i].website

    let settings = { method: "Get" };
    let url = `${perWeb}/products.json`

    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {

        for(let j = 0; j < filtered_keywords.length; j++)
        {
            if((json.products[i].title).toLowerCase().includes(filtered_keywords))
            {
                console.log(json.products[i].title);
            }
        }
    })
    .catch(() => console.log(`error parsing ` + perWeb));
};