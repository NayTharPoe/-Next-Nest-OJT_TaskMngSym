import { createTheme } from '@mui/material/styles';
import Typography from './typograph';
import Palette from './palette';
// import ComponentOverrides from './overrides';

const themeOptions: any = {
  palette: Palette,
  typography: Typography('Public Sans,sans-serif'),
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1400,
      xl: 1536,
    },
  },
};

export const theme = createTheme(themeOptions);
