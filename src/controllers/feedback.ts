import { GoogleSpreadsheet } from "google-spreadsheet";
import config from "@/config";

/* Exports */
export default {
  postFeedback,
};

/* Methods */

async function postFeedback(feedback: string) {
  const sheet = await getSheetHandler();
  const date = new Date().toLocaleString();

  const row = await sheet.addRow([date, config.version, feedback]);

  return row != null;
}

async function getSheetHandler() {
  const doc = new GoogleSpreadsheet(config.feedback.sheetId);

  await doc.useServiceAccountAuth(config.feedback.apiKey);
  await doc.loadInfo();

  return doc.sheetsByIndex[0];
}
