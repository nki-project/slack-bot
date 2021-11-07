import {MainController} from "./controllers/MainController";
import {RegisterCommand} from "./controllers/RegisterCommand";
import {CreateTaskController} from "./controllers/CreateTaskController";

const SlackBot = require('slackbots');
require('dotenv').config();

const bot = new SlackBot({token: process.env.TOKEN_BOT,name:process.env.NAME_BOT});

const dispatcher: RegisterCommand = new RegisterCommand();

const main : MainController = new MainController();

dispatcher.register(new CreateTaskController("!create",2, ['string', 'number']))

main.initBotDispatcher(bot,dispatcher)

main.start();