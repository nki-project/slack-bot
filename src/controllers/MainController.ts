import {TypeMessage} from "../constants/enums";
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Task} from "../entities/Task";
import {ValidatorCommand} from "./Validators/ValidatorCommand";
import {TaskStates} from "../entities/TaskStates";

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
                        const command = ValidatorCommand.validate(this.dispatcher.commands, data.text);
                        const result = await this.dispatcher.processCommand(command,data);
                    }
                }
                catch(e: any)  {
                    console.log(e.message.toString());
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
           entities:[Task,TaskStates],
           logging:true,
           name:"default",
           synchronize:true
       }
       this.connection = await createConnection(options);
    }

    initBotDispatcher(bot: any,dispatcher: any) {
        this.bot = bot;
        this.dispatcher = dispatcher;
    }
}