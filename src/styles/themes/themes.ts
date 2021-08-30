import {
  DarkTheme as NavDark,
  DefaultTheme as NavDefault,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDark,
  DefaultTheme as PaperDefault,
} from 'react-native-paper';
import appVariables from '../abstract/app.variables';
import colors from '../colors';

type ThemeType = typeof PaperDefault & typeof NavDefault;

const DarkTheme: ThemeType = {
  ...NavDark,
  ...PaperDark,
  roundness: appVariables.borderRadius,
  colors: {
    ...PaperDark.colors,
    ...NavDark.colors,
    primary: colors.primary,
    accent: colors.primaryLight,
  },
};

const DefaultTheme: ThemeType = {
  ...NavDefault,
  ...PaperDefault,
  roundness: appVariables.borderRadius,
  colors: {
    ...PaperDefault.colors,
    ...NavDefault.colors,
    primary: colors.primary,
    accent: colors.primaryLight,
    background: colors.light,
    surface: colors.white,
    text: colors.dark,
  },
};

export {DarkTheme, DefaultTheme};
