import styles from "../styles/TeamList.module.css";
import Link from "next/link";

function TeamList({ team }) {
  return (
    <Link href={`/${team.id}`}>
      <p className={styles.team}>
        <span>{team.full_name}</span>
      </p>
    </Link>
  );
}

export default TeamList;
