import {Appearance} from 'react-native';

class ThemeService {
  getCurrentTheme = (): 'dark' | 'light' => {
    const colorScheme = Appearance.getColorScheme() || 'light';
    return colorScheme;
  };
}

export default new ThemeService();
