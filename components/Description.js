import styles from "../styles/Description.module.css"

export default function Description({client, discription}){
    return(
        <section className={styles.description_sec}>
            <br/>
            Hello, {client.length>0 && client}
            <br/>
            <br/>
            {discription}
        </section>
    )
}