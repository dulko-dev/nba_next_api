import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <div className={styles.img_logo}>
          <Image src="/logo.png" alt="logo NBA" width={150} height={75} />
        </div>
      </Link>
      <ul className={styles.ul}>
        <Link href="/">
          <li>Start</li>
        </Link>
        <Link href="/players">
          <li>Players</li>
        </Link>
        <Link href="/games">
          <li>Games</li>
        </Link>
        <Link href="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
