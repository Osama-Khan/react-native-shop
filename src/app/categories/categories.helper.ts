import {CategoryType} from '../models/types/category.type';

/** A list of icons that can be shown with root categories */
export const icons: {[key: string]: string} = {
  cpu: 'cpu-64-bit',
  gpu: 'expansion-card',
  ram: 'memory',
  motherboard: 'chip',
  psu: 'flash',
  peripherals: 'keyboard',
};

/** Gets child categories of given category from the list
 * @param id ID of the category to get children of
 * @param list The list to look for childrens in
 * @returns The list parameter filtered to only include the children of
 * category parameter
 */
export function getChildrenOf(id: number, list: CategoryType[]) {
  return list.filter(c => c.parentCategory?.id === id);
}
