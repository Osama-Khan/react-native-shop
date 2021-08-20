import CartState from '../../state/cart-state';
import UserState from '../../state/user-state';
import {ActionType} from '../actions/action.type';
import CartReducer from './cart.reducer';
import UserReducer from './user.reducer';

const initialState = {
  user: new UserState(),
  cart: new CartState(),
};
export default function Reducer(
  state = initialState,
  action: ActionType<string, any>,
) {
  return {
    user: UserReducer(state.user, action),
    cart: CartReducer(state.cart, action),
  };
}
