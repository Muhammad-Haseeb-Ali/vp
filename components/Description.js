import styles from "../styles/Description.module.css"

export default function Description({ client, discription }) {
    return (
        <section className={styles.description_sec}>
            <h3>Hello {client != 'You'? client : "Dear"}!</h3>
            <div
                dangerouslySetInnerHTML={{ __html: discription }}
            />
        </section>
    )
}