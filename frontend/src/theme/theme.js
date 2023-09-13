import { createTheme } from '@mui/material/styles';
import { Tokens } from '../../.mirrorful/theme';

export const theme = createTheme({
  palette: {
    bgColor: {
      main: '#1F2125',
    },
    text: {
      ...Tokens.colors.text,
    },
    background: {
      ...Tokens.colors.background,
    },
    grey: {
      ...Tokens.colors.grey,
    },
    skyblue: {
      ...Tokens.colors.skyblue,
    },
    milky: {
      ...Tokens.colors.milky,
    },
    error: {
      ...Tokens.colors.error,
    },
    success: {
      ...Tokens.colors.success,
    },
  },
  typography: {
    fontFamily: 'Public Sans,sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1400,
      xl: 1536,
    },
  },
});
