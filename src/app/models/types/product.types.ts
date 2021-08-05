import {EntityType} from './abstract.type';
import {CategoryType} from './category.type';
import {FavoriteType} from './favorite.type';
import {OrderProductType} from './order.types';
import {UserType} from './user.types';

export type HighlightType = EntityType & {
  highlight: string;
  product?: ProductType;
};
export type ImageType = EntityType & {image: string; product?: ProductType};
export type RatingType = EntityType & {
  stars: number;
  title: string;
  description: string;
  product?: ProductType;
  user?: UserType;
};
export type ProductType = EntityType & {
  title: string;
  code: string;
  description: string;
  price: number;
  highlights?: HighlightType[];
  images?: ImageType[];
  rating?: number;
  ratings?: RatingType[];
  favorites?: FavoriteType[];
  category?: CategoryType;
  user?: UserType;
  orderProducts?: OrderProductType[];
  stock: number;
};
