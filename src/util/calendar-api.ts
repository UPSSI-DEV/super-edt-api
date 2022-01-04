import { google, calendar_v3 } from "googleapis";
import * as dotenv from "dotenv";
import { GaxiosPromise } from "googleapis/build/src/apis/analyticsreporting";

interface CalendarEvent {
    summary: string;
    startTime: Date;
    endTime: Date;
}

class CalendarAPI {
    private api: calendar_v3.Calendar;
    private key: string;

    constructor() {
        dotenv.config();
        this.key = `${process.env.API_KEY}`;
        this.api = google.calendar("v3");
    }

    // Get the current school year bounds (year is considered to start and end in August)
    private getYear() {
        const THRESHOLD = 7; // August

        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const schoolYears = month > THRESHOLD ? [year, year + 1] : [year - 1, year];

        return schoolYears.map((x) => new Date(x, THRESHOLD, 1).toISOString());
    }

    // Requests all events from a school year for a specific calendar
    private async fetchEvents(id: string, start: string, end: string) {
        let events: calendar_v3.Schema$Event[] = [];
        let nextPageToken = "";

        do {
            const result = await this.api.events
                .list({
                    key: this.key,
                    calendarId: id,
                    timeMin: start,
                    timeMax: end,
                    pageToken: nextPageToken
                })
                .then((x) => x.data);

            nextPageToken = result.nextPageToken ?? "";
            events = events.concat(result.items ?? []);
        } while (events.length % 250 == 0);

        return events.filter((x) => x.status === "confirmed");
    }

    public async get(calendar_id: string): Promise<Array<CalendarEvent>> {
        const [startYear, endYear] = this.getYear();
        const rawEvents = await this.fetchEvents(calendar_id, startYear, endYear);

        const events: CalendarEvent[] = rawEvents.map((x) => ({
            summary: x.summary ?? "",
            startTime: new Date(`${x.start?.date || x.start?.dateTime}`),
            endTime: new Date(`${x.end?.date || x.end?.dateTime}`)
        }));

        const year = (x: string) => new Date(x).getFullYear();
        console.log(`current year: ${year(startYear)}/${year(endYear)}`);

        return events.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    }
}

export { CalendarAPI, CalendarEvent };
export default CalendarAPI;
