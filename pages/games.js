import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import styles from "../styles/Games.module.css";

function games({ totalPages, currentPage, result }) {


  const router = useRouter();
  console.log(router);

  const pagginationHandler = (page) => {
    const currentPage = router.pathname;
    const queryCurrent = router.query;
    queryCurrent.page = page;
    router.push({
      pathname: currentPage,
      query: queryCurrent,
    });
  };

  return (
    <div className={styles.games}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>date</th>
            <th>city</th>
            <th>home team</th>
            <th>result</th>
            <th>away team</th>
            <th>season</th>
          </tr>
        </thead>
        <tbody>
          {result.map((game) => (
            <tr key={game.id} className={styles.gamesList}>
              <td>{game.date.slice(0, 10)}</td>
              <td>{game.home_team.city}</td>
              <td>{game.home_team.name}</td>
              <td>
                {game.home_team_score} : {game.visitor_team_score}
              </td>
              <td>{game.visitor_team.name}</td>
              <td>{game.season}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={1}
          totalItemsCount={totalPages}
          pageRangeDisplayed={3}
          onChange={pagginationHandler}
          innerClass={styles.list}
          itemClass={styles.listLi}
          activeClass={styles.active}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const res = await fetch(
    `https://www.balldontlie.io/api/v1/games?page=${page}`
  );

  const result = await res.json();

  return {
    props: {
      totalPages: result.meta.total_pages,
      currentPage: result.meta.current_page,
      result: result.data,
    },
  };
};

export default games;
