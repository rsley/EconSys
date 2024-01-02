/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DASHBOARD                                                       │
  │ v1.0.2                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘

  Made with Discord-Dashboard by Assistants Center
 */

  //-- Imports --\\
const SoftUI = require("dbd-soft-ui");
const { port, domain, redirectUri, license } = require("../config").dash;

//-- Dashboard --\\
let DBD = require("discord-dashboard");
const Handler = new DBD.Handler(process.env.MONGO);

//-- Setup --\\
(async () => {
  await DBD.useLicense(license);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    useThemeMaintenance: true,
    underMaintenanceAccessKey: process.env.KEY,
    underMaintenance: {
      title: "Under Maintenance",
      contentTitle: "This page is under maintenance",
      texts: [
        "We still want to change for the better for you.",
        "Therefore, we are introducing technical updates so that we can allow you to enjoy the quality of our services.",
        'Come back to us later or join our <a href="#">Discord Support Server</a>',
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
          description: "We have 12 modules for you, to enhance your economy to the best it can be.",
        },
        {
          title: "200+",
          subtitle: "Commands!",
          description: "We have over 200 commands for you!",
        }
      ]
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
      createdBy: "Rafael Soley",
      websiteTitle: "ECONSYS",
      websiteName: "ECONSYS",
      websiteUrl: "https://rsluxury.xyz",
      dashboardUrl: "https://econsys.xyz",
      supporteMail: "support@rsluxury.xyz",
      supportServer: "https://discord.gg/anEr9Rerxu",
      colorScheme: "red",
      icons: {
        favicon:
          "https://rsluxury.xyz/assets/rs-favi2.ico",
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
          footer: "Footer text"
        },
        information: {
          category: 'Info',
          title: 'Information',
          description: 'Description Text',
          footer: 'Footer Text',
        },
        feeds: {
          category: 'Category',
          title: 'Feed Title',
          description: 'Description Text',
          footer: 'Footer Text',
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
      commands: [],
    }),
    settings: [
      new Handler.Category()
        .setId("setup")
        .setName("Setup")
        .setDescription("Setup your bot.")
        .setToggleable(false)
        .addOptions(
          new Handler.Option()
            .setId("lang")
            .setName("Language")
            .setDescription("Change the language of the bot.")
            .setType(
              DBD.formTypes.select({ English: "English", Spanish: "Spanish" })
            ),
          new Handler.Option()
            .setId("prefix")
            .setName("Prefix")
            .setDescription("Change the prefix of the bot.")
            .setType(DBD.formTypes.input("!"))
        ),
    ],
  });
  Dashboard.init();

  require("../runner/dashbot")(Dashboard)

  module.exports = Dashboard;
})();

//-- Global --\\
module.exports.Handler = Handler;
