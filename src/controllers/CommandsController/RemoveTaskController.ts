import {Command} from "../Command";
import {Task} from "../../entities/Task";


export class RemoveTaskController extends Command {

    private id: number

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name, countArgs, typeArgs);
    }

    initProperties(args: Array<String>): any {
        this.id = +args[0];
        return this;
    }

    async run(data: any) {
        const searchTask : Task = await this.connection.getRepository(Task).findOne({where:{userId:data.user,title:this.id}});
        const users = await this.bot.getUsers();
        const userSearch = users.members.find((v: any) => v.id == data.user);
        if(!searchTask) {
            this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} not found!`);
            return;
        }
        await this.connection.getRepository(Task).delete(searchTask.id);
        this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} successfully removed!`);
    }

}