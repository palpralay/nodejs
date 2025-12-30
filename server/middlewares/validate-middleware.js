const validateBody = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parseAsync(req.body);
    req.body = validatedData;
    next();
  } catch (err) {
    const message = err.issues?.[0]?.message || "Invalid request data";
    next(err);
    console.error("Validation Error:", err.issues);

    return res.status(400).json({
      success: false,
      message,
      errors: err.issues,
    });
  }
};

module.exports = validateBody;
