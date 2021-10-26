import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../api/ApiService';
import { CartSneaker } from '../App';
import Card from '../components/Card';
import Info from '../components/Info';

interface Orders {
  id: string;
  items: CartSneaker[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<CartSneaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await ApiService.getOrders();
      setOrders(data.reduce((prev: CartSneaker[], obj: Orders) => [...prev, ...obj.items], []));
      setIsLoading(false);
    })();
    console.log(orders);
  }, [orders]);

  if (!orders.length) {
    return (
      <Info
        title={'У вас нет заказов'}
        description={'Вы нищеброд? Оформите хотя бы один заказ.'}
        image={'/images/emptyOrderSmile.png'}
      />
    );
  }

  return (
    <>
      <div className="mb-40 d-flex align-center">
        <Link to="/">
          <img className="mr-20 cu-p" src="/images/arrow-left.svg" alt="arrow-left" />
        </Link>

        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, key) => (
          <Card {...item} key={key} isLoading={isLoading} isOrdered />
        ))}
      </div>
    </>
  );
};

export default Orders;
