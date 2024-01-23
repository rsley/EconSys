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
const { Client, IntentsBitField, Partials, ActivityType } = require("discord.js");
const { join } = require("path");
const WOK = require("wokcommands");
const numbers = require("../runner/functions/numbers");

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
  setInterval(() => {
    const random = Math.floor(Math.random() * 5 + 1);

    let moneyTotal = numbers(config.econ.defaultTotal)
    moneyTotal = moneyTotal.split(".")[0]

    if (random === 1) {
      client.user.setActivity("the stock market", { type: ActivityType.Watching });
    } else if (random === 2) {
      client.user.setActivity("the economy", { type: ActivityType.Watching });
    } else if (random === 3) {
      client.user.setActivity("the news", { type: ActivityType.Watching });
    } else if (random === 4) {
      client.user.setActivity(`my ${client.guilds.cache.reduce((a, g) => a+g.memberCount, 0)} users`, { type: ActivityType.Watching });
    } else if (random === 5) {
      client.user.setActivity(`my $${moneyTotal}`, { type: ActivityType.Watching });
    }
  }, config.client.actInterval)
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