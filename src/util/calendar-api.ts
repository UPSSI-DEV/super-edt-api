import { google, calendar_v3 } from "googleapis";
import * as dotenv from "dotenv";

export default class CalendarAPI {
    private api: calendar_v3.Calendar;
    private key: string;

    constructor() {
        dotenv.config();
        this.key = `${process.env.API_KEY}`;
        this.api = google.calendar("v3");
    }

    public async get(calendar_id: string, time_min: any, time_max: any) {
        const eventList = await this.api.events
            .list({
                key: this.key,
                calendarId: calendar_id
                /*timeMin: time_min,
                timeMax: time_max*/
            })
            .then((events) => events.data.items?.filter((x) => x.status === "confirmed"));

        return eventList;
    }
}
