import React from 'react';
import routes from './app.routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {DarkTheme, DefaultTheme} from '../styles/themes/themes';
import initializeInterceptors from './interceptors/interceptor-initializer';
import restoreSession from './session/restore-session';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store';

const App = () => {
  const isDark = useColorScheme() === 'dark';
  const Stack = createStackNavigator();
  initializeInterceptors();
  restoreSession();
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={isDark ? DarkTheme : DefaultTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            {routes.stackNav.map(r => (
              <Stack.Screen
                name={r.name}
                key={r.id}
                options={r.options}
                component={r.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
