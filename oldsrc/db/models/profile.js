/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS PROFILE MODEL.                                                  │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael Soley                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

//-- Profile --\\
const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    economicInformation: {
      type: DataTypes.JSON, // Use DataTypes.JSON for compatibility with MySQL
      defaultValue: {
        income: 0,
        debts: 0,
        netWorth: 30000,
      },
    },
    education: {
      type: DataTypes.JSON,
      defaultValue: {
        educationLevel: 1,
        universityAttended: "None", // 1: High School, 2: Associate's Degree, 3: Bachelor's Degree, 4: Master's Degree, 5: Doctorate (Ph.D.)
      },
    },
    career: {
      type: DataTypes.JSON,
      defaultValue: {
        profession: "Unemployed",
        businessOwnership: false,
      },
    },
    bankingAndInvestments: {
      type: DataTypes.JSON,
      defaultValue: {
        bankAccountBalance: config.econ.startingBalance,
        stockPortfolio: [],
        bondsPortfolio: [],
      },
    },
    governmentAndPolitics: {
      type: DataTypes.JSON,
      defaultValue: {
        governmentPosition: "Citizen",
        votingRecord: [],
      },
    },
    internationalInteractions: {
      type: DataTypes.JSON,
      defaultValue: {
        currencyExchangeTransactions: [],
      },
    },
    businessOwnershipDetails: {
      type: DataTypes.JSON,
      defaultValue: {
        businessName: "None",
        businessSector: "None",
        businessRevenue: 0,
      },
    },
    economicReports: {
      type: DataTypes.JSON,
      defaultValue: {
        personalEconomicReport: [],
      },
    },
    achievements: {
      type: DataTypes.JSON,
      defaultValue: {
        awardsAndRecognitions: [],
      },
    },
  },
  {
    hooks: {
      beforeSave: async (profile) => {
        let stocksCapT = 0;
        let bondsCapT = 0;
        if (profile.bankingAndInvestments.stockPortfolio.length > 0) {
          stocksCapT = profile.bankingAndInvestments.stockPortfolio.reduce(
            (a, b) => a + b.marketCap,
            0
          );
        }
        if (profile.bankingAndInvestments.bondsPortfolio.length > 0) {
          bondsCapT = profile.bankingAndInvestments.bondsPortfolio.reduce(
            (a, b) => a + b.marketCap,
            0
          );
        }
        profile.economicInformation.netWorth =
          profile.bankingAndInvestments.bankAccountBalance +
          stocksCapT +
          bondsCapT;
      },
    },
  }
);

//-- Sync --\\
(async () => {
  await Profile.sync({ force: false });
})();

//-- Export --\\
module.exports = Profile;
