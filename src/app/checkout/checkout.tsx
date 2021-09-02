import React from 'react';
import {View} from 'react-native';
import {Divider, Text, Button, Caption, Title} from 'react-native-paper';
import s from '../../styles/styles';
import Icon from '../components/icon';
import colors from '../../styles/colors';
import CostSummary from './cost-summary';
import orderService from '../services/order.service';
import {AddressType} from '../models/types/address.type';
import {OrderType} from '../models/types/order.types';
import Shipping from './shipping';
import uiService from '../services/ui.service';
import IconMessageView from '../components/icon-message-view/icon-message-view';
import {connect} from 'react-redux';
import CartState from '../store/state/cart-state';
import cartActions from '../store/actions/cart.actions';
import {AppStateType} from '../store/state';
import {ScrollView} from 'react-native-gesture-handler';
import {searchRoute} from '../app.routes';

type StateType = {
  address?: AddressType;
  placing: boolean;
  order?: OrderType;
};

class Checkout extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {placing: false};
  }

  render() {
    const cart = this.props.state.cart as CartState;
    return this.state.order ? (
      <View style={[s.flex, s.center]}>
        <Icon name="check-decagram" size={96} color={colors.green} />
        <Title>Success!</Title>
        <Text>Your order has been placed successfully!</Text>
        <Caption>Your order ID is #{this.state.order.id}</Caption>
      </View>
    ) : cart.products?.length > 0 ? (
      <ScrollView>
        <CostSummary cart={cart} />
        <Divider />
        <Shipping
          navigation={this.props.navigation}
          onSelectAddress={address => this.setState({...this.state, address})}
        />
        <Divider />
        <this.PlaceOrderButton />
      </ScrollView>
    ) : (
      <IconMessageView
        icon="cart-outline"
        title="Such Emptiness!"
        caption="Your cart has no products to checkout with."
        btnProps={{
          action: () => this.props.navigation.navigate(searchRoute.name),
          icon: 'archive',
          text: 'Get Products',
        }}
      />
    );
  }

  PlaceOrderButton = () => (
    <Button
      mode="contained"
      color={colors.green}
      style={[s.m4, s.mt16]}
      disabled={!this.state.address || this.state.placing}
      loading={this.state.placing}
      onPress={this.placeOrder}
      icon="receipt">
      Place Order
    </Button>
  );

  placeOrder = () => {
    const cart = this.props.state.cart as CartState;
    this.setState({...this.state, placing: true});
    const {address, city, state, country} = this.state.address!;
    const addr = `${address}, ${city}, ${state}, ${country}`;
    const prods = cart.products.map(({id, quantity}) => {
      return {id, quantity};
    });
    orderService
      .placeOrder(addr, this.props.state.user.id!, prods)
      .then(res => {
        this.props.dispatch(cartActions.clearCart());
        this.setState({...this.state, placing: false, order: res.data});
      })
      .catch(() => uiService.toast('Failed to place order'));
  };
}

function mapStateToProps(state: AppStateType) {
  return {state};
}
export default connect(mapStateToProps)(Checkout);
