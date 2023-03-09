import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import GlobalContextProvider from '../context/GlobalContext';
import ProductsContextProvider from '../context/ProductsContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <GlobalContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </ProductsContextProvider>
  );
}

export default MyApp;
