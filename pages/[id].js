import styles from "../styles/TeamDetails.module.css";
import { aboutTeam } from "../components/data";

export const getStaticPaths = async () => {
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams/`);
  const data = await res.json();

  const ids = data.data.map((data) => data.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

function TeamDetails({ data }) {
  return (
    <div className={styles.container}>
      <h1>{data.full_name}</h1>
      <p>{data.abbreviation}</p>
      <p>Conference: {data.conference}</p>
      <p>Division: {data.division}</p>
      <p>history: {aboutTeam[data.id-1].info}</p>
      <img src={aboutTeam[data.id-1].logo} />
    </div>
  );
}

export default TeamDetails;

/*
{
  "id":14,
  "abbreviation":"LAL",
  "city":"Los Angeles",
  "conference":"West",
  "division":"Pacific",
  "full_name":"Los Angeles Lakers",
  "name":"Lakers"
}
*/
