const { prefix, owners } = require('@root/config.json');
const { Collection, PermissionsBitField } = require("discord.js");
const delay = new Collection();
const fs = require("fs");
const ms = require("ms");
const { CommandHandler } = require('@src/handlers');

const BEV = require("@utils/types/baseEvents");

/** @type {BEV.BaseEvent<"messageCreate">} */
module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    try {

      if (message.author.bot || !message.guild) return;
      CommandHandler.handlePrefixCommand(client, message);

    } catch (error) {

      console.error(error);
      message.reply({ content: 'there was an error trying to execute that command!' });
    }
  }
}

