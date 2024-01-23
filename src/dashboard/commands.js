/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS CONFIG                                                          │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael Soley                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

  module.exports = [
    {
        category: "Economy",
        subTitle: "EconSys Economy System",
        categoryId: "eco-cmds", // No spaces or special characters
        image: "<img src='link to image'>",
        hideAlias: false, // Optional - Default: false - Hides the alias from all commands in the category
        hideDescription: false, // Optional - Default: false - Hides the description from all commands in the category
        hideSidebarItem: false, // Optional - Default: false - Hides the category from the sidebar
        list: [
            {
                commandName: "balance",
                commandUsage: "<user>",
                commandDescription: "Shows yours or another user's balance",
                commandAlias: "bal"
            },
            {
                commandName: "profile",
                commandUsage: "<user>",
                commandDescription: "Shows yours or another user's profile",
                commandAlias: "prof"
            },
            {
                commandName: "stocksportfolio",
                commandUsage: "<user>",
                commandDescription: "Shows yours or another user's stock portfolio",
                commandAlias: "stocks, portfolio, stocksport"
            }
        ]
    },
    {
        category: "Developer",
        subTitle: "EconSys Developer Support System",
        categoryId: "dev-cmds", // No spaces or special characters
        image: "<img src='link to image'>",
        hideAlias: false, // Optional - Default: false - Hides the alias from all commands in the category
        hideDescription: false, // Optional - Default: false - Hides the description from all commands in the category
        hideSidebarItem: false, // Optional - Default: false - Hides the category from the sidebar
        list: [
            {
                commandName: "credits",
                commandUsage: "",
                commandDescription: "Shows the bot credits",
                commandAlias: "creds"
            },
            {
                commandName: "github",
                commandUsage: "",
                commandDescription: "Shows EconSys' GitHub repository",
                commandAlias: "git"
            },
            {
                commandName: "ping",
                commandUsage: "",
                commandDescription: "Shows the bot and API latency",
                commandAlias: "p"
            }
        ]
    }
]