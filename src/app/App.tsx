import React from 'react';
import routes from './app.routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {DarkTheme, DefaultTheme} from '../styles/themes/themes';
import initializeInterceptors from './interceptors/interceptor-initializer';
import restoreSession from './session/restore-session';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store';
import themeService from './services/theme.service';
import colors from '../styles/colors';
import {StatusBar} from 'react-native';

class App extends React.Component<any, any> {
  state = {theme: themeService.currentThemeName};
  Stack: any;

  constructor(props: any) {
    super(props);
    initializeInterceptors();
    restoreSession();
  }

  componentDidMount() {
    themeService.loadTheme().then(async () => {
      const theme = await themeService.currentThemeName;
      this.setState({theme});
    });
  }

  render() {
    const isDark = this.state.theme === 'dark';
    this.Stack = createStackNavigator();
    const {Navigator, Screen} = this.Stack;
    return (
      <ReduxProvider store={store}>
        <StatusBar
          backgroundColor={isDark ? colors.black : colors.primaryDark}
        />
        <PaperProvider theme={isDark ? DarkTheme : DefaultTheme}>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <Navigator screenOptions={screenOptions()}>
              {routes.stackNav.map(r => (
                <Screen
                  name={r.name}
                  key={r.id}
                  options={r.options}
                  component={r.component}
                />
              ))}
            </Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    );
  }
}

export const screenOptions = () =>
  themeService.currentThemeName === 'light'
    ? {
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.white,
        headerTitleStyle: {color: colors.white},
      }
    : {};

export default App;
