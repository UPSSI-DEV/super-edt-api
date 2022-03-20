import { Router, urlencoded, json } from "express";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import moment from "moment";

const routeManager = Router();

/* Plugins */
routeManager.use(urlencoded({ extended: true }));
routeManager.use(json());

routeManager.use(cors());
routeManager.use(helmet());
routeManager.use(customMorgan());

/* Methods */
function customMorgan() {
  return morgan(function (tokens, req, res) {
    return (
      `[${moment().format("DD/MM/YYYY HH:mm")}] ` +
      [
        tokens.method(req, res),
        tokens.url(req, res)?.split("?").shift(),
        tokens.status(req, res),
      ].join(" ") +
      ` - ${tokens["response-time"](req, res)} ms`
    );
  });
}

/* Exports */
export default routeManager;
