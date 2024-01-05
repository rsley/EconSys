/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS CORE                                                            │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael Soley                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
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
    mongoUri: process.env.MONGO || "",
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