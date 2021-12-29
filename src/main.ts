import DB from "./util/database";
import genCalendars from "./init/calendars";

const calendarID = "jjr0au21evqc6guauvan3034ug@group.calendar.google.com";

async function main() {
    const db = await DB.get();
    const modules = db.collection("modules");

    modules.insertOne({ name: "SHS" });

    console.log("Database opened");
}

//main();
genCalendars();
