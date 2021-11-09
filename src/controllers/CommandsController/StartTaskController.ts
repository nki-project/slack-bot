import {Command} from "../Command";
import {Task} from "../../entities/Task";
import {TaskStates} from "../../entities/TaskStates";

export class StartTaskController extends Command {

    private id: string

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
                userId: data.user,
                title: this.id
            }
        });
        const users = await this.bot.getUsers();
        const userSearch = users.members.find((v: any) => v.id == data.user);

        if(!task) {
            this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} not found!`);
            return;
        }

        if(task.isStarted && !task.isStopped) {//если задача началась, но не остановлена
            this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} already started!`);
            return;
        }

        if(task.isStarted && task.isStopped) { //если задача началась и остановлена
            task.isStopped = false;
            let taskRepeatStarted = new TaskStates();
            taskRepeatStarted.startedAt = new Date();
            await this.connection.getRepository(TaskStates).save({task:{id:task.id},...taskRepeatStarted});
            await this.connection.getRepository(Task).save(task);
            this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} successfully started!`);
            return;
        }

        task.isStarted = true;//стартуем задачу

        task.isStopped = false;//останавливаем задачу

        await this.connection.getRepository(Task).save(task);

        let taskState = new TaskStates();

        taskState.startedAt = new Date();

        await this.connection.getRepository(TaskStates).save({task:{id:task.id},...taskState})

        this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} successfully started!`);
    }

}