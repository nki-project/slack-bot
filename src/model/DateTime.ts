import moment, {Moment} from 'moment-timezone';

export enum DateTimeFormat {
    FORMAT_API = "YYYY-MM-DD HH:mm:ss",
    DATE = "YYYY-MM-DD",
    MONTH_DAY = "M/D",
    TIME = "HH:mm:ss",
}

export default class DateTime {
    public dateTime: Moment;

    constructor(dateTime: string | Date = new Date(), format?: DateTimeFormat | string, timeZone = "Europe/Kiev") {
        if (typeof dateTime == 'string') {
            this.dateTime = moment(dateTime, format ?? DateTimeFormat.FORMAT_API);
        } else {
            this.dateTime =  moment(dateTime);
        }

        this.dateTime = moment(dateTime).tz(timeZone,false);
    }

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

    public toString(format?: DateTimeFormat | string): string {
        return format ? moment(this.dateTime).format(format) : moment(this.dateTime).format(DateTimeFormat.FORMAT_API);
    }

    public intervalTimeTo(date: DateTime, format: string = DateTimeFormat.TIME) {
        return moment(date.dateTime)
            .subtract(this.dateTime.seconds(), 'seconds')
            .subtract(this.dateTime.minutes(), 'minutes')
            .subtract(this.dateTime.hours(), 'hours')
            .format(format);
    }


    public addTime(date: DateTime, format: string = DateTimeFormat.TIME) {
        return moment(this.dateTime)
            .add(date.dateTime.seconds(), 'seconds')
            .add(date.dateTime.minutes(), "minutes")
            .add(date.dateTime.hours(), 'hours')
            .format(format);
    }
}