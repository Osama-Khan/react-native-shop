import {ProductType} from '../models/types/product.types';
import productService from '../services/product.service';
import storageService from '../services/storage.service';
import uiService from '../services/ui.service';
import userService from '../services/user.service';
import CartState from '../store/state/cart-state';
import UserState from '../store/state/user-state';
import store from '../store';
import cartActions from '../store/actions/cart.actions';
import userActions from '../store/actions/user.actions';

export default function restoreSession() {
  restoreUser();
  restoreCart();
}

async function restoreUser() {
  const token = await storageService.loadUserToken();
  if (token) {
    let res;
    try {
      res = await userService.loginWithToken(token);
    } catch (e: any) {
      const code = e.response.code;
      if (code === 401) {
        uiService.toast('Your session has expired. Please login again.');
      } else {
        uiService.toast(
          "We couldn't restore your session. Please login again.",
        );
      }
      storageService.clearUserToken();
      return;
    }
    const user = UserState.fromJson(res.data);
    user.token = token;
    store.dispatch(userActions.setUser(UserState.fromJson(user)));
  }
}

async function restoreCart() {
  const promises: Promise<any>[] = [];
  const removedProducts: ProductType[] = [];
  const readjustedProducts: ProductType[] = [];

  const oldCartItems = await storageService.loadCart();
  if (!oldCartItems) {
    return;
  }
  const cart = new CartState();
  for (const i in oldCartItems) {
    const cp = oldCartItems[i];
    const res = await productService.fetchProduct(cp.id);
    const product = res.data;
    if (product.stock === 0) {
      removedProducts.push(product);
      continue;
    }
    if (product.stock < cp.quantity) {
      readjustedProducts.push(product);
      cp.quantity = product.stock;
    }
    cart.addProduct(product, cp.quantity);
  }
  await Promise.all(promises);
  if (removedProducts.length > 0 || readjustedProducts.length > 0) {
    uiService.toast(
      'The availability of products has changed and your cart has been readjusted accordingly.',
      false,
    );
  }
  store.dispatch(cartActions.setCart(cart));
}
