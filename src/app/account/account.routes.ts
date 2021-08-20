import AccountEdit from './edit/account-edit';
import Orders from './orders/orders';
import UserAddresses from './addresses/user-addresses';
import UserLikes from './user-likes';
import UserProducts from './user-products';
import UserReviews from './reviews/user-reviews';
import Settings from './settings/settings';

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

export const accountEditRoute = {
  id: 'account-edit',
  name: 'Update Account',
  component: AccountEdit,
};

export const addressesRoute = {
  id: 'addresses',
  name: 'Manage Addresses',
  component: UserAddresses,
};

export const reviewsRoute = {
  id: 'reviews',
  name: 'Manage Reviews',
  component: UserReviews,
};

export const settingsRoute = {
  id: 'settings',
  name: 'Settings',
  component: Settings,
};

export default [
  orderRoute,
  listingsRoute,
  likesRoute,
  accountEditRoute,
  addressesRoute,
  reviewsRoute,
  settingsRoute,
];
