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
  useEffect(()=>{
    if(id != undefined){
          const contExist = fetch(`http://localhost:3000/api/checkexistence?id=${id}`)
    .then(res=>setContStatus(res.status))
    .catch(err=>err)
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
              <Reaction/>
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


  // export const getStaticProps = async (cont) => {
  //   return{
  //     props:{}
  //   }
  // }