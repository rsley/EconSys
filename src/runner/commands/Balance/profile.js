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


const { CommandType, CooldownTypes } = require("wokcommands")
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const profile = require("../../functions/prof")
const numbers = require("../../functions/numbers")

module.exports = {
    type: CommandType.BOTH,
    init: (client, instance) => {},
    description: "Check yours or another user's profile",
    aliases: [
        "prof"
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
            description: "The user to check the profile of",
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

        let education
        let occupation
        let government 
        let business 
        let bRevenue
        let awardsAndRecognitions

        if (targetP.education.educationLevel === 1) education = "High School"
        if (targetP.education.educationLevel === 2) education = `Associate's Degree (${targetP.education.universityAttended})`
        if (targetP.education.educationLevel === 3) education = `Bachelor's Degree (${targetP.education.universityAttended})`
        if (targetP.education.educationLevel === 4) education = `Master's Degree (${targetP.education.universityAttended})`
        if (targetP.education.educationLevel === 5) education = `Ph.D. (${targetP.education.universityAttended})`

        if (targetP.businessOwnershipDetails.businessName === "None") {
            occupation = targetP.career.profession
        } else {
            occupation = `Owner of ${targetP.businessOwnershipDetails.businessName}`
        }

        if (targetP.businessOwnershipDetails.businessRevenue > 100000) {
            bRevenue = "Over $100,000"
        } else if (targetP.businessOwnershipDetails.businessRevenue > 1000000) {
            bRevenue = "Over $1,000,000"
        } else if (targetP.businessOwnershipDetails.businessRevenue < 100000) {
            bRevenue = "Under $100,000"
        } else {
            bRevenue = "Startup"
        }

        business = "None"
        
        government = targetP.governmentAndPolitics.governmentPosition
        if (targetP.businessOwnershipDetails.businessName !== "None") {
            business = `${targetP.businessOwnershipDetails.businessSector} with ${bRevenue}`
        }
        if (targetP.achievements.awardsAndRecognitions) {
            awardsAndRecognitions = targetP.achievements.awardsAndRecognitions.length > 0 ? targetP.achievements.awardsAndRecognitions.join(", ") : "None"
        } else {
            awardsAndRecognitions = "None"
        }
        const desc = `**Education:** ${education}\n**Occupation:** ${occupation}\n**Government Position:** ${government}\n**Business:** ${business}\n**Awards and Recognitions:** ${awardsAndRecognitions}`
        const balDesc = `**Net worth:** ${numbers(targetP.economicInformation.netWorth)}\n**Bank account balance:** ${numbers(targetP.bankingAndInvestments.bankAccountBalance)}\n**Income:** ${numbers(targetP.economicInformation.income)}\n**Debts:** ${numbers(targetP.economicInformation.debts)}`

        let embed = new EmbedBuilder()
            .setTitle("Profile")
            .setColor(require('random-hex-color')())
            .setAuthor({
                name: `${target.tag}`,
                iconURL: `https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png`
            })
            .setDescription(desc)
            .addFields({
                name: "Balance",
                value: balDesc
            })
            .setFooter(config.embed.footer)  
        
        return {
            embeds: [embed]
        }
    },
}