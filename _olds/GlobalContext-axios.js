import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  // Fetch data from the source using axios
  const [cartsData, setCartsData] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/carts')
      .then((res) => {
        setCartsData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <GlobalContext.Provider value={{ index, setIndex, cartsData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
