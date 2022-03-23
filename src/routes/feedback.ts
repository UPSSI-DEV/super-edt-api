import { Router, Request, Response } from "express";
import ErrorHandler from "@/routes/config/error";
import { wrap } from "async-middleware";

import feedbackController from "@/controllers/feedback";

/* Router config */

const feedbackRouter = Router();
feedbackRouter.post("/", wrap(sendFeedback));

export default feedbackRouter;

/* Methods */

async function sendFeedback(req: Request, res: Response) {
  if (req.query.feedback == undefined)
    throw new ErrorHandler(400, "Missing parameter 'feedback'");

  const result = feedbackController.postFeedback(<string>req.query.feedback);
  res.json({ success: result });
}
