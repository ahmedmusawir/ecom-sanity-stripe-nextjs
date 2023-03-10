import React, { createContext, useReducer } from 'react';
import cartReducer, { sumItems } from '../reducer/CartReducer';

export const CartContext = createContext();

const cartFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const initialState = {
  cartItems: cartFromStorage,
  ...sumItems(cartFromStorage),
};
// const initialState = { cartItems: [], itemCount: 0, total: 0 };

function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProduct = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    window.scroll(0, 0);
  };
  const addMore = (product) => {
    dispatch({ type: 'ADD_MORE', payload: product });
    window.scroll(0, 0);
  };
  const addLess = (product) => {
    dispatch({ type: 'ADD_LESS', payload: product });
    // window.scroll(0, 0);
  };
  const removeProduct = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const contextValues = {
    ...state,
    addProduct,
    removeProduct,
    addMore,
    addLess,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
