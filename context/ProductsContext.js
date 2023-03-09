import React, { createContext, useState, useEffect } from 'react';
import { client } from '../lib/client';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const getData = async () => {
      // GETTING SANITY DATA
      const queryAllProducts = '*[_type == "product"]';
      const cmsProducts = await client.fetch(queryAllProducts);
      setProducts(cmsProducts);
      //   console.log('CMS Products:', cmsProducts);

      const queryFeaturedProducts =
        '*[_type == "product" && isFeatured == "featured"]';
      const cmsFeaturedProducts = await client.fetch(queryFeaturedProducts);
      setFeatured(cmsFeaturedProducts);

      const bannerQuery = '*[_type == "banner"]';
      const cmsBannerData = await client.fetch(bannerQuery);
      setBannerData(cmsBannerData);

      setIsPending(false);
    };
    getData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, featured, bannerData, isPending }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
