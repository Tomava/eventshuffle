import { Request, Response } from "express";
import { getEvents, createEvent } from "../services/eventService";

export const getEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createEventController = async (req: Request, res: Response) => {
  const { name, dates } = req.body;
  if (!name || !dates) {
    res.status(400).json({ error: "Invalid arguments" });
  }

  try {
    const newEvent = await createEvent({ name, dates });
    res.status(201).json({id: newEvent.id});
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
