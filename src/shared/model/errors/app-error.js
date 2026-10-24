import { defaultErrorMessage } from './messages'

export class AppError extends Error {
  constructor(message = defaultErrorMessage) {
    super(message)
    this.name = this.constructor.name
  }
}

export class BusinessAppError extends AppError {}
