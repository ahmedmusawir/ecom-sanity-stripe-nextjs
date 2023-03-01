import React from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
