const { z } = require("zod");

// Registration validation schema

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long"),
  email: z.string({ required_error: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .max(15)
    .min(5, "Password must be at least 6 characters long"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long")
    .regex(/^\d+$/, "Phone must contain digits only"),
});

module.exports = {
  signupSchema,
};