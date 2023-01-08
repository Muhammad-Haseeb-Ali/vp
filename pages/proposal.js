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

export default function Proposal(props) {
  const router = useRouter()
  const {id} = router.query
  const [MD, setMD] = useState(null)

  useEffect(()=>{
    async function MDfunc (){
    const proposal = await fetch("https://backofvp.up.railway.app/proposal/" + id)
    .then(res=>res.json())
    .then(data => data)
    .catch(err => err)
    setMD(proposal)
    console.warn(id, proposal)
    }
    id && MDfunc()
  },[id])

      if(MD != null)
      return(<>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        (props.err) ?
          <h1>error: {props.err}</h1> :
          <>
            <Head>
            <title>For {MD.proposal.client !== "" ? MD.proposal.client : "you"}</title>
            </Head>
            <Navbar />
            <StreamVideo faceLink={MD.proposal.faceLink} screenLink={MD.proposal.screenLink} />
            <Reaction />
            <Description client={MD.proposal.client || ""} discription={MD.proposal.discription} />
            <Footer />
          </>
      }
    </>)
    else(<h1>Loading</h1>)
}


export const getStaticProps = async (cont) => {
  return {
    props: {  }
  }
}