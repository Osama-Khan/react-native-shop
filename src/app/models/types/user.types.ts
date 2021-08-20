import {EntityType} from './abstract.type';
import {AddressType} from './address.type';
import {FavoriteType} from './favorite.type';
import {OrderType} from './order.types';
import {ProductType, RatingType} from './product.types';

export type SettingType = EntityType & {
  user?: UserType;
  defaultAddress?: AddressType;
};

export type PermissionType = EntityType & {
  name: string;
  roles?: RoleType[];
};

export type RoleType = EntityType & {
  name: string;
  permissions?: PermissionType[];
  users?: UserType[];
};

export type UserType = EntityType & {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  products?: ProductType[];
  ratings?: RatingType[];
  orders?: OrderType[];
  addresses?: AddressType[];
  favorites?: FavoriteType[];
  profileImage: string;
  roles?: RoleType[];
  setting?: SettingType;
};
