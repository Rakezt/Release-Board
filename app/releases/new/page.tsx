'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'sonner';
import api from '@/lib/axios';

export default function NewReleasePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const createMutation = useMutation({
    mutationFn: async () => {
      await api.post('/releases', {
        name,
        releaseDate: new Date(releaseDate).toISOString(),
        additionalInfo,
      });
    },
    onSuccess: () => {
      toast.success('Release created successfully');
      router.push('/');
    },
    onError: () => {
      toast.error('Failed to create release');
    },
  });

  return (
    <Container maxWidth='md' sx={{ py: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography sx={{ variant: 'h4', mb: 4 }}>New Release</Typography>

        <Stack spacing={3}>
          <TextField
            label='Release Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label='Release Date'
            type='datetime-local'
            // InputLabelProps={{ shrink: true }}
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />

          <TextField
            label='Additional Information'
            multiline
            rows={5}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={() => router.back()} color='inherit'>
              Cancel
            </Button>

            <Button
              onClick={() => createMutation.mutate()}
              disabled={createMutation.isPending}
            >
              Create Release
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
