import { CartSneaker } from '../App';

export const createProduct = (state: CartSneaker[], prevState: CartSneaker[], obj: CartSneaker) => {
  if (state.length === 0) {
    return {
      id: '1',
      itemId: obj.id,
      title: obj.title,
      price: obj.price,
      imageUrl: obj.imageUrl,
    };
  } else {
    return {
      id: (Number(prevState[prevState.length - 1].id) + 1).toString(),
      itemId: obj.id,
      title: obj.title,
      price: obj.price,
      imageUrl: obj.imageUrl,
    };
  }
};
