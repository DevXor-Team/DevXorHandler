const {
  Client,
  Partials,
  Collection,
  GatewayIntentBits,
  ApplicationCommandType
} = require("discord.js");
const Logger = require("@helpers/logger");
const config = require("@root/config.json");
const { recursiveReadDirSync } = require("@utils/class/utils");
const { EventsLoader, CommandsLoader, ComponentsLoader, CustomEvents } = require("@src/handlers");
const { db_default, db_mongo, db_mysql, db_sqlite } = require("@base/database");
const wait = require("node:timers/promises").setTimeout;


/**
 * @type  {import("discord.js/typings/index").ClientOptions} 
 */
let defaultDjsOption = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ],
  shards: "auto",
};

class baseClient extends Client {
  #db_option;
  /**
   *
   * @constructor
   * @param {import("@root/src/DevXor").DataBase} db_option
   * @param {import("discord.js").ClientOptions} DjsOption
   */
  constructor(DjsOption = defaultDjsOption, db_option) {

    super(DjsOption);

    this.#db_option = db_option;

    if (db_option?.database_type == "JSON") this.db = db_default(db_option)
    else if (db_option?.database_type == "MONGODB") this.db = db_mongo(db_option)
    else if (db_option?.database_type == "Sqlite") this.db = db_sqlite(db_option)
    else if (db_option?.database_type == "MySQL") this.db = db_mysql(db_option)
    else throw new TypeError("No database type specified Invalid type")


    /**
     * @type  {Collection<string, import("node-schedule").Job>} 
     */
    this.cache_job_time = new Collection();

    this.UserHold = new Collection();

    /**
     * @type  {Collection<string, import("@utils/types/baseCommand")>} 
     */
    this.commands = new Collection();

    /** 
     * @type  {Collection<string, import("@utils/types/baseCommand")>} 
     */
    this.slashCommands = new Collection();

    /**
     * @type  {Collection<string, import("@utils/types/baseComponent")>}
     */
    this.ComponentsAction = new Collection();

    this.contextMenus = new Collection();
    this.events = new Collection();
    this.logger = Logger;
    this.wait = wait;
    this.config = config;


  };


  async DBConnect() {
    const supportedDbTypes = ["MONGODB", "MySQL"];
    if (this.db && supportedDbTypes.includes(this.#db_option?.database_type)) {
      await this.db.connect().then(() => {
        this.logger.success(`DB Connected to ${this.#db_option?.database_type}`)
      });

    } else this.logger.log(`DB Type ${this.#db_option?.database_type}`)

  }
  table(name) {
    return this.db.table(name);
  };

  /**
   * Load all events from the specified directory 
   * @param {string} directory   directory containing the event files
   */
  loadEvents(directory) {
    EventsLoader(this, directory)
  };

  /**
   * Load all commands from the specified directory
   * @param {string} directory
   */
  loadCommands(directory) {
    CommandsLoader(this, directory)
  };

  /**
   * Load all loadComponent from the specified directory
   * @param {string} directory
   */
  loadComponents(directory) {
    ComponentsLoader(this, directory)
  };


  /**
   * Register command file in the client
   * @param {import("@utils/types/baseCommand")} cmd
   */
  loadCommand(cmd) {

    // Check if category is disabled
    // Prefix Command
    if (cmd.command?.enabled) {
      /*
      if (this.commands.has(cmd.name)) {
        throw new Error(`Command ${cmd.name} already registered`);
      }*/
      this.commands.set(cmd.name.toLowerCase(), cmd);
    } else {
      this.logger.debug(`Skipping command ${cmd.name}. Disabled!`);
    }

    // Slash Command
    if (cmd.slashCommand?.enabled) {
      /*
      if (this.slashCommands.has(cmd.name)) throw new Error(`Slash Command ${cmd.name} already registered`);
      */
      this.slashCommands.set(cmd.name, cmd);
    } else this.logger.debug(`Skipping slash command ${cmd.name}. Disabled!`);


  };

  /**
   * Register Component file in the client
   * @param {import("@utils/types/baseComponent")} Component
   */
  loadComponent(Component) {

    if (Component?.enabled) {
      /*
      if (this.Component.has(Component.name)) {
        throw new Error(`Component ${Component.name} already registered`);
      }*/
      this.ComponentsAction.set(Component.name, Component);
    } else {
      this.logger.debug(`Skipping Component ${Component.name}. Disabled!`);
    }


  };


  /**
   * Register slash command on startup
   * @param {string} [guildId]
   */
  async registerInteractions(guildId) {
    const toRegister = [];

    // filter slash commands
    this.slashCommands
      .map((cmd) => {
        let d = {
          name: cmd.name,
          description: cmd.description,
          type: ApplicationCommandType.ChatInput,
          options: cmd.slashCommand.options,
        }
        if (cmd.category == "OWNER") d.default_member_permissions = 8

        return d
      })
      .forEach((s) => toRegister.push(s));


    // filter contexts
    this.contextMenus
      .map((ctx) => ({
        name: ctx.name,
        type: ctx.type,
      }))
      .forEach((c) => toRegister.push(c));


    // Register GLobally
    if (!guildId) {
      await this.application.commands.set(toRegister);
    }

    // Register for a specific guild
    else if (guildId && typeof guildId === "string") {
      const guild = this.guilds.cache.get(guildId);
      if (!guild) {
        this.logger.error(`Failed to register interactions in guild ${guildId}`, new Error("No matching guild"));
        return;
      }
      await guild.commands.set(toRegister);
    }

    // Throw an error
    else {
      throw new Error("Did you provide a valid guildId to register interactions");
    }

    this.logger.success("Successfully registered interactions");
  };
};

module.exports = baseClient

