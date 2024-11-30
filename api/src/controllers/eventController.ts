import { Request, Response } from "express";
import { getEvents } from "../services/eventService";


export const getAllEvents = (req: Request, res: Response) => {
    const users = getEvents();
    res.status(200).json(users);
};
