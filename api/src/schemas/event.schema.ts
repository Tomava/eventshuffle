import { z } from "zod";
import { eventVoteSchema, voteSchema } from "./vote.schema";

export const eventSchema = z.object({
  id: z.string().uuid("ID must be a valid UUID."),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be under 256 characters"),
  dates: z.array(z.date()).optional(),
  votes: z.array(eventVoteSchema).optional(),
});

export const newEventSchema = z.object({
  name: eventSchema.shape.name,
  dates: z.array(z.string().date()),
});

export const eventResultSchema = eventSchema.extend({
  suitableDates: z.array(voteSchema),
});

export const idSchema = eventSchema.shape.id;

export const idParamSchema = z.object({
  id: eventSchema.shape.id,
});

export type Event = z.infer<typeof eventSchema>;
export type NewEvent = z.infer<typeof newEventSchema>;
export type EventResult = z.infer<typeof eventResultSchema>;
export type ID = z.infer<typeof idSchema>;
