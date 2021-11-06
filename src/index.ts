import {RegisterCommand} from "./controllers/RegisterCommand";
import {showHello} from "./controllers/LogicController";
import {TypeMessage} from "./constants/enums";
const SlackBot = require('slackbots');
require('dotenv').config();

const bot  = new SlackBot({token: process.env.TOKEN_BOT,name:process.env.NAME_BOT});

const dispatcher: RegisterCommand = new RegisterCommand();

dispatcher.register("!create",showHello);

bot.on("message",(data: any) => {
    if(data.type == TypeMessage.message && !data['bot_id']) {
        try {
            const splitCommands = data.text.split(' ');
            dispatcher.processCommand(splitCommands[0],splitCommands.length == 1?"":splitCommands[1]);
        }
        catch(e: any)  {
            bot.postMessageToChannel(process.env.CHANNEL_BOT,e.message.toString(),() => {
                console.log('error found!');
            })
        }
    }
})
