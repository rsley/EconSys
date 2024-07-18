/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS GITHUB COMMAND                                                  │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

const { CommandType, CooldownTypes } = require("wokcommands");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  type: CommandType.BOTH,
  init: (client, instance) => {},
  description: "Sends the GitHub link for the proyect",
  aliases: ["gh"],

  testOnly: false,
  guildOnly: false,
  ownerOnly: false,

  permissions: [],

  deferReply: false,
  cooldowns: {
    type: CooldownTypes.perUser,
    duration: "10 s",
  },

  minArgs: 0,
  maxArgs: 0,
  expectedArgs: "",

  options: [],
  autocomplete: (command, argument, instance) => {
    // TODO: Return an array of strings
  },

  reply: true,
  delete: false,

  callback: async ({
    client,
    instance,
    message,
    interaction,
    args,
    text,
    guild,
    member,
    user,
    channel,
    cancelCooldown,
    updateCooldown,
  }) => {
    let textT =
      "**EconSys is an Open-Source Project**\nYou can find the GitHub repository in the following";
    let lang = await translate.lang(guild.id);
    if (lang !== "en") textT = await translate(textT, lang);
    textT = textT + " [link](https://github.com/rsley/econsys)";
    const embed = new EmbedBuilder()
      .setTitle("GitHub")
      .setDescription(textT)
      .setColor(require("random-hex-color")())
      .setFooter(config.embed.footer);

    // This command shall be included and accessible in all substantial copies of this software
    // You may not remove, modify, or hide this command from the public as long as you shall use
    // any parts of the EconSys Software.

    return {
      embeds: [embed],
    };
  },
};
