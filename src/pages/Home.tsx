import React from 'react';
import { CartSneaker, Sneaker } from '../App';
import Card from '../components/Card';

interface IHome {
  items: Sneaker[];
  searchValue: string;
  cartItems: CartSneaker[];
  setSearchValue: (a: string) => void;
  isLoading: boolean;
}

const Home: React.FC<IHome> = ({ items, searchValue, setSearchValue, cartItems, isLoading }) => {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, key) => (
      <Card {...item} cartItems={cartItems} key={key} isLoading={isLoading} />
    ));
  };

  return (
    <>
      <div className="mb-40 d-flex justify-between align-center">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/images/search.svg" alt="search" />
          {searchValue && (
            <img
              className="clear"
              src="/images/btn-remove.svg"
              alt="remove"
              onClick={() => setSearchValue('')}
            />
          )}
          <input
            type="text"
            placeholder="Поиск.."
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            value={searchValue}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </>
  );
};

export default Home;
