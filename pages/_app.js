import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import GlobalContextProvider from '../context/GlobalContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}

export default MyApp;
