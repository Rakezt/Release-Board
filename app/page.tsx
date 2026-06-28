'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import api from '@/lib/axios';

interface Release {
  _id: string;
  name: string;
  releaseDate: string;
  status: 'planned' | 'ongoing' | 'done';
}

export default function HomePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['releases'],
    queryFn: async () => {
      const response = await api.get('/releases');
      return response.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/releases/${id}`);
    },
    onSuccess: () => {
      toast.success('Release deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['releases'],
      });
    },
    onError: () => {
      toast.error('Unable to delete release');
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 5 }}>
      <Stack
        sx={{
          direction: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography sx={{ variant: 'h4', fontWeight: 700 }}>
          Release Checklist
        </Typography>

        <Button
          startIcon={<AddIcon />}
          onClick={() => router.push('/releases/new')}
        >
          New Release
        </Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((release: Release) => (
              <TableRow key={release._id} hover>
                <TableCell>{release.name}</TableCell>

                <TableCell>
                  {dayjs(release.releaseDate).format('DD MMM YYYY hh:mm A')}
                </TableCell>

                <TableCell>
                  <Chip
                    label={release.status.toUpperCase()}
                    color={
                      release.status === 'done'
                        ? 'success'
                        : release.status === 'ongoing'
                          ? 'warning'
                          : 'default'
                    }
                  />
                </TableCell>

                <TableCell align='right'>
                  <IconButton
                    onClick={() => router.push(`/releases/${release._id}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    color='error'
                    onClick={() => deleteMutation.mutate(release._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
