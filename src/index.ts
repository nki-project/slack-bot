import {RegisterCommand} from "./controllers/RegisterCommand";
import {TypeMessage} from "./constants/enums";
import {Command} from "./models/Command";
import {CommandController} from "./controllers/CommandController";
const SlackBot = require('slackbots');
require('dotenv').config();

const bot  = new SlackBot({token: process.env.TOKEN_BOT,name:process.env.NAME_BOT});

const dispatcher: RegisterCommand = new RegisterCommand();

dispatcher.register(new CommandController("!create",1,["name"]));

bot.on("message",(data: any) => {
    if(data.type == TypeMessage.message && !data['bot_id']) {
        try {
            if((data.text as string).startsWith("!")) {
                const splitCommand = data.text.split(' ');
                const command : Command = dispatcher.validateRegisterCommand(splitCommand[0],splitCommand.length - 1);
                command.initProperties(splitCommand.slice(1,splitCommand.length));
                const result = dispatcher.processCommand(command);
                bot.postMessageToChannel(process.env.CHANNEL_BOT,JSON.stringify(result),() => {
                    console.log('Logger send!')
                })
            }
        }
        catch(e: any)  {
            bot.postMessageToChannel(process.env.CHANNEL_BOT,e.message.toString(),() => {
                console.log('Error found!');
            })
        }
    }
})
