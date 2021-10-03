import {CartState} from '../state';
import {ActionType} from '../actions/action.type';
import {CartActionType} from '../actions/cart.actions';

const initialState = new CartState();

export default function CartReducer(
  state = initialState,
  action: CartActionType | ActionType<'', undefined>,
) {
  let cart;
  switch (action.type) {
    case 'cart/set':
      return new CartState(action.payload);
    case 'cart/add':
      cart = new CartState(state);
      cart.addProduct(action.payload.product, action.payload.quantity);
      return cart;
    case 'cart/clear':
      cart = new CartState(state);
      cart.clearCart();
      return cart;
    case 'cart/remove':
      cart = new CartState(state);
      cart.removeProduct(action.payload);
      return cart;
    case 'cart/setQty':
      cart = new CartState(state);
      cart.setProductQuantity(action.payload.id, action.payload.quantity);
      return cart;
  }
  return state;
}
