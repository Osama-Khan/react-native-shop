import CartProduct from '../../models/product/cart-product';
import {ProductType} from '../../models/types/product.types';
import storageService from '../../services/storage.service';

export default class CartState {
  /** The list of items in the cart */
  products: CartProduct[];

  constructor(cartState?: CartState) {
    this.products = cartState?.products || [];
  }

  /**
   * Get total price of all products in cart
   * @returns Sum of all product prices
   */
  getTotalPrice = () => {
    let price = 0;
    this.products.forEach(p => (price += p.price * p.quantity));
    return price;
  };

  /**
   * Adds a product to the cart
   * @param p The product to add
   * @param q Number of products to add
   */
  addProduct = (p: ProductType, q = 1): void => {
    let exists = false;
    this.products = this.products.map(prd => {
      if (prd.id === p.id) {
        exists = true;
        prd.quantity += q;
      }
      return prd;
    });
    if (!exists) {
      this.products.push(new CartProduct(p, q));
    }
    storageService.updateCart(this);
  };

  /**
   * Removes a product from the cart
   * @param id ID of the product to remove
   * @returns true if removal successful, false otherwise
   */
  removeProduct = (id: number): boolean => {
    const p = this.products.filter(p => p.id !== id);
    if (p.length !== this.products.length) {
      this.products = p;
      storageService.updateCart(this);
      return true;
    }
    return false;
  };

  /**
   * Clears the cart
   */
  clearCart = () => {
    this.products = [];
    storageService.clearCart();
  };

  /**
   * Sets quantity of a product
   * @param id ID of the product to set quantity of
   * @param quantity new quantity of the product
   * @returns true if edit successful, false otherwise
   */
  setProductQuantity = (id: number, quantity: number): boolean => {
    if (this.getProduct(id)) {
      this.products.some((p, i) => {
        if (p.id === id) {
          this.products[i].quantity = quantity;
          storageService.updateCart(this);
          return true;
        }
        return false;
      });
      return true;
    }
    return false;
  };

  /**
   * Gets a product from the cart
   * @param id ID of the product to look for
   * @returns The product or false, depending on if the product is present or not respectively
   */
  getProduct = (id: number): CartProduct | false => {
    let prods = this.products.filter(p => p.id === id);
    return prods.length > 0 ? prods[0] : false;
  };
}
