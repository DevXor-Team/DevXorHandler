// Import necessary classes from discord.js
const { EmbedBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  // Command configuration
  name: "buttons",
  description: "show buttons",
  category: "PUBLIC",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: { enabled: true, minArgsCount: 1 },
  slashCommand: {
    enabled: true,
  },

  // Message command execution
  async msgExecute(client, message, args) {
    try {
      // Create and send embed
      const embed = new EmbedBuilder()
        .setTitle(`Test buttons show `)
        .setColor("Random")
        .setTimestamp()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setFooter({ text: `Requested By: ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
      let btn = new ButtonBuilder()
        .setCustomId("btn_info")
        .setLabel("Show Information")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🧇")
      let row = new ActionRowBuilder()
        .addComponents(btn)
      message.reply({ embeds: [embed], components: [row] }).catch(console.log);

    } catch (err) {
      console.log(err);
    }
  },

  // Slash command execution
  async interactionExecute(client, interaction) {
    try {
      // Get specified user or default to interaction user
      const user = interaction.options.getUser("user") || interaction.user;

      // Create and send embed
      const embed = new EmbedBuilder()
        .setTitle(`Test buttons show `)
        .setColor("Random")
        .setTimestamp()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setFooter({ text: `Requested By: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
      let btn = new ButtonBuilder()
        .setCustomId("btn_info")
        .setLabel("Show Information")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🧇")
      let row = new ActionRowBuilder()
        .addComponents(btn)

      await interaction.reply({ embeds: [embed], components: [row] });

    } catch (err) {
      console.log(err);
    }
  },
};