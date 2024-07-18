/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS CONFIG                                                          │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
  */

const { formTypes } = require("discord-dashboard");
module.exports = [
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
        .setType(formTypes.select({ English: "English", Spanish: "Spanish" })),
      new Handler.Option()
        .setId("prefix")
        .setName("Prefix")
        .setDescription("Change the prefix of the bot.")
        .setType(formTypes.input("!"))
    ),
];
