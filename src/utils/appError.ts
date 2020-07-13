class AppError extends Error {
  status: string;
  isOperational: boolean;
  statusCode: string;
  constructor(message: string, statusCode: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
