import { Router, Request, Response } from "express";
import ErrorHandler from "@/routes/config/error";
import { wrap } from "async-middleware";

import { GoogleSpreadsheet } from "google-spreadsheet";
import config from "@/config";

/* Router config */

const feedbackRouter = Router();
feedbackRouter.post("/", wrap(sendFeedback));

export default feedbackRouter;

/* Methods */

async function sendFeedback(req: Request, res: Response) {
  if (req.query.feedback == undefined)
    throw new ErrorHandler(400, "Missing parameter 'feedback'");

  const sheet = await getSheetHandler();
  const date = new Date().toLocaleString();

  sheet.addRow([date, config.version, <string>req.query.feedback]);

  res.json({
    success: true,
  });
}

async function getSheetHandler() {
  const doc = new GoogleSpreadsheet(config.feedback.sheetId);

  await doc.useServiceAccountAuth(config.feedback.apiKey);
  await doc.loadInfo();

  return doc.sheetsByIndex[0];
}
