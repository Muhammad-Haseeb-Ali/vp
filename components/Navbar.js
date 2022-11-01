import styles from "../styles/Navbar.module.css";


export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <img src='/favicon.ico' alt="Picture of the author" />
        <img src='/me.png' alt="Picture of the author" />
      </li>
      <li>
        <a target="blank" href="https://www.upwork.com/freelancers/~0125308eee50ba980b">
        <img src='/uplogo.png' alt="Picture of the author" />
      <h5>&nbsp;&nbsp; Profile</h5>
        </a>
      </li>
    </ul>
  );
}
