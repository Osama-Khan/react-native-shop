import Account from './account/account';
import Cart from './cart/cart';
import Categories from './categories/categories';
import Home from './home/home';
import Main from './Main';
import Checkout from './checkout/checkout';
import ProductDetail from './product/product-detail';
import Search from './search/search';
import accountRoutes from './account/account.routes';
import CategoryProducts from './categories/category-products';

type RouteType = {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  options?: any;
}

type BottomNavRouteType = RouteType & {
  icon: string;
}

type RoutesType = {
  bottomNav: BottomNavRouteType[];
  stackNav: RouteType[];
}

export const mainRoute: RouteType = {
  id: 'main',
  name: 'Main',
  component: Main,
  options: {headerShown: false},
};

export const categoryProductRoute: RouteType = {
  id: 'category-product',
  name: 'Category Product',
  component: CategoryProducts,
};

export const productDetailRoute: RouteType = {
  id: 'detail',
  name: 'Detail',
  component: ProductDetail,
};

export const checkoutRoute: RouteType = {
  id: 'checkout',
  name: 'Checkout',
  component: Checkout,
};

const routes: RoutesType = {
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
  stackNav: [
    mainRoute,
    productDetailRoute,
    checkoutRoute,
    ...accountRoutes,
    categoryProductRoute,
  ],
};

export default routes;
