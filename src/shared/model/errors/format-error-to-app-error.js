import { apiMessages } from './messages'
import { AppError } from './app-error'
export async function formatErrorToAppError(error) {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Response) {
    const res = await error.json()
    return new AppError(
      res.message ?? res.details ?? res.error ?? apiMessages.INTERNAL_ERROR,
      error.status,
    )
  }

  if (
    error instanceof Error &&
    error.name === 'SyntaxError' &&
    error.message === 'Unexpected end of JSON input'
  ) {
    return new AppError(apiMessages.EMPTY_BODY, 400, 'EMPTY_BODY')
  }

  if (error instanceof Error && error.stack?.includes('SyntaxError')) {
    return new AppError(apiMessages.BAD_REQUEST, 400, 'BAD_REQUEST')
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500, 'INTERNAL_ERROR')
  }
  return new AppError(apiMessages.INTERNAL_ERROR, 500, 'INTERNAL_ERROR')
}
