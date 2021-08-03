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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {DarkTheme, DefaultTheme} from '../styles/themes/themes';

const App = () => {
  const isDark = useColorScheme() === 'dark';
  const Stack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();
  return (
    <PaperProvider theme={isDark ? DarkTheme : DefaultTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <BottomTab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
          }}>
          {routes.bottomNav.map(r => (
            <BottomTab.Screen
              name={r.name}
              key={r.id}
              component={r.component}
              options={{
                tabBarIcon: (props: any) => <Icon name={r.icon} {...props} />,
              }}
            />
          ))}
        </BottomTab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
