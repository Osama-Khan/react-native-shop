import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes, {cartRoute} from './app.routes';
import Icon from './components/icon';
import styles from '../styles/styles';
import colors from '../styles/colors';
import themeService from './services/theme.service';
import {screenOptions} from './App';
import {useSelector} from 'react-redux';
import {AppStateType} from './store/state';

export default function Main(props: any) {
  const BottomTab = createBottomTabNavigator();
  const cartItems = useSelector(
    (state: AppStateType) => state.cart.products.length || undefined,
  );
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
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
            tabBarLabelStyle: styles.mb4,
            tabBarBadge: r.name === cartRoute.name ? cartItems : undefined,
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
