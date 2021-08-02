/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  BottomNavigation,
  Provider as PaperProvider,
  DarkTheme,
  Appbar,
  Title,
  DefaultTheme,
  FAB,
} from 'react-native-paper';
import routes from './app.routes';
import Home from './home/home';
import Explore from './explore/explore';
import Categories from './categories/categories';
import Search from './search/search';
import ProductList from './product/product-list';
import colors from '../styles/colors';
import {StatusBar, useColorScheme} from 'react-native';
import Account from './account/account';

const initialNavigationState = {
  index: 0,
  routes: routes,
};

const App = () => {
  const [navState, setNavState] = useState(initialNavigationState);
  return (
    <PaperProvider
      theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      <BottomNavigation
        navigationState={navState}
        barStyle={{backgroundColor: colors.primary}}
        renderScene={RenderScene}
        onIndexChange={index => setNavState({...navState, index})}
      />
    </PaperProvider>
  );
};

const RenderScene = ({route}: any) => {
  let comp;
  switch (route.key) {
    case 'home':
      comp = <Home />;
      break;
    case 'explore':
      comp = <Explore />;
      break;
    case 'search':
      comp = <Search />;
      break;
    case 'categories':
      comp = <Categories />;
      break;
    case 'account':
      comp = <Account />;
      break;
  }
  return (
    <>
      <StatusBar backgroundColor={colors.primaryDark} />
      <Appbar style={styles.appBar}>
        <Title style={styles.appBarTitle}>{route.title}</Title>
      </Appbar>
      {comp}
      <FAB icon="cart" style={styles.fab} onPress={() => {}} />
    </>
  );
};

const styles = {
  appBar: {backgroundColor: colors.primary},
  appBarTitle: {marginLeft: 20},
  fab: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: colors.primary,
  },
};

export default App;
