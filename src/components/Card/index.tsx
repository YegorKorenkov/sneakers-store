import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import { useContext } from 'react';
import AppContext from '../../context';

interface ICard {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  isLoading: boolean;
  isOrdered?: boolean;
}

const Card: React.FC<ICard> = ({ id, title, price, imageUrl, isLoading, isOrdered = false }) => {
  const { isItemAdded, isItemFavorited, onAddToFavorites, onPlus } = useContext(AppContext);

  const onClickPlus = () => {
    onPlus({ id, title, price, imageUrl });
  };

  const onLike = () => {
    onAddToFavorites({ id, title, price, imageUrl });
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {!isOrdered && (
            <div className={styles.favorite}>
              <img
                src={isItemFavorited(title, imageUrl) ? '/images/like.svg' : '/images/unlike.svg'}
                alt="unlike"
                onClick={onLike}
              />
            </div>
          )}
          <div className="text-center">
            <img width={133} height={112} src={imageUrl} alt="sneaker" />
          </div>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} грн.</b>
            </div>

            {!isOrdered && (
              <img
                onClick={onClickPlus}
                className={styles.plus}
                src={!isItemAdded(title, imageUrl) ? 'images/btn-plus.svg' : 'images/btn-added.svg'}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
