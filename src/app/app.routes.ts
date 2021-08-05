import Account from './account/account';
import Cart from './cart/cart';
import Categories from './categories/categories';
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
      id: 'categories',
      name: 'Categories',
      icon: 'shape',
      component: Categories,
    },
    {
      id: 'search',
      name: 'Search',
      icon: 'magnify',
      component: Search,
    },
    {
      id: 'cart',
      name: 'Cart',
      icon: 'cart',
      component: Cart,
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
