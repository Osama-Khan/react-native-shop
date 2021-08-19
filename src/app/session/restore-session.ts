import {ProductType} from '../models/types/product.types';
import productService from '../services/product.service';
import storageService from '../services/storage.service';
import uiService from '../services/ui.service';
import userService from '../services/user.service';
import CartState from '../state/cart-state';
import appState from '../state/state';
import UserState from '../state/user-state';

export default function restoreSession() {
  restoreUser();
  restoreCart();
}

async function restoreUser() {
  const token = await storageService.loadUserToken();
  if (token) {
    const res = await userService.loginWithToken(token);
    appState.user = UserState.fromJson(res.data);
    appState.user.token = token;
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
  appState.cart = cart;
}
