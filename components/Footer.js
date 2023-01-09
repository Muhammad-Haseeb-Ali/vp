import styles from "../styles/Footer.module.css"

export default function Footer(){
    return(
        <section className={styles.footer_sec}>
            <div className={styles.logo} >
                <img src="/favicon.ico" />
            <img src="/me.png" />            
            </div>
            <h1>Video Proposal App</h1>
            <h6>follows upwork terms and conditions</h6>
            <samp>
                A lot of other softwares are available to share a video to clients like l**m.<br/>They works perfect even that I build it. Why? I know this is not be compareable with them,<br/>But it solve my problem which they can&apos;t. And saves my 85% of time in<br/>the production of video proposals.
            </samp>
            <div>
            <button><a href="https://videoproposal.vercel.app/proposal?id=introduction" target="_blank">My introduction</a></button>
            <button><a href="https://www.upwork.com/freelancers/~0125308eee50ba980b?p=1598135665684144128" target="_blank">How it Works ?</a></button>                
            </div>

            <p>Made with ❤️ to give you a better experiance</p>
        </section>
    )
}