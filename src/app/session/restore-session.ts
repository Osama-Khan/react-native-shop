import {ProductType} from '../models/types/product.types';
import productService from '../services/product.service';
import storageService from '../services/storage.service';
import uiService from '../services/ui.service';
import userService from '../services/user.service';
import CartState from '../state/cart-state';
import appState from '../state/state';
import UserState from '../state/user-state';

export default function restoreSession() {
  restoreUser().then(() => restoreCart());
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
  oldCartItems.forEach(cp => {
    promises.push(
      productService.fetchProduct(cp.id).then(res => {
        const product = res.data;
        if (product.stock === 0) {
          removedProducts.push(product);
          return;
        }
        if (product.stock < cp.quantity) {
          readjustedProducts.push(product);
          cp.quantity = product.stock;
        }
        cart.addProduct(product, cp.quantity);
      }),
    );
  });
  return Promise.all(promises).then(() => {
    if (removedProducts.length > 0 || readjustedProducts.length > 0) {
      uiService.toast(
        'The availability of products has changed and your cart has been readjusted accordingly.',
        false,
      );
    }
    return cart;
  });
}
