import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { releaseService } from '@/services/release.service';
import { apiResponse } from '@/utils/apiResponse';
import { handleApiError } from '@/utils/handleApiError';

export async function GET() {
  try {
    await connectDB();

    const releases = await releaseService.getAll();

    return apiResponse(true, 'Releases fetched successfully.', releases);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const release = await releaseService.create(body);

    return apiResponse(true, 'Release created successfully.', release, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
