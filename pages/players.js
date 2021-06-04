import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Router, { useRouter } from "next/router";
import styles from '../styles/Players.module.css'

function Players({ totalPage, current, posts }) {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const pagginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <div className={styles.players}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts.map((player) => (
          <div key={player.id}>
            <p>
              {player.first_name} {player.last_name}
            </p>
          </div>
        ))
      )}

      <ReactPaginate className={styles.list}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        initialPage={current - 1}
        pageCount={totalPage}
        marginPagesDisplayed={3}
        pageRangeDisplayed={5}
        onPageChange={pagginationHandler}
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
