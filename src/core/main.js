/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS CORE                                                            │
  │ v1.0.0                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const { Client, IntentsBitField, Partials } = require("discord.js");
const { join } = require("path");
const WOK = require("wokcommands");

//-- Client --\\
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
});

//-- Client Events --\\
client.once("ready", () => {
  logger("Success", "Core", "Client is ready...")
  client.user.setActivity("Economics", { type: "WATCHING" });
  client.user.setStatus("online");

  new WOK({
    client,
    commandsDir: join(__dirname, "../runner/commands"),
    featuresDir: join(__dirname, "../runner/features"),
    events: {
      dir: join(__dirname, "../runner/events"),
    },
    mongoUri: process.env.MONGO_URI || "",
    testServers: ["1191120386822250527"],
    botOwners: config.owners,
    disabledDefaultCommands: [
      "customcommand"
    ],
    cooldownConfig: {
      errorMessage: "Please wait {TIME} before doing that again.",
      botOwnersBypass: false,
      dbRequired: 300,
    },
    validations: {
      syntax: join(__dirname, "../runner/validations", "syntax"),
      runtime: join(__dirname, "../runner/validations", "runtime"),
    },
  });
});

//-- Client Wrapper --\\
module.exports = client;