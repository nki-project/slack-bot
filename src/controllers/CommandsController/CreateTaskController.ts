import {Command} from "../Command";
import {Task} from "../../entities/Task";
import {bot} from "../../config/bot";

export class CreateTaskController extends Command {

    public task: Task

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name, countArgs, typeArgs);
    }

    async run(data: any)  {

       this.task.channelId = data.channel;

       this.task.userId = data.user;

       const task : Task = await this.connection.getRepository(Task).findOne({where:{title:this.task.title,userId:data.user}});

       const users = await bot.getUsers();

       const userSearch = users.members.find((v: any) => v.id == data.user);

       if(task) {
           await bot.postMessageToUser(userSearch.name,`Task with name ${this.task.title} already created!`);
           return;
       }

       await this.connection.getRepository(Task).save(this.task as Task);

       await bot.postMessageToUser(userSearch.name,`Task ${this.task.title} successfully created!`);
    }

    initProperties(value: Array<string>) {
        this.task = new Task();
        this.task.title = value[0];

        return this;
    }
}