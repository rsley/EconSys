/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DASHBOARD MANAGER BOT                                           │
  │ v1.0.4                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘

  Made with Discord-Dashboard by Assistants Center
 */

//-- Dashboard --\\
module.exports = (Dashboard) => {
    logger("Error", "Dashbot", "Dashbot is not yet supported.")
    Dashboard.DBDEvents.on("guildSettingsUpdated", ({ user, changes, guildId }) => {
        const keyChanged = changes.successes[0]

        if (keyChanged.toLowerCase() === "prefix") {
            const newPrefix = Handler.fetch(guildId, "prefix")
            logger("Info", "Dashbot", `Prefix for ${guildId} changed to ${newPrefix} by ${user.tag} (${user.id})`);
            //instance.setPrefix({ id: guildId }, newPrefix)
        }
    })

    global.Dashboard = Dashboard
}

//-- Functions --\\
module.exports.findValue = async (guildId, value) => {
    const data = await Handler.fetch(guildId, value)
    return data
}