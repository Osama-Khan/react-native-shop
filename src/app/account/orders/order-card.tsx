import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Caption, Card, Divider, Text, Title} from 'react-native-paper';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import {productDetailRoute} from '../../app.routes';
import Icon from '../../components/icon';
import {LoadingCircles} from '../../components/svg/loading';
import {OrderProductType, OrderType} from '../../models/types/order.types';
import orderService from '../../services/order.service';
import uiService from '../../services/ui.service';

type PropType = {order: OrderType; navigation: NavigationProp<any>};
type StateType = {orderProducts?: OrderProductType[]; loading: boolean};

export default class extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {loading: false};
  }
  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const order = this.props.order;
    const totalPrice = order
      .orderProducts!.map(p => p.price)
      .reduce((p, c) => p + c);
    return (
      <Card style={[s.m8, s.p4]} mode="outlined">
        <View style={s.row}>
          <Title style={s.mb4}>Order #{order.id}</Title>
          <Icon
            name={stateIcons[order.orderState!.id]}
            size={24}
            style={[s.mlAuto, s.alignCenter]}
            color={stateColors[order.orderState!.id]}
          />
        </View>
        <Divider />
        <View>
          <View style={s.row}>
            <View style={s.col8}>
              {this.state.loading ? (
                <View style={[s.center, s.flex]}>
                  <LoadingCircles />
                </View>
              ) : this.state.orderProducts ? (
                <>
                  <Caption style={s.textBold}>Products</Caption>
                  {this.state.orderProducts!.map(op => (
                    <View style={s.row} key={op.id}>
                      <Text style={s.mx4}>{op.quantity}&times;</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            productDetailRoute.name,
                            {id: op.product!.id},
                          )
                        }>
                        <Text style={s.mx4}>{op.product!.title}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              ) : (
                <></>
              )}
            </View>
            <View style={[s.col4, s.mlAuto]}>
              <Caption
                style={[s.mlAuto, {color: stateColors[order.orderState!.id]}]}>
                {order.orderState!.state}
              </Caption>
              <Text style={[s.mlAuto, s.mtAuto, s.textBadge, s.textPrice]}>
                Rs. {totalPrice}
              </Text>
            </View>
          </View>
          <Divider style={s.my8} />
          <View style={s.row}>
            <Caption>
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </Caption>
            <Caption style={s.mlAuto}>
              Last updated: {new Date(order.updatedAt).toLocaleDateString()}
            </Caption>
          </View>
        </View>
      </Card>
    );
  }

  fetchProducts = () => {
    this.setState({...this.state, loading: true});
    orderService
      .getOrderDetail(this.props.order.id)
      .then(res => {
        this.setState({orderProducts: res.data, loading: false});
      })
      .catch(() =>
        uiService.toast(
          'Failed to fetch detail of Order#' + this.props.order.id,
        ),
      );
  };
}

const stateIcons = ['progress-clock', 'truck', 'check', 'close'];
const stateColors = [colors.gray, colors.blue, colors.green, colors.red];
