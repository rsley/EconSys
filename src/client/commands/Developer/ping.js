/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS PING COMMAND                                                    │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael Soley                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

  const { CommandType, CooldownTypes } = require("wokcommands")

  module.exports = {
      type: CommandType.BOTH,
      init: (client, instance) => {},
      description: "Show the bot's latency",
      aliases: ["p"],
  
      testOnly: false,
      guildOnly: false,
      ownerOnly: false,
      
      permissions: [],
      
      deferReply: false,
      cooldowns: {
          type: CooldownTypes.perUser,
          duration: "10 s"
      },
      
      minArgs: 0,
      maxArgs: -1,
      expectedArgs: "<num1> <num2>",
      
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
          const ping = client.ws.ping;
          const latency = api.ping
  
          const { findValue } = require("../../../dashboard/dashbot")
          const val = await findValue("1191120386822250527", "lang")
  
          return `🏓 Discord: \`${ping}ms\` | API: \`${latency}ms\` 🏓`
      },
  }