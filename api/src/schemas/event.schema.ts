import { z } from "zod";

export const createEventSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be under 256 characters"),
  dates: z.array(z.string().date()),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
