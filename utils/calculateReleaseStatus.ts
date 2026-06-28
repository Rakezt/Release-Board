export type ReleaseStatus = 'planned' | 'ongoing' | 'done';

export function calculateReleaseStatus(
  steps: Record<string, boolean>,
): ReleaseStatus {
  const values = Object.values(steps);

  const completed = values.filter(Boolean).length;

  if (completed === 0) {
    return 'planned';
  }

  if (completed === values.length) {
    return 'done';
  }

  return 'ongoing';
}
