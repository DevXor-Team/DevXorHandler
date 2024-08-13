require("dotenv").config();
require("module-alias/register");
require("events").EventEmitter.setMaxListeners(999999999);
require("colors");

const DevXor = require("@DevXor/DevXor");

let client = new DevXor({
	token: process.env.token, // token from your bot

	// ! if you want to use custom Client Options <Discord.js>ClientOptions
	// CustomClientOptions:{
	//   intents: [
	//     GatewayIntentBits.Guilds,
	//     GatewayIntentBits.GuildMembers,
	//     ...GatewayIntentBits,
	//   ]
	// }
	// ! if you want to use database <DevXor-Team>
	database: {
		// ! if use database_type "JSON" Default path in @root/database/database.json
		// ! if use database_type "SQLite" Default path in @root/database/database.Sqlite
		database_type: "JSON", // "MONGODB"|"Sqlite"|"JSON"|"MySQL"
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
		},
	},
});

client.botlogin(process.env.token);

module.exports = client;

//nodejs-events
process.on("unhandledRejection", (e) => {
	if (!e) retrun;
	console.log(e);
});

process.on("uncaughtException", (e) => {
	if (!e) return;
	console.log(e);
});

process.on("uncaughtExceptionMonitor", (e) => {
	if (!e) return;
	console.log(e);
});
