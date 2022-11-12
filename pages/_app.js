import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return (<>
      <Head>
    <title>VP by Muhammad H.</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
  </Head>
   <Component {...pageProps} />
  </>)
}

export default MyApp
