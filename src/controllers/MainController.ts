import {TypeMessage} from "../constants/enums";
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Task} from "../entities/Task";
import {ValidatorCommand} from "./Validators/ValidatorCommand";
import {TaskStates} from "../entities/TaskStates";
import {log} from "../config/logger";
import {LiveQuotesController} from "./CustomsController/LiveQuotesController";

export class MainController {

    private bot: any
    private dispatcher : any
    private connection?: Connection

    constructor() {
        log.info("Init database");
        this.initDatabase();
    }

    start() {
        this.bot.on("message",async (data: any) => {
            if(data.type == TypeMessage.MESSAGE && !data['bot_id']) {
                const channel = await this.bot.getChannelById(data.channel);
                try {
                    if((data.text as string).startsWith("!")) {
                        const command = ValidatorCommand.validate(this.dispatcher.commands, data.text);
                        await this.dispatcher.processCommand(command,data);
                    }
                }
                catch(e: any)  {
                    this.bot.postMessageToChannel(channel.name,e.message.toString(),() => {
                        log.error(e.message.toString());
                    })
                }
            }
        })
        this.bot.on("error",(data: any) => {
            log.error(data.toString());
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