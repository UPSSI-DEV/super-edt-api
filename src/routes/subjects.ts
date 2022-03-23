import { Router, Request, Response } from "express";
import { wrap } from "async-middleware";

import subjectsController from "@/controllers/subjects";

const subjectsRouter = Router();
subjectsRouter.get("/", wrap(getEvents));

export default subjectsRouter;

// Methods
async function getEvents(req: Request, res: Response) {
  const filterEvents = await subjectsController.getSubjects();
  res.json(filterEvents);
}
