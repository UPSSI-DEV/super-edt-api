import DB from "../util/database";
import { readFileSync } from "fs";
import { join } from "path";
import { Collection, Db } from "mongodb";

export default async function genCalendars() {
    const db = await DB.get();
    const calendars = db.collection("calendars");

    try {
        console.log(__dirname);
        let ids = readFileSync(join(__dirname, "../res/calendars.conf"), "utf-8")
            .split("\n")
            .filter((line) => !(line == "" || line.startsWith("#")));

        console.log(ids);

        for (const id of ids) {
            await addItem(calendars, id);
        }
    } catch (error) {
        console.log("file missing");
        throw error;
    }

    DB.close();
}

async function addItem(collection: Collection, id: string) {
    return new Promise((resolve, reject) => {
        collection.find({ calendarId: id }).toArray((err, result) => {
            if (err) throw reject(err);
            console.log(result);
            if (result?.length == 0) collection.insertOne({ calendarId: id });
            resolve(null);
        });
    });
}
