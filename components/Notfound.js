import styles from '../styles/Notfound.module.css'
export default function Notfound(){
    return(
        <section className={styles.not_found_sec}>
            <h1>Proposal Not Found!</h1>
            <p>
                I Apologize for that, It may be in uploading phase, Please try it later.
            </p>
            <p>
            If it is old proposal and have been seen first time a week ago.
                <br/>
                Then it is deleted from server you can request it through my upwork profile. Thanks 
            </p>
        </section>
    )
}