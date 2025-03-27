import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./player.scss";
//Custom components
import OrderableList from "components/global_components/orderable_list/orderableList";
import UserIcon from "components/global_components/user_icon/userIcon";

const Player = (props) => {
  const player = props.item;
  return (
    <div className={styles.wrapper} key={player.id}>
      <OrderableList.Grabbable className={styles.playerNameWrapper}>
        <p className={styles.playerName}>
          {player.position + 1}: <span> {player.user.username}</span>
        </p>
        <UserIcon player={player} className={styles.userIcon} />
      </OrderableList.Grabbable>
      {player.user.id !== props.createdBy && (
        <OrderableList.RemoveButton className={styles.removeButton}>
          <FontAwesomeIcon icon={faTimes} />
        </OrderableList.RemoveButton>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    createdBy: state.gamePage.gameData.createdBy,
  };
};

export default connect(mapStateToProps)(Player);
