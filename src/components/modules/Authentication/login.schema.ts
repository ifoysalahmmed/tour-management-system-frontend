import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: "Invalid email format",
  }),
  password: z.string({
    error: "Password must be a string",
  }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
