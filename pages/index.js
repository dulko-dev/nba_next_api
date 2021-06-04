import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.home}>
      <Image src="/lebron.png" alt="player lebron" width={200} height={250} />
      <div className={styles.title}>
        <p>T</p>
        <p>E</p>
        <p>A</p>
        <p>M</p>
        <p>S</p>
      </div>
      <Image
        src="/westbrook.png"
        alt="player westbrook"
        width={200}
        height={250}
      />
    </div>
  );
}
