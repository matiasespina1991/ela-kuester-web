// src/theme/theme.ts
"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
  },
  typography: {
    fontFamily: 'NeueHaasDisplay, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none', 
          fontSize: '0.9rem',
          borderRadius: '22px', 
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

export default theme;
