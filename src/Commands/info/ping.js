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
