import { Request, Response } from "express";
import CalendarAPI from "./calendar-api";
import { writeFileSync } from "fs";

import Calendar from "../data/schemas/calendar";

function getEvents(req: Request, res: Response) {
    const calendar = new CalendarAPI();
    calendar.get("jjr0au21evqc6guauvan3034ug@group.calendar.google.com").then((events) => {
        writeFileSync("src/res/events.json", JSON.stringify(events, null, 4));
    });

    res.send("Events");
}

function getModules(req: Request, res: Response) {
    console.log("ping");
    Calendar.insertMany([
        {
            id: 1234,
            link: "Hello"
        }
    ]);

    res.send("Modules");
}

function getExams(req: Request, res: Response) {
    res.send("Exams");
}

export { getEvents, getModules, getExams };
