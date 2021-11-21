import {TypeMessage} from "../constants/enums";
import {Connection, ConnectionOptions, createConnection, getConnection} from "typeorm";
import {Task} from "../entities/Task";
import {ValidatorCommand} from "./Validators/ValidatorCommand";
import {TaskStates} from "../entities/TaskStates";
import {log} from "../config/logger";
import {LiveQuotesController} from "./CustomsController/LiveQuotesController";
import {Settings} from "../entities/Settings";

export class MainController {

    private bot: any
    private dispatcher : any
    public connection?: Connection

    constructor() {
        log.info("Init database");
        this.initDatabase();
    }

    start() {
        this.bot.on("message",async (data: any) => {
            if(data.type == TypeMessage.MESSAGE && !data['bot_id']) {
                const users = await this.bot.getUsers();
                const userSearch = users.members.find((v: any) => v.id == data.user);
                try {
                    if((data.text as string).startsWith("!")) {
                        const command = ValidatorCommand.validate(this.dispatcher.commands, data.text);
                        await this.dispatcher.processCommand(command,data,userSearch);
                    }
                }
                catch(e: any)  {
                    this.bot.postMessageToUser(userSearch.name,e.message.toString(),() => {
                        log.error(e.message.toString());
                    });
                }
            }
        })
        this.bot.on("error",(data: any) => {
            log.error(data.toString());
        })
    }

    async initDatabase() {
       const options: ConnectionOptions = {
           type:"postgres",
           host:process.env.POST_HOST,
           port:5432,
           username:process.env.POST_USER,
           password:process.env.POST_PASS,
           database:process.env.POST_DB,
           entities:[Task,TaskStates,Settings],
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