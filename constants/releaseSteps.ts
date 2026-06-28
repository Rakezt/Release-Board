export const RELEASE_STEPS = [
  {
    key: 'mergedPRs',
    label: 'All relevant GitHub pull requests merged',
  },
  {
    key: 'changelogUpdated',
    label: 'CHANGELOG updated',
  },
  {
    key: 'testsPassing',
    label: 'All tests passing',
  },
  {
    key: 'githubReleaseCreated',
    label: 'GitHub Release created',
  },
  {
    key: 'deployedToDemo',
    label: 'Deployed to Demo',
  },
  {
    key: 'qaVerified',
    label: 'QA Verified',
  },
  {
    key: 'productionDeployment',
    label: 'Production Deployment',
  },
] as const;
