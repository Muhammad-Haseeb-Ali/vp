import Head from 'next/head'
import Description from '../components/Description'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import StreamVideo from '../components/Video'
import { useRouter } from 'next/router';
import Reaction from '../components/Reaction'
import { useEffect, useState } from 'react'
import Notfound from '../components/Notfound'
import LoadStream from '../components/LoadStream'

export default function Proposal() {
  const { id, client } = useRouter().query;
  const [contStatus, setContStatus] = useState(null)

  function sendMail(id,msg){
    fetch(`https://vpback.herokuapp.com/sendmail?id=${id}&msg=${msg}`)
  }

    return (
        <>
              <Head>
        <title>for {client? client : "you"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar/>
      <video
        src={`https://backofvp.up.railway.app/proposal/${id}/video/screen`}  width="320" height="240" controls/>
      <video
        src={`https://backofvp.up.railway.app/proposal/${id}/video/face`}  width="320" height="240" controls/>
      <Reaction />
      <Description client={client? client : ""} />
      <Footer/>
        </>
    )
  }


  export const getStaticProps = async (cont) => {
    return{
      props:{}
    }
  }