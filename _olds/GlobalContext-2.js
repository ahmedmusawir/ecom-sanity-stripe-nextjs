import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const GlobalContext = createContext();

// const cartFromStorage = localStorage.getItem('cartSanityEcom')
//   ? JSON.parse(localStorage.getItem('cartSanityEcom'))
//   : [];

const GlobalContextProvider = ({ children }) => {
  // THE FOLLOWING INDEX STATE WAS ADDED TO RESOLVE IMG LOADING ISSUE
  const [index, setIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const data = window.localStorage.getItem('cartSanityEcom');
    console.log('cart data from local storage', JSON.parse(data));
    if (data !== null) setCartItems(JSON.parse(data));
    console.log('cart data length', data.length);
    console.log('cart data Items State', cartItems);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cartSanityEcom', JSON.stringify(cartItems));
  }, [cartItems]);

  let foundProduct;
  let indx;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(item => item._id === product._id);

    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          };
        } else {
          // FOLLOWING LINE ADDED TO ADDING SAME ITEM MULTIPLE TIME ISSUE
          return cartProduct;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = product => {
    foundProduct = cartItems.find(item => item._id === product._id);
    const newCartItems = cartItems.filter(item => item._id !== product._id);

    setTotalPrice(
      prevTotalPrice =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      prevTotalQuantities => prevTotalQuantities - foundProduct.quantity
    );

    setCartItems(newCartItems);
    // storeCartItems(cartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find(item => item._id === id);
    indx = cartItems.findIndex(product => product._id === id);

    const newCartItems = cartItems.filter(item => item._id !== id);
    // FOLLOWING IS A NO NO CUZ IT MUTATIES THE STATE DIRECTLY
    // const newCartItems = cartItems.splice(indx, 1);

    if (value === 'inc') {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 }
      ]);

      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 }
        ]);

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty(prevQty => prevQty + 1);
  };

  const decQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        index,
        setIndex,
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
