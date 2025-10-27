// server/middlewares/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}
