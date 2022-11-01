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
    fetch(`/api/sendmail?id=${id}&msg=${msg}`)
  }

  useEffect(()=>{
    if(id != undefined){
    fetch(`/api/checkexistence?id=${id}`)
    .then(res=>{
      setContStatus(res.status)
        switch(res.status){
          case 200:
            sendMail(id,"All Good.")
            break;
          case 404:
            sendMail(id,"Not Found")
            break;
      }
    })
    .catch(err=>console.error(err))
    }

  },[id])
    return (
        <>
              <Head>
        <title>for {client? client : "you"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar/>
      {
        contStatus?
        contStatus == 200?
              <>
              <StreamVideo/>
              <Reaction />
              </>
              :
              <Notfound/>
          :
          <LoadStream/>

      }
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