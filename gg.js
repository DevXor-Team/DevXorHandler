const { GoodDB } = require("good.db");
const { JSONDriver } = require("good.db/dist/Drivers/JSON");


let db = new GoodDB(new JSONDriver({
  path: "./gg.json",
  format: true
}))


/**
 * @type {{} & {username:string ,password:string,tokens?:Array}}
 */
let data = db.get("user_1")
/**
 * 
 * @param {import("discord.js").Message} msg 
 * @param {"omar"|"trubo"|"farghaly"|"joe"} isTest 
 */
function test(msg, isTest = false) {

  msg
}




let arr = ["trubo", "farghaly", "joe"]


test(arr,1)