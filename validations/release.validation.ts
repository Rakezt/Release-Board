import { z } from 'zod';
import { RELEASE_STEPS } from '@/constants/releaseSteps';

const stepsSchema = z.object(
  Object.fromEntries(RELEASE_STEPS.map(({ key }) => [key, z.boolean()])),
);

export const createReleaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Release name must be at least 3 characters.')
    .max(100),

  releaseDate: z.coerce.date(),

  additionalInfo: z.string().optional(),
});

export const updateReleaseSchema = z.object({
  name: z.string().trim().min(3).max(100).optional(),

  releaseDate: z.coerce.date().optional(),

  additionalInfo: z.string().optional(),

  steps: stepsSchema.optional(),
});
