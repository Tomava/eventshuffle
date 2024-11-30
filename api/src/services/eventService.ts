import { DB_CONFIG } from "../config";
import db from "../database/db";
import { Event, NewVote } from "../models/eventModel";

export const getEvents = async (): Promise<Event[]> => {
  try {
    const events = await db(DB_CONFIG.EVENTS_TABLE).select("*");
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
    const event: Event | null = await db(DB_CONFIG.EVENTS_TABLE)
      .where({ id })
      .first();

    const votes = await db(DB_CONFIG.VOTES_TABLE)
      .where({ event_id: id })
      .groupBy("date")
      .orderBy("date")
      .select(db.raw("date, array_agg(name) as people"));

    return event ? { ...event, votes } : null;
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

export const createEvent = async (event: Omit<Event, "id">): Promise<Event> => {
  try {
    const newEvent = (
      await db(DB_CONFIG.EVENTS_TABLE).insert(event).returning<Event[]>("*")
    )[0];
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
  id: string,
  newVote: NewVote
): Promise<Event | null> => {
  try {
    const event: Event | null = await db(DB_CONFIG.EVENTS_TABLE)
      .where({ id })
      .first();

    if (!event) {
      return null;
    }

    const promises = newVote.votes.map(async (date) => {
      const voteObject = { event_id: event.id, name: newVote.name, date };
      return db(DB_CONFIG.VOTES_TABLE).insert(voteObject);
    });

    await Promise.all(promises);

    return await getOneEvent(id);
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
