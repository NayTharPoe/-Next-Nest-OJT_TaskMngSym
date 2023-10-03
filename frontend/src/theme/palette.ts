import { alpha } from '@mui/material/styles';
import { Tokens } from '../../.mirrorful/theme';

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: Tokens.colors.purple['200'],
  light: Tokens.colors.purple['300'],
  main: Tokens.colors.purple.base,
  dark: Tokens.colors.purple['800'],
  darker: Tokens.colors.purple['900'],
  contrastText: Tokens.colors.purple['50'],
  border: Tokens.colors.purple['500'],
};

const SECONDARY = {
  lighter: Tokens.colors.algae['200'],
  light: Tokens.colors.algae['300'],
  main: Tokens.colors.algae.base,
  dark: Tokens.colors.algae['800'],
  darker: Tokens.colors.algae['900'],
  contrastText: Tokens.colors.algae['50'],
  border: Tokens.colors.algae['500'],
};

const CHARCOAL = {
  lighter: Tokens.colors.charcoal['200'],
  light: Tokens.colors.charcoal['300'],
  main: Tokens.colors.charcoal.base,
  dark: Tokens.colors.charcoal['800'],
  darker: Tokens.colors.charcoal['900'],
  contrastText: Tokens.colors.charcoal['50'],
};

const ASH = {
  lighter: Tokens.colors.ash['200'],
  light: Tokens.colors.ash['300'],
  main: Tokens.colors.ash.base,
  dark: Tokens.colors.ash['800'],
  darker: Tokens.colors.ash['900'],
  contrastText: Tokens.colors.ash['50'],
};

const ACCENT = {
  lighter: Tokens.colors.accent['200'],
  light: Tokens.colors.accent['300'],
  main: Tokens.colors.accent.base,
  dark: Tokens.colors.accent['800'],
  darker: Tokens.colors.accent['900'],
  contrastText: Tokens.colors.accent['50'],
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: Tokens.colors.error['200'],
  light: Tokens.colors.error['300'],
  main: Tokens.colors.error.base,
  dark: Tokens.colors.error['800'],
  darker: Tokens.colors.error['900'],
  contrastText: Tokens.colors.error['50'],
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  charcoal: CHARCOAL,
  ash: ASH,
  accent: ACCENT,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: '#161513',
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#efeeec',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
