/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS CONFIG                                                          │
  │ v1.0.0                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

module.exports.client = {
  token: process.env.TOKEN,
  id: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
}
module.exports.dash = {
  port: process.env.PORT || 3020,
  domain: "https://automatic-fortnight-gjrx465j7pr2wr5x-3020.app.github.dev/",
  redirectUri: "https://automatic-fortnight-gjrx465j7pr2wr5x-3020.app.github.dev/discord/callback",
  license: process.env.DBD,
}
module.exports.general = {}
module.exports.owners = ["881922017887154226"]