'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#6366F1',
    },

    secondary: {
      main: '#06B6D4',
    },

    background: {
      default: '#09090B',
      paper: '#111827',
    },

    success: {
      main: '#22C55E',
    },

    warning: {
      main: '#F59E0B',
    },

    error: {
      main: '#EF4444',
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
      ',',
    ),

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'small',
      },
    },
  },
});

export default theme;
