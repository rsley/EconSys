/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS MULTI LANG : TRANSLATOR                                         │
  │ v1.0.0                                                                  │
  │ Copyright(c) Rafael Soley                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const translateG = require("translate-google")

module.exports = async (text, lang) => {
    if (!text) return
    if (!lang) lang = "es"

    let t = await translateG(text, { to: lang })
    return t
}