import {schedule} from 'node-cron'
import {bot} from "../../config/bot";
const axios = require('axios');
export class LiveQuotesController {

    static startCronJobForQuotes() {
        schedule("* * * * *",() => {
            axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&format=json").then((v : any) => {
                const data = v.data;
                let formedData = `${data.quoteText} Автор: ${data.quoteAuthor.length == 0?"Не указан":data.quoteAuthor}`;
                bot.postMessageToChannel(process.env.CHANNEL_BOT,formedData);
            })
        })
    }
}