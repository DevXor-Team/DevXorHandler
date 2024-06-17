const baseClient = require('@root/src/base/baseClient')


/**
 * @typedef {Object} ComponentData
 * @property {string} name
 * @property {boolean} enabled 
 * @property {function(baseClient,import('discord.js').ChatInputCommandInteraction, string[])} action - The callback to be executed when the interaction is invoked
 * 
 */


/**
 * @type {ComponentData}
 */
module.exports = {
  name: "",
  enabled: true,
  async action(client, interaction, parts) { }
}