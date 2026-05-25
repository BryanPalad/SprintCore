import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),

    email: z.string().email("Please enter a valid email address"),

    password: z.string().min(8, "Password must be at least 8 characters long"),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),

    termsAndPrivacyPolicy: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and privacy policy",
    }),
  })
  .superRefine((data, ctx) => {
    if (
      data.confirmPassword.length >= 8 &&
      data.password !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

export type RegisterPayload = Pick<
  SignUpFormData,
  "name" | "email" | "password"
>;