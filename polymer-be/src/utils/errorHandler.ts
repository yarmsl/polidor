export const errorHandler = (error: unknown, message: string) => {
  if (error instanceof HttpError) return error;
  if (error instanceof Error) {
    if (error?.message) {
      return { message: error.message, statusCode: 500 };
    }

    return { ...error, statusCode: 500 };
  }

  return { message, statusCode: 500 };
};

export const unauthorizedError = (message = 'Неавторизованный запрос') =>
  new HttpError(message, 401);

export const forbiddenError = (message = 'Операция запрещена') => new HttpError(message, 403);

export const notFoundError = (message = 'Ресурс не найден') => new HttpError(message, 404);

export const existsError = (message = 'Ресурс уже существует') => new HttpError(message, 409);

export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
