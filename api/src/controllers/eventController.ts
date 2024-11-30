import { Request, Response } from "express";
import { getEvents } from "../services/eventService";

export const getAllEvents = async (req: Request, res: Response) => {
    try {
      const events = await getEvents();
      res.status(200).json(events);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
};
