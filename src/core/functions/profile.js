/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS PROFILE WRAPPER                                                 │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

const Profile = require("../../db/models/profile");

/**
 * Get the user's profile.
 * @param {String} id - The user's ID.
 * @param {String} guildId - The guild's ID.
 * @returns {Promise<Object>} - The user's profile.
 */
async function getProfile(id, guildId) {
  if (!id) throw new Error("No ID was provided");
  if (!guildId) throw new Error("No guild ID was provided");

  let profile = await Profile.findOne({
    where: {
      id: id,
      guildId: guildId,
    },
  });

  if (!profile) {
    profile = await Profile.create({
      id: id,
      guildId: guildId,
    });
  }

  // Parse the JSON strings into objects
  profile.dataValues.economicInformation = JSON.parse(
    profile.dataValues.economicInformation
  );
  profile.dataValues.education = JSON.parse(profile.dataValues.education);
  profile.dataValues.career = JSON.parse(profile.dataValues.career);
  profile.dataValues.bankingAndInvestments = JSON.parse(
    profile.dataValues.bankingAndInvestments
  );
  profile.dataValues.governmentAndPolitics = JSON.parse(
    profile.dataValues.governmentAndPolitics
  );
  profile.dataValues.internationalInteractions = JSON.parse(
    profile.dataValues.internationalInteractions
  );
  profile.dataValues.businessOwnershipDetails = JSON.parse(
    profile.dataValues.businessOwnershipDetails
  );
  profile.dataValues.economicReports = JSON.parse(
    profile.dataValues.economicReports
  );
  profile.dataValues.achievements = JSON.parse(profile.dataValues.achievements);

  return profile.dataValues;
}

/**
 * Set the user's profile.
 * @param {String} id - The user's ID.
 * @param {String} guildId - The guild's ID.
 * @param {Object} data - The data to set.
 * @returns {Promise<Object>} - The user's profile.
 */
async function setProfile(id, guildId, data) {
  if (!id) throw new Error("No ID was provided");
  if (!guildId) throw new Error("No guild ID was provided");
  if (!data) throw new Error("No data was provided");

  let profile = await Profile.findOne({
    where: {
      id,
      guildId,
    },
  });

  if (profile) {
    await profile.update(data);
  } else {
    profile = await Profile.create({
      id: id,
      guildId: guildId,
      ...data,
    });
  }

  return profile.dataValues;
}

/**
 * Get economic information for the user.
 * @param {String} id - The user's ID.
 * @param {String} guildId - The guild's ID.
 * @param {String} type - The type of the data to get.
 * @returns {Promise<Object>} - The user's economic information.
 */
async function getEconomy(id, guildId, type) {
  if (!id) throw new Error("No ID was provided");
  if (!guildId) throw new Error("No guild ID was provided");
  if (!type) throw new Error("No type was provided");

  let profile = await getProfile(id, guildId);
  let info = profile.economicInformation;

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
      return info;
    default:
      throw new Error("Invalid type provided");
  }
}

module.exports.getProfile = getProfile;
module.exports.setProfile = setProfile;
module.exports.getEconomy = getEconomy;
