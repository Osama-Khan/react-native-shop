import CartState from './cart-state';
import MessageState from './message-state';
import UserState from './user-state';

export type AppStateType = {
  cart: CartState;
  user: UserState;
  message: MessageState;
};

export {CartState, UserState, MessageState};
