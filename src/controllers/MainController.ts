import {TypeMessage} from "../constants/enums";
import {Command} from "./Command";
import {Connection, ConnectionOptions, createConnection, getRepository} from "typeorm";
import {Task} from "../entities/Task";

export class MainController {

    private bot: any
    private dispatcher : any
    private connection?: Connection

    constructor() {
        this.initDatabase();
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
                        const result = await this.dispatcher.processCommand(command);
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

    async initDatabase() {
       const options: ConnectionOptions = {
           type:"sqlite",
           database:"./db.sqlite",
           entities:[Task],
           logging:true,
           synchronize:true
       }
       this.connection = await createConnection(options);
    }

    initBotDispatcher(bot: any,dispatcher: any) {
        this.bot = bot;
        this.dispatcher = dispatcher;
    }
}