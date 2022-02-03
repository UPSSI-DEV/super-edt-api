/*import * as data from "./res/events.json";

interface Module {
    code: string;
    nom: string;
}

let tab_modules: Module[] = [];
const regex = /[A-Z]{5}(\d)[A-Z]\d/gm;
const find = false;

for (let i = 0; i < data.length; i++) {
    const event = data[i];

    if (event.summary.match(regex)) {
        console.log(event.summary.match(regex));
    }
}*/

import CalendarAPI from "./app/calendar-api";
import * as moment from "moment";

const MODULE_ID = "ELURO6C2";

const link = {
    common: "8nam511995lbsisujjcq80h964@group.calendar.google.com",
    class: "jjr0au21evqc6guauvan3034ug@group.calendar.google.com",
    lab: "4jpbp5hcdimlmov6kscioe4am8@group.calendar.google.com"
};

async function main() {
    const api = new CalendarAPI();
    const events = await api.get([link.common, link.class, link.lab]);

    const getDate = (d: Date) => {
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    };

    console.table(
        events
            .filter((ev) => ev.summary.includes(MODULE_ID))
            .map((x) => ({
                name: x.summary,
                date: moment(x.startTime).format("DD-MM-YYYY")
            }))
    );
}

main();
