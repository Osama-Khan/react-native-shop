import React from 'react';
import {BottomNavigation} from 'react-native-paper';
import OrderList from './order-list';
import orderRoutes from './order.routes';

type FilterType = 'progress' | 'done' | 'failed';
const navIndexFilters: FilterType[] = ['progress', 'done', 'failed'];

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {navIndex: 0};
  }

  render() {
    return (
      <BottomNavigation
        navigationState={{
          index: this.state.navIndex,
          routes: orderRoutes,
        }}
        shifting={true}
        renderScene={() => (
          <OrderList filter={navIndexFilters[this.state.navIndex]} />
        )}
        onIndexChange={navIndex => this.setState({...this.state, navIndex})}
      />
    );
  }
}
