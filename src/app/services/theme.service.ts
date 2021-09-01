import {Appearance} from 'react-native';
import { DarkTheme, DefaultTheme } from '../../styles/themes/themes';
import storageService from './storage.service';

class ThemeService {
  private userTheme: 'light' | 'dark' | null = null;

  /** Loads the theme from storage */
  loadTheme = async () => {
    this.userTheme = await storageService.getUserTheme() || this.defaultTheme;
    return this.userTheme;
  };

  /** Sets the theme */
  setTheme = (theme: 'light' | 'dark' | null) => {
    this.userTheme = theme;
  };

  /** The currently applied theme name, or 'dark' as default */
  get currentThemeName() {
    const theme = this.userTheme || this.defaultTheme;
    return theme;
  }

  /** The currently applied theme */
  get currentTheme() {
    return this.currentThemeName === 'dark' ? DarkTheme : DefaultTheme;
  }

  /** Checks if the currently applied theme is device theme */
  get isDeviceTheme() {
    return !this.userTheme;
  }

  private get defaultTheme() {
    return Appearance.getColorScheme() || 'dark'
  }
}

export default new ThemeService();
