const { CommandType, CooldownTypes } = require("wokcommands")
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const profile = require("../../functions/prof")
const numbers = require("../../functions/numbers")

module.exports = {
    type: CommandType.BOTH,
    init: (client, instance) => {},
    description: "Check yours or another user's balance",
    aliases: [
        "bal"
    ],

    testOnly: false,
    guildOnly: false,
    ownerOnly: false,
    
    permissions: [],
    
    deferReply: false,
    cooldowns: {
        type: CooldownTypes.perUser,
        duration: "5 s"
    },
    
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<user>",
    
    options: [
        {
            name: "user",
            description: "The user to check the balance of",
            required: false,
            type: ApplicationCommandOptionType.User
        }
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
        let target = args[0] ? await client.users.fetch(args[0]) : user
        let targetP = await profile.getProfile(target.id, guild.id)

        const desc = `**Net worth:** ${numbers(targetP.economicInformation.netWorth)}\n**Bank account balance:** ${numbers(targetP.bankingAndInvestments.bankAccountBalance)}\n**Income:** ${numbers(targetP.economicInformation.income)}\n**Debts:** ${numbers(targetP.economicInformation.debts)}`

        let embed = new EmbedBuilder()
            .setTitle("Balance")
            .setColor(require('random-hex-color')())
            .setAuthor({
                name: `${target.tag}'s Balance`,
                iconURL: `https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png`
            })
            .setDescription(desc)
            .setFooter(config.embed.footer)  
        
        return {
            embeds: [embed]
        }
    },
}