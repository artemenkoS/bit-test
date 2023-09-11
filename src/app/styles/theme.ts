import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: '8px',
          paddingBottom: '8px',
          '&:last-child': {
            paddingBottom: '8px',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          bottom: '-1.2rem',
        },
      },
    },
  },
});
