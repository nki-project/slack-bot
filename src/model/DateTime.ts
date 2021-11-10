import moment, {Moment} from 'moment-timezone';

export enum DateTimeFormat {
    FORMAT_API = "YYYY-MM-DD HH:mm:ss",
    DATE = "YYYY-MM-DD",
    MONTH_DAY = "M/D",
    TIME = "hh:mm a",
}

export default class DateTime {
    public dateTime: Date;

    get moment(): Moment {
        return moment(this.dateTime);
    }

    get time(): string {
        return moment(this.dateTime).format(DateTimeFormat.TIME);
    }

    get monthAndDay(): string {
        return moment(this.dateTime).format(DateTimeFormat.MONTH_DAY);
    }

    get onlyDate(): string {
        return moment(this.dateTime).format(DateTimeFormat.DATE);
    }

    get instance(): DateTime {
        return Object.assign(Object.create(this), this);
    }

    constructor(dateTime: string | Date = new Date(), timeZone = "Europe/Kiev", format?: DateTimeFormat | string) {
        if (typeof dateTime == 'string') {
            this.dateTime = moment(dateTime, format ?? DateTimeFormat.FORMAT_API).toDate();
        } else {
            this.dateTime =  dateTime;
        }

        this.dateTime = moment(dateTime).tz(timeZone, true).toDate();
    }

    public toString(format?: DateTimeFormat | string): string {
        return format ? moment(this.dateTime).format(format) : moment(this.dateTime).format(DateTimeFormat.FORMAT_API);
    }
}
