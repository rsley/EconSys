/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DASHBOT                                                         │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael Soley                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘

  Made with Discord-Dashboard by Assistants Center
 */

//-- Imports --\\
const guildPrefix = require("../db/models/mongo/guild-prefix")

//-- Dashboard --\\
module.exports = (Dashboard) => {
    logger("Success", "Dashbot", "Initialized Dashbot and globalized the Dashboard.")
    Dashboard.DBDEvents.on("guildSettingsUpdated", async ({changes, user, guildId}) => {
        const keyChanged = changes.successes[0]

        if (keyChanged.toLowerCase() === "prefix") {
            const newPrefix = await Handler.fetch(guildId, "prefix")
            //instance.setPrefix({ id: guildId }, newPrefix)
            instance.commandHandler.prefixHandler.set(guildId, newPrefix);
            const found = await guildPrefix.findOne({ _id: guildId })
            if (found) {
                found.prefix = newPrefix
                found.save()
            } else {
                const newGuildPrefix = new guildPrefix({
                    _id: guildId,
                    prefix: newPrefix
                })
                newGuildPrefix.save()
            }

            logger("Info", "Dashbot", `Prefix for ${guildId} changed to ${newPrefix} by ${user.tag} (${user.id})`);
        }
    })

    global.Dashboard = Dashboard
}

//-- Functions --\\
module.exports.findValue = async (guildId, value) => {
    const data = await Handler.fetch(guildId, value)
    return data
}