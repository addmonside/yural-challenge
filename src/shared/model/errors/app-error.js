import { apiMessages, apiErrorCodes } from './messages'

export class AppError extends Error {
  constructor(message, status = 500, code = 'INTERNAL_ERROR', params = {}) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    this.fields = params.fields
    this.resource = params.resource
    this.identifier = params.identifier
  }
}

export class ValidationAppError extends AppError {
  constructor(fields) {
    super(apiMessages.VALIDATION_ERROR, 400, apiErrorCodes.VALIDATION_ERROR, { fields })
  }
}

export class NotFoundAppError extends AppError {
  constructor(resource, identifier) {
    super(apiMessages.getNotFound(resource, identifier), 404, apiErrorCodes.NOT_FOUND)
  }
}
