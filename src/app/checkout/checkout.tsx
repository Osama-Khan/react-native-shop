import React from 'react';
import {View} from 'react-native';
import {Divider, Text, Button, Caption, Title} from 'react-native-paper';
import s from '../../styles/styles';
import appState from '../state/state';
import Icon from '../components/icon';
import colors from '../../styles/colors';
import CostSummary from './cost-summary';
import orderService from '../services/order.service';
import {AddressType} from '../models/types/address.type';
import {OrderType} from '../models/types/order.types';
import Shipping from './shipping';
import uiService from '../services/ui.service';

type StateType = {
  address?: AddressType;
  placing: boolean;
  order?: OrderType;
};

export default class Checkout extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {placing: false};
  }

  render() {
    return this.state.order ? (
      <View style={[s.flex, s.center]}>
        <Icon name="check-decagram" size={96} color={colors.green} />
        <Title>Success!</Title>
        <Text>Your order has been placed successfully!</Text>
        <Caption>Your order ID is #{this.state.order.id}</Caption>
      </View>
    ) : appState.cart.products?.length > 0 ? (
      <View style={s.flex}>
        <CostSummary />
        <Divider />
        <Shipping
          onSelectAddress={address => this.setState({...this.state, address})}
        />
        <Divider />
        <this.PlaceOrderButton />
      </View>
    ) : (
      <View style={[s.flex, s.center]}>
        <Icon name="cart" size={96} color={colors.gray} />
        <Title>Such Emptiness!</Title>
        <Caption>Your cart has no products to checkout with.</Caption>
        <Button
          mode="outlined"
          style={s.mt8}
          onPress={() => this.props.navigation.navigate('Search')}>
          Get Products
        </Button>
      </View>
    );
  }

  PlaceOrderButton = () => (
    <Button
      mode="contained"
      color={colors.green}
      style={[s.m4, s.mtAuto]}
      disabled={!this.state.address || this.state.placing}
      loading={this.state.placing}
      onPress={this.placeOrder}
      icon="receipt">
      Place Order
    </Button>
  );

  placeOrder = () => {
    this.setState({...this.state, placing: true});
    const {address, city, state, country} = this.state.address!;
    const addr = `${address}, ${city}, ${state}, ${country}`;
    const prods = appState.cart.products.map(({id, quantity}) => {
      return {id, quantity};
    });
    orderService
      .placeOrder(addr, appState.user.id!, prods)
      .then(res => {
        appState.cart.clearCart();
        this.setState({...this.state, placing: false, order: res.data});
      })
      .catch(() => uiService.toast('Failed to place order'));
  };
}
