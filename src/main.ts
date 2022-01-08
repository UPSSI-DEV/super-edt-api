import * as express from "express";
const app = express();

import * as dotenv from "dotenv";
dotenv.config();

import * as EventManager from "./app/event-manager";

// Routes

app.get("/", (req, res) => res.send("hi"));
app.get("/events/:class", EventManager.getEvents);
app.get("/exams/:class", EventManager.getExams);
app.get("/modules/:class", EventManager.getModules);

// Launch server

const port = process.env.PORT ?? 4000;
app.listen(port, () => console.log("Backend launched on port " + port));
