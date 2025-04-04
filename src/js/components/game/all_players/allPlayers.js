import React from "react";
import { connect } from "react-redux";
import styles from "./allPlayers.scss";
// Custom Components
import PlayerStats from "./player_stats/playerStats";

const AllPlayers = (props) => {
  const currentPlayer = props.currentPlayer;

  const playerStats = props.players.map((player, index) => {
    const isCurrent = currentPlayer === index;
    return (
      <PlayerStats player={player} key={player.id} isCurrent={isCurrent} />
    );
  });

  return <div className={styles.allPlayers}>{playerStats}</div>;
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: state.gamePage.gameData.currentPlayer,
    players: state.gamePage.players,
  };
};

export default connect(mapStateToProps)(AllPlayers);
