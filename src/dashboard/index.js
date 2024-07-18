/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DASHBOARD                                                       │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘

  Made with Discord-Dashboard by Assistants Center
 */

//-- Imports --\\
const SoftUI = require("dbd-soft-ui");
const { port, domain, redirectUri, license } = require("../config").dash;

//-- Dashboard --\\
let DBD = require("discord-dashboard");
const Handler = new DBD.Handler(
  `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

//-- Setup --\\
(async () => {
  await DBD.useLicense(license);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    useThemeMaintenance: true,
    minimizedConsoleLogs: true,
    acceptPrivacyPolicy: true,
    underMaintenanceAccessKey: process.env.KEY,
    underMaintenance: {
      title: "Under Maintenance",
      contentTitle: "This page is under maintenance",
      texts: [
        "We still want to change for the better for you.",
        "Therefore, we are introducing technical updates so that we can allow you to enjoy the quality of our services.",
        'Come back to us later or join our <a href="https://rsluxury.xyz/discord">Discord Support Server</a>',
      ],
      infoCards: [
        {
          title: "24/7",
          subtitle: "Uptime!",
          description: "We have a 24/7 uptime!",
        },
        {
          title: "12",
          subtitle: "Modules!",
          description:
            "We have 12 modules for you, to enhance your economy to the best it can be.",
        },
        {
          title: "200+",
          subtitle: "Commands!",
          description: "We have over 200 commands for you!",
        },
      ],
    },
    underMaintenanceAccessPage: "/dev-saccess",
    useUnderMaintenance: false,
    port,
    client: config.client,
    redirectUri,
    domain,
    ownerIDs: config.owners,
    useTheme404: true,
    bot: dclient,
    theme: SoftUI({
      storage: Handler,
      customThemeOptions: {
        index: async () => {
          return {
            values: [],
            graph: {},
            cards: [],
          };
        },
      },
      createdBy: "Rafael S.R.",
      websiteTitle: "ECONSYS",
      websiteName: "ECONSYS",
      websiteUrl: "https://rsluxury.xyz",
      dashboardUrl: "https://econsys.xyz",
      supporteMail: "support@rsluxury.xyz",
      supportServer: "https://rsluxury.xyz/discord",
      colorScheme: "red",
      icons: {
        favicon: "https://rsluxury.xyz/assets/rs-favi2.ico",
        noGuildIcon:
          "https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
        sidebar: {
          darkUrl: "https://rsluxury.xyz/assets/rs-2.png",
          lightUrl: "https://rsluxury.xyz/assets/rs-2.png",
          hideName: true,
          borderRadius: false,
          alignCenter: true,
        },
      },
      index: {
        card: {
          category: "General",
          title: "Bot ping",
          image: "https://rsluxury.xyz/assets/rs-2.png",
          footer: "Footer text",
        },
        information: {
          category: "Info",
          title: "Information",
          description: "Description Text",
          footer: "Footer Text",
        },
        feeds: {
          category: "Category",
          title: "Feed Title",
          description: "Description Text",
          footer: "Footer Text",
        },
        graph: {
          enabled: true,
          lineGraph: false,
          title: "Memory Usage",
          tag: "Memory (MB)",
          max: 100,
        },
      },
      sweetalert: {
        errors: {},
        success: {
          login: "Succesfully logged in.",
        },
      },
      preloader: {
        image: "https://rsluxury.xyz/assets/rs-2.png",
        spinner: true,
        text: "Loading...",
      },
      admin: {
        pterodactyl: {
          enabled: false,
          apiKey: "",
          panelLibk: "",
          serverUUIDs: [],
        },
      },
      commands: require("./commands"),
    }),
    settings: require("./settings"),
  });
  Dashboard.init();

  require("./dashbot")(Dashboard);

  module.exports = Dashboard;
})();

//-- Global --\\
module.exports.Handler = Handler;
