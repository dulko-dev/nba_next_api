import React from "react";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import styles from "../styles/Players.module.css";

function Players({ totalPage, current, posts }) {
  const router = useRouter();

  console.log(router);
  console.log(perPage);

  const pagginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <div className={styles.players}>
      {posts.map((player) => (
        <p key={player.id} className={styles.playerList}>
          {player.first_name} {player.last_name}
        </p>
      ))}
      <Pagination
        activePage={current}
        itemsCountPerPage={1}
        totalItemsCount={totalPage}
        pageRangeDisplayed={3}
        onChange={pagginationHandler}
        innerClass={styles.list}
        itemClass={styles.listLi}
        activeClass={styles.active}
      />
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const post = await fetch(
    `https://www.balldontlie.io/api/v1/players?page=${page}`
  );
  const result = await post.json();

  return {
    props: {
      totalPage: result.meta.total_pages,
      current: result.meta.current_page,
      posts: result.data,
    },
  };
};

export default Players;
