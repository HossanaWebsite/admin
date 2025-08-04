import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to terms",
  }),
});


export type SignUpSchema = z.infer<typeof signUpSchema>;
