import React from 'react';
import { useContext } from 'react';
import AppContext from '../context';

type InfoProps = {
  title: string;
  description: string;
  image: string;
};

type Context = {
  onClose: (a: boolean) => void;
};

const Info: React.FC<InfoProps> = ({ image, title, description }) => {
  const { onClose } = useContext(AppContext) as Context;
  return (
    <div className="blockEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" height="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => onClose(false)} className="greenBtn">
        <img src="/images/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
