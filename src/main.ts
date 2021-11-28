class DateObject {
    
    public year: number;
    public month: number;
    public day: number;

    public hour: number;
    public minutes: number;

    public week: number;
    public weekDay: number;

    //private map: Map<string, number>;


    constructor(year?: number, month? : number, day? : number, hour? : number, minutes? : number) {
        const now = new Date();

        this.year = year ??  now.getFullYear();
        this.month = month ?? now.getMonth();
        this.day = day ?? now.getDate();
        this.hour = hour ?? now.getHours();
        this.minutes = minutes ?? now.getMinutes()
        
        const date = new Date(this.year, this.month, this.day)
        this.weekDay = date.getDay()
        this.week = this.getWeekNum(date);

        //this.setupMap();
    }

    private getWeekNum(date : Date) : number {
        const oneJan = new Date(date.getFullYear(), 0,1);
        return Math.ceil((((date.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay()) / 7);
    }

    /*private setupMap() : void {
        this.map = new Map<string, number>();
        
        this.map.set('%y', this.year);
        this.map.set('%m', this.month);
        this.map.set('%d', this.day);
    }

    public format(formatStr : string) : string {
        this.map.forEach((value: number, key: string) => {
            formatStr = formatStr.replaceAll(key, value.toString());
        })
        return formatStr;
    }*/


};

const eventTime = new DateObject()
console.log(eventTime.month)
// console.log(eventTime.format('Today is %d/%m/%y'));

