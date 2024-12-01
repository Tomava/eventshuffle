import express from "express";
import { addVoteController, createEventController, getEventsController, getOneEventController, getResultController } from "../controllers/eventController";
import { validate } from "../middleware/validateEvent";
import { createEventSchema, eventIdSchema } from "../schemas/event.schema";
import { addVoteSchema } from "../schemas/vote.schema";

const router = express.Router();

router.get("/event/list", getEventsController);
router.get("/event/:id", validate(undefined, eventIdSchema), getOneEventController);
router.post("/event", validate(createEventSchema, undefined), createEventController);
router.post("/event/:id/vote", validate(addVoteSchema, eventIdSchema), addVoteController);
router.get("/event/:id/results", validate(undefined, eventIdSchema), getResultController);

export default router;
