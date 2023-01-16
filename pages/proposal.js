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
import Profile from '../components/Profile'

export default function Proposal(props) {
  const router = useRouter()
  const { id } = router.query
  const [MD, setMD] = useState({})

  useEffect(() => {
    const url = "https://backofvp.up.railway.app/proposal/" + id;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMD(json)

        const mail=`👍 Congratulation "\n\n
        Your Video Proposal with id: ${id} have been watch by the your client \n\n\n
        Check out your Proposal here: https://videoproposal.vercel.app/proposal?id=${id} `

        fetch(`https://backofvp.up.railway.app/sendmail?id=${id}&msg=${mail}`,{method:"GET",mode: 'no-cors'})
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData()
      .then(() => console.warn("matadata", MD))
  }, [id]);

  return (
    (MD != null) ?
      MD.proposal ?
        <>
          <Head>
            <title>For {MD.proposal.client !== "" ? MD.proposal.client : "you"}</title>
          </Head>
          <Navbar />
          <StreamVideo videoLink={MD.proposal.videoLink} />
          <Reaction client={MD.proposal.client} />
          <Profile/>
          <Description client={MD.proposal.client || ""} discription={MD.proposal.discription} />
          <Footer />
        </>
        :
        <></>
      :
      <h1>loading</h1>
  )

}