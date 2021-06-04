import styles from "../styles/NavBar.module.css";
import Image from "next/image";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.img_logo}>
        <Image src="/logo.png" alt="logo NBA" width={150} height={75} />
      </div>
      <ul className={styles.ul}>
        <li>Players</li>
        <li>Games</li>
        <li>Stats</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default NavBar;
