import styles from "../styles/Home.module.css";
import Image from "next/image";
import TeamList from "../components/TeamList";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
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
      <div className={styles.team_list}>
        {data.data.map((team) => (
          <TeamList team={team} key={team.id} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
