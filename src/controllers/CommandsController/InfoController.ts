import {Command} from "../Command";
import * as fs from "fs";
import path from "path";

export class InfoController extends Command {

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name,countArgs,typeArgs);
    }

    initProperties(args: []): any {
        return this;
    }

    async run(data: any) {
        const users = await this.bot.getUsers();
        const userSearch = users.members.find((v: any) => v.id == data.user);
        const info = JSON.parse(fs.readFileSync(path.join(__dirname,"../../config/info.json"),{encoding:"utf-8"}));
        const formedData = [info["about"],"Команды:"];
        info["commands"].forEach((com: any) => {
            formedData.push(com.name + " - " + com.description);
        })
        this.bot.postMessageToUser(userSearch.name,formedData.join("\n"));
    }
}