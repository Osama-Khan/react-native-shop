/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import routes from './app.routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {DarkTheme, DefaultTheme} from '../styles/themes/themes';

const App = () => {
  const isDark = useColorScheme() === 'dark';
  const Stack = createStackNavigator();
  return (
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
  );
};

export default App;
