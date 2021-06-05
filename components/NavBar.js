import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.img_logo}>
        <Image src="/logo.png" alt="logo NBA" width={150} height={75} />
      </div>
      <ul className={styles.ul}>
        <Link href="/players">
          <li>Players</li>
        </Link>
        <Link href="/games">
          <li>Games</li>
        </Link>
        <li>Stats</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default NavBar;
