import styles from "../styles/TeamList.module.css";
import Link from "next/link";

function TeamList({ team }) {
  return (
    <Link href={`/${team.id}`}>
        <span className={styles.team}>{team.full_name}</span>
    </Link>
  );
}

export default TeamList;
