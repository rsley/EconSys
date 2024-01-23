const { ActionRowBuilder } = require('discord.js');

module.exports = (buttons) => {
    const components = []
    const row = new ActionRowBuilder()

    for (let a = 0; a < buttons.length && a < 25; a++) {
        const button = buttons[a]

        if (a % 5 === 0 && a > 0) {
            components.push(row)
            row = new ActionRowBuilder()
        }

        row.addComponents(buttons[a])
    }

    if(row.components.length > 0) {
        components.push(row)
    }

    return components
}