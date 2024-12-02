import { Request, Response } from "express";
import {
  getEvents,
  getOneEvent,
  createEvent,
  addVote,
  getResult,
} from "../services/eventService";
import { ResponseError } from "../models/error";
import { ID, idSchema } from "../schemas/event.schema";

const handleError = (err: unknown, res: Response) => {
  if (err instanceof ResponseError) {
    return res
      .status(err.statusCode)
      .json({ error: err.message, message: err.details });
  } else {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const parseId = (req: Request): ID | null => {
  const { id: id_str } = req.params;

  if (!id_str) {
    return null;
  }
  try {
    return idSchema.parse(id_str);
  } catch {
    return null;
  }
};

export const getEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getEvents();
    res.status(200).json({ events });
  } catch (err: unknown) {
    handleError(err, res);
  }
};

export const getOneEventController = async (req: Request, res: Response) => {
  const id = parseId(req);

  if (!id) {
    res.status(400).json({ error: "Invalid event ID" });
    return;
  }

  try {
    const event = await getOneEvent(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Not Found", message: "Event not found" });
    }
  } catch (err: unknown) {
    handleError(err, res);
  }
};

export const createEventController = async (req: Request, res: Response) => {
  const { name, dates } = req.body;

  try {
    const newEvent = await createEvent({ name, dates });
    res.status(201).json({ id: newEvent?.id });
  } catch (err: unknown) {
    handleError(err, res);
  }
};

export const addVoteController = async (req: Request, res: Response) => {
  const id = parseId(req);

  if (!id) {
    res.status(400).json({ error: "Invalid event ID" });
    return;
  }

  const { name, votes } = req.body;

  try {
    const updatedEvent = await addVote(id, { name, votes });
    res.status(201).json(updatedEvent);
  } catch (err: unknown) {
    handleError(err, res);
  }
};

export const getResultController = async (req: Request, res: Response) => {
  const id = parseId(req);

  if (!id) {
    res.status(400).json({ error: "Invalid event ID" });
    return;
  }

  try {
    const event = await getResult(id);
    res.status(200).json(event);
  } catch (err: unknown) {
    handleError(err, res);
  }
};
