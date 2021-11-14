import {Command} from "../Command";
import {Task} from "../../entities/Task";

export class StatusTaskController extends Command {

    private id : string


    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name,countArgs,typeArgs);
    }

    initProperties(args: Array<String>): any {
        this.id = args[0].toString();
        return this;
    }

    async run(data: any) {
        const task: Task = await this.connection.getRepository(Task).findOne({
            where: {
                title: this.id, userId: data.user
            }
        });
        const users = await this.bot.getUsers();
        const userSearch = users.members.find((v: any) => v.id == data.user);

        if(!task) {
            this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} not found!`);
            return;
        }

        if(!task.isStarted && !task.isStopped) {
            this.bot.postMessageToUser(userSearch.name,`Status: Not started and not paused`);
        }
        else if(task.isStarted && !task.isStopped) {
            this.bot.postMessageToUser(userSearch.name,`Status: Task started!`);
            return;
        } else {
            this.bot.postMessageToUser(userSearch.name,`Status: Task stopped!`);
        }
    }

}