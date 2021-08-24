import AsyncStorage from '@react-native-async-storage/async-storage';
import CartState from '../store/state/cart-state';
import themeService from './theme.service';

class StorageService {
  tokenKey = 'user-token';
  cartKey = 'cart';
  themeKey = 'theme';

  /**
   * Saves the given token in localStorage
   * @param token The token to save
   */
  saveUserToken = (token: string) => AsyncStorage.setItem(this.tokenKey, token);

  /**
   * Gets the user token from localStorage
   */
  loadUserToken = () => AsyncStorage.getItem(this.tokenKey);

  /**
   * Removes the user-token from storage
   */
  clearUserToken = () => AsyncStorage.removeItem(this.tokenKey);

  /**
   * Saves cart product IDs and Quantities in localStorage
   * @param cart The state of the cart
   */
  updateCart = (cart: CartState) => {
    if (cart.products?.length > 0) {
      return AsyncStorage.setItem(
        this.cartKey,
        cart.products.map(p => p.id + ':' + p.quantity).join(';'),
      );
    }
    return this.clearCart();
  };

  /** Removes cart data from localStorage */
  clearCart = () => AsyncStorage.removeItem(this.cartKey);

  /**
   * Loads cart product IDs and Quantities saved on last session
   * @returns list of objects containing product id and quantity
   */
  loadCart = async () => {
    const v = await AsyncStorage.getItem(this.cartKey);
    if (v) {
      const items = v.split(';');
      return items?.map(i => {
        const data = i.split(':').map(n => parseInt(n, 10));
        return {id: data[0], quantity: data[1]};
      });
    }
    return [];
  };

  /** Gets currently set theme. null if device theme. */
  getUserTheme = async () =>
    (await AsyncStorage.getItem(this.themeKey)) as 'light' | 'dark' | null;

  /** Sets current theme to light or dark */
  setUserTheme = async (theme: 'light' | 'dark') => {
    await AsyncStorage.setItem(this.themeKey, theme);
    themeService.setTheme(theme);
  };

  /** Clears currently set theme */
  clearUserTheme = async () => {
    await AsyncStorage.removeItem(this.themeKey);
    themeService.setTheme(null);
  };
}

export default new StorageService();
