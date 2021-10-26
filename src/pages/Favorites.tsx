import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartSneaker, Sneaker } from '../App';
import Card from '../components/Card';
import Info from '../components/Info';
import AppContext from '../context';

interface IFavorites {
  items: Sneaker[];
  cartItems: CartSneaker[];
}

const Favorites: React.FC<IFavorites> = () => {
  const { favorites } = useContext(AppContext);

  if (!favorites.length) {
    return (
      <Info
        title="Закладок нет :("
        description="Вы ничего не добавляли в закладки"
        image="images/emptyFavorited.png"
      />
    );
  }

  return (
    <>
      <div className="mb-40 d-flex align-center">
        <Link to="/">
          <img className="mr-20 cu-p" src="/images/arrow-left.svg" alt="arrow-left" />
        </Link>

        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, key) => (
          <Card {...item} key={key} isLoading={false} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
