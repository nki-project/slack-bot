const SlackBot = require('slackbots');
require('dotenv').config()
export const bot = new SlackBot({token: process.env.TOKEN_BOT,name:process.env.NAME_BOT});