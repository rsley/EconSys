const { Schema, model, SchemaTypes } = require("mongoose");

const profileSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  economicInformation: {
    income: {
      type: SchemaTypes.Number,
      default: 0,
    },
    debts: {
      type: SchemaTypes.Number,
      default: 0,
    },
    netWorth: {
      type: SchemaTypes.Number,
      default: 30000,
    },
  },
  education: {
    educationLevel: {
      type: SchemaTypes.Number,
      default: 1,
    }, // 1: High School, 2: Associate's Degree, 3: Bachelor's Degree, 4: Master's Degree, 5: Doctorate (Ph.D.)
    universityAttended: {
      type: String,
      default: "None",
    },
  },
  career: {
    profession: {
      type: String,
      default: "Unemployed",
    },
    businessOwnership: {
      type: Boolean,
      default: false,
    },
  },
  bankingAndInvestments: {
    bankAccountBalance: {
      type: SchemaTypes.Number,
      default: 30000,
    },
    stockPortfolio: {
      type: [String],
      default: [],
    },
    bondsPortfolio: {
      type: [String],
      default: [],
    },
  },
  governmentAndPolitics: {
    governmentPosition: {
      type: String,
      default: "Citizen",
    },
    votingRecord: {
      type: [String],
      default: [],
    },
  },
  internationalInteractions: {
    ibsAccountDetails: {
      type: SchemaTypes.ObjectId,
      ref: "CentralBank",
    },
    currencyExchangeTransactions: {
      type: [String],
      default: [],
    },
  },
  businessOwnershipDetails: {
    businessName: String,
    businessSector: String,
    businessRevenue: {
      type: SchemaTypes.Number,
      default: 0,
    },
  },
  economicReports: {
    personalEconomicReport: {
      type: [String],
      default: [],
    },
  },
  achievements: {
    awardsAndRecognitions: {
      type: [String],
      default: [],
    },
  },
});

module.exports = model("profiles", profileSchema);
