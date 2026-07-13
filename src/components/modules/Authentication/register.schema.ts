import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name must be at least 3 characters long",
      })
      .max(50, {
        error: "Name must be at most 50 characters long",
      }),
    email: z.email({
      error: "Invalid email format",
    }),
    password: z
      .string()
      .min(8, {
        error: "Password must be at least 8 characters long",
      })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter",
      })
      .regex(/[!@#$%^&*()_+\-={}[\];':"\\|,.<>/?]/, {
        error: "Password must contain at least one special character",
      })
      .regex(/\d/, {
        error: "Password must contain at least one number",
      }),
    confirmPassword: z.string().min(1, {
      error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;
