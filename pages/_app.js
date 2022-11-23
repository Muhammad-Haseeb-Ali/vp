import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return (<>
      <Head>
    <title>VP by Muhammad H.</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
  </Head>
   <Component {...pageProps} />
  </>)
}

export default MyApp
