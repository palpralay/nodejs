const { z } = require("zod");

const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, "Message must be at least 10 characters long"),
});

module.exports = {
  contactSchema,
};
