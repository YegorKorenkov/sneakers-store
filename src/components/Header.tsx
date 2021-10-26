import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

interface IHeader {
  onClose: (boolean: boolean) => void;
}

const Header: React.FC<IHeader> = ({ onClose }) => {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img src="/images/logo.png" alt="logo" className="mr-15" width={40} height={40} />
          <div>
            <h3 className="text-uppercase">Sneakers Store</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={() => onClose(true)}>
          <img height={18} width={18} src="/images/cart.svg" alt="cart" />
          <span className="ml-15">{totalPrice} грн</span>
        </li>

        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img height={18} width={18} src="/images/heart.svg" alt="favorites" />
          </Link>
        </li>
        <Link to="/orders">
          <li className="cu-p">
            <img height={18} width={18} src="/images/user.svg" alt="user" />
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
