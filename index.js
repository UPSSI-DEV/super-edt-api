const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const fs = require("fs");
const https = require("https");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Read environment variables from .env file
require("dotenv").config();
require("./edt/date-util").setupDates();

/* == ROUTING ===================================================================================== */

app.get("/", (req, res) => {
    res.json({ message: "Behold The MEVN Stack!" });
});

const edt = require("./edt/edt");
const links = require("./edt/links");
const API_KEY = process.env.API_KEY;

app.get("/events/week", async (req, res) => {
    // Get beginning and end of week
    var week = req.query["w"] ? req.query["w"] : new Date().getWeek();
    const currentDay = new Date().getDay();

    // Check the current week is ending (saturday or sunday)
    if (currentDay == 6) {
        // Check if we are at the end of the year
        if (week == 51) {
            week = 1;
        } else {
            week++;
        }
    }

    const year = Date.schoolYear(week);
    const bounds = [
        Date.dayOfWeek(year, week, 1),
        Date.dayOfWeek(year, week, 6),
    ];

    // Get calendar list
    const calendarList = [
        links.EDT_1A.COMMON,
        links.EDT_1A.MAIN,
        links.EDT_1A.GROUP_1,
    ];

    const events = await edt.getEvents(API_KEY, calendarList, bounds);
    console.log(events);

    res.json(events);
});

app.get("/events/module/:code", (req, res) => {
    // TODO: waiting for proper module parsing
});

/* == SERVER LAUNCH =============================================================================== */
const port = process.env.PORT || 4000;

if (process.env.PROD) {
    const certificate = fs.readFileSync(process.env.SSL_CRT, "utf-8");
    const privateKey = fs.readFileSync(process.env.SSL_KEY, "utf-8");
    const credentials = { key: privateKey, cert: certificate };

    https
        .createServer(credentials, app)
        .listen(
            port,
            console.log(`[🚀] HTTPS Server ready at https://localhost:${port}/`)
        );
} else
    app.listen(
        port,
        console.log(`[🚀] HTTP Server ready at http://localhost:${port}/`)
    );
