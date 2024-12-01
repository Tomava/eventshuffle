import express from "express";
import { addVoteController, createEventController, getEventsController, getOneEventController, getResultController } from "../controllers/eventController";
import { validate } from "../middleware/validateEvent";
import { createEventSchema } from "../schemas/event.schema";
import { addVoteSchema } from "../schemas/vote.schema";

const router = express.Router();

router.get("/event/list", getEventsController);
router.get("/event/:id", getOneEventController);
router.post("/event", validate(createEventSchema), createEventController);
router.post("/event/:id/vote", validate(addVoteSchema), addVoteController);
router.get("/event/:id/results", getResultController);

export default router;
