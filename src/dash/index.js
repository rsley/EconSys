/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS DASHBOARD                                                       │
  │ v2.1.2                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘

  Made with Discord-Dashboard by Assistants Center
 */

  //-- Imports --\\
const SoftUI = require("dbd-soft-ui");
const { port, domain, redirectUri, license } = require("../config").dash;

//-- Dashboard --\\
let DBD = require("discord-dashboard");
const Handler = new DBD.Handler();

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
    useUnderMaintenance: true,
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
      websiteName: "ECONSYS",
      colorScheme: "blue",
      supporteMail: "support@rsluxury.xyz",
      icons: {
        favicon:
          "https://assistantscenter.com/wp-content/uploads/2021/11/cropped-cropped-logov6.png",
        noGuildIcon:
          "https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
        sidebar: {
          darkUrl: "https://assistantscenter.com/img/logo.png",
          lightUrl: "https://assistanscenter.com/img/logo.png",
          hideName: true,
          borderRadius: false,
          alignCenter: true,
        },
      },
      index: {
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
        image: "/img/soft-ui.webp",
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

  module.exports = Dashboard;
})();

//-- Global --\\
global.Handler = Handler;
