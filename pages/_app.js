import '../src/styles/index.css';
import '../src/styles/products.css';
import '../src/styles/cart.css';
import '../src/styles/blog.css';
import '../src/styles/checkout.css';
import '../src/styles/normalize.css';
import React from 'react';

import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure( { showSpinner: false } );
Router.events.on( 'routeChangeStart', () => NProgress.start() );
Router.events.on( 'routeChangeComplete', () => NProgress.done() );
Router.events.on( 'routeChangeError', () => NProgress.done() );

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
