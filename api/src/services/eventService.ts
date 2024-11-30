import { EventModel } from "../models/eventModel";
import { Event } from "../models/eventModel";

export const getEvents = async (): Promise<Event[]> => {
  try {
    const events = await EventModel.find();
    return events;
  } catch (err: unknown) {
    // TODO: Simplify error handling
    if (err instanceof Error) {
      console.error("Error fetching events:", err.message);
      throw new Error("Error fetching events: " + err.message);
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};

export const createEvent = async (
  event: Omit<Event, "id">
): Promise<Event> => {
  try {
    const newEvent = new EventModel(event);
    await newEvent.save();
    return newEvent;
  } catch (err: unknown) {
    // TODO: Simplify error handling
    if (err instanceof Error) {
      console.error("Error creating event:", err.message);
      throw new Error("Error creating event: " + err.message);
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};
