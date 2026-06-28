'use client';

import Chip from '@mui/material/Chip';
import { ReleaseStatus } from '@/types/release.types';

interface Props {
  status: ReleaseStatus;
}

export default function StatusChip({ status }: Props) {
  const color =
    status === 'done'
      ? 'success'
      : status === 'ongoing'
        ? 'warning'
        : 'default';

  return <Chip label={status.toUpperCase()} color={color} size='small' />;
}
