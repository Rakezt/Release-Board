import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { apiResponse } from '@/utils/apiResponse';
import { releaseService } from '@/services/release.service';
import { handleApiError } from '@/utils/handleApiError';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    const release = await releaseService.getById(id);

    return apiResponse(true, 'Release fetched successfully.', release);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const release = await releaseService.update(id, body);

    return apiResponse(true, 'Release updated successfully.', release);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    await releaseService.delete(id);

    return apiResponse(true, 'Release deleted successfully.');
  } catch (error) {
    return handleApiError(error);
  }
}
