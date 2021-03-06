import {Command} from "../Command";
import {Task} from "../../entities/Task";
import {TaskStates} from "../../entities/TaskStates";


export class RemoveTaskController extends Command {

    private id: string

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name, countArgs, typeArgs);
    }

    initProperties(args: Array<String>): any {
        this.id = args[0].toString();
        return this;
    }

    async run(data: any) {
        const searchTask : Task = await this.connection.getRepository(Task).findOne({where:{userId:data.user,title:this.id}});
        if(!searchTask) {
            this.bot.postMessageToUser(data["userFullInfo"].name,`Task with name ${this.id} not found!`);
            return;
        }
        await this.connection.createQueryBuilder()
            .delete()
            .from(TaskStates)
            .where("taskId = :id", {id: searchTask.id}).execute();

        await this.connection.getRepository(Task).delete(searchTask.id);
        this.bot.postMessageToUser(data["userFullInfo"].name,`Task with name ${this.id} successfully removed!`);
    }

}