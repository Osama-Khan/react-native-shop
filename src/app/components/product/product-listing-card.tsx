import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, Card, Divider, Button} from 'react-native-paper';
import Icon from '../icon';
import appStyle from '../../../styles/styles';
import Rating from './product-rating';
import colors from '../../../styles/colors';
import appState from '../../state/state';
import {ProductType} from '../../models/types/product.types';
import {NavigationProp} from '@react-navigation/native';
import {productDetailRoute} from '../../app.routes';

type PropType = {
  product: ProductType;
  navigation: NavigationProp<any>;
};
type StateType = {inCart: boolean};

export default class extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {inCart: false};

    // Add listener to update state when component gets focus
    this.props.navigation.addListener('focus', () => {
      const cp = appState.cart.getProduct(props.product.id);
      this.setState({inCart: cp !== false});
    });
  }

  render() {
    const product = this.props.product;
    const outOfStock = product.stock === 0;
    return (
      <Card
        style={s.card}
        onPress={() =>
          this.props.navigation.navigate(productDetailRoute.name, {
            id: product.id,
          })
        }
        {...this.props}>
        <View style={s.row}>
          <Image
            source={{uri: product.images![0].image}}
            style={s.imgBg}
            blurRadius={12}
          />
          <Image
            source={{uri: product.images![0].image}}
            style={s.img}
            resizeMode="contain"
          />
          <View style={s.content}>
            <Text numberOfLines={2} style={s.textBold}>
              {product.title}
            </Text>
            <Rating rating={product.rating} style={s.my4} />
            <Text numberOfLines={1}>{product.description}</Text>
            <Text
              style={[
                s.mlAuto,
                s.p4,
                s.mt8,
                s.textBadge,
                outOfStock ? s.textOutOfStock : s.textPrice,
              ]}>
              {outOfStock ? 'Out Of Stock' : 'Rs. ' + product.price}
            </Text>
          </View>
        </View>
        <View style={[s.row, s.flexWrap]}>
          <Divider style={s.col12} />
          <this.CartAction />
        </View>
      </Card>
    );
  }

  CartAction = () => {
    const product = this.props.product;
    const inCart = this.state.inCart;
    return (
      <Button
        style={[s.col12, s.mAuto]}
        color={inCart ? colors.red : colors.green}
        onPress={() => {
          if (inCart) {
            appState.cart.removeProduct(product.id);
            this.setState({inCart: false});
            return;
          }
          appState.cart.addProduct(product);
          this.setState({inCart: true});
        }}
        disabled={product.stock === 0}>
        <Icon
          name={
            product.stock === 0
              ? 'cart-off'
              : inCart
              ? 'cart-minus'
              : 'cart-plus'
          }
          size={24}
        />
      </Button>
    );
  };
}

const s = StyleSheet.create({
  ...appStyle,
  imgBg: {width: '25%', height: '100%', position: 'absolute', left: 0},
  img: {width: '25%', minHeight: 64},
  content: {padding: 8, width: '75%'},
});
