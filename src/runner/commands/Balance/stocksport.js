/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS PROFILE COMMAND                                                 │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael Soley                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

const { CommandType, CooldownTypes } = require("wokcommands");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const profile = require("../../functions/prof");
const numbers = require("../../functions/numbers");

module.exports = {
  type: CommandType.BOTH,
  init: (client, instance) => {},
  description: "Check yours or another user's stock portfolio",
  aliases: ["stocks", "portfolio"],

  testOnly: false,
  guildOnly: false,
  ownerOnly: false,

  permissions: [],

  deferReply: false,
  cooldowns: {
    type: CooldownTypes.perUser,
    duration: "5 s",
  },

  minArgs: 0,
  maxArgs: 1,
  expectedArgs: "<user>",

  options: [
    {
      name: "user",
      description: "The user to check the portfolio of",
      required: false,
      type: ApplicationCommandOptionType.User,
    },
  ],
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
    let target = args[0] ? await client.users.fetch(args[0]) : user;
    let targetP = await profile.getProfile(target.id, guild.id);

    let stock = targetP.bankingAndInvestments.stockPortfolio;
    let bond = targetP.bankingAndInvestments.bondsPortfolio;

    let lang = await translate.lang(guild.id)

    let embed = new EmbedBuilder()
      .setTitle(`Portfolio`)
      .setColor(require("random-hex-color")())
      .setAuthor({
        name: `${target.username}`,
        iconURL: target.displayAvatarURL({ dynamic: true }),
      })
      .setFooter(config.embed.footer);
    

    if (stock.length == 0) {
      stock = `${target.username} currently has no stocks.`;
      if(lang !== "en") stock = await translate(stock, lang)
    }
    if (bond.length == 0) {
      bond = `${target.username} currently has no bonds.`
      if(lang !== "en") bond = await translate(bond, lang)
    }
      
    if(typeof stock == "array"){
      stock.forEach((s) => {
        stock += `${s.name} - ${s.amount} shares - $${numbers.comma(s.price)}\n`;
      });
    }
    if(typeof bond == "array"){
      bond.forEach((b) => {
        bond += `${b.name} - ${b.amount} shares - $${numbers.comma(b.price)}\n`;
      });
    }
    
      embed.addFields(
          {
                name: "Stocks",
                value: stock
            },
            {
                name: "Bonds",
                value: bond
          }
      )

      return {
            embeds: [embed]
      }
  },
};
