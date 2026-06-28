import mongoose, { Schema, Model } from 'mongoose';
import { RELEASE_STEPS } from '@/constants/releaseSteps';
import { IRelease } from '@/types/release.types';

const defaultSteps = Object.fromEntries(
  RELEASE_STEPS.map(({ key }) => [key, false]),
);

const stepSchemaDefinition = Object.fromEntries(
  RELEASE_STEPS.map(({ key }) => [
    key,
    {
      type: Boolean,
      default: false,
    },
  ]),
);

const releaseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    additionalInfo: {
      type: String,
      trim: true,
      default: '',
    },

    steps: {
      type: new Schema(stepSchemaDefinition, {
        _id: false,
      }),
      default: defaultSteps,
    },
  },
  {
    timestamps: true,
    collection: 'cactro-release',
  },
);

const ReleaseModel: Model<IRelease> =
  mongoose.models.Release || mongoose.model<IRelease>('Release', releaseSchema);

export default ReleaseModel;
