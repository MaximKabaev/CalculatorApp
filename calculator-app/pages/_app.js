import '../styles/globals.css';
import ReactDOM from 'react-dom';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp
