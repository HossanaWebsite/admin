import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  summary: z.string().min(10),
  organizerPhone: z.string().min(8),
  organizerEmail: z.string().email(),
  image: z.any().optional(), // Will be handled via FileInput
});
