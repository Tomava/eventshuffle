import { EventModel, NewVote } from "../models/eventModel";
import { Event } from "../models/eventModel";

export const getEvents = async (): Promise<Event[]> => {
  try {
    const events = await EventModel.find().select('_id name');;
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

export const getOneEvent = async (id: string): Promise<Event | null> => {
  try {
    const event = await EventModel.findById(id);
    return event;
  } catch (err: unknown) {
    // TODO: Simplify error handling
    if (err instanceof Error) {
      console.error("Error fetching event:", err.message);
      throw new Error("Error fetching event: " + err.message);
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

export const addVote = async (
  id: string, newVote: NewVote
): Promise<Event | null> => {
  try {
    const event = await EventModel.findById(id);
    
    if (!event) {
      return null;
    }

    const { name, votes: newVotes } = newVote;

    newVotes.map((date) => {
      const existingVote = event.votes?.find(vote => vote.date === date);
      if (!existingVote) {
        event.votes?.push({ date, people: [name] });
      } else {
        existingVote.people.push(name);
      }
    })

    const updatedEvent = await event.save();

    return updatedEvent;
  } catch (err: unknown) {
    // TODO: Simplify error handling
    if (err instanceof Error) {
      console.error("Error adding vote:", err.message);
      throw new Error("Error adding vote: " + err.message);
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};
