'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import api from '@/lib/axios';
import { RELEASE_STEPS } from '@/constants/releaseSteps';

interface Release {
  _id: string;
  name: string;
  releaseDate: string;
  additionalInfo: string;
  status: 'planned' | 'ongoing' | 'done';
  steps: Record<string, boolean>;
}

export default function ReleaseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [steps, setSteps] = useState<Record<string, boolean>>({});
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['release', id],
    queryFn: async () => {
      const response = await api.get(`/releases/${id}`);
      return response.data.data as Release;
    },
    enabled: !!id,
  });

  if (data && !isInitialized) {
    setSteps(data.steps);
    setAdditionalInfo(data.additionalInfo ?? '');
    setIsInitialized(true);
  }

  const updateMutation = useMutation({
    mutationFn: async () => {
      await api.patch(`/releases/${id}`, {
        steps,
        additionalInfo,
      });
    },
    onSuccess: () => {
      toast.success('Release updated successfully');
      router.push('/');
    },
    onError: () => {
      toast.error('Failed to update release');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/releases/${id}`);
    },
    onSuccess: () => {
      toast.success('Release deleted');
      router.push('/');
    },
    onError: () => {
      toast.error('Delete failed');
    },
  });

  if (isLoading || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth='md' sx={{ py: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant='h4' gutterBottom>
          {data.name}
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          {dayjs(data.releaseDate).format('DD MMM YYYY hh:mm A')}
        </Typography>

        <Chip
          sx={{ mb: 4 }}
          label={data.status.toUpperCase()}
          color={
            data.status === 'done'
              ? 'success'
              : data.status === 'ongoing'
                ? 'warning'
                : 'default'
          }
        />

        <Typography sx={{ variant: 'h6', mb: 2 }}>Checklist</Typography>

        <Stack sx={{ spacing: 1, mb: 4 }}>
          {RELEASE_STEPS.map((step) => (
            <FormControlLabel
              key={step.key}
              control={
                <Checkbox
                  checked={steps[step.key] ?? false}
                  onChange={(e) =>
                    setSteps((prev) => ({
                      ...prev,
                      [step.key]: e.target.checked,
                    }))
                  }
                />
              }
              label={step.label}
            />
          ))}
        </Stack>

        <TextField
          label='Additional Information'
          multiline
          rows={5}
          fullWidth
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />

        <Stack sx={{ direction: 'row', spacing: 2, mt: 4 }}>
          <Button onClick={() => router.push('/')} color='inherit'>
            Back
          </Button>

          <Button
            onClick={() => updateMutation.mutate()}
            disabled={updateMutation.isPending}
          >
            Save
          </Button>

          <Button
            color='error'
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
