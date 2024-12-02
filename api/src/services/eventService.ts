import { DB_CONFIG } from "../config";
import db from "../database/db";
import { ResponseError } from "../models/error";
import { Event, EventResult, NewEvent, ID } from "../schemas/event.schema";
import { NewVote } from "../schemas/vote.schema";

const handleError = (err: unknown) => {
  if (err instanceof Error) {
    if (err.message === "Not Found") {
      throw new ResponseError("Not Found", 404);
    }
    console.error("Error fetching events:", err.message);
    throw new Error("Error fetching events: " + err.message);
  } else {
    console.error("An unknown error occurred");
    throw new Error("An unknown error occurred");
  }
};

export const getEvents = async (): Promise<Event[] | null> => {
  try {
    const events = await db(DB_CONFIG.EVENTS_TABLE).select("id", "name");
    return events;
  } catch (err: unknown) {
    handleError(err);
    return null;
  }
};

export const getOneEvent = async (id: ID): Promise<Event | null> => {
  try {
    const event: Event | null = await db(DB_CONFIG.EVENTS_TABLE)
      .where({ id })
      .first();

    if (!event) {
      throw new ResponseError("Not Found", 404, "Event not found");
    }

    const votes = await db(DB_CONFIG.VOTES_TABLE)
      .where({ event_id: id })
      .groupBy("date")
      .orderBy("date")
      .select(db.raw("date, array_agg(name) as people"));

    return { ...event, votes };
  } catch (err: unknown) {
    handleError(err);
    return null;
  }
};

export const createEvent = async (
  event: NewEvent
): Promise<Event | null> => {
  try {
    const newEvent = (
      await db(DB_CONFIG.EVENTS_TABLE).insert(event).returning<Event[]>("*")
    )[0];
    return newEvent;
  } catch (err: unknown) {
    handleError(err);
    return null;
  }
};

export const addVote = async (
  id: ID,
  newVote: NewVote
): Promise<Event | null> => {
  try {
    const event: Event | null = await db(DB_CONFIG.EVENTS_TABLE)
      .where({ id })
      .first();

    if (!event) {
      throw new ResponseError("Not Found", 404, "Event not found");
    }

    const promises = newVote.votes.map(async (date) => {
      const voteObject = { event_id: event.id, name: newVote.name, date };
      return db(DB_CONFIG.VOTES_TABLE).insert(voteObject);
    });

    await Promise.all(promises);

    return await getOneEvent(id);
  } catch (err: unknown) {
    handleError(err);
    return null;
  }
};

export const getResult = async (id: ID): Promise<EventResult | null> => {
  try {
    const event: Event | null = await db(DB_CONFIG.EVENTS_TABLE)
      .where({ id })
      .first();

    if (!event) {
      throw new ResponseError("Not Found", 404, "Event not found");
    }

    const allNames = (
      await db(DB_CONFIG.VOTES_TABLE)
        .where({ event_id: id })
        .distinct("name")
        .select("name")
    ).map((row) => row.name);

    const suitableDates = await db(DB_CONFIG.VOTES_TABLE)
      .where({ event_id: id })
      .groupBy("date")
      .orderBy("date")
      .havingRaw(
        `
        array_agg(name ORDER BY name) = ?`,
        [allNames]
      )
      .select(db.raw("date, array_agg(name) as people"));

    return event ? { ...event, suitableDates } : null;
  } catch (err: unknown) {
    handleError(err);
    return null;
  }
};
