const { z } = require("zod");

// login validation schema

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .max(15)
    .min(5, "Password must be at least 6 characters long"),
});

module.exports = {
  loginSchema
};
