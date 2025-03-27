import React from "react";
import { connect } from "react-redux";
import styles from "./players.scss";
import playerStyles from "./player/player.scss";
//Custom components
import Player from "./player/player";
import OrderableList from "components/global_components/orderable_list/orderableList";
//Redux Actions
import { removePlayer, playerDropped } from "actions/gameMenuActions";

const Players = (props) => {
  const removePlayer = (item) => {
    props.removePlayer(item.id);
  };

  const playerDropped = (newPosition, item) => {
    return props.playerDropped(newPosition, item.id);
  };

  return (
    <OrderableList
      className={styles.players}
      itemClassName={playerStyles.player}
      grabbedItemClassName={playerStyles.grabbed}
      rightAnimation={true}
      items={props.players}
      itemComponent={Player}
      onRemove={removePlayer}
      onDrop={playerDropped}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.gamePage.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePlayer: (playerId) => dispatch(removePlayer(playerId)),
    playerDropped: (newPosition, id) =>
      dispatch(playerDropped(newPosition, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
