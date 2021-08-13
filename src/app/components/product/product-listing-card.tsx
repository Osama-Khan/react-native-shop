import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, Card, Divider, Caption, IconButton} from 'react-native-paper';
import appStyle from '../../../styles/styles';
import Rating from './product-rating';
import colors from '../../../styles/colors';
import appState from '../../state/state';
import {ProductType} from '../../models/types/product.types';
import {NavigationProp} from '@react-navigation/native';
import {productDetailRoute} from '../../app.routes';
import CartActions from '../cart/manage-cart-product-actions';
import Icon from '../icon';

type PropType = {
  product: ProductType;
  navigation: NavigationProp<any>;
};
type StateType = {};

export default class extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {};

    // Add listener to update state when component gets focus
    this.props.navigation.addListener('focus', () => {
      const cp = appState.cart.getProduct(props.product.id);
      this.setState({inCart: cp ? cp.quantity : 0});
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
            <View style={s.row}>
              <Caption style={[s.mtAuto]}>
                <Icon name="heart" color={colors.gray} />
                &nbsp;{product.favoriteCount} Likes
              </Caption>
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
        </View>
        <View>
          <Divider />
          <this.CartAction />
        </View>
      </Card>
    );
  }

  CartAction = () => {
    const product = this.props.product;
    const cp = appState.cart.getProduct(product.id);
    return cp ? (
      <CartActions
        product={cp}
        onAdd={() => this.setState({})}
        onRemove={() => {
          this.setState({});
        }}
      />
    ) : (
      <IconButton
        style={[s.col12, s.mAuto]}
        color={product.stock === 0 ? colors.gray : colors.green}
        onPress={() => {
          appState.cart.addProduct(product);
          this.setState({});
        }}
        disabled={product.stock === 0}
        icon={product.stock === 0 ? 'cart-off' : 'cart-plus'}
      />
    );
  };
}

const s = StyleSheet.create({
  ...appStyle,
  imgBg: {width: '25%', height: '100%', position: 'absolute', left: 0},
  img: {width: '25%', minHeight: 64},
  content: {padding: 8, width: '75%'},
});
