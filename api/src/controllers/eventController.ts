import { Request, Response } from "express";
import { getEvents, getOneEvent, createEvent, addVote } from "../services/eventService";

export const getEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getEvents();
    res.status(200).json({ events });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneEventController = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Invalid event ID" });
  }

  try {
    const event = await getOneEvent(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
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
    res.status(201).json({ id: newEvent.id });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addVoteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Invalid event ID" });
  }

  const { name, votes } = req.body;
  if (!name || !votes) {
    res.status(400).json({ error: "Invalid arguments" });
  }

  try {
    const updatedEvent = await addVote(id, {name, votes});
    res.status(201).json(updatedEvent);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getResultController = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   if (!id) {
//     res.status(400).json({ error: "Invalid event ID" });
//   }

//   try {
//     const event = await getResult(id);
//     res.status(200).json(event);
//   } catch (err: unknown) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
