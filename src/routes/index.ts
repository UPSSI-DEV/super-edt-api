import routeManager from "./config/router";
import createServer from "./config/server";

import subjectsRouter from "./subjects";
import feedbackRouter from "./feedback";

/* Route management */
routeManager.use("/feedback", feedbackRouter);
routeManager.use("/events", subjectsRouter);

routeManager.get("/", (req, res) => res.send("Hello world"));

/* Export */

export { createServer, routeManager };
