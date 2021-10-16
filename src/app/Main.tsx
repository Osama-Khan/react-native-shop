import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes, {cartRoute, chatRoute} from './app.routes';
import Icon from './components/icon';
import colors from '../styles/colors';
import themeService from './services/theme.service';
import {screenOptions} from './App';
import {useSelector} from 'react-redux';
import {AppStateType} from './store/state';

export default function Main(props: any) {
  const BottomTab = createBottomTabNavigator();
  const state = useSelector((state: AppStateType) => state);
  const cartItems = state.cart.products.length || undefined;
  const userId = state.user.id;
  const newMessages =
    state.message.newMessages.filter(m => m.sender.id !== userId).length ||
    undefined;
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        ...screenOptions(),
        ...tabBarColorOptions(),
      }}>
      {routes.bottomNav.map(r => (
        <BottomTab.Screen
          name={r.name}
          key={r.id}
          component={r.component}
          {...props}
          options={{
            tabBarIcon: p => <Icon name={r.icon} {...p} />,
            tabBarBadge:
              r.name === cartRoute.name
                ? cartItems
                : r.name === chatRoute.name
                ? newMessages
                : undefined,
          }}
          getId={() => r.id}
        />
      ))}
    </BottomTab.Navigator>
  );
}

const tabBarColorOptions = () =>
  themeService.currentThemeName === 'dark'
    ? {
        tabBarActiveBackgroundColor: colors.primarySubtle,
      }
    : {
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.whiteTransparent,
      };
