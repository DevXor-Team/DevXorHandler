// Import necessary classes from discord.js
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  // Command configuration
  name: "add",
  description: "set data",
  category: "PUBLIC",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: { enabled: true, minArgsCount: 1 },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "num_count",
        type: ApplicationCommandOptionType.Integer,
        description: "add any num_count test command data set",
        required: true,
      }
    ]
  },

  // Message command execution
  async msgExecute(client, message, args) {
    try {
      // Get the user and count from the message
      let user = message.author;
      let count = args[0];
      if (!count) message.reply({ content: "Please add number" });

      // Add count to the database
      await client.db.push("num", Number(count));

      // Create and send embed
      const embed = new EmbedBuilder()
        .setTitle(`new data added`)
        .setColor("Random")
        .setDescription(`Done added number **${count}**`)
        .setTimestamp()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setFooter({ text: `Requested By: ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
      message.reply({ embeds: [embed] });

    } catch (err) {
      console.log(err);
    }
  },

  // Slash command execution
  async interactionExecute(client, interaction) {
    try {
      // Get the user and count from the interaction
      const user = interaction.user;
      let count = interaction.options.getInteger('num_count');

      // Add count to the database
      await client.db.push("num", count);

      // Create and send embed
      const embed = new EmbedBuilder()
        .setTitle(`new data added`)
        .setColor("Random")
        .setDescription(`Done added number **${count}**`)
        .setTimestamp()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setFooter({ text: `Requested By: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.log(err);
    }
  },
};
