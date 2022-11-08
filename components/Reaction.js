import styles from '../styles/Reaction.module.css'
import { useRouter } from 'next/router';

export default function Reaction(){

    const {id} = useRouter().query;

 function sendMail(id,msg){
    fetch(`https://www.vp.up.railway.app/sendmail?id=${id}&msg=${msg}`)
 }

    return(
        <section className={styles.reaction_sec}>
            <p>
            Your Feedback will help me to improve it. <samp onClick={()=>sendMail(id,"Like")} >👍</samp> <samp onClick={()=>sendMail(id,"Unlike")}>👎</samp>
            </p>
        </section>
    )
}