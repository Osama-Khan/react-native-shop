import Orders from './orders/orders';
import UserLikes from './user-likes';
import UserProducts from './user-products';

export const listingsRoute = {
  id: 'listings',
  name: 'My Listings',
  component: UserProducts,
};

export const orderRoute = {
  id: 'order',
  name: 'Orders',
  component: Orders,
};

export const likesRoute = {
  id: 'likes',
  name: 'My Likes',
  component: UserLikes,
};

export default [orderRoute, listingsRoute, likesRoute];
