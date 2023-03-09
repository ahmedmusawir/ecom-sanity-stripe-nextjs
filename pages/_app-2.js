import React, { createContext, useState, useEffect } from 'react';
import { client } from '../lib/client';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import ProductsContext from '../context/ProductsContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps, cmsProducts, cmsBannerData }) {
  const [products, setProducts] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [isPending, setIsPending] = useState(false);

  console.log('cms products:', cmsProducts);

  useEffect(() => {
    const getProducts = async () => {
      setIsPending(true);

      // SETTING STATES
      await setProducts(cmsProducts);
      await setBannerData(cmsBannerData);
      // setFeatured(featuredProducts.data);
      setIsPending(false);
    };
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, bannerData, isPending }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductsContext.Provider>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const cmsProducts = await client.fetch(query);
  console.log('CMS Products:', cmsProducts);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { cmsProducts, cmsBannerData },
  };
};

export default MyApp;
