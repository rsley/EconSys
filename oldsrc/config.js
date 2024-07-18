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

module.exports.client = {
  token: process.env.TOKEN,
  id: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
  actInterval: 15000,
};
module.exports.dash = {
  port: process.env.PORT || 3020,
  domain: "https://automatic-fortnight-gjrx465j7pr2wr5x-3020.app.github.dev/",
  redirectUri:
    "https://automatic-fortnight-gjrx465j7pr2wr5x-3020.app.github.dev/discord/callback",
  license: process.env.DBD,
};
module.exports.embed = {
  footer: {
    text: "Copyright (c) EconSys",
    iconURL: "https://rsluxury.xyz/assets/rs-2.png",
  },
};
module.exports.db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
};
module.exports.owners = ["881922017887154226"];
module.exports.stocks = {
  changeRate: 0.07,
};
module.exports.econ = {
  defaultTotal: 100000000,
  startingBalance: 50000,
};
