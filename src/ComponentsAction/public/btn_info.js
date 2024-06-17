// Import necessary classes from discord.js
const { ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")

/**
 * @type {import("@utils/types/baseComponent")}
 */
module.exports = {
  // Component configuration
  name: "btn_info",
  enabled: true,

  // Action to perform when the button is clicked
  async action(client, interaction, parts) {
    // Create an embed message
    const embed = new EmbedBuilder()
      .setTitle(`Test buttons show`)
      .setDescription("DevXor Team is a best team development projects")
      .setColor("Random")
      .setTimestamp()
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
      .setFooter({
        text: `Requested By: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    // Reply to the interaction with the embed message
    interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  },
};
