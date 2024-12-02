import { z } from "zod";

export const voteSchema = z.object({
  id: z.string().uuid("ID must be a valid UUID."),
  event_id: z.string().uuid("ID must be a valid UUID."),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be under 256 characters"),
  date: z.date(),
});

export const newVoteSchema = z.object({
  name: voteSchema.shape.name,
  votes: z.array(z.string().date()),
});

export const eventVoteSchema = z.object({
  date: voteSchema.shape.date,
  people: z.array(voteSchema.shape.name),
});

export type Vote = z.infer<typeof voteSchema>;
export type NewVote = z.infer<typeof newVoteSchema>;
export type EventVote = z.infer<typeof eventVoteSchema>;
