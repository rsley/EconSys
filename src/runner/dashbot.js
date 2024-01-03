/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DASHBOARD MANAGER BOT                                           │
  │ v1.0.4                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘

  Made with Discord-Dashboard by Assistants Center
 */

//-- Imports --\\
const guildPrefix = require("../db/models/guild-prefix")

//-- Dashboard --\\
module.exports = (Dashboard) => {
    logger("Success", "Dashbot", "Initialized Dashbot and globalized the Dashboard.")
    Dashboard.DBDEvents.on("guildSettingsUpdated", async ({changes, user, guildId}) => {
        const keyChanged = changes.successes[0]

        if (keyChanged.toLowerCase() === "prefix") {
            const newPrefix = await Handler.fetch(guildId, "prefix")
            //instance.setPrefix({ id: guildId }, newPrefix)
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