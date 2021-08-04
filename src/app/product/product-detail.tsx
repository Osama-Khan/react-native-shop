import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Image, ToastAndroid, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, Divider, ProgressBar} from 'react-native-paper';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import Icon from '../components/icon/icon';
import {ProductType} from '../models/types/product.types';
import productService from '../services/product.service';
import appState from '../state/state';
import Info from './product-detail/product-info';
import Ratings from './product-detail/product-rating';
import Reviews from './product-detail/product-reviews';

type PropType = {
  id: number;
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any, any, any, any>;
};

type StateType = {
  product?: ProductType;
};

export default class ProductDetail extends React.Component<
  PropType,
  StateType
> {
  constructor(props: PropType) {
    super(props);
    this.state = {product: undefined};
  }

  componentDidMount() {
    productService.fetchProduct(this.props.route.params!.id).then(res => {
      this.setState({...this.state, product: res.data});
      this.props.navigation.setOptions({title: res.data.code});
    });
  }

  render() {
    const p = this.state.product!;
    const cp = p ? appState.cart.getProduct(p.id) : undefined;
    return p ? (
      <>
        <ScrollView>
          <Image
            source={{uri: p.images![0].image, height: 240}}
            style={{position: 'absolute', top: 0, width: '100%'}}
            blurRadius={24}
          />
          <Image
            source={{uri: p.images![0].image, height: 240}}
            resizeMode="contain"
          />
          <View style={s.m8}>
            <Info product={p} />
            <Divider style={s.my4} />
            <Ratings product={p} />
            <Divider style={s.my4} />
            <Reviews product={p} />
          </View>
        </ScrollView>
        <Card>
          {cp ? (
            <this.ManageCartAction qty={cp.quantity} />
          ) : p.stock > 0 ? (
            <this.AddToCartAction />
          ) : (
            <this.OutOfStockAction />
          )}
        </Card>
      </>
    ) : (
      <ProgressBar indeterminate={true} />
    );
  }

  AddToCartAction = () => (
    <Button mode="contained" color={colors.green} onPress={this.addToCart}>
      <Icon name="cart-plus" size={16} />
      Add to Cart
    </Button>
  );

  ManageCartAction = ({qty}: {qty: number}) => (
    <View style={s.row}>
      <Button color={colors.red} style={s.center} onPress={this.removeFromCart}>
        <Icon name="minus" size={16} />
      </Button>
      <Button style={s.flex} color={colors.white}>
        {qty} in cart
      </Button>
      <Button color={colors.green} style={s.center} onPress={this.addToCart}>
        <Icon name="plus" size={16} />
      </Button>
    </View>
  );

  OutOfStockAction = () => <Button color={colors.red}>Out of Stock </Button>;

  addToCart = () => {
    const qty = this.getCartQuantity();
    if (qty <= this.state.product!.stock) {
      appState.cart.addProduct(this.state.product!);
      this.setState({...this.state});
      return;
    }
    ToastAndroid.show(
      'No more stock available for this product!',
      ToastAndroid.SHORT,
    );
  };

  removeFromCart = () => {
    const id = this.state.product!.id;
    const qty = this.getCartQuantity();
    if (qty <= 1) {
      appState.cart.removeProduct(id);
    } else {
      appState.cart.setProductQuantity(id, qty - 1);
    }
    this.setState({...this.state});
  };

  getCartQuantity = () => {
    const id = this.state.product!.id;
    const prod = appState.cart.getProduct(id);
    return prod ? prod.quantity : 0;
  };
}
