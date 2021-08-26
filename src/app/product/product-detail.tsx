import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Button,
  Card,
  Divider,
  IconButton,
  ProgressBar,
  Surface,
} from 'react-native-paper';
import {connect} from 'react-redux';
import Icon from '../components/icon';
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

  /** Index of the currently active image in the slideshow */
  activeIndex: number;
};

class ProductDetail extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {activeIndex: 0};
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
              source={{
                uri: p.images![this.state.activeIndex].image,
                height: 240,
              }}
              resizeMode="contain"
            />

            <IconButton
              style={[s.left, {marginTop: 100}]}
              onPress={() => {
                let activeIndex = this.state.activeIndex;
                if (--activeIndex < 0) {
                  activeIndex = p.images!.length - 1;
                }
                this.setState({...this.state, activeIndex});
              }}
              icon="arrow-left-circle"
            />
            <IconButton
              style={[s.right, {marginTop: 100}]}
              onPress={() => {
                let activeIndex = this.state.activeIndex;
                if (++activeIndex >= p.images!.length) {
                  activeIndex = 0;
                }
                this.setState({...this.state, activeIndex});
              }}
              icon="arrow-right-circle"
            />
            <View
              style={[
                s.bottom,
                s.row,
                s.center,
                s.col12,
                {backgroundColor: colors.blackTransparent},
              ]}>
              {p.images?.map((img, i) => (
                <Icon
                  key={img.id}
                  name={
                    this.state.activeIndex === i ? 'circle' : 'circle-outline'
                  }
                  onPress={() => this.setState({...this.state, activeIndex: i})}
                />
              ))}
            </View>

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
