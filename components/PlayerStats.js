import React from "react";

function PlayerStats({ player }) {


  return (
    <>
      <td>{player.position}</td>
      <td>{player.first_name}</td>
      <td>{player.last_name}</td>
      <td>{player.team.full_name}</td>
    </>
  );
}

export default PlayerStats;
