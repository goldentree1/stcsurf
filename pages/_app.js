import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import '@styles/globals.css'
import { useEffect } from "react";



//Is this 'Head' part really needed?
//bootstrap setup tutorial said so... but meh? test it?
function Application({ Component, pageProps }) {
  useEffect(() => {
    
  }, []);
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  return <Component {...pageProps} />
}

export default Application
