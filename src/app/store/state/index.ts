import CartState from './cart-state';
import UserState from './user-state';

export type AppStateType = {
  cart: CartState;
  user: UserState;
};

export {CartState, UserState};
