import styles from "../styles/Description.module.css"

export default function Description({client}){
    return(
        <section className={styles.description_sec}>
            <br/>
            Hello, {client.length>0 && client[0].toUpperCase() + client.substring(1)}
            <br/>
            <br/>
            My name is Muhammad Haseeb Ali. I&apos;m from Punjab Pakistan. I am doing Bachelor&apos;s in Data Science and freelancing as a Front End Web Developer.
<br/>
<br/>
I have Experience of 2 years in Web Development and I have worked with many Startups, Senior Software Engineers, and Companies in this whole journey. And this gave me an experience much better than ever and increased my skills to the next level.
<br/>
<br/>
If you are interested in my services then leave your message in the Chat section. I will respond as soon and we will discuss it together and make a further plan.
<br/>
<br/>
Regards
Muhammad Haseeb Ali
Full Stack Web Developer
        </section>
    )
}