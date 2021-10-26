import axios from 'axios';
import React from 'react';
import { useState } from 'react';

import styles from './Drawer.module.scss';

import { Sneaker } from '../../App';
import { useCart } from '../../hooks/useCart';
import Info from '../Info';

interface IDrawer {
  onClose: (boolean: boolean) => void;
  items: Sneaker[];
  onDeleteCartItem: (id: string) => void;
  isCartOpened: boolean;
}

const Drawer: React.FC<IDrawer> = ({ onClose, items, onDeleteCartItem, isCartOpened }) => {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, setCartItems, totalPrice } = useCart();

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://61095333d71b670017639872.mockapi.io/orders', {
        items: cartItems,
      });
      await cartItems.forEach((item: any, key: number) => {
        axios.delete('https://61095333d71b670017639872.mockapi.io/cart/' + item.id);
      });
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);
    } catch (error) {
      alert('Error');
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`${styles.overlay} ${isCartOpened && styles.visible}`}
      onClick={() => onClose(false)}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <h2 className="d-flex justify-between mb-10">
          Корзина{' '}
          <img
            onClick={() => onClose(false)}
            className="removeBtn cu-p"
            src="/images/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className={styles.items}>
              {items.map((item, key) => {
                return (
                  <div className="cartItem d-flex align-center mt-20" key={item.title + key}>
                    <img
                      className="cartItemImg"
                      src={item.imageUrl}
                      alt="sneakers"
                      width={70}
                      height={70}
                    />
                    <div className="d-flex justify-center flex-column ml-20 mr-10">
                      <p className="mb-10">{item.title}</p>
                      <p>
                        <b>{item.price} грн.</b>
                      </p>
                    </div>
                    <img
                      className="removeBtn"
                      src="/images/btn-remove.svg"
                      alt="remove"
                      onClick={() => onDeleteCartItem(item.id)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div className=""></div>
                  <b>{totalPrice} грн.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} грн.</b>
                </li>
              </ul>

              <button disabled={isLoading} className="greenBtn" onClick={onClickOrder}>
                Оформить заказ <img src="/images/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderCompleted ? '/images/complete-order.jpg' : '/images/empty-cart.png'}
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
