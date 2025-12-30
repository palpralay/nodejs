const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });

  console.error("Error:", {
    message: err.message,
    statusCode,
    stack: err.stack,
  });
};
module.exports = errorMiddleware;