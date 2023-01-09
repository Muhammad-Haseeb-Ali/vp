import styles from '../styles/Profile.module.css'
export default function Profile() {
    return (
        <section className={styles.pro_sec}>
            <div>
            <img src='/me.png' alt="Picture of the author" />
            <h5>Muhammad Haseeb Ali <br /> <samp>MERN Stack web developer &nbsp;</samp></h5>                
            </div>

            <ul>
                <li>
                    <img src='/passion.png' alt="Picture of the author" />
                    <p>Passionated</p>
                </li>
                <li>
                    <img src='/work.png' alt="Picture of the author" />
                    <p>Experianced || </p>
                </li>
                <li>
                    <img src='/certified.png' alt="Picture of the author" />
                    <p>Certified ||</p>
                </li>
            </ul>
        </section>
    )
}