import React from 'react';
import {ToastAndroid, View} from 'react-native';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import CartProduct from '../../models/product/cart-product';
import {Button, IconButton} from 'react-native-paper';
import {AppStateType} from '../../store/state';
import {connect} from 'react-redux';
import cartActions from '../../store/actions/cart.actions';
import CartState from '../../store/state/cart-state';

type PropType = {
  product: CartProduct;
  onAdd?: () => void;
  onRemove?: () => void;
  readonly cart: CartState;
  readonly dispatch: any;
};

class ManageCartProductActions extends React.Component<PropType, any> {
  render() {
    const {product, onRemove, onAdd} = this.props;
    return (
      <View style={s.row}>
        <IconButton
          color={colors.red}
          style={s.center}
          icon={product.quantity === 1 ? 'delete' : 'minus'}
          onPress={() => {
            this.removeFromCart(product.id);
            if (onRemove) {
              onRemove();
            }
          }}
        />
        <Button style={[s.flex, s.alignCenter]} disabled={true}>
          {product.quantity} in cart
        </Button>
        <IconButton
          color={colors.green}
          style={s.center}
          icon="plus"
          onPress={() => {
            this.addToCart(product);
            if (onAdd) {
              onAdd();
            }
          }}
        />
      </View>
    );
  }

  addToCart = (product: CartProduct) => {
    let quantity = this.getCartQuantity(product.id);
    if (quantity < product.stock) {
      quantity++;
      const {id} = product;
      this.props.dispatch(cartActions.setProductQuantity({id, quantity}));
      return;
    }
    ToastAndroid.show(
      'No more stock available for this product!',
      ToastAndroid.SHORT,
    );
  };

  removeFromCart = (id: number) => {
    let quantity = this.getCartQuantity(id);
    if (quantity <= 1) {
      this.props.dispatch(cartActions.removeProduct(id));
    } else {
      quantity--;
      this.props.dispatch(cartActions.setProductQuantity({id, quantity}));
    }
  };

  getCartQuantity = (id: number): number => {
    const prod = this.props.cart.getProduct(id);
    return prod ? prod.quantity : 0;
  };
}

const mapStateToProps = (state: AppStateType) => {
  return {cart: state.cart};
};

export default connect(mapStateToProps)(ManageCartProductActions);
