import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './app.routes';
import Icon from './components/icon';
import styles from '../styles/styles';

export default function Main(props: any) {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
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
