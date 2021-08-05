import React from 'react';
import {ToastAndroid, View} from 'react-native';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import appState from '../../state/state';
import CartProduct from '../../models/product/cart-product';
import Icon from '../icon';
import {Button} from 'react-native-paper';

type PropType = {
  product: CartProduct;
  onAdd?: () => void;
  onRemove?: () => void;
};
export default ({product, ...props}: PropType) => (
  <View style={s.row}>
    <Button
      color={colors.red}
      style={s.center}
      onPress={() => {
        removeFromCart(product.id);
        if (props.onRemove) {
          props.onRemove();
        }
      }}>
      <Icon name={product.quantity === 1 ? 'delete' : 'minus'} size={16} />
    </Button>
    <Button style={s.flex} disabled={true}>
      {product.quantity} in cart
    </Button>
    <Button
      color={colors.green}
      style={s.center}
      onPress={() => {
        addToCart(product);
        if (props.onAdd) {
          props.onAdd();
        }
      }}>
      <Icon name="plus" size={16} />
    </Button>
  </View>
);

const addToCart = (product: CartProduct) => {
  const qty = getCartQuantity(product.id);
  if (qty <= product.stock) {
    appState.cart.setProductQuantity(product.id, qty + 1);
    return;
  }
  ToastAndroid.show(
    'No more stock available for this product!',
    ToastAndroid.SHORT,
  );
};

const removeFromCart = (id: number) => {
  const qty = getCartQuantity(id);
  if (qty <= 1) {
    appState.cart.removeProduct(id);
  } else {
    appState.cart.setProductQuantity(id, qty - 1);
  }
};

const getCartQuantity = (id: number) => {
  const prod = appState.cart.getProduct(id);
  return prod ? prod.quantity : 0;
};
