export class AppError extends Error {
  statusCode: number

  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class ValidationError extends AppError {
  constructor (message: string) {
    super(message, 400) // Bad Request
  }
}

export class ConflictError extends AppError {
  constructor (message: string) {
    super(message, 409) // Conflict
  }
}

export class NotFoundError extends AppError {
  constructor (message: string) {
    super(message, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor (message: string) {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor (message: string) {
    super(message, 403)
  }
}
