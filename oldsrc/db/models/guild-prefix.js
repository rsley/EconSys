const { Schema, model } = require("mongoose")

const guildPrefixSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: true
    }
})

module.exports = model("guild-prefixes", guildPrefixSchema)