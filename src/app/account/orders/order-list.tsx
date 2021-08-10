import React from 'react';
import {NativeScrollEvent, ScrollView} from 'react-native';
import {Button, ProgressBar} from 'react-native-paper';
import LoadingSpinner from '../../components/loading/loading-spinner';
import Criteria from '../../models/criteria';
import {OrderType} from '../../models/types/order.types';
import orderService from '../../services/order.service';
import OrderCard from './order-card';

type PropType = {
  criteria: Criteria<OrderType>;
};
type StateType = {orders?: OrderType[]; loading: boolean};

export default class extends React.Component<PropType, StateType> {
  page = 0;
  maxPage = 1;
  constructor(props: PropType) {
    super(props);
    this.state = {loading: false};
  }

  componentDidMount() {
    this.fetchOrders();
  }

  componentDidUpdate(prevProps: PropType) {
    if (
      prevProps.criteria.getUrlParameters() !==
      this.props.criteria.getUrlParameters()
    ) {
      this.page = 0;
      this.maxPage = 1;
      this.fetchOrders();
    }
  }

  render() {
    if (this.page === 0) {
      return <ProgressBar indeterminate={true} />;
    }

    return (
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (this.isScrollAtEnd(nativeEvent)) {
            if (!this.state.loading && this.page < this.maxPage) {
              this.page!++;
              this.fetchOrders(true);
            }
          }
        }}>
        {this.state.orders!.map(o => (
          <OrderCard order={o} key={o.id} />
        ))}
        {this.state.loading ? (
          <LoadingSpinner />
        ) : this.page === this.maxPage ? (
          <Button disabled>No more orders</Button>
        ) : (
          <></>
        )}
      </ScrollView>
    );
  }

  isScrollAtEnd = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  /** Fetches orders and sets state
   * @param append Appends new orders to the previous list if true
   */
  fetchOrders(append = false) {
    this.setState({...this.state, loading: true});
    const criteria: Criteria<OrderType> = Object.create(this.props.criteria);
    if (this.page) {
      criteria.setPage(this.page);
    }
    orderService.getOrders(criteria).then(res => {
      let orders = this.state.orders || [];
      orders = append ? [...orders, ...res.data.data] : res.data.data;
      this.page = res.data.meta.currentPage;
      this.maxPage = res.data.meta.totalPages;
      this.setState({orders, loading: false});
    });
  }
}
