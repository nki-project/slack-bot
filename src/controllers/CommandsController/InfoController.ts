import {Command} from "../Command";
import {information} from "../../config/info";

export class InfoController extends Command {

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name,countArgs,typeArgs);
    }

    initProperties(args: []): any {
        return this;
    }

    async run(data: any) {
        const formedData = [information["about"],information["commands"]];
        information["commands"].forEach((com: any) => {
            formedData.push(com.name + " - " + com.description);
        })
        this.bot.postMessageToUser(data["userFullInfo"].name,formedData.join("\n"));
    }
}