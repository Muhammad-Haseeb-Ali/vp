import styles from '../styles/Reaction.module.css'
import { useRouter } from 'next/router';

export default function Reaction({client}) {

    const { id } = useRouter().query;

    function sendMail(id, msg) {
        const clickedbtn = document.getElementById(msg)
        const unclickedbtn = document.getElementById(msg=="Like"? "Unlike":"Like")
        clickedbtn.style.background = "#008a59"
        unclickedbtn.style.background = "white"
        const mail=`${msg=="Like"? "👍 Hurray" : "😢 Unfortunately"} \n\n
                    Your Video Proposal with id: ${id} is ${msg} by the ${client != ""? client : "Unknown"} \n\n\n
                    Check out your Proposal here: https://videoproposal.vercel.app/proposal?id=${id} `
        fetch(`api/sendmail?id=${id}&msg=${mail}`,{method:"GET",mode: 'no-cors'})
    }

    return (
        <section className={styles.reaction_sec}>
            <p>
                Your Feedback will help me to improve it. <samp id='Like' onClick={() => sendMail(id, "Like")} >👍</samp> <samp id='Unlike' onClick={() => sendMail(id, "Unlike")}>👎</samp>
            </p>
        </section>
    )
}