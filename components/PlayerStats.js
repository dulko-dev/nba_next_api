import React from "react";

function PlayerStats({ player, data }) {
  console.log(data);

  return (
    <>
      <td>{player.position}</td>
      <td>{player.first_name}</td>
      <td>{player.last_name}</td>
      <td>{player.team.full_name}</td>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `https://www.balldontlie.io/api/v1/players?search=Gortat`
  );
  const data = await res.json();

  return {
    props: {
      data: data.data
    },
  };
};

export default PlayerStats;
