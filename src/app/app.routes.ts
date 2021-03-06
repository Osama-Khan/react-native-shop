import Account from './account/account';
import Cart from './cart/cart';
import Home from './home/home';
import Main from './Main';
import Checkout from './checkout/checkout';
import ProductDetail from './product/product-detail';
import Search from './search/search';
import accountRoutes from './account/account.routes';
import {ChatThreads} from './chat/chat-threads';
import {Chat} from './chat/chat';

// TYPES
type RouteType = {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  options?: any;
};

type BottomNavRouteType = RouteType & {
  icon: string;
};

type RoutesType = {
  bottomNav: BottomNavRouteType[];
  stackNav: RouteType[];
};

// STACK NAV ROUTES
export const mainRoute: RouteType = {
  id: 'main',
  name: 'Main',
  component: Main,
  options: {headerShown: false},
};

export const chatDetailRoute: RouteType = {
  id: 'chat',
  name: 'Chat',
  component: Chat,
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

// BOTTOM NAV ROUTES
export const homeRoute: BottomNavRouteType = {
  id: 'home',
  name: 'Home',
  icon: 'home',
  component: Home,
};

export const chatRoute: BottomNavRouteType = {
  id: 'threads',
  name: 'Threads',
  icon: 'chat',
  component: ChatThreads,
};

export const searchRoute: BottomNavRouteType = {
  id: 'search',
  name: 'Search',
  icon: 'magnify',
  component: Search,
};

export const cartRoute: BottomNavRouteType = {
  id: 'cart',
  name: 'Cart',
  icon: 'cart',
  component: Cart,
};

export const accountRoute: BottomNavRouteType = {
  id: 'account',
  name: 'Account',
  icon: 'account',
  component: Account,
};

const routes: RoutesType = {
  bottomNav: [homeRoute, chatRoute, searchRoute, cartRoute, accountRoute],
  stackNav: [
    mainRoute,
    productDetailRoute,
    checkoutRoute,
    chatDetailRoute,
    ...accountRoutes,
  ],
};

export default routes;
