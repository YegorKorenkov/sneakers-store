import { useEffect } from 'react';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import ApiService from './api/ApiService';

import Drawer from './components/Drawer';
import Header from './components/Header';
import AppContext from './context';
import { createProduct } from './dto/createProduct';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Orders from './pages/Orders';

export interface Sneaker {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export interface CartSneaker extends Sneaker {
  itemId?: string;
}

function App() {
  const [items, setItems] = useState<Sneaker[]>([]);
  const [cartItems, setCartItems] = useState<CartSneaker[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<CartSneaker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resProducts = await ApiService.getProducts();
        const resCartItems = await ApiService.getCartItems();
        const resFavoriteItems = await ApiService.getFavorites();
        setItems(resProducts.data);
        setCartItems(resCartItems.data);
        setFavorites(resFavoriteItems.data);
        setIsLoading(false);
      } catch (error) {
        alert('Error');
        console.log(error);
      }
    })();
  }, []);

  const onClose = (isOpened: boolean) => {
    setIsCartOpened(isOpened);
  };

  const onPlus = async (obj: CartSneaker) => {
    try {
      const findObj = cartItems.find((item) => item.itemId === obj.id);
      if (findObj) {
        ApiService.deleteCartItem(findObj.id);
        setCartItems((prev) => prev.filter((item) => item.itemId !== obj.id));
      } else {
        setCartItems((prev: any) => [...prev, createProduct(cartItems, prev, obj)]);
        ApiService.postCartItem({
          id: obj.id,
          itemId: obj.id,
          title: obj.title,
          price: obj.price,
          imageUrl: obj.imageUrl,
        });
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.log(error);
    }
  };

  const onDeleteCartItem = (itemId: string) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      ApiService.deleteCartItem(itemId);
    } catch (error) {
      alert('Ошибка при удалении');
    }
  };

  const onAddToFavorites = async (obj: CartSneaker) => {
    try {
      const findObj = cartItems.find((item) => item.itemId === obj.id);
      if (findObj) {
        ApiService.deleteFavoriteItem(findObj.id);
        setFavorites((prev) => prev.filter((item) => item.itemId !== obj.id));
      } else {
        setFavorites((prev: any) => [...prev, createProduct(favorites, prev, obj)]);
        ApiService.postFavortiteItem({
          id: obj.id,
          itemId: obj.id,
          title: obj.title,
          price: obj.price,
          imageUrl: obj.imageUrl,
        });
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const isItemAdded = (title: string, imageUrl: string) => {
    return cartItems.some((obj) => obj.title === title && obj.imageUrl === imageUrl);
  };

  const isItemFavorited = (title: string, imageUrl: string) => {
    return favorites.some((obj) => obj.title === title && obj.imageUrl === imageUrl);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        onClose,
        setCartItems,
        isItemAdded,
        onPlus,
        onAddToFavorites,
        isItemFavorited,
      }}>
      <div className="wrapper clear">
        <Drawer
          onClose={onClose}
          items={cartItems}
          onDeleteCartItem={onDeleteCartItem}
          isCartOpened={isCartOpened}
        />

        <Header onClose={onClose} />
        <div className="content p-40">
          <Route path="/" exact>
            <Home
              items={items}
              searchValue={searchValue}
              cartItems={cartItems}
              setSearchValue={setSearchValue}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/favorites">
            <Favorites cartItems={cartItems} items={favorites} />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
