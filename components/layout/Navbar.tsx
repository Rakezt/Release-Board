'use client';

import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position='static' elevation={0}>
      <Toolbar>
        <Typography sx={{ variant: 'h6', fontWeight: 700 }}>
          Release Checklist
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
