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
    correctSyntax: "Correct syntax: {PREFIX}{COMMAND} {ARGS}",
    expectedArgs: "<num1> <num2>",
    
    options: [],
    autocomplete: (command, argument, instance) => {
        // TODO: Return an array of strings
    },
    
    reply: true,
    delete: false,

    callback: ({
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

        return `🏓 Discord: \`${ping}ms\` | API: \`${latency}ms\` 🏓`
    },
}