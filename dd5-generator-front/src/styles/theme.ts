import { createTheme } from '@mui/material';

export const PRIMARY_COLOR = '#494230';
export const SECONDARY_COLOR = '#bbbfc2ff';
export const SECONDARY_COLOR_LIGHT = '#bbbfc27e';
export const BACKGROUND = '#f3f0ebff';
export const SECONDARY_BACKGROUND = '#dad3caff';

export const MAIN_THEME = createTheme({
  typography: {
    fontFamily: '"Merriweather", "Arial", sans-serif', // serif font first, fallback to sans-serif
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: BACKGROUND,
    },
    text: {
      primary: '#10232b',
    },
  },
});
