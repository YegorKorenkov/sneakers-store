import axios from 'axios';
import { CartSneaker } from '../App';

export default class ApiService {
  static async getProducts() {
    const res = await axios.get('https://61095333d71b670017639872.mockapi.io/items');
    return res;
  }

  static async getCartItems() {
    const res = await axios.get('https://61095333d71b670017639872.mockapi.io/cart');
    return res;
  }

  static async getFavorites() {
    const res = await axios.get('https://61095333d71b670017639872.mockapi.io/favorites');
    return res;
  }

  static async getOrders() {
    const res = await axios.get('https://61095333d71b670017639872.mockapi.io/orders');
    return res;
  }

  static async postCartItem(obj: CartSneaker) {
    await axios.post('https://61095333d71b670017639872.mockapi.io/cart', obj);
  }

  static async deleteCartItem(id: string) {
    await axios.delete('https://61095333d71b670017639872.mockapi.io/cart/' + id);
  }

  static async postFavortiteItem(obj: CartSneaker) {
    await axios.post('https://61095333d71b670017639872.mockapi.io/favorites', obj);
  }

  static async deleteFavoriteItem(id: string) {
    await axios.delete('https://61095333d71b670017639872.mockapi.io/favorites/' + id);
  }
}
