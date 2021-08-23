import {ProductType} from '../../models/types/product.types';
import CartState from '../state/cart-state';
import {ActionType} from './action.type';

type SetPayloadType = CartState;
type SetActionType = ActionType<'cart/set', SetPayloadType>;
type AddProductPayloadType = {product: ProductType; quantity?: number};
type ClearCartPayloadType = undefined;
type RemoveProductPayloadType = number;
type SetQuantityPayloadType = {id: number; quantity: number};
type AddProductActionType = ActionType<'cart/add', AddProductPayloadType>;
type ClearCartActionType = ActionType<'cart/clear', ClearCartPayloadType>;
type RemoveProductActionType = ActionType<
  'cart/remove',
  RemoveProductPayloadType
>;
type SetQuantityActionType = ActionType<'cart/setQty', SetQuantityPayloadType>;

export type CartActionType =
  | AddProductActionType
  | ClearCartActionType
  | RemoveProductActionType
  | SetQuantityActionType;

const cartActions = {
  setCart: (payload: SetPayloadType): SetActionType => {
    return {
      type: 'cart/set',
      payload,
    };
  },
  addProduct: (payload: AddProductPayloadType): AddProductActionType => {
    return {
      type: 'cart/add',
      payload,
    };
  },

  removeProduct: (
    payload: RemoveProductPayloadType,
  ): RemoveProductActionType => {
    return {
      type: 'cart/remove',
      payload,
    };
  },

  clearCart: (): ClearCartActionType => {
    return {
      type: 'cart/clear',
      payload: undefined,
    };
  },

  setProductQuantity: (
    payload: SetQuantityPayloadType,
  ): SetQuantityActionType => {
    return {
      type: 'cart/setQty',
      payload,
    };
  },
};

export default cartActions;
