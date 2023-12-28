
import { alpha, createTheme, getContrastRatio } from '@mui/material';
import { violetMain, violetBase, salmonMain, salmonBase2, salmonBase } from './themecolors';


export const AppTheme = createTheme({
  palette: {
      catalogviolet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    catalogsalmon: {
      main: salmonMain,
      light: alpha(salmonBase2, 0.5),
      dark: alpha(salmonBase, 0.9),
      contrastText: getContrastRatio(salmonMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});
