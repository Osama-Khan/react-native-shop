import React from 'react';
import {ToastAndroid, View} from 'react-native';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import appState from '../../state/state';
import CartProduct from '../../models/product/cart-product';
import {Button, IconButton} from 'react-native-paper';

type PropType = {
  product: CartProduct;
  onAdd?: () => void;
  onRemove?: () => void;
};
export default ({product, ...props}: PropType) => (
  <View style={s.row}>
    <IconButton
      color={colors.red}
      style={s.center}
      icon={product.quantity === 1 ? 'delete' : 'minus'}
      onPress={() => {
        removeFromCart(product.id);
        if (props.onRemove) {
          props.onRemove();
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
        addToCart(product);
        if (props.onAdd) {
          props.onAdd();
        }
      }}
    />
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
