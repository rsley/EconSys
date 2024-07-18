/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS BUTTON PARSER                                                   │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const { ActionRowBuilder } = require("discord.js");

//-- Exports --\\
module.exports = (buttons) => {
  const components = [];
  const row = new ActionRowBuilder();

  for (let a = 0; a < buttons.length && a < 25; a++) {
    const button = buttons[a];

    if (a % 5 === 0 && a > 0) {
      components.push(row);
      row = new ActionRowBuilder();
    }

    row.addComponents(buttons[a]);
  }

  if (row.components.length > 0) {
    components.push(row);
  }

  return components;
};
