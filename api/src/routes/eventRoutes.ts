import express from "express";
import { addVoteController, createEventController, getEventsController, getOneEventController, getResultController } from "../controllers/eventController";

const router = express.Router();

router.get("/event/list", getEventsController);
router.get("/event/:id", getOneEventController);
router.post("/event", createEventController);
router.post("/event/:id/vote", addVoteController);
router.get("/event/:id/results", getResultController);

export default router;
