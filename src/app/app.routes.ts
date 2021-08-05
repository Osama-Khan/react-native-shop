import Account from './account/account';
import Categories from './categories/categories';
import Explore from './explore/explore';
import Home from './home/home';
import Main from './Main';
import ProductDetail from './product/product-detail';
import Search from './search/search';

export const mainRoute = {
  id: 'main',
  name: 'Main',
  component: Main,
  options: {headerShown: false},
};

export const productDetailRoute = {
  id: 'detail',
  name: 'Detail',
  component: ProductDetail,
};

const routes = {
  bottomNav: [
    {
      id: 'home',
      name: 'Home',
      icon: 'home',
      component: Home,
    },
    {
      id: 'explore',
      name: 'Explore',
      icon: 'compass',
      component: Explore,
    },
    {
      id: 'search',
      name: 'Search',
      icon: 'magnify',
      component: Search,
    },
    {
      id: 'categories',
      name: 'Categories',
      icon: 'shape',
      component: Categories,
    },
    {
      id: 'account',
      name: 'Account',
      icon: 'account',
      component: Account,
    },
  ],
  stackNav: [mainRoute, productDetailRoute],
};

export default routes;
