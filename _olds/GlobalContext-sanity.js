import React, { createContext, useState, useEffect } from 'react';
import { client } from '../lib/client';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  // Fetch data from the source using axios
  const [cartsData, setCartsData] = useState([]);

  useEffect(() => {
    const getSanityData = async () => {
      const query = '*[_type == "product" && isFeatured == "featured"]';
      const data = await client.fetch(query);
      setCartsData(data);
    };

    getSanityData();
  }, []);

  return (
    <GlobalContext.Provider value={{ index, setIndex, cartsData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
