// Import necessary classes from discord.js
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  // Command configuration
  name: "avatar",
  description: "show avatar user",
  category: "PUBLIC",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: { enabled: true, minArgsCount: 1 },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "user",
        type: ApplicationCommandOptionType.User,
        description: "The user to view the avatar for",
        required: false,
      }
    ]
  },

  // Message command execution
  async msgExecute(client, message, args) {
    try {
      // Get mentioned user or default to message author
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if (!user) user = message.author;

      // Create and send embed
      const embed = new EmbedBuilder()
        .setTitle(`Avatar Link`)
        .setURL(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor("Random")
        .setTimestamp()
        .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL()}` })
        .setFooter({ text: `Requested By: ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
      message.reply({ embeds: [embed] }).catch(console.log);

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
        .setTitle(`${user.username}'s Avatar`)
        .setURL(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor("Random")
        .setTimestamp()
        .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL()}` })
        .setFooter({ text: `Requested By: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.log(err);
    }
  },
};
