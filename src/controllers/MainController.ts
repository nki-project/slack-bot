import {TypeMessage} from "../constants/enums";
import {Command} from "./Command";

export class MainController {
    private readonly bot: any
    private readonly dispatcher : any

    constructor(bot:any,dispatcher: any) {
        this.bot = bot;
        this.dispatcher = dispatcher;
    }

    start() {
        this.bot.on("message",async (data: any) => {
            if(data.type == TypeMessage.MESSAGE && !data['bot_id']) {
                const channel = await this.bot.getChannelById(data.channel);
                try {
                    if((data.text as string).startsWith("!")) {
                        const splitCommand = data.text.split(' ');
                        const command : Command = this.dispatcher.validateRegisterCommand(splitCommand[0],splitCommand.length - 1);
                        command.initProperties(splitCommand.slice(1,splitCommand.length));
                        const result = this.dispatcher.processCommand(command);
                        this.bot.postMessageToChannel(channel.name,JSON.stringify(result),() => {
                            console.log('Logger send!')
                        })
                    }
                }
                catch(e: any)  {
                    this.bot.postMessageToChannel(channel.name,e.message.toString(),() => {
                        console.log('Error found!');
                    })
                }
            }
        })
        this.bot.on("error",(data: any) => {
            console.log(data);
        })
    }
}