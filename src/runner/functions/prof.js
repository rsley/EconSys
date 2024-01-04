/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS ECONOMY PROFILE WRAPPER.                                        │
  │ v1.0.0                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const profileD = require("../../db/models/profile");

/**
 * @param {String} id The user's ID
 * @param {String} guildId The guild's ID
 * @returns {Promise<Object>} The user's profile
 */
async function getProfile(id, guildId) {
    if (!id) throw new Error("No ID was provided");
    if (!guildId) throw new Error("No guild ID was provided");

    let data = await profileD.findOne({
        id: id,
        guildId: guildId,
    });

    if (!data) {
        data = new profileD({
            id: id,
            guildId: guildId,
        });
        await data.save();
    }

    return data
}

/**
 * @param {String} id The user's ID
 * @param {String} guildId The guild's ID
 * @param {Object} data The data to set
 * @returns {Promise<Object>} The user's profile
 */
async function setProfile(id, guildId, data) {
    if (!id) throw new Error("No ID was provided");
    if (!guildId) throw new Error("No guild ID was provided");
    if (!data) throw new Error("No data was provided");

    let profile = await profileD.findOneAndUpdate({
        id,
        guildId
    }, data)
    profile.save()

    return profile
}

/**
 * @param {String} id The user's ID
 * @param {String} guildId The guild's ID
 * @param {String} type The type of the data to get
 * @returns {Promise<Object>} The user's profile
 */
async function getEconomy(id, guildId, type) {
    if (!id) throw new Error("No ID was provided");
    if (!guildId) throw new Error("No guild ID was provided");
    if (!type) throw new Error("No type was provided");

    let data = await getProfile(id, guildId)
    let info = data.economicInformation

    switch (type) {
        case "totalWealth":
            return info.totalWealth;
        case "income":
            return info.income;
        case "debts":
            return info.debts;
        case "netWorth":
            return info.netWorth;
        case "obj":
            return info
        default:
            throw new Error("Invalid type provided");
    }
}

//-- Exports --\\
module.exports.getProfile = getProfile;
module.exports.setProfile = setProfile;
module.exports.getEconomy = getEconomy;