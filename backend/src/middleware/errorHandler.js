export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Handle Mongoose cast errors (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid format for field: ${err.path}`,
      errors: [err.message],
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Handle Duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `Duplicate value entered for ${field}. Please use another value.`,
      errors: [`${field} must be unique`],
    });
  }

  // Generic or unexpected errors
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected server error occurred',
    errors: process.env.NODE_ENV === 'development' ? [err.stack] : [],
  });
}
