import {
  DarkTheme as NavDark,
  DefaultTheme as NavDefault,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDark,
  DefaultTheme as PaperDefault,
} from 'react-native-paper';
import colors from '../colors';

type ThemeType = typeof PaperDefault & typeof NavDefault;
const DarkTheme: ThemeType = {
  ...NavDark,
  ...PaperDark,
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
  colors: {
    ...PaperDefault.colors,
    ...NavDefault.colors,
    primary: colors.primary,
    accent: colors.primaryLight,
  },
};

export {DarkTheme, DefaultTheme};
