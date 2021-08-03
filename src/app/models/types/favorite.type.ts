import {EntityType} from './abstract.type';
import {ProductType} from './product.types';
import {UserType} from './user.types';

export type FavoriteType = EntityType & {
  user?: UserType;
  product?: ProductType;
};
