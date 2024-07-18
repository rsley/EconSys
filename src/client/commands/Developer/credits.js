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

//-- Imports --\\
const { CommandType, CooldownTypes } = require("wokcommands");
const { EmbedBuilder } = require("discord.js");

//-- Exports --\\
module.exports = {
  type: CommandType.BOTH,
  init: (client, instance) => {},
  description: "Sends you the credits for this project",
  aliases: ["cred"],

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
      "**Hi! This is EconSys.**\nEconSys is a complex economy system based on the real-life economics principles, ported to a bot that allows you to create your own economy system in your server.\n\n**Developers:**\n- [Rafael S.R.](https://github.com/rsley)\n\n**Contributors:**\n- None\n\n**Dashboard:**\nThe Dashboard was made originally by the team at Assistant's Center, modified by the EconSys Team.\n\n**GitHub Repository:**\nEconSys is PUBLIC and Open-Source! https://github.com/rsley/econsys\n\n**Discord Server:**\n[Vanity](https://rsluxury.xyz/discord)\n\n";
    let lang = await translate.lang(guild.id);
    if (lang !== "en") textT = await translate(textT, lang);

    textT = textT.replace(
      /\[Rafael S.R.\] \(https:\/\/github\.com\/rsley\)/,
      "[Rafael S.R.](https://github.com/rsley)"
    );
    textT = textT.replace(
      /\! https:\/\/github\.com\/rsley\/econsys/,
      " [GitHub](https://github.com/rsley/econsys)"
    );
    textT = textT.replace(
      /\!https:\/\/github\.com\/rsley\/econsys/,
      " [GitHub](https://github.com/rsley/econsys)"
    );
    textT = textT.replace(
      /\[Vanidad\] \(https:\/\/rsluxury\.xyz\/discord\)/,
      "[Vanity](https://github.com/rsley)"
    );
    textT = textT.replace(/tablero/, "panel");
    textT = textT.replace(/discordia/, "Discord");
    textT = textT.replace(/econsys/, "EconSys");
    textT = textT.replace(/\!Esto/, "! Esto");

    const embed = new EmbedBuilder()
      .setTitle("Credits")
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
