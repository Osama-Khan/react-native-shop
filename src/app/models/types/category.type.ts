import {EntityType} from './abstract.type';

export type CategoryType = EntityType & {
  name: string;
  parentCategory?: CategoryType;
  childCategories?: CategoryType[];
};
