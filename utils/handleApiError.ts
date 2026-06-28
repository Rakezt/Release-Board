import { ZodError } from 'zod';
import { apiResponse } from './apiResponse';
import { AppError } from './AppError';

export const handleApiError = (error: unknown) => {
  if (error instanceof AppError) {
    return apiResponse(false, error.message, undefined, error.statusCode);
  }

  if (error instanceof ZodError) {
    return apiResponse(
      false,
      error.issues?.[0]?.message ?? 'Validation failed.',
      error.flatten(),
      400,
    );
  }

  console.error(error);

  return apiResponse(false, 'Internal Server Error', undefined, 500);
};
