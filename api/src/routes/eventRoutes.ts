import express from "express";
import { createEventController, getEventsController } from "../controllers/eventController";

const router = express.Router();

router.get("/event/list", getEventsController);
router.post("/event", createEventController);

export default router;
