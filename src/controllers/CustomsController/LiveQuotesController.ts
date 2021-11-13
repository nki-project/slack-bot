import {schedule} from 'node-cron'
import {Command} from "../Command";
import {Settings} from "../../entities/Settings";
import axios from "axios";

export class LiveQuotesController extends Command {

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name,countArgs,typeArgs);
        this.startCronJobForQuotes();
    }

    async startCronJobForQuotes() {
        schedule("*/30 * * * *",async () => {
            const users = await this.bot.getUsers();
            const response = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&format=json");
            const data = response.data;
            const formedData = `${data.quoteText} Автор: ${data.quoteAuthor.length == 0?"Не указан":data.quoteAuthor}`;
            const settings = await this.connection.getRepository(Settings).find({where:{enableQuotes:true}});
            await this.sendMessage(users,formedData,settings);
        })
    }

    async sendMessage(users : any,formedData : string,settings : any) {
        let userMap = new Map();
        for(let user of users.members) {
            userMap.set(user.id,user);
        }
        settings.forEach((set : any) => {
            this.bot.postMessageToUser(userMap.get(set.user).name,formedData);
        })
    }

    initProperties(args: []): any {
        return this;
    }

    async run(data: any) {
        const settings: Settings = await this.connection.getRepository(Settings).findOne({
            where:{
                user:data.user,
            }
        });
        const users = await this.bot.getUsers();
        const userSearch = users.members.find((v: any) => v.id == data.user);
        if(settings) {
            if(settings.enableQuotes) {
                settings.enableQuotes = !settings.enableQuotes;
                this.bot.postMessageToUser(userSearch.name,"Quotes disable!");
            }
            else {
                settings.enableQuotes = !settings.enableQuotes;
                this.bot.postMessageToUser(userSearch.name, "Quotes enable!");
            }
            await this.connection.getRepository(Settings).save(settings);
            return;
        }
        let settingsForUser: Settings = new Settings();
        settingsForUser.enableQuotes = true;
        settingsForUser.user = data.user;
        await this.connection.getRepository(Settings).save(settingsForUser);
        this.bot.postMessageToUser(userSearch.name,"Quotes enable!");
    }
}