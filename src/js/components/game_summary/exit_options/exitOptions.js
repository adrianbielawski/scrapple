import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as styles from "./exitOptions.scss";
//Custom Components
import Modal from "components/global_components/modal/modal";
import Button from "components/global_components/button/button";
//Redux Actions
import { createNewGameFromSource, exitGame } from "actions/gameSummaryActions";

const ExitOptions = (props) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const history = useHistory();
  const admin = props.user.id === props.gameData.createdBy;

  const handlePlayAgain = () => {
    props.createNewGameFromSource(gameId, true, history);
  };

  const handlePlayAgainSettings = () => {
    props.createNewGameFromSource(gameId, false, history);
  };

  const handleExitGame = () => {
    props.exitGame(admin, gameId, history);
  };

  return (
    <Modal show={props.show}>
      <div className={styles.exitOptions}>
        <Button onClick={handlePlayAgain}>{t("Play again")}</Button>
        <Button onClick={handlePlayAgainSettings}>
          {t("Play again with new settings")}
        </Button>
        <Button onClick={handleExitGame}>{t("Exit")}</Button>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    gameData: state.gamePage.gameData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    exitGame: (admin, gameId, history) => {
      dispatch(exitGame(admin, gameId, history));
    },
    createNewGameFromSource: (gameId, startImmediately, history) =>
      dispatch(createNewGameFromSource(gameId, startImmediately, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExitOptions);

