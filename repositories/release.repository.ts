import ReleaseModel from '@/models/release.model';
import { IRelease } from '@/types/release.types';

export const createRelease = (payload: Partial<IRelease>) =>
  ReleaseModel.create(payload);

export const getAllReleases = () =>
  ReleaseModel.find().sort({
    releaseDate: -1,
  });

export const getReleaseById = (id: string) => ReleaseModel.findById(id);

export const updateRelease = (id: string, payload: Partial<IRelease>) =>
  ReleaseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

export const deleteRelease = (id: string) => ReleaseModel.findByIdAndDelete(id);
