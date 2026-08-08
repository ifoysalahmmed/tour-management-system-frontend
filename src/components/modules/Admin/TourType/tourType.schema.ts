import * as z from "zod";

export const tourTypeSchema = z.object({
  name: z.string().min(1, { error: "Tour type name is required" }),
});

export type TourTypeFormInputs = z.infer<typeof tourTypeSchema>;
