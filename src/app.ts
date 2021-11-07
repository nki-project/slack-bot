import {MainController} from "./controllers/MainController";
import {RegisterCommand} from "./controllers/RegisterCommand";
import {CommandController} from "./controllers/CommandController";

const SlackBot = require('slackbots');
require('dotenv').config();

const bot  = new SlackBot({token: process.env.TOKEN_BOT,name:process.env.NAME_BOT});

const dispatcher: RegisterCommand = new RegisterCommand();

dispatcher.register(new CommandController("!create",["title"]))

const main : MainController = new MainController(bot,dispatcher);

main.start();