
# DevXorHandler

## Introduction

`DevXorHandler` is a handler designed for `discord.js` that simplifies the management of codes, inputs, outputs, buttons, and menus in Discord bots. Additionally, `DevXorHandler` supports database integration using the `good.db` library.

## Requirements

To install and use `DevXorHandler`, you need to install the following libraries:

- [discord.js](https://www.npmjs.com/package/discord.js) (version 14.15.3)
- [good.db](https://www.npmjs.com/package/good.db) (version 2.4.5)

You can install these libraries using npm:

```sh
npm install discord.js@14.15.3
npm install good.db@2.4.5
```

Then install the other required dependencies using `npm install` 

## Features

- **Code Management**: Easily manage and organize your bot's code.
- **Input and Output Handling**: Efficiently handle user inputs and bot outputs.
- **Buttons and Menus**: Create and manage interactive buttons and menus.
- **Database Support**: Integrate with `good.db` for database operations.

## Getting Started

### Setting Up

1. **Install Required Libraries**: Make sure you have installed `discord.js` and `good.db` as mentioned above.
2. **Create a New Project**:
 ```sh
mkdir my-discord-bot
cd my-discord-bot
npm init -y
git clone https://github.com/DevXor-Team/DevXorHandler.git
npm install 
```
  ### If git is avaliable
```sh
git clone https://github.com/DevXor-Team/DevXorHandler.git 
npm install 
```

### Example Usage

Here's a basic example of how to set up `DevXorHandler` in your project:

if you want to added custom client options discord.js 

go to `index.js`

```js
let client = new DevXor({
  token: process.env.token, // the token of your bot

  // ! if you want to use custom Client Options <Discord.js>ClientOptions
  CustomClientOptions:{
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      ...GatewayIntentBits,
    ]
  }
});

// if you put token in configuration  
// client.botlogin(token || process.env.token);
client.botlogin();

// or use
client.login(process.env.token)
```

if you want to change the default database configuration in your project use 
- [good.db](https://www.npmjs.com/package/good.db) (version 2.4.5)


```js
  database: {
    // ! if use database_type "JSON" Default path in @root/database/database.json
    // ! if use database_type "SQLite" Default path in @root/database/database.Sqlite
    database_type: "MONGODB", // "MONGODB"|"Sqlite"|"JSON"|"MySQL"
    MongoDB: {
      database: "DevXor",
      uri: "mongodb://0.0.0.0:27017",
    },
    // ! if use database_type "MySQL"
    // MySQL: {
    //   database: "DevXor", // you can change the database name 
    //   host: "localhost", // your host or ip 
    //   port: 3306, // your port default 3306
    //   user: "farghaly", // your username
    //   password: "123" // your password
    // },

    // ! if using cache system in works space and modified any data in database manually,
    // ! not edit in cache manager an not modified data show
    // ! في حالة استخدام نظام ذاكرة التخزين المؤقت في مساحة العمل وتعديل أي بيانات في قاعدة البيانات يدويًا،
    // ! لا يتم التعديل في مدير ذاكرة التخزين المؤقت، وتظهر بيانات غير معدلة
    options: {
      table: "DevXorDB",
      nested: "..", //default use it 
      nestedIsEnabled: true, //default use it 
      cache: {
        capacity: 1024, //default use it 
        isEnabled: true, //default use
      },
    }
  }
```
### if you want to create a new command ex.

go path - `src/commands/public`
creat file `ping`
```js
/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  // Command configuration
  name: "ping",
  description: "Test the bots response time",
  category: "UTILITY",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: { enabled: true, minArgsCount: 1 },
  slashCommand: { enabled: true },

  // Message command execution
  async msgExecute(client, message, args) {
    try {
      // Reply with bot's response time
      message.reply({ content: `:ping_pong: **Pong ${client.ws.ping} ms**` });
    } catch (err) {
      console.log(err);
    }
  },

  // Slash command execution
  async interactionExecute(client, interaction) {
    try {
      // Reply with bot's response time
      interaction.reply({ content: `:ping_pong: **Pong ${client.ws.ping} ms**`, ephemeral: true });
    } catch (err) {
      console.log(err);
    }
  },
};

```
### Put your secret variables in env file 
`token` , `WEBHOOK` and any variables you want to access in the environment 
## Contributing

If you would like to contribute to `DevXorHandler`, please fork the repository and submit a pull request. We welcome all contributions!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


## Support

For support and questions, please open an issue on the [DevXorHandler](https://github.com/DevXor-Team/DevXorHandler) or join discord server at [DevXor](https://discord.gg/devxor)

Happy coding!
