import { createContext, Dispatch, SetStateAction } from 'react';
import { CartSneaker, Sneaker } from './App';

interface ContextProps {
  items: Sneaker[];
  cartItems: CartSneaker[];
  favorites: CartSneaker[];
  onClose: (isClosed: boolean) => void;
  setCartItems: Dispatch<SetStateAction<CartSneaker[]>>;
  isItemAdded: (title: string, imageUrl: string) => boolean;
  onAddToFavorites: (obj: CartSneaker) => void;
  onPlus: (obj: CartSneaker) => void;
  isItemFavorited: (title: string, imageUrl: string) => boolean;
}

const AppContext = createContext({} as ContextProps);

export default AppContext;
