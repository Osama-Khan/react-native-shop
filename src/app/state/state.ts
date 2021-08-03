import CartState from './cart-state';
import UserState from './user-state';

class State {
  cart: CartState = new CartState();
  user: UserState = new UserState();
}

export default new State();
