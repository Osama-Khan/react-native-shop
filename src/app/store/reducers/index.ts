import {CartState, MessageState, UserState} from '../state';
import {ActionType} from '../actions/action.type';
import CartReducer from './cart.reducer';
import UserReducer from './user.reducer';
import MessageReducer from './message.reducer';

const initialState = {
  user: new UserState(),
  cart: new CartState(),
  message: new MessageState(),
};
export default function Reducer(
  state = initialState,
  action: ActionType<string, any>,
) {
  return {
    user: UserReducer(state.user, action),
    cart: CartReducer(state.cart, action),
    message: MessageReducer(state.message, action),
  };
}
