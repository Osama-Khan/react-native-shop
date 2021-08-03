type Category = {
  id: number;
  name: string;
  childCategories: Category[];
  parentCategory: Category;
};

export const icons: {[key: string]: string} = {
  cpu: 'cpu-64-bit',
  gpu: 'expansion-card',
  ram: 'memory',
  motherboard: 'chip',
  psu: 'flash',
  peripherals: 'keyboard',
};

export const getChildrenOf = (category: Category, list: Category[]) =>
  list.filter(c => c.parentCategory?.id === category.id);
