import { google, calendar_v3 } from "googleapis";
import * as dotenv from "dotenv";

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

        return events.filter((x) => this.isValid(x));
    }

    private isValid(event: calendar_v3.Schema$Event): boolean {
        if (event.status != "confirmed") return false;

        if (event.recurrence) {
            const regex = event.recurrence?.shift()?.match(/UNTIL=([^;]+);/g);
            //if (regex) console.log(regex);
        }

        return true;
    }

    private timeSort(events: CalendarEvent[]) {
        return events.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    }

    public async getSingle(calendar_id: string): Promise<CalendarEvent[]> {
        const [startYear, endYear] = this.getYear();
        const rawEvents = await this.fetchEvents(calendar_id, startYear, endYear);

        const events: CalendarEvent[] = rawEvents.map((x) => ({
            summary: x.summary ?? "",
            startTime: new Date((x.start?.date || x.start?.dateTime) ?? ""),
            endTime: new Date((x.end?.date || x.end?.dateTime) ?? "")
        }));

        return this.timeSort(events);
    }

    public async get(calendar_ids: string[]): Promise<CalendarEvent[]> {
        let events: CalendarEvent[] = [];
        for (const id of calendar_ids) {
            events = events.concat(await this.getSingle(id));
        }

        return this.timeSort(events);
    }
}

export { CalendarAPI, CalendarEvent };
export default CalendarAPI;
