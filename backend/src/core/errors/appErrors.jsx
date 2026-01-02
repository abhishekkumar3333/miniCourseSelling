export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "NotFound") {
    super(message, 404);
    this.name = "NotFoundError";
    this.message = message;
    this.statusCode = 404;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "BadRequest") {
    super(message, 400);
    this.name = "BadRequestError";
    this.message = message;
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
    this.message = message;
    this.statusCode = 401;
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
    this.message = message;
    this.statusCode = 403;
  }
}
