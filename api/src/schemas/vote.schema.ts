import { z } from "zod";

export const addVoteSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be under 256 characters"),
  votes: z.array(z.string().date()),
});

export type AddEventInput = z.infer<typeof addVoteSchema>;
