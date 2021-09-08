import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, ScrollView} from 'react-native';
import {Button, Divider, ProgressBar, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import ManageCartActions from '../components/cart/manage-cart-product-actions';
import {ProductType} from '../models/types/product.types';
import productService from '../services/product.service';
import cartActions from '../store/actions/cart.actions';
import {AppStateType} from '../store/state';
import Info from './product-detail/product-info';
import Ratings from './product-detail/product-rating';
import Reviews from './product-detail/product-reviews';
import ProductImageSlideshow from './product-detail/product-image-slideshow';

type PropType = {
  id: number;
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
  readonly state: AppStateType;
  readonly dispatch: (...params: any) => any;
};

type StateType = {
  product?: ProductType;
};

class ProductDetail extends React.Component<PropType, StateType> {
  state: StateType = {};

  componentDidMount() {
    productService.fetchProduct(this.props.route.params!.id).then(res => {
      this.setState({...this.state, product: res.data});
      this.props.navigation.setOptions({title: res.data.code});
    });
  }

  render() {
    const p = this.state.product;
    const cp = p ? this.props.state.cart.getProduct(p.id) : undefined;
    const update = () => this.setState({...this.state});
    return p ? (
      <>
        <ScrollView>
          <ProductImageSlideshow
            product={p}
            userId={this.props.state.user.id!}
          />
          <View style={s.m8}>
            <Info product={p} navigation={this.props.navigation} />
            <Divider style={s.my4} />
            <Ratings product={p} />
            <Divider style={s.my4} />
            <Reviews product={p} />
          </View>
        </ScrollView>
        {cp ? (
          <ManageCartActions product={cp} onAdd={update} onRemove={update} />
        ) : p.stock > 0 ? (
          <this.AddToCartAction />
        ) : (
          <this.OutOfStockAction />
        )}
      </>
    ) : (
      <ProgressBar indeterminate={true} />
    );
  }

  AddToCartAction = () => (
    <Button
      style={s.roundedNone}
      contentStyle={{height: 48}}
      mode="contained"
      onPress={this.addToCart}
      icon="cart-plus">
      Add to Cart
    </Button>
  );

  OutOfStockAction = () => <Button color={colors.red}>Out of Stock </Button>;

  addToCart = () => {
    this.props.dispatch(cartActions.addProduct({product: this.state.product!}));
  };
}

const mapStateToProps = (state: AppStateType) => {
  return {state};
};

export default connect(mapStateToProps)(ProductDetail);
