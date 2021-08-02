import CartState from '../state/cart-state';

class StorageService {
  userTokenKey = 'user-token';
  cartKey = 'cart';

  /**
   * Saves the given token in localStorage
   * @param token The token to save
   */
  saveUserToken = (token: string) => {
    // TBI
  };

  /**
   * Gets the user token from localStorage
   */
  loadUserToken = () => {
    // TBI
  };

  /**
   * Removes the user-token from storage
   */
  clearUserToken = () => {
    // TBI
  };

  /**
   * Saves cart product IDs and Quantities in localStorage
   * @param cart The state of the cart
   */
  updateCart = (cart: CartState) => {
    // TBI
  };

  /** Removes cart data from localStorage */
  clearCart = () => {
    // TBI
  };

  /**
   * Loads cart product IDs and Quantities saved on last session
   * @returns list of objects containing product id and quantity
   */
  loadCart = () => {
    // TBI
  };
}

export default new StorageService();
