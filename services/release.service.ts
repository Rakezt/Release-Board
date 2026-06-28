import {
  createRelease,
  deleteRelease,
  getAllReleases,
  getReleaseById,
  updateRelease,
} from '@/repositories/release.repository';
import {
  createReleaseSchema,
  updateReleaseSchema,
} from '@/validations/release.validation';
import { calculateReleaseStatus } from '@/utils/calculateReleaseStatus';
import { AppError } from '@/utils/AppError';
import { IReleaseDocument } from '@/types/release.types';

const mapRelease = (release: IReleaseDocument) => {
  const releaseObject = release.toObject();

  return {
    ...releaseObject,
    status: calculateReleaseStatus(releaseObject.steps),
  };
};

export const releaseService = {
  async create(payload: unknown) {
    const validatedPayload = createReleaseSchema.parse(payload);

    const release = await createRelease(validatedPayload);

    return mapRelease(release);
  },

  async getAll() {
    const releases = await getAllReleases();

    return releases.map(mapRelease);
  },

  async getById(id: string) {
    const release = await getReleaseById(id);

    if (!release) {
      throw new AppError('Release not found.', 404);
    }

    return mapRelease(release);
  },

  async update(id: string, payload: unknown) {
    const validatedPayload = updateReleaseSchema.parse(payload);

    const release = await updateRelease(id, validatedPayload);

    if (!release) {
      throw new AppError('Release not found.', 404);
    }

    return mapRelease(release);
  },

  async delete(id: string) {
    const release = await deleteRelease(id);

    if (!release) {
      throw new AppError('Release not found.', 404);
    }

    return null;
  },
};
