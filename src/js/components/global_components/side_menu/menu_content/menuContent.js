import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./menuContent.scss";
//Custom Components
import GameId from "components/global_components/game_id/gameId";
import MyAccount from "./my_account/myAccount";
import QuitGame from "./quit_game/quitGame";
import UrlQrCode from "./url_qr_code/urlQrCode";
import LogOut from "components/global_components/accountInfo/logout";

const MenuContent = (props) => {
  const { gameId } = useParams();
  const admin = props.user.id === props.createdBy;

  return (
    <div className={styles.menuContent}>
      {gameId && <GameId />}
      <MyAccount />
      {!admin && props.players.length > 0 ? <QuitGame /> : null}
      <LogOut className={styles.logout} />
      {gameId && <UrlQrCode />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    players: state.gamePage.players,
    createdBy: state.gamePage.gameData.createdBy,
  };
};

export default connect(mapStateToProps)(MenuContent);
