const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  name: "get",
  description: "show data ",
  category: "PUBLIC",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: {
    enabled: false,
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "num_count",
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
        description: "get any num_count test command data get ",
      }
    ]
  },
  // },

  async msgExecute(client, message, args) {
    try {
      let user = message.author

    } catch (err) {
      console.log(err)
    }

  },

  async interactionExecute(client, interaction) {
    try {
      const user = interaction.user;

      let count = interaction.options.getString('num_count');
      let dataGet = await client.db.find("num", (val) => val == count)
      if (!dataGet) return interaction.reply({ content: "no data found", ephemeral: true })

      const embed = new EmbedBuilder()
        .setTitle(`done get count data **${dataGet}**`)
        .setColor("Random")
        .setTimestamp()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setFooter({
          text: `Requested By: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({
        embeds: [embed],
      });

    } catch (err) {
      console.log(err);
    }

  },
  async autocompleteExecute(client, interaction) {

    const focusedValue = interaction.options.getFocused()

    let data = await client.db.get("num") || []

    let ne_access = data.map(item => ({ name: `${item}`, value: `${item}` })).filter(item => item.name.toLowerCase().includes(focusedValue.toLowerCase())) || []
    if (ne_access.length == 0) ne_access = [{ name: "This Count not available", value: "0" }]

    await interaction?.respond(ne_access.slice(0, 25)).catch();

  }
};
