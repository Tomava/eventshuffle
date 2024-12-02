import express from "express";
import { addVoteController, createEventController, getEventsController, getOneEventController, getResultController } from "../controllers/eventController";
import { validate } from "../middleware/validateEvent";
import { newEventSchema, idParamSchema } from "../schemas/event.schema";
import { newVoteSchema } from "../schemas/vote.schema";

const router = express.Router();

router.get("/event/list", getEventsController);
router.get("/event/:id", validate(undefined, idParamSchema), getOneEventController);
router.post("/event", validate(newEventSchema, undefined), createEventController);
router.post("/event/:id/vote", validate(newVoteSchema, idParamSchema), addVoteController);
router.get("/event/:id/results", validate(undefined, idParamSchema), getResultController);

export default router;
