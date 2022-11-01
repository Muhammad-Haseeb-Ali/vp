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
                A lot of other products are available to share a video to clients like loom.<br/>They works perfect even that I build it. Why? I know this is not be compareable with them,<br/>But it solve my problem which they can&apos;t. And saves my 85% of time in<br/>the production of video proposals.
            </samp>
            <button>How it Works ?</button>
            <p>Made with ❤️ to give you a better experiance</p>
        </section>
    )
}