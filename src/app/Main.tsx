import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './app.routes';
import Icon from './components/icon';
import styles from '../styles/styles';
import colors from '../styles/colors';
import themeService from './services/theme.service';

export default function Main(props: any) {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        ...screenOptions,
        ...tabBarColorOptions,
      }}>
      {routes.bottomNav.map(r => (
        <BottomTab.Screen
          name={r.name}
          key={r.id}
          component={r.component}
          {...props}
          options={{
            tabBarIcon: p => <Icon name={r.icon} {...p} />,
            tabBarLabelStyle: styles.mb4,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}

const screenOptions =
  themeService.currentTheme === 'light'
    ? {
        headerStyle: {backgroundColor: colors.primary},
        headerTitleStyle: {color: colors.white},
      }
    : {};

const tabBarColorOptions =
  themeService.currentTheme === 'dark'
    ? {
        tabBarActiveBackgroundColor: colors.primarySubtle,
      }
    : {
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.whiteTransparent,
      };
