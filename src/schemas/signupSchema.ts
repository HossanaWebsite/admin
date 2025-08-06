import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to terms",
  }),
});


export type SignUpSchema = z.infer<typeof signUpSchema>;
