const { CommandType, CooldownTypes } = require("wokcommands")

module.exports = {
    type: CommandType.BOTH,
    init: (client, instance) => {},
    description: "Add your description here",
    aliases: [],

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

        const { findValue } = require("../../dashbot")
        const val = await findValue("1191120386822250527", "lang")

        return `🏓 Discord: \`${ping}ms\` | API: \`${latency}ms\` 🏓`
    },
}