import { Request, Response } from "express";
import { getEvents } from "../services/eventService";


export const getAllEvents = (req: Request, res: Response) => {
    const events = getEvents();
    res.status(200).json({events});
};
