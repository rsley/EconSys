/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS MULTI LANG : TRANSLATOR                                         │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

//-- Imports --\\
const translateG = require("translate-google");

//-- Exports --\\
module.exports = async (text, lang) => {
  if (!text) return;
  if (!lang) lang = "es";

  let t = await translateG(text, { to: lang });
  //let modifiedT = t.replace(/\./g, ". ");
  return t;
};
module.exports.lang = async (guildId) => {
  let lang = (await Handler.fetch(guildId, "lang")) || "English";

  if (lang === "English") return "en";
  if (lang === "Spanish") return "es";
};
