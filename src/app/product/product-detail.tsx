import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, Divider, ProgressBar, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import ManageCartActions from '../components/cart/manage-cart-product-actions';
import {ProductType} from '../models/types/product.types';
import productService from '../services/product.service';
import cartActions from '../store/actions/cart.actions';
import {AppStateType} from '../store/state';
import Info from './product-detail/product-info';
import ProductLikeAction from './product-detail/product-like-action';
import Ratings from './product-detail/product-rating';
import Reviews from './product-detail/product-reviews';

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
    const p = this.state.product;
    const cp = p ? this.props.state.cart.getProduct(p.id) : undefined;
    const update = () => this.setState({...this.state});
    return p ? (
      <>
        <ScrollView>
          <Surface>
            <Image
              source={{uri: p.images![0].image, height: 240}}
              resizeMode="contain"
            />
            {this.props.state.user.id ? (
              <ProductLikeAction
                style={s.bottomRight}
                productId={p.id}
                userId={this.props.state.user.id}
              />
            ) : (
              <></>
            )}
          </Surface>
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
            <ManageCartActions product={cp} onAdd={update} onRemove={update} />
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
    <Button
      mode="contained"
      color={colors.green}
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
