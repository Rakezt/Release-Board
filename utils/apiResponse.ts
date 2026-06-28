import { NextResponse } from 'next/server';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export function apiResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  status = 200,
) {
  const response: ApiResponse<T> = {
    success,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  return NextResponse.json(response, { status });
}
