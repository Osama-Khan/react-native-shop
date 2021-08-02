import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

declare type Route = {
  key: string;
  title?: string;
  icon?: IconSource;
  badge?: string | number | boolean;
  color?: string;
  accessibilityLabel?: string;
  testID?: string;
};

const routes: Route[] = [
  {
    key: 'home',
    title: 'Home',
    icon: 'home',
  },
  {
    key: 'explore',
    title: 'Explore',
    icon: 'compass',
  },
  {
    key: 'search',
    title: 'Search',
    icon: 'magnify',
  },
  {
    key: 'categories',
    title: 'Categories',
    icon: 'shape',
  },
  {
    key: 'account',
    title: 'Account',
    icon: 'account',
  },
];

export default routes;
