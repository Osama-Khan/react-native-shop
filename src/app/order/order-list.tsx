import React from 'react';
import {ScrollView} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Criteria from '../models/criteria';
import {OrderType} from '../models/types/order.types';
import orderService from '../services/order.service';
import appState from '../state/state';
import OrderCard from './order-card';

type PropType = {filter: 'progress' | 'done' | 'failed'};
type StateType = {orders?: OrderType[]; loading: boolean};

export default class extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {loading: false};
  }

  componentDidMount() {
    this.fetchOrders();
  }

  componentDidUpdate(prevProps: PropType) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchOrders();
    }
  }

  render() {
    if (this.state.loading) {
      return <ProgressBar indeterminate={true} />;
    }
    if (this.state.orders) {
      return (
        <ScrollView>
          {this.state.orders!.map(o => (
            <OrderCard order={o} key={o.id} />
          ))}
        </ScrollView>
      );
    }
    return <></>;
  }

  fetchOrders() {
    this.setState({...this.state, loading: true});
    orderService.getOrdersByUser(appState.user.id!, this.criteria).then(res => {
      this.setState({orders: res.data.data, loading: false});
    });
  }

  private get criteria() {
    const criteria = new Criteria<OrderType>();
    if (this.props.filter === 'progress') {
      criteria.addFilter('orderState', 2, '<');
    } else {
      const id = this.props.filter === 'done' ? 2 : 3;
      criteria.addFilter('orderState', id, '=');
    }
    criteria.setOrderBy('createdAt');
    criteria.setOrderDir('DESC');
    return criteria;
  }
}
