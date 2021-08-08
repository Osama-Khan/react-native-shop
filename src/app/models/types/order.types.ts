import {EntityType} from './abstract.type';
import {ProductType} from './product.types';
import {UserType} from './user.types';

export type OrderType = EntityType & {
  address: string;
  user?: UserType;
  orderProducts?: OrderProductType[];
  orderState?: OrderStateType;
};

export type OrderStateType = EntityType & {
  state: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
  orders?: OrderType[];
};

export type OrderProductType = EntityType & {
  product?: ProductType;
  order?: OrderType;
  price: number;
  quantity: number;
};
