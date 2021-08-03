import {
  DarkTheme as NavDark,
  DefaultTheme as NavDefault,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDark,
  DefaultTheme as PaperDefault,
  Provider as PaperProvider,
} from 'react-native-paper';
import colors from '../colors';

const DarkTheme = {
  ...NavDark,
  ...PaperDark,
  colors: {
    ...PaperDark.colors,
    ...NavDark.colors,
    primary: colors.primaryLight,
  },
};

const DefaultTheme = {
  ...NavDefault,
  ...PaperDefault,
  colors: {
    ...PaperDefault.colors,
    ...NavDefault.colors,
    primary: colors.primary,
  },
};

export {DarkTheme, DefaultTheme};
