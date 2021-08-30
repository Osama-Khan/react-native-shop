import {Appearance} from 'react-native';
import { DarkTheme, DefaultTheme } from '../../styles/themes/themes';
import storageService from './storage.service';

class ThemeService {
  private userTheme: 'light' | 'dark' | null = null;

  /** Loads the theme from storage */
  loadTheme = async () => {
    this.userTheme = await storageService.getUserTheme();
    return this.userTheme;
  };

  /** Sets the theme */
  setTheme = (theme: 'light' | 'dark' | null) => {
    this.userTheme = theme;
  };

  /** The currently applied theme name, or 'dark' as default */
  get currentThemeName() {
    const theme = this.userTheme || Appearance.getColorScheme() || 'dark';
    return theme;
  }

  /** Checks if the currently applied theme is device theme */
  get isDeviceTheme() {
    return !this.userTheme;
  }
}

export default new ThemeService();
