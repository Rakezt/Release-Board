import { Document } from 'mongoose';

export interface ReleaseSteps {
  mergedPRs: boolean;
  changelogUpdated: boolean;
  testsPassing: boolean;
  githubReleaseCreated: boolean;
  deployedToDemo: boolean;
  qaVerified: boolean;
  productionDeployment: boolean;
}

export type ReleaseStatus = 'planned' | 'ongoing' | 'done';

export interface Release {
  _id: string;
  name: string;
  releaseDate: string;
  additionalInfo?: string;
  steps: ReleaseSteps;
  createdAt: string;
  updatedAt: string;
}

export interface IRelease {
  name: string;
  releaseDate: Date;
  additionalInfo?: string;
  steps: Record<string, boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReleaseDocument extends IRelease, Document {}
